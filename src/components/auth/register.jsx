"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
export const Register = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleRegister(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("https://eventmakers.devscale.id/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.status === 201) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
      formRef.current.reset();

      router.push("/login");
    }

    if (res.status === 405 || res.status === 500) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }

    const jsonRes = await res.json();
    setMessage(jsonRes.message);
    formRef.current.reset();
  }

  return (
    <main>
      <div className="flex justify-between items-center mt-5 mb-5">
        <h2 className="text-2xl font-bold">Register</h2>
      </div>
      <form ref={formRef} action={handleRegister}>
        <div className="space-y-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Full name</span>
            </div>
            <input
              name="name"
              type="text"
              placeholder="Input your full name"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              name="email"
              type="email"
              placeholder="Input your email"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </div>
      </form>
      {message !== "" ? <div>{message}</div> : null}
    </main>
  );
};
