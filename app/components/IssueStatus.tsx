import React from "react";
import { Status } from "@prisma/client";
import classNames from "classnames";
import { FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import { RiProgress6Line } from "react-icons/ri";

export const ISSUE_STATUS = {
  OPEN: {
    label: "OPEN",
    style: "bg-red-200 text-red-700",
    icon: <FaDoorOpen />,
  },
  IN_PROGRESS: {
    label: "IN PROGRESS",
    style: "bg-blue-200 text-blue-700",
    icon: <RiProgress6Line />,
  },
  CLOSED: {
    label: "CLOSED",
    style: "bg-amber-200 text-amber-700",
    icon: <FaDoorClosed />,
  },
};

export default function IssueStatus({ status }: { status: Status }) {
  const data = ISSUE_STATUS[status];

  return (
    <span
      className={classNames({
        [`inline-flex items-center  gap-2 px-2 py-1 rounded-md ${data.style}`]:
          true,
      })}
    >
      {data.icon}
      {data.label}
    </span>
  );
}
