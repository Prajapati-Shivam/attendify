import { UserRadio } from "@/components/UserRadio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-3xl font-bold">Create Account</h2>
      <p className="text-base font-normal text-gray-600 dark:text-gray-300 my-5">
        Get started with your free account on Attendify
      </p>
      <form className="bg-white w-[80%] md:w-[50%] lg:w-[30%] m-auto shadow-md dark:bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 p-5 lg:p-10 rounded-md flex flex-col gap-5">
        <div>
          <UserRadio />
        </div>
        <div>
          <Label htmlFor="email" className="">
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            className="mt-2 outline-none border-2 border-gray-300 bg-white dark:bg-gray-600 dark:border-gray-700 focus:bg-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="password" className="">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            className="mt-2 outline-none border-2 border-gray-300 bg-white dark:bg-gray-600 dark:border-gray-700 focus:bg-gray-100"
          />
        </div>
        <div className="flex flex-col sm:flex-row">
          <Button className="bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white flex-1">
            Sign up
          </Button>
          <span className="text-center my-2 sm:mx-2">or</span>
          <Button className="dark:bg-white dark:text-black flex-1">
            Continue with Google
          </Button>
        </div>

        <div className="">
          {"Already have an account? "}
          <Link href={"/login"} className="text-indigo-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
