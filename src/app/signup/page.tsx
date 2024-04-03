"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const router = useRouter();

  const signup = async () => {
    try {
      console.log("hi");
      setLoading(true);
      const resp = await axios.post("/api/users/signup", user);
      console.log(resp.data);
      router.push("/signin");
    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);
  return (
    <div className="p-5 flex flex-col mx-72">
      <div>{loading ? "Processing" : "Signup Page"}</div>
      <input
        className="p-3 text-black"
        type="text"
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <br />
      <input
        className="p-3 text-black"
        type="text"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <br />
      <input
        className="p-3 text-black"
        type="text"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />

      <button onClick={signup} className="bg-gray-700 p-2">
        {btnDisabled ? "No signup" : "Signup"}
      </button>
      <Link href={"/signin"}>Go to login page</Link>
    </div>
  );
};

export default page;
