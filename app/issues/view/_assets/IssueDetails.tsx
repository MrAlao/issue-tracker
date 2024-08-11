import IssueStatus from "@/app/components/IssueStatus";
import { Card, Flex, Text, Title } from "@mantine/core";
import { Issue } from "@prisma/client";
import React from "react";

interface Props {
  issue: Issue;
}

export default function IssueDetails({ issue }: Props) {
  return (
    <>
      <Title>{issue.title}</Title>
      <Flex className="space-x-3" my="2">
        <IssueStatus status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card withBorder shadow="md" mt={15}>
        {issue.description}
      </Card>
    </>
  );
}
