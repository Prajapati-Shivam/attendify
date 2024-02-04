"use client";
import { UserRadio } from "@/components/login_page/UserRadio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase_configs/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

type Props = {};

const LoginForm = (props: Props) => {
  /* const handleClick = async () => {
    createUserWithEmailAndPassword(
      auth,
      "yuvrajssingh@gmail.com",
      "yuvrajSingh"
    )
      .then((res) => {
        console.log(res, "res");
        
      })
      .catch((error) => console.log(error, "error"));
  }; */
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-white dark:bg-slate-800 shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 p-5 lg:p-10 rounded-md flex flex-col gap-5"
    >
      {/* <button onClick={handleClick}>Test</button> */}
      <div>
        <UserRadio />
      </div>
      <div>
        <Label htmlFor="email" className="">
          Email Address
        </Label>
        <Input type="email" name="email" id="email" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="password" className="">
          Password
        </Label>
        <Input type="password" name="password" id="password" className="mt-2" />
      </div>
      <div className="flex flex-col sm:flex-row">
        <Button className="flex-1 hover:bg-current/50">Sign up</Button>
        <span className="text-center my-2 sm:mx-2">or</span>
        <Button className="bg-black text-white hover:bg-current/90 flex-1">
          Continue with Google
        </Button>
      </div>
      <Link
        href={"/forgot-password"}
        className="text-gray-500 dark:text-gray-300"
      >
        Forgot Password?
      </Link>
      <div className="">
        {"Don't have an account? "}
        <Link href={"/register"} className="text-indigo-500">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
