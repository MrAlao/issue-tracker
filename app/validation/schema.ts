import { z } from "zod";

export const newIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "cannot be empty" })
    .max(255, { message: "cannot be more that 255 chars" }),
  description: z.string().min(1, { message: "cannot be empty" }),
});

export type NewIssueSchema = z.infer<typeof newIssueSchema>;

export const issueUpdateSchema = z.object({
  issue_id: z.coerce.number(),
  description: z.string().min(1, { message: "cannot be empty" }),
});

export type IssueUpdateSchema = z.infer<typeof issueUpdateSchema>;
