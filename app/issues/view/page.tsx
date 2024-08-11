import { getIssue } from "@/app/_actions/issue.action";
import React from "react";
import IssueDetails from "./_assets/IssueDetails";
import { notFound } from "next/navigation";

interface Params {
  params: { [key: string]: string };
  searchParams: {
    issue_id: string;
  };
}

export default async function IssueView({ searchParams }: Params) {
  const issue = await getIssue({ issue_id: searchParams.issue_id });

  if (!issue) notFound();

  return <IssueDetails issue={issue} />;
}

export async function generateMetadata({ searchParams }: Params) {
  const issue = await getIssue({ issue_id: searchParams.issue_id });

  return {
    title: issue?.title,
    description: issue?.data?.[0].description,
  };
}
