"use client";

import { login } from "@/lib/actions/login";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await login(formData);

    if (response.message === "Error") {
      toast.error("Error");
    } else {
      toast.success("Success");
    }

    //Esperar a que el toast se cierre
    await new Promise((resolve) => setTimeout(resolve, 2000));
    form.reset();
  };
  return (
    <section>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="h-screen flex items-center justify-center flex-col gap-5"
      >
        <h1 className="text-3xl">Login</h1>
        <input
          type="email"
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
        <button typeof="submit" className="btn btn-primary w-full max-w-xs">
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
