"use client";

import React from "react";
import "@mantine/charts/styles.css";
import { Card } from "@mantine/core";
import { BarChart } from "@mantine/charts";

interface Props {
  open: number;
  closed: number;
  in_progress: number;
}

export default function IssueChart({ open, closed, in_progress }: Props) {
  const data = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "Closed",
      value: closed,
    },
    {
      label: "In progress",
      value: in_progress,
    },
  ];

  return (
    <Card shadow="sm" padding="lg" radius="md" className="!ps-0" withBorder>
      <BarChart
        h={300}
        data={data}
        dataKey="label"
        series={[
          { name: "value", color: "violet.6" },
          //   { name: "Closed", color: "blue.6" },
          //   { name: "In Progress", color: "teal.6" },
        ]}
        tickLine="y"
        color="yellow"
      />
    </Card>
  );
}
