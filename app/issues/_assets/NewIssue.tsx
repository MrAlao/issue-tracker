"use client";

import { createIssue } from "@/app/_actions/issue.action";
import Button from "@/app/components/Button";
import FormInput from "@/app/components/FormInput";
import { Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

export default function NewIssue() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [state, action] = useFormState(createIssue, {
    error: false,
    message: "",
  });

  useEffect(() => {
    if (state.error && state.message) {
      toast.error(state.message);
    } else if (state.message) {
      router.push(`/issues/view?issue_id=${state.data?.issue_id}`);
      toast.success(state.message);
    }
  }, [state]);

  const onSubmit = (data: FormData) => {
    data.append("description", description);
    action(data);
  };

  return (
    <>
      <form action={onSubmit} className="container">
        <h2 className="text-xl fonr-semibold mb-3">Add New</h2>
        <div className="space-y-4">
          <FormInput name="title" label="Title" error={state.errors?.title} />
          {/* <Textarea
          name="description"
          label="Description"
          error={state.errors?.description}
          rows={4}
          withAsterisk
        /> */}
          <SimpleMDE
            value={description}
            onChange={setDescription}
            placeholder="Issue description..."
            options={{
              maxHeight: "200px",
            }}
          />
          {state.errors?.description && (
            <Text c={"red"}>{state.errors.description}</Text>
          )}
          <Button.Submit>Create</Button.Submit>
        </div>
      </form>
    </>
  );
}
