import Image from 'next/image';

type Props = {
  title: string;
  description?: string;
}

const Loader = ({title, description}: Props) => {
  return (
    <div className='flex items-center px-8 py-4 gap-5 shadow-[1px_0px_20px_10px_#00000024] rounded-md bg-current/90'>
        <Image src="/loading.gif" alt="loading" width={50} height={50} />
        <div>
          <h3 className='font-bold text-xl'>{title}</h3>
          <p className='text-gray-500'>{description}</p>
        </div>
    </div>
  )
}

export default Loader