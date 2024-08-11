import React from "react";
import IssueStatus from "@/app/components/IssueStatus";
import { Box, Card, Flex, Text, Title } from "@mantine/core";
import { Issue } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import DeleteIssue from "./DeleteIssue";

interface Props {
  issue: Issue;
}

export default function IssueDetails({ issue }: Props) {
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
          <Card withBorder shadow="md" mt={15}>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box mt={15}>
          <DeleteIssue issue={issue} />
        </Box>
      </div>
    </>
  );

  return (
    <>
      <Title>{issue.title}</Title>
      <Flex className="space-x-3" my="2">
        <IssueStatus status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card withBorder shadow="md" mt={15}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
