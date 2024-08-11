import { getIssue } from "@/app/_actions/issue.action";
import { Box, Flex } from "@mantine/core";
import React from "react";
import IssueDetails from "./_assets/IssueDetails";
import { notFound } from "next/navigation";
import Button from "@/app/components/Button";
import Link from "next/link";
import DeleteIssue from "./_assets/DeleteIssue";

interface Params {
  params: { [key: string]: string };
  searchParams: {
    issue_id: string;
  };
}

export default async function IssueView({ searchParams }: Params) {
  const issue = await getIssue({ issue_id: searchParams.issue_id });

  if (!issue) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <Box className="lg:col-span-2">
        <IssueDetails issue={issue} />
      </Box>
      <Box mt={20}>
        <DeleteIssue issue_id={issue.id} />
      </Box>
    </div>
  );
}

export async function generateMetadata({ searchParams }: Params) {
  const issue = await getIssue({ issue_id: searchParams.issue_id });

  return {
    title: issue?.title,
    description: issue?.description,
  };
}
