"use client";

import { createIssue } from "@/app/_actions/issue.action";
import Button from "@/app/components/Button";
import FormInput from "@/app/components/FormInput";
import { Box, Modal, Text } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "@/app/context/Auth.context";

export default function NewIssue() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [description, setDescription] = useState("");
  const [state, action] = useFormState(createIssue, {
    error: false,
    message: "",
  });

  const { user } = useAuth();

  useEffect(() => {
    if (state.error && state.message) {
      toast.error(state.message);
    } else if (state.message) {
      router.push(`/issues/view?issue_id=${state.data?.issue_id}`);
      toast.success(state.message);
    }
  }, [state, router]);

  const onChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const onSubmit = (data: FormData) => {
    data.append("description", description);
    action(data);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={"xl"}
        centered
      >
        <form action={onSubmit} className="p-5">
          <h2 className="text-xl fonr-semibold mb-3">Add New</h2>
          {!user?.id && (
            <Text c={"red"}>
              Sorry, but only authenticated users can post issues.
            </Text>
          )}
          {user?.id && (
            <div className="space-y-4">
              <FormInput
                name="title"
                label="Title"
                error={state.errors?.title}
              />
              <SimpleMDE
                value={description}
                onChange={onChange}
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
          )}
        </form>
      </Modal>
      <Box className="text-right mb-4">
        <Button onClick={open} leftSection={<FaPlus />}>
          New Issue
        </Button>
      </Box>
    </>
  );
}
