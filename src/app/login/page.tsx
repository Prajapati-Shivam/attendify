import LoginForm from "@/components/LoginForm";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="h-[calc(100vh-60px)] flex flex-col p-8 md:p-12 lg:p-20 md:flex-row justify-between items-center gap-y-5">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-100"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="flex-1 flex flex-col gap-10 pr-0 sm:pr-5">
        <div className="text-4xl sm:text-6xl font-bold">
          <h1 className="text-black dark:text-white">Attendance</h1>
          <h2 className="text-sky-900 text-3xl sm:text-5xl dark:text-sky-200">
            For your business
          </h2>
        </div>
        <p className="text-slate-500 dark:text-gray-300 text-base font-normal leading-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at
          cupiditate quis eum maiores libero veritatis? Dicta facilis sint
          aliquid ipsum atque?
        </p>
      </div>

      {/* Form container gray-800 */}
      <div className="flex-1 w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
