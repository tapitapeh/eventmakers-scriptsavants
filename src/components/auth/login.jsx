"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
export const Login = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("https://eventmakers.devscale.id/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
      formRef.current.reset();

      console.log("🚀 ~ handleLogin ~ jsonRes:", jsonRes);
      Cookies.set("token", jsonRes.token);
      localStorage.setItem("userData", JSON.stringify(jsonRes.payload));

      // router.push("/my-events");
      window.location.href = "/my-events";
    }

    if (res.status === 401 || res.status === 404) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }

    // const jsonRes = await res.json();
    // setMessage(jsonRes.message);
    // formRef.current.reset();
  }

  return (
    <main>
      <div className="flex justify-between items-center mt-5 mb-5">
        <h2 className="text-2xl font-bold">Login</h2>
      </div>
      <form ref={formRef} action={handleLogin}>
        <div className="space-y-5">
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
            Login
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-3">
        {message !== "" ? (
          <div className="bg-red-500 text-white p-5 text-center  rounded text-sm">
            {message}
          </div>
        ) : null}
      </div>
    </main>
  );
};
