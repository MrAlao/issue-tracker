import React from "react";
import IssueStatus from "@/app/components/IssueStatus";
import { Box, Card, Flex, Text, Title } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import CloseIssue from "./CloseIssue";
import PostIssueUpdate from "./PostIssueUpdate";
import { getIssue } from "@/app/_actions/issue.action";
import { notFound } from "next/navigation";

interface Props {
  issue: Awaited<ReturnType<typeof getIssue>>;
}

export default function IssueDetails({ issue }: Props) {
  if (!issue) notFound();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Box className="lg:col-span-2">
          <Title>{issue.title}</Title>
          <Flex className="space-x-3" my="2">
            <IssueStatus status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
        </Box>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Box className="lg:col-span-2">
          {issue.data.map((item) => (
            <Card key={item.id} withBorder shadow="md" mt={15}>
              <ReactMarkdown>{item.description}</ReactMarkdown>
            </Card>
          ))}
        </Box>
        <Box mt={15} className="space-y-4">
          {issue.status !== "CLOSED" && <CloseIssue issue={issue} />}
          <PostIssueUpdate issue={issue} />
        </Box>
      </div>
    </>
  );
}
