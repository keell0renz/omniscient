import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { LogOutIcon, UserRoundCogIcon, NetworkIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserAccount = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const userMail = user?.primaryEmailAddress?.emailAddress || "";

  if (!user) return;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback delayMs={600}>{user.firstName![0]}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] bg-background bg-opacity-80 backdrop-blur-md border-none rounded-md focus-visible:outline-none"
        sideOffset={8}
        align="end"
      >
        <div className="flex flex-row flex-nowrap items-center justify-start gap-4 mb-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback delayMs={600}>{user.firstName![0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-nowrap justify-start gap-2">
            <h3 className="text-xl">{user.fullName}</h3>
            <p className="text-xs text-foreground/80 ml-0.5">{userMail}</p>
          </div>
        </div>
        <div className="flex flex-col rounded-md">
          <Link
            className="hover:bg-secondary rounded-lg p-3 inline-flex items-center gap-2"
            href="/projects"
          >
            <NetworkIcon className="h-5 w-5 text-primary" />
            My Projects
          </Link>
          <Link
            className="hover:bg-secondary rounded-lg p-3 inline-flex items-center gap-2"
            href="/user-profile"
          >
            <UserRoundCogIcon className="h-5 w-5 text-primary" />
            Settings
          </Link>
          <p
            className="hover:bg-secondary rounded-lg p-3 cursor-pointer inline-flex items-center gap-2"
            onClick={() => signOut()}
          >
            <LogOutIcon className="h-5 w-5 text-primary" />
            Log Out
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAccount;
