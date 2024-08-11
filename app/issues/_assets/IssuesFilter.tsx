import IssueStatus from "@/app/components/IssueStatus";
import { Badge, Flex } from "@mantine/core";
import { Status } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Data {
  label: string;
  status: Status;
}

export default function IssuesFilter() {
  const data: Data[] = [
    {
      label: "Open issues",
      status: "OPEN",
    },
    {
      label: "Closed issues",
      status: "CLOSED",
    },
    {
      label: "Issues in progress",
      status: "IN_PROGRESS",
    },
  ];
  return (
    <Flex className="lg:flex-col" mb={10} gap={10}>
      <Link href={`/issues`}>
        <Badge color={"grape"} size="md" className="!py-3">
          <span className="inline-flex items-center gap-2">All</span>
        </Badge>
      </Link>
      {data.map((item) => (
        <Link key={item.status} href={`/issues?status=${item.status}`}>
          <IssueStatus status={item.status} />
        </Link>
      ))}
    </Flex>
  );
}
