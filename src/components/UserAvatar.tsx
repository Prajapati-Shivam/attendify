import { AvatarFallback } from '@radix-ui/react-avatar';
import Image from 'next/image';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

export function UserAvatar(props: { user: string }) {
  const imageUrl = `/${props.user}.png`;
  return (
    <Avatar className="ring-2 ring-black dark:ring-white">
      <AvatarImage
        src={imageUrl}
        className="invert-0 dark:invert"
        alt={props.user}
      />
      <AvatarFallback>
        <Image src={'/noavatar.png'} alt="noavatar" width={100} height={100} />
      </AvatarFallback>
    </Avatar>
  );
}
