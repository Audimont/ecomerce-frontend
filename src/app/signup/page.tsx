"use client";

import { signup } from "@/lib/actions/signup";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [state, formAction] = useFormState(signup, undefined);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
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
      >
        <h1 className="text-3xl">Registrarse</h1>
        <div className="w-full max-w-xs">
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Nombre"
          />
          {state?.errors?.name?.length && (
            <p className="text-xs text-red-500 mt-2 ml-2">
              {state.errors.name[0]}
            </p>
          )}
        </div>
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
        <div className="w-full max-w-xs">
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Contraseña"
          />
          {state?.errors?.password?.length && (
            <div className="text-xs text-red-500 mt-2 ml-2 space-y-1">
              {state.errors.password.map((error, index) => (
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
        <button className="btn btn-primary w-full max-w-xs">Registrarse</button>
      </form>
    </section>
  );
}

export default Signup;
