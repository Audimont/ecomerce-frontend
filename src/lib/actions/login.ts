"use server";

export async function login(formData: FormData): Promise<{ message: string }> {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!res.ok) {
    return { message: "Error" };
  }

  return { message: "Success" };
}
