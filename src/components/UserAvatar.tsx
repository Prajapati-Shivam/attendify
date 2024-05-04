import { Avatar, AvatarImage } from '@/components/ui/avatar';

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src={'/noavatar.png'} alt="noavatar" />
      {/* <AvatarFallback>
        <Image src={'/noavatar.png'} alt="noavatar" />
      </AvatarFallback> */}
    </Avatar>
  );
}
