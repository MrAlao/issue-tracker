import React from "react";
import { Status } from "@prisma/client";
import classNames from "classnames";
import { FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import { RiProgress6Line } from "react-icons/ri";
import { Badge } from "@mantine/core";

export const ISSUE_STATUS = {
  OPEN: {
    label: "OPEN",
    style: "bg-red-200 text-red-700",
    color: "red",
    icon: <FaDoorOpen />,
  },
  IN_PROGRESS: {
    label: "IN PROGRESS",
    style: "bg-blue-200 text-blue-700",
    color: "blue",
    icon: <RiProgress6Line />,
  },
  CLOSED: {
    label: "CLOSED",
    style: "bg-amber-200 text-amber-700",
    color: "green",
    icon: <FaDoorClosed />,
  },
};

export default function IssueStatus({ status }: { status: Status }) {
  const data = ISSUE_STATUS[status];

  return (
    <Badge
      color={data.color}
      size="md"
      className="!py-3"
      // className={classNames({
      //   [`px-2 py-1 rounded-md ${data.style}`]: true,
      // })}
    >
      <span className="inline-flex items-center gap-2">
        {data.icon}
        {data.label}
      </span>
    </Badge>
  );
}
