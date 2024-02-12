"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOutIcon, UserRoundCogIcon, LayoutDashboard } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function UserAccount() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  function handleOverlayClick(event: any) {
    if (event.target?.getAttribute("class")?.includes("bg-black/80")) {
      setIsOpen(false);
    }
  }

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
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <div className="cursor-pointer hover:bg-secondary rounded-lg p-3 inline-flex items-center gap-2">
                <UserRoundCogIcon className="h-5 w-5 text-primary" />
                Settings
              </div>
            </AlertDialogTrigger>
            <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)}>
              <AlertDialogContent className="w-full h-[90vh] max-w-[1200px]">
                <div className="overflow-y-auto">
                  <UserProfile
                    appearance={{
                      elements: {
                        rootBox: "w-full max-w-[1200px] flex justify-center",
                        card: "w-full bg-background rounded-none",
                      },
                      variables: {
                        colorText: theme === "dark" ? "#FFFFFF" : "#000000",
                      },
                    }}
                    routing="hash"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
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
}
