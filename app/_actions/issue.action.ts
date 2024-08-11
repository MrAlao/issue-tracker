"use server";

import { prisma } from "@/prisma/client";
import { validation } from "../validation/helper";
import { newIssueSchema, NewIssueSchema } from "../validation/schema";
import { revalidatePath } from "next/cache";
import { cache } from "react";

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
      message: "Correct highlighted fields",
    };
  }

  try {
    const newIssue = await prisma.issue.create({
      data: result.formData,
    });

    if (newIssue.id) {
      revalidatePath("/issues");
      return { error: false, message: "Issue created", data: newIssue };
    } else {
      return { error: true, message: "Unknown error occured" };
    }
  } catch (error) {
    return { error: true, message: "Something went wrong" };
  }
}

export async function getIssues(opt?: { status?: string; issue_id?: string }) {
  let where: any = {};
  if (opt?.status) {
    where.status = opt.status;
  }
  if (opt?.issue_id) {
    where.issue_id = opt.issue_id;
  }

  try {
    const data = await prisma.issue.findMany({
      where,
    });
    return data;
  } catch (error) {
    return null;
  }
}

export const getIssue = cache(async ({ issue_id }: { issue_id: string }) => {
  try {
    const data = await prisma.issue.findFirst({
      where: { issue_id },
    });
    return data;
  } catch (error) {
    return null;
  }
});

export async function getLatestIssues() {
  try {
    const data = await prisma.issue.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return data;
  } catch (error) {
    return null;
  }
}
