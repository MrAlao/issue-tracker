"use client";

import { createIssue } from "@/app/_actions/issue.action";
import FormInput from "@/app/components/FormInput";
import { Button, Textarea } from "@mantine/core";
import React from "react";
import { useFormState } from "react-dom";

export default function NewIssue() {
  const [state, action] = useFormState(createIssue, {
    error: false,
    message: "",
  });

  return (
    <form action={action} className="container">
      <h2 className="text-xl fonr-semibold mb-3">Add New</h2>
      <div className="space-y-4">
        <FormInput name="title" label="Title" />
        <Textarea name="description" label="Description" required />
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
