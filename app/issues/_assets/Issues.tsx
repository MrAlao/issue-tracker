"use client";

import IssueStatus from "@/app/components/IssueStatus";
import { Table } from "@mantine/core";
import { Issue } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default function Issues({ issues }: { issues: Issue[] | null }) {
  return (
    <>
      <Table horizontalSpacing={"md"} striped highlightOnHover withTableBorder>
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
                <Table.Td>
                  <Link href={`/issues/view?issue_id=${item.issue_id}`}>
                    {item.title}
                  </Link>
                </Table.Td>
                <Table.Td>
                  <IssueStatus status={item.status} />
                </Table.Td>
                <Table.Td>{item.createdAt.toLocaleDateString()}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </>
  );
}
