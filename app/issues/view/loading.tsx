import { Box, Flex, Skeleton } from "@mantine/core";
import React from "react";

export default function loading() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Box className="lg:col-span-2">
          <Skeleton height={30} mb={3} />
          <Skeleton height={30} width={"50%"} />
          <Flex className="space-x-3" my="2">
            <Skeleton height={30} width={40} />
            <Skeleton height={30} width={80} />
          </Flex>
        </Box>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Box className="lg:col-span-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height={150} mt={15} />
          ))}
        </Box>
        <Box mt={15} className="space-y-4">
          <Skeleton height={150} />
          <Skeleton height={150} />
        </Box>
      </div>
    </>
  );
}
