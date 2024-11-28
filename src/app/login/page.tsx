"use client";

import { login } from "@/lib/actions/login";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [state, formAction] = useFormState(login, undefined);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  useEffect(() => {
    if (state?.errors?.email?.length) {
      toast.error("Email inválido");
    }
  }, [state?.errors]);

  return (
    <section>
      <Toaster />
      <form
        action={formAction}
        className="h-screen flex items-center justify-center flex-col gap-5"
      >
        <h1 className="text-3xl">Login</h1>
        <input
          type="text"
          name="email"
          className="input input-bordered w-full max-w-xs"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          className="input input-bordered w-full max-w-xs"
          placeholder="Password"
        />
        <button className="btn btn-primary w-full max-w-xs">Login</button>
      </form>
    </section>
  );
}

export default Login;
