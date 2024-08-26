import React from "react";
import { Flex, Skeleton } from "@mantine/core";

export default function loading() {
  return (
    <>
      <Flex justify={"end"}>
        <Skeleton width={50} height={35} />
      </Flex>
      <div className="grid grid-cols-1 lg:grid-cols-10">
        <div className="lg:col-span-2">
          <Flex direction={{ lg: "column" }} gap={4}>
            {[40, 70, 80, 100].map((item) => (
              <Skeleton key={item} width={item} height={30} />
            ))}
          </Flex>
        </div>
        <div className="lg:col-span-8">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} height={41} mt={1}></Skeleton>
          ))}
        </div>
      </div>
    </>
  );
}
