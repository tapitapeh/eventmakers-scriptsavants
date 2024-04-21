"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      setUser({});
      setLoggedIn(false);
    } else {
      setUser(userData);
      setLoggedIn(true);
    }
  }, []);

  function logout() {
    setUser({});
    setLoggedIn(false);
    localStorage.clear();

    router.push("/login");
  }
  return (
    <div className="navbar fixed z-50 bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Cari Acara
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        {!loggedIn ? (
          <div>
            <Link href="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="bg-neutral text-neutral-content rounded-full w-24">
                <span className="text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/my-events" className="justify-between font-bold">
                  My Events
                </Link>
              </li>
              {/* <li>
                <a className="justify-between">Profile</a>
              </li> */}
              <li>
                <a className="justify-between" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
