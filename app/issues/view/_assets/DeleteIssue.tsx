"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Flex, Box } from "@mantine/core";
import { FcDeleteDatabase } from "react-icons/fc";
import Button from "@/app/components/Button";

interface Props {
  issue_id: number;
}

export default function DeleteIssue({ issue_id }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Box p={40} mb={20}>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <FcDeleteDatabase size={48} />
            Are you sure you want to delete this issue?
          </Flex>
        </Box>
        <Button.Submit leftSection={<FcDeleteDatabase />} color="red">
          Yes
        </Button.Submit>
      </Modal>

      <Button onClick={open}>Delete Issue</Button>
    </>
  );
}
