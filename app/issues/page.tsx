import React from "react";
import NewIssue from "./_assets/NewIssue";
import { Metadata } from "next/types";
import { getIssues } from "../_actions/issue.action";
import Issues from "./_assets/Issues";
import IssuesFilter from "./_assets/IssuesFilter";

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
    <>
      <NewIssue />
      <div className="grid grid-cols-1 lg:grid-cols-10">
        <div className="lg:col-span-2">
          <IssuesFilter />
        </div>
        <div className="lg:col-span-8">
          <Issues issues={issues} />
        </div>
      </div>
    </>
  );
}
