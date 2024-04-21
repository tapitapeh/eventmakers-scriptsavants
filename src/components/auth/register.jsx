"use client";

export const Register = () => {
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
      <form ref={formRef} action={handleRegister}>
        <input name="name" placeholder="Full Name" />
        <input name="email" placeholder="email@domain.com" />
        <input name="password" placeholder="Password" type="password" />
        <button>Sign Up!</button>
      </form>
      {message !== "" ? <div>{message}</div> : null}
    </main>
  );
};
