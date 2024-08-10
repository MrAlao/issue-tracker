import { Grid } from "@mantine/core";
import { Metadata } from "next/types";
import LatestIssues from "./_assets/LatestIssues";
import { getIssues, getLatestIssues } from "./_actions/issue.action";
import IssueSummary from "./_assets/IssueSummary";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "",
};

export default async function Home() {
  const latestIssues = await getLatestIssues();
  const issues = await getIssues();

  const open = issues?.filter((item) => item.status === "OPEN").length || 0;
  const closed = issues?.filter((item) => item.status === "CLOSED").length || 0;
  const in_progress =
    issues?.filter((item) => item.status === "IN_PROGRESS").length || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div>
        <IssueSummary open={open} closed={closed} in_progress={in_progress} />
      </div>
      <div>
        <LatestIssues issues={latestIssues} />
      </div>
    </div>
  );
}
