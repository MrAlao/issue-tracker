"use client";

import { Table } from "@mantine/core";
import { Issue } from "@prisma/client";
import React from "react";

export default function Issues({ issues }: { issues: Issue[] | null }) {
  return (
    <Table verticalSpacing={"md"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Date created</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {issues?.map((item) => {
          return (
            <Table.Tr key={item.id}>
              <Table.Td>{item.title}</Table.Td>
              <Table.Td>{item.status}</Table.Td>
              <Table.Td>{item.createdAt.toLocaleDateString()}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
