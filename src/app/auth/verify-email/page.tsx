"use client";

import verifyEmail from "@/lib/actions/auth/verify-email";
import { useEffect, useState } from "react";

const EmailVerifyPage = ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  const [token, setToken] = useState(searchParams.token);

  useEffect(() => {
    const verify = async () => {
      if (token) {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        url.searchParams.delete("token");
        window.history.replaceState({}, document.title, url.toString());

        await verifyEmail(token);
      }
    };

    verify();
  }, [token]);

   /* if (!token) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    return null;
  } */

  return (
    <section className="h-screen flex items-center justify-center flex-col">
      <p className="text-xl">
        Tu email ha sido verificado correctamente. Puedes cerrar esta ventana.
      </p>
    </section>
  );
};

export default EmailVerifyPage;
