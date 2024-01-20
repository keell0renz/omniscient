"use client"
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { LogOutIcon, UserRoundCogIcon, NetworkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";

const UserAccount = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme } = useTheme();

  const userMail = user?.primaryEmailAddress?.emailAddress || "";

  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "🚀 In development!",
      description:
        "This functionality is currently in development, check out later. 😊",
      className: "bg-blue-600",
    });
  };

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
            onClick={() => handleClick()}
            href="#"
          >
            <NetworkIcon className="h-5 w-5 text-primary" />
            My Projects
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="cursor-pointer hover:bg-secondary rounded-lg p-3 inline-flex items-center gap-2">
                <UserRoundCogIcon className="h-5 w-5 text-primary" />
                Settings
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full h-[90vh] max-w-[1200px]">
              <div className="overflow-y-auto">
                <UserProfile
                  appearance={{
                    elements: {
                      rootBox: "w-full max-w-[1200px] flex justify-center",
                      card: "w-full bg-background rounded-none",
                    },
                    variables: {
                      colorText: theme === 'dark' ? '#FFFFFF' : '#000000',
                    },
                  }}
                  routing="hash"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
