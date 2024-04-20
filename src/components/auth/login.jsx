import React from "react";

export const login = () => {
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
    </main>
  );
};
