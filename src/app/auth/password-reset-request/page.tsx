"use client";

import { passwordResetRequest } from "@/lib/actions/auth/password-reset-request";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const PasswordResetRequestPage = () => {
  const [state, formAction] = useFormState(passwordResetRequest, undefined);

  const formRef = useRef(null);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <section>
      <Toaster />
      <form
        action={formAction}
        className="h-screen flex items-center justify-center flex-col gap-5"
        ref={formRef}
      >
        <h1 className="text-3xl">Restablecer contraseña</h1>
        <div className="w-full max-w-xs">
          <input
            type="text"
            name="email"
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {state?.errors?.email?.length && (
            <p className="text-xs text-red-500 mt-2 ml-2">
              {state.errors.email[0]}
            </p>
          )}
        </div>
        <button className="btn btn-primary w-full max-w-xs">Enviar</button>
      </form>
    </section>
  );
};

export default PasswordResetRequestPage;
