'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  // const selectedComponent = useComponentStore((state) => state.component);
  return router.push('/dashboard');
  // return (
  //   <div className="h-[calc(100vh-60px)]">

  //   </div>
  // );
}
