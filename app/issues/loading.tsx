import React from "react";
import IssuesSkeleton from "./_assets/IssuesSkeleton";
import IssueFormSkeleton from "./_assets/IssueFormSkeleton";

export default function loading() {
  return (
    <div className="grid lg:grid-cols-7 gap-4">
      <div className="hidden lg:block col-span-3">
        <IssueFormSkeleton />
      </div>
      <div className="col-span-full lg:col-span-4">
        <IssuesSkeleton />
      </div>
    </div>
  );
}
