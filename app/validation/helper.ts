import { z } from "zod";

export const validation = async <T = any>(
  validationSchema: z.Schema,
  formData: unknown
) => {
  //if (!validationSchema) return

  const { error, success, data } = await validationSchema.safeParseAsync(
    formData
  );

  if (success) {
    return { status: "success", formData: data as T };
  }

  let errors: any = {};

  error.errors.forEach(
    (detail: { path: (string | number)[]; message: string }) => {
      errors[detail.path[0]] = detail.message.toString();
    }
  );

  return { status: "error", errors: errors as T, formData: data as T };
};
