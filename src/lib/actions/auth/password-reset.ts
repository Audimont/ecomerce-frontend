"use server";

import { FormState, PasswordResetFormSchema } from "@/lib/schemas/form";

export async function passwordReset(state: FormState, formData: FormData) {
  const validatedFields = PasswordResetFormSchema.safeParse({
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const body = {
    password: formData.get("password"),
    token: formData.get("token"),
  };

  const res = await fetch(`${process.env.API_URL}/auth/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return {
      success: true,
      message: "Contraseña restablecida",
    };
  } else if (res.status === 404) {
    return { success: false, message: "El usuario no existe" };
  } else if (res.status === 401) {
    return { success: false, message: "No verificó su usuario" };
  } else {
    return { success: false, message: "Error al enviar el email" };
  }
}
