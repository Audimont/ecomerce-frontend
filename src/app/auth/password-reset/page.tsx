"use client";

import { passwordReset } from "@/lib/actions/auth/password-reset";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const PasswordResetPage = ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  const [token, setToken] = useState(searchParams.token);

  const [state, formAction] = useFormState(passwordReset, undefined);

  useEffect(() => {
    if (token) {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [token]);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1000);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  if (!token) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    return null;
  }

  return (
    <section>
      <Toaster />
      <form
        action={formAction}
        className="h-screen flex items-center justify-center flex-col gap-5"
      >
        <h1 className="text-3xl">Nueva contraseña</h1>
        <input type="hidden" name="token" value={token} />
        <div className="w-full max-w-xs">
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Contraseña"
          />
          {state?.errors?.password?.length && (
            <div className="text-xs text-red-500 mt-2 ml-2 space-y-1">
              {state.errors.password.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="w-full max-w-xs">
          <input
            type="password"
            name="rePassword"
            className="input input-bordered w-full"
            placeholder="Confirmar contraseña"
          />
          {state?.errors?.rePassword?.length && (
            <p className="text-xs text-red-500 mt-2 ml-2">
              {state.errors.rePassword[0]}
            </p>
          )}
        </div>
        <button className="btn btn-primary w-full max-w-xs">Enviar</button>
      </form>
    </section>
  );
};

export default PasswordResetPage;
