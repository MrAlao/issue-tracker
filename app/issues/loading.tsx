import React from "react";
import IssuesSkeleton from "./_assets/IssuesSkeleton";

export default function loading() {
  return (
    <div className="grid lg:grid-cols-7 gap-4">
      <div className="hidden lg:block col-span-3">gsg</div>
      <div className="col-span-full lg:col-span-4">
        <IssuesSkeleton />
      </div>
    </div>
  );
}
