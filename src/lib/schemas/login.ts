import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Email invalido" }).trim(),
});

export type FormState =
  | { errors?: { email?: string[]; password?: string[] }; message?: string }
  | undefined;
