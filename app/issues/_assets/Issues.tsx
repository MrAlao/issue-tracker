"use client";

import IssueStatus from "@/app/components/IssueStatus";
import { Badge, Flex, Table } from "@mantine/core";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import React from "react";
import IssuesSkeleton from "./IssuesSkeleton";

interface Data {
  label: string;
  status: Status;
}

export default function Issues({ issues }: { issues: Issue[] | null }) {
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
    <>
      <Flex mb={10} gap={10}>
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
      <div className="container p-0">
        <Table
          horizontalSpacing={"md"}
          striped
          highlightOnHover
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date created</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {issues?.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={3} align="center" height={250}>
                  No records found
                </Table.Td>
              </Table.Tr>
            )}
            {issues?.map((item) => {
              return (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.title}</Table.Td>
                  <Table.Td>
                    <IssueStatus status={item.status} />
                  </Table.Td>
                  <Table.Td>{item.createdAt.toLocaleDateString()}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}
