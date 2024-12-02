import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Email invalido" }).trim(),
});

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "No puede estar vacío" })
      .trim(),
    email: z.string().email({ message: "Email inválido" }).trim(),
    password: z
      .string()
      .min(6, { message: "Al menos 6 caracteres" })
      .regex(/(?=.*\d)/, {
        message: "Al menos un número",
      })
      .regex(/(?=.*[a-z])/, {
        message: "Al menos una letra minúscula",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "Al menos una letra mayúscula",
      })
      .trim(),
    rePassword: z.string().trim(), 
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Las contraseñas no coinciden",
    path: ["rePassword"], 
  });

export type FormState =
  | {
      errors?: { name?: string[]; email?: string[]; password?: string[] };
      message?: string;
    }
  | undefined;
