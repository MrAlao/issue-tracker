"use client";

import { Card, Flex, Title, Text } from "@mantine/core";
import { Issue } from "@prisma/client";
import React from "react";
import IssueStatus from "../components/IssueStatus";

export default function LatestIssues({ issues }: { issues: Issue[] | null }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title size={18} mb={4}>
        Latest Issues
      </Title>

      {issues?.map((item) => {
        return (
          <Flex direction={"column"} className="mb-4">
            <Text size="md" c="cyan">
              {item.title}
            </Text>
            <IssueStatus status={item.status} />
          </Flex>
        );
      })}
    </Card>
  );
}
