"use client";

import { Card, Flex, Title, Text } from "@mantine/core";
import { Issue } from "@prisma/client";
import React from "react";
import IssueStatus from "../components/IssueStatus";
import Link from "next/link";

export default function LatestIssues({ issues }: { issues: Issue[] | null }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title size={18} mb={4}>
        Latest Issues
      </Title>

      {issues?.map((item) => (
        <Link
          key={item.id}
          href={`/issues/view?issue_id=${item.issue_id}`}
          className="mb-4"
        >
          <Flex direction={"column"}>
            <Text size="md" c="cyan">
              {item.title}
            </Text>
            <IssueStatus status={item.status} />
          </Flex>
        </Link>
      ))}
    </Card>
  );
}
