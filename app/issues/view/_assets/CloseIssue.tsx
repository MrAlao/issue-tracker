"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Flex, Box, Text, Card } from "@mantine/core";
import { FcDeleteDatabase } from "react-icons/fc";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Button from "@/app/components/Button";
import { useFormState } from "react-dom";
import { closeIssue } from "@/app/_actions/issue.action";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";
import { useAuth } from "@/app/context/Auth.context";

interface Props {
  issue: Issue;
}

export default function CloseIssue({ issue }: Props) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [state, action] = useFormState(closeIssue, undefined);
  const { user } = useAuth();

  useEffect(() => {
    if (state?.error && state.message) {
      toast.error(state.message);
    } else if (state?.message) {
      toast.success(state.message);
      router.refresh();
    }
  }, [state, router]);

  if (!user?.id) {
    return (
      <Card withBorder p={30} shadow="md" bg={"dimmed"}>
        <Text size="xl">Close Issue?</Text>
        <Text c="white" mt={10}>
          Note: This action is only available to authenticated users.
        </Text>
      </Card>
    );
  }

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Box p={40} mb={20}>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <FcDeleteDatabase size={48} />
            <Text>Are you sure you want to close this issue?</Text>
          </Flex>
          <form action={() => action({ issue_id: issue.id })}>
            <Flex justify={"center"} mt={20}>
              <Button.Submit
                leftSection={<IoCheckmarkCircleSharp />}
                color="green"
              >
                Continue
              </Button.Submit>
            </Flex>
          </form>
        </Box>
      </Modal>

      <Card
        onClick={open}
        withBorder
        p={30}
        shadow="md"
        color="green"
        role="button"
        className="!bg-green-100 !text-green-800"
      >
        <Text size="xl">Close Issue?</Text>
        <Text c="green" mt={10}>
          Note: This action will change the issue status to &apos;CLOSED&apos;
          instead of deleting it permanently.
        </Text>
      </Card>
    </>
  );
}
