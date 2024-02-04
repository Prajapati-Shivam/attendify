'use client';

import Link from 'next/link';

import { UserRadio } from '@/components/login_page/UserRadio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
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
      onSubmit={e => e.preventDefault()}
      className="flex flex-col gap-5 rounded-md bg-white bg-opacity-50 bg-clip-padding p-5 shadow-md backdrop-blur-lg dark:bg-slate-800 lg:p-10"
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
        <Button className="hover:bg-current/50 flex-1">Sign up</Button>
        <span className="my-2 text-center sm:mx-2">or</span>
        <Button className="hover:bg-current/90 flex-1 bg-black text-white">
          Continue with Google
        </Button>
      </div>
      <Link
        href={'/forgot-password'}
        className="text-gray-500 dark:text-gray-300"
      >
        Forgot Password?
      </Link>
      <div className="">
        {"Don't have an account? "}
        <Link href={'/register'} className="text-indigo-500">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
