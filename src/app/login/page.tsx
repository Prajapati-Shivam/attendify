import { UserRadio } from "@/components/UserRadio";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="h-[calc(100vh-60px)] px-40 sm:px-10 flex flex-col md:flex-row items-center">
      <div className="flex-1 border-2 flex flex-col gap-10">
        <div className="text-6xl font-bold">
          <h1 className="text-black dark:text-white">Attendance</h1>
          <h2 className="text-sky-900 text-5xl dark:text-sky-200">
            For your business
          </h2>
        </div>
        <p className="text-slate-500 text-base font-normal leading-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at
          cupiditate quis eum maiores libero veritatis? Dicta facilis sint
          aliquid ipsum atque?
        </p>
      </div>
      <div className="flex-1 border-2">
        <form className="bg-white p-12 rounded flex flex-col gap-6">
          <div>
            <UserRadio />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
