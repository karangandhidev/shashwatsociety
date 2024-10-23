import { Board } from "@/components/board";
import { type Metadata } from "next";
import { getQueryClient } from "@/utils/get-query-client";
import { currentUser } from "@clerk/nextjs";
import {
  getInitialIssuesFromServer,
  getInitialProjectFromServer,
  getInitialSprintsFromServer,
} from "@/server/functions";

export const metadata: Metadata = {
  title: "Board",
};

const BoardPage = async () => {
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
      <Board />
  );
};

export default BoardPage;
