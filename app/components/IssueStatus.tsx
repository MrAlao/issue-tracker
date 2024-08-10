import { Status } from "@prisma/client";
import classNames from "classnames";
import React from "react";

export const ISSUE_STATUS = {
  OPEN: {
    label: "OPEN",
    style: "bg-red-200 text-red-700",
  },
  IN_PROGRESS: { label: "IN PROGRESS", style: "bg-blue-200 text-blue-700" },
  CLOSED: { label: "CLOSED", style: "bg-amber-200 text-amber-700" },
};

export default function IssueStatus({ status }: { status: Status }) {
  const status_data = ISSUE_STATUS[status];

  return (
    <span
      className={classNames({
        [`p-2 rounded-md ${status_data.style}`]: true,
      })}
    >
      {status_data.label}
    </span>
  );
}
