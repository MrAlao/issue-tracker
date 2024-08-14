"use server";

import { prisma } from "@/prisma/client";
import { validation } from "../validation/helper";
import {
  IssueUpdateSchema,
  issueUpdateSchema,
  newIssueSchema,
  NewIssueSchema,
} from "../validation/schema";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { validateSession } from "../lucia-auth/get-auth";

export async function createIssue(prevState: unknown, formData: FormData) {
  const { user } = await validateSession();

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
      data: {
        title: result.formData.title,
        data: { create: { description: result.formData.description } },
      },
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

export async function postUpdate(prevState: unknown, formData: FormData) {
  const { user } = await validateSession();

  const result = await validation<IssueUpdateSchema>(
    issueUpdateSchema,
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
    const newUpdate = await prisma.issueUpdate.create({
      data: result.formData,
    });

    if (newUpdate.id) {
      revalidatePath("/issues");
      return { error: false, message: "Issue update posted", data: newUpdate };
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
      //include: { data: true },
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
      include: { data: { orderBy: { createdAt: "desc" } } },
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

export async function closeIssue(
  prevState: unknown,
  { issue_id }: { issue_id: number }
) {
  const { user } = await validateSession();

  try {
    const res = await prisma.issue.update({
      where: { id: issue_id },
      data: {
        status: "CLOSED",
      },
    });

    if (res.id) {
      return {
        error: false,
        message: "Issue status changed",
      };
    }
    return {
      error: true,
      message: "Sorry, but you can't change the issue status at the moment",
    };
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong",
    };
  }
}
