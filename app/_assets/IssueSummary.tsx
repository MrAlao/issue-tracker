"use client";

import { Card, Flex, Grid, Text } from "@mantine/core";
import { Status } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
  in_progress: number;
}

interface Data {
  label: string;
  value: number;
  status: Status;
}

export default function IssueSummary({ open, closed, in_progress }: Props) {
  const data: Data[] = [
    {
      label: "Open issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "Closed issues",
      value: closed,
      status: "CLOSED",
    },
    {
      label: "Issues in progress",
      value: in_progress,
      status: "IN_PROGRESS",
    },
  ];

  return (
    <Grid gutter={10} columns={3}>
      {data.map((item) => (
        <Grid.Col span={1}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Link href={`/issues?status=${item.status}`}>
              <Flex direction={"column"}>
                <Text size="xl" fw={700}>
                  {item.value}
                </Text>
                <Text c="dimmed">{item.label}</Text>
              </Flex>
            </Link>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
