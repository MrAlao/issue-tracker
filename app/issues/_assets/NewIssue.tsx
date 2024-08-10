"use client";

import { createIssue } from "@/app/_actions/issue.action";
import Button from "@/app/components/Button";
import FormInput from "@/app/components/FormInput";
import { Textarea } from "@mantine/core";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function NewIssue() {
  const [state, action] = useFormState(createIssue, {
    error: false,
    message: "",
  });

  useEffect(() => {
    if (state.error && state.message) {
      toast.error(state.message);
    } else if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={action} className="container">
      <h2 className="text-xl fonr-semibold mb-3">Add New</h2>
      <div className="space-y-4">
        <FormInput name="title" label="Title" error={state.errors?.title} />
        <Textarea
          name="description"
          label="Description"
          error={state.errors?.description}
          withAsterisk
        />
        <Button.Submit>Create</Button.Submit>
      </div>
    </form>
  );
}
