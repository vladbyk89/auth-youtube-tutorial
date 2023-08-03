"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();
  
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });
  const [oldPassword, setOldPassword] = useState("");

  const verifyUserEmail = async (urlToken: string) => {
    try {
      const { data } = await axios.post("/api/users/forgotpassword", {
        token: urlToken,
      });
      setIsVerified(true);
      setOldPassword(data.password);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleNewPAssword = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword.newPassword !== newPassword.repeatNewPassword) {
      setError("Passwords don't match");
    }

    await axios.patch("/api/users/forgotpassword", {
      newPassword: newPassword.newPassword,
      oldPassword,
    });

    router.replace("/login");
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
    verifyUserEmail(urlToken);
  }, []);

  return (
    <main>
      <h1>Change Password</h1>
      <h2>{token ? token : "no token"}</h2>
      {isVerified && (
        <div>
          <form onSubmit={handleNewPAssword}>
            <label htmlFor="newPassword">
              <input
                id="newPassword"
                type="text"
                placeholder="NEW PASSWORD"
                value={newPassword.newPassword}
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    newPassword: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="repeatNewPassword">
              <input
                id="repeatNewPassword"
                type="text"
                placeholder="REPEAT NEW PASSWORD"
                value={newPassword.repeatNewPassword}
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    repeatNewPassword: e.target.value,
                  })
                }
              />
            </label>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      )}
      {error.length > 0 && <h2>{error}</h2>}
    </main>
  );
}
