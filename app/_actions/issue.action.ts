"use server";

import { prisma } from "@/prisma/client";
import { validation } from "../validation/helper";
import { newIssueSchema, NewIssueSchema } from "../validation/schema";

export async function createIssue(prevState: unknown, formData: FormData) {
  //await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = await validation<NewIssueSchema>(
    newIssueSchema,
    Object.fromEntries(formData)
  );

  if (result.status !== "success") {
    return {
      error: true,
      errors: result.errors,
    };
  }

  try {
    const newIssue = await prisma.issue.create({
      data: result.formData,
    });

    if (newIssue.id) {
      return { error: false, message: "Issue created", data: newIssue };
    } else {
      return { error: true, message: "Unknown error occured" };
    }
  } catch (error) {
    return { error: true, message: "Something went wrong" };
  }
}
