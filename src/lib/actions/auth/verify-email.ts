"use server";

export default async function verifyEmail(token: string) {
  await fetch(`${process.env.API_URL}/email/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
}
