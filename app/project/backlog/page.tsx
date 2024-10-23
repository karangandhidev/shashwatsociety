import { Backlog } from "@/components/backlog";
import { type Metadata } from "next";
import { getQueryClient } from "@/utils/get-query-client";
import { currentUser } from "@clerk/nextjs";
import {
  getInitialIssuesFromServer,
  getInitialProjectFromServer,
  getInitialSprintsFromServer,
} from "@/server/functions";

export const metadata: Metadata = {
  title: "Backlog",
};

const BacklogPage = async () => {
  const user = await currentUser();
  const queryClient = getQueryClient();
  if (!user) {
    return null;
  }
  await Promise.all([
    await queryClient.prefetchQuery(["issues"], () =>
      getInitialIssuesFromServer(user?.id)
    ),
    await queryClient.prefetchQuery(["sprints"], () =>
      getInitialSprintsFromServer(user?.id)
    ),
    await queryClient.prefetchQuery(["project"], getInitialProjectFromServer),
  ]);


  return (
      <Backlog />
  );
};

export default BacklogPage;
