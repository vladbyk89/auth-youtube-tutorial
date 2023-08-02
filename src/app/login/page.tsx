"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", user);
      console.log(data);

      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log("SignUp failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processsing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none"
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none"
      >
        Login here
      </button>
      <Link href="/signUp">Visit signUp page</Link>
    </div>
  );
}
