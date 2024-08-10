import React from "react";
import NewIssue from "./_assets/NewIssue";
import { Metadata } from "next/types";
import { getIssues } from "../_actions/issue.action";
import Issues from "./_assets/Issues";

export const metadata: Metadata = {
  title: "Issues",
  description: "",
};

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <div className="grid lg:grid-cols-7 gap-4">
      <div className="hidden lg:block col-span-2">
        <NewIssue />
      </div>
      <div className="col-span-full lg:col-span-5">
        <div className="container p-0">
          <Issues issues={issues} />
        </div>
      </div>
    </div>
  );
}
