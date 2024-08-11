"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Flex, Box, Text, Card } from "@mantine/core";
import { useFormState } from "react-dom";
import { postUpdate } from "@/app/_actions/issue.action";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Button from "@/app/components/Button";

interface Props {
  issue: Issue;
}

export default function PostIssueUpdate({ issue }: Props) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [description, setDescription] = useState("");
  const [state, action] = useFormState(postUpdate, {
    error: false,
    message: "",
  });

  useEffect(() => {
    if (state.error && state.message) {
      toast.error(state.message);
    } else if (state.message) {
      toast.success(state.message);
      router.refresh();
    }
  }, [state]);

  const onChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const onSubmit = (data: FormData) => {
    data.append("issue_id", issue.id.toString());
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
        <form action={onSubmit}>
          <Box p={20}>
            <h2 className="text-xl fonr-semibold mb-5">Post Update</h2>
            <SimpleMdeReact
              value={description}
              onChange={onChange}
              placeholder="Your post..."
              options={{
                maxHeight: "200px",
              }}
            />
            {state.errors?.description && (
              <Text c={"red"}>{state.errors.description}</Text>
            )}
            <Button.Submit>Post</Button.Submit>
          </Box>
        </form>
      </Modal>

      <Card
        onClick={open}
        withBorder
        p={30}
        shadow="md"
        color="green"
        role="button"
        className="!bg-blue-100 !text-blue-800"
      >
        <Flex gap={5}>Got an update?</Flex>
        <Text c="blue" mt={10}>
          Click here to post updates related to this issue.
        </Text>
        {issue.status === "CLOSED" && (
          <Text c="dimmed" mt={10}>
            Note that posting an update will re-open this issue.
          </Text>
        )}
      </Card>
    </>
  );
}
