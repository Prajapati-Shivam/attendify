import Link from 'next/link';

import { UserRadio } from '@/components/login/UserRadio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterPage = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold">Create Account</h2>
      <p className="my-5 text-base font-normal text-gray-600 dark:text-gray-300">
        Get started with your free account on Attendify
      </p>
      <form className="m-auto flex w-[80%] flex-col gap-5 rounded-md bg-white bg-opacity-50 bg-clip-padding p-5 shadow-md backdrop-blur-lg dark:bg-slate-800 md:w-[50%] lg:w-[30%] lg:p-10">
        <div>
          <UserRadio />
        </div>
        <div>
          <Label htmlFor="email" className="">
            Email Address
          </Label>
          <Input type="email" name="email" id="email" className="mt-2 " />
        </div>
        <div>
          <Label htmlFor="password" className="">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            className="mt-2 "
          />
        </div>
        <div className="flex flex-col sm:flex-row">
          <Button className="hover:bg-current/50 flex-1">Sign up</Button>
          <span className="my-2 text-center sm:mx-2">or</span>
          <Button className="hover:bg-current/90 flex-1 bg-black text-white">
            Continue with Google
          </Button>
        </div>

        <div className="">
          {'Already have an account? '}
          <Link href={'/login'} className="text-indigo-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
