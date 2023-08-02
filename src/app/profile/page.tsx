"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
}

const initUser: UserType = {
  _id: "0",
  username: "johnDoe",
  email: "john@gmail.com",
  password: "1234567890",
};

export default function Profile() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");

      router.replace("/");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const [data, setData] = useState<UserType>(initUser);

  const getUserDetails = async () => {
    const { data } = await axios.get("/api/users/me");
    setData(data.user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <main>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>
        {data._id === "0" ? (
          "Empty"
        ) : (
          <Link href={`/profile/${data.username}`}>{data.username}</Link>
        )}
      </h2>
    </main>
  );
}
