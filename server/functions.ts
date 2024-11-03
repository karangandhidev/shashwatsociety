import { filterUserForClient, generateIssuesForClient } from "@/utils/helpers";
import { type UserResource } from "@clerk/types";
import { clerkClient } from "@clerk/nextjs";
import { prisma } from "./db";
import { SprintStatus } from "@prisma/client";

export async function getInitialIssuesFromServer(
  userId: UserResource["id"] | undefined | null
) {
  let activeIssues = await prisma.issue.findMany({
    where: { isDeleted: false, creatorId: userId ?? "init" },
  });

  if (userId && (!activeIssues || activeIssues.length === 0)) {

    const newActiveIssues = await prisma.issue.findMany({
      where: {
        // creatorId: userId,
        isDeleted: false,
      },
    });
    activeIssues = newActiveIssues;
  }

  if (!activeIssues || activeIssues.length === 0) {
    return [];
  }

  const activeSprints = await prisma.sprint.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  const userIds = activeIssues
    .flatMap((issue) => [issue.assigneeId, issue.reporterId] as string[])
    .filter(Boolean);

  // USE THIS IF RUNNING LOCALLY ----------------------
  // const users = await prisma.defaultUser.findMany({
  //   where: {
  //     id: {
  //       in: userIds,
  //     },
  //   },
  // });
  // --------------------------------------------------

  // COMMENT THIS IF RUNNING LOCALLY ------------------
  const users = (
    await clerkClient.users.getUserList({
      userId: userIds,
      limit: 20,
    })
  ).map(filterUserForClient);
  // --------------------------------------------------

  const issues = generateIssuesForClient(
    activeIssues,
    users,
    activeSprints.map((sprint) => sprint.id)
  );
  return issues;
}

export async function getInitialProjectFromServer() {
  const project = await prisma.project.findUnique({
    where: { key: "JIRA-CLONE" },
  });
  return project;
}

export async function getInitialSprintsFromServer(
  userId: UserResource["id"] | undefined
) {
  let sprints = await prisma.sprint.findMany({
    where: {
      OR: [{ status: SprintStatus.ACTIVE }, { status: SprintStatus.PENDING }],
      creatorId: userId ?? "init",
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (userId && (!sprints || sprints.length === 0)) {
    // New user, create default sprints
    const newSprints = await prisma.sprint.findMany({
      where: {
        creatorId: userId,
      },
    });
    sprints = newSprints;
  }
  return sprints;
}

export async function initProject() {
  await prisma.project.upsert({
    where: {
      id: "init-project-id-dq8yh-d0as89hjd",
    },
    update: {},
    create: {
      id: "init-project-id-dq8yh-d0as89hjd",
      name: "Jira Clone Project",
      key: "JIRA-CLONE",
    },
  });
}

export async function deleteInactiveMembers() {
  // Find all member IDs that do not exist in the defaultUser table
  const inactiveMembers = await prisma.member.findMany({
    where: {
      id: {
        notIn: (await prisma.defaultUser.findMany({
          select: {
            id: true,
          },
        })).map((user) => user.id),
      },
    },
  });

  // Delete members whose IDs were not found in the defaultUser table
  await prisma.member.deleteMany({
    where: {
      id: {
        in: inactiveMembers.map((member) => member.id),
      },
    },
  });

  console.log(`${inactiveMembers.length} member(s) deleted`);
}
