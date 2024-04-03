"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const router = useRouter();

  const signin = async () => {
    try {
      console.log("hi");
      setLoading(true);
      const resp = await axios.post("/api/users/signin", user);
      console.log(resp.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("signin failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
    
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

      <button onClick={signin} className="bg-gray-700 p-2">
        {btnDisabled ? "No signin" : "Signin"}
      </button>
      <Link href={"/signup"}>Go to signup page</Link>
    </div>
  );
};

export default page;
