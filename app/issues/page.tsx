import React from "react";
import NewIssue from "./_assets/NewIssue";
import { Metadata } from "next/types";
import { getIssues } from "../_actions/issue.action";
import Issues from "./_assets/Issues";

export const metadata: Metadata = {
  title: "Issues",
  description: "",
};

interface Props {
  searchParams: {
    status: string;
  };
}

export default async function IssuesPage({ searchParams }: Props) {
  const status = searchParams.status;

  const issues = await getIssues({ status });

  return (
    <div className="grid lg:grid-cols-7 gap-4">
      <div className="hidden lg:block col-span-3">
        <NewIssue />
      </div>
      <div className="col-span-full lg:col-span-4">
        <Issues issues={issues} />
      </div>
    </div>
  );
}
