"use client";
import React from "react";

export const register = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");

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
      <section>
        <h1>Sign Up</h1>
        <p>Sign Up For Have Acces!</p>
      </section>
      <form ref={formRef}>
        <input name="Name" placeholder="Full Name" />
        <input name="Email" placeholder="email@domain.com" />
        <input name="Password" placeholder="Password" type="password" />
        <button>Sign Up!</button>
      </form>
      {message !== "" ? <div>{message}</div> : null}
    </main>
  );
};
