"use server";

import { FormState, PasswordResetRequestFormSchema } from "@/lib/schemas/form";

export async function passwordResetRequest(
  state: FormState,
  formData: FormData
) {
  const validatedFields = PasswordResetRequestFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(
    `${process.env.API_URL}/email/password-reset-request`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  if (res.ok) {
    return {
      success: true,
      message: "Verifique su correo",
    };
  } else if (res.status === 404) {
    return { success: false, message: "El usuario no existe" };
  } else if (res.status === 401) {
    return { success: false, message: "No verificó su usuario" };
  } else {
    return { success: false, message: "Error al enviar el email" };
  }
}
