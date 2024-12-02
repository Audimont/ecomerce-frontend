"use server";

import { FormState, SignupFormSchema } from "../schemas/form";

export async function signup(sate: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return { success: true, message: "Verifique su correo para confirmar" };
  } else {
    return { success: false, message: "Error al crear usuario" };
  }
}
