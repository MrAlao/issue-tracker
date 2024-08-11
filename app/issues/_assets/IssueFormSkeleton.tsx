import { Flex, Skeleton } from "@mantine/core";
import React from "react";

export default function IssueFormSkeleton() {
  return (
    <div className="container">
      <Skeleton height={30} width={100} mb={15}></Skeleton>
      <Skeleton height={15} width={120} mb={3}></Skeleton>
      <Skeleton height={30} mb={15}></Skeleton>
      <Skeleton height={300} mb={15}></Skeleton>
      <Skeleton height={30} width={100}></Skeleton>
    </div>
  );
}
