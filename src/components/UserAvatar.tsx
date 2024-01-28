import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/.png" alt="@shadcn" />
      <AvatarFallback>
        <Image src={"/noavatar.png"} fill alt="noavatar" />
      </AvatarFallback>
    </Avatar>
  );
}
