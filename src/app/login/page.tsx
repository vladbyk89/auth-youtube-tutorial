"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotpassword, setForgotpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", user);

      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log("SignUp failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendForgotPasswordEmail = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("/api/users/forgotpasswordemail", {
      email,
    });
    if (!data.ok) {
      setEmailError(true);
    } else {
      setEmailSent(true);
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
        disabled={buttonDisabled}
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none"
      >
        Login here
      </button>
      <Link href="/signUp">Visit signUp page</Link>
      <button onClick={() => setForgotpassword(true)}>forgot password?</button>
      {forgotpassword && (
        <form onSubmit={sendForgotPasswordEmail}>
          <label htmlFor="email">Email: </label>{" "}
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none"
          />
          <button type="submit">Send...</button>
          <br />
          {emailError && <h6>Email does not exist in system</h6>}
          {emailSent && <h6>Check your email!</h6>}
        </form>
      )}
    </div>
  );
}
