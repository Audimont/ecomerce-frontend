"use server";

import { FormState, LoginFormSchema } from "../schemas/form";
import { getAuthCookies } from "./auth-cookies";
import { cookies } from "next/headers";

export async function login(sate: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (res.ok) {
    const cookie = getAuthCookies(res);
    if (cookie?.refreshToken) {
      cookies().set(cookie.refreshToken);
    }
    if (cookie?.accessToken) {
      cookies().set(cookie.accessToken);
    }
    
    return { success: true, message: "Bienvenido" };
  } else {
    return { success: false, message: "Contraseña o email invalido" };
  }
}
