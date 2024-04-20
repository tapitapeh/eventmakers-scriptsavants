import React from "react";

export const login = () => {
    "use client";
import React from "react";

export const register = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");

  async function handleRegister(formData) {
    
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("https://eventmakers.devscale.id/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, password }),
    });

    if (res.status === 200) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
      formRef.current.reset();
    }

    if (res.status === 401 || res.status === 404) {
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
        <h1>Login</h1>
        <p>Hello!! Welcome Back!</p>
      </section>
      <form>
        <input name="Email" placeholder="Email" />
        <input name="Password" placeholder="Password" type="password" />
        <button>Login!</button>
      </form>
            {message !== "" ? <div>{message}</div> : null}
    </main>
  );
}; 
