import { Flex, Skeleton } from "@mantine/core";
import React from "react";

export default function IssuesSkeleton() {
  return (
    <>
      <Flex gap={4}>
        <Skeleton height={30} width={40} mb={3}></Skeleton>
        <Skeleton height={30} width={60} mb={3}></Skeleton>
        <Skeleton height={30} width={80} mb={3}></Skeleton>
        <Skeleton height={30} width={100} mb={3}></Skeleton>
      </Flex>
      <div className="container p-0">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} height={41} mt={1}></Skeleton>
        ))}
      </div>
    </>
  );
}
