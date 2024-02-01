"use client";
import LoadingButton from "@/components/ui/LoadingButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { deleteChat } from "@/server/chats";
import { Chat } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { editChatTitle } from "@/server/chats";
import useChatStore from "@/store/ChatStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetChatTitleSchema, validateSetChatTitle } from "@/schema/chat";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ChatPopover = ({
  chat
}: {
  chat: Chat;
}) => {
  const [isOpenedDelete, setIsOpenedDelete] = useState(false);
  const [isOpenedEdit, setIsOpenedEdit] = useState(false);
  const [isOpenedPopover, setIsOpenedPopover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentChat, setCurrentChat, setChatMessages } = useChatStore();

  function handleOverlayClick(event: any) {
    if (event.target?.getAttribute("class")?.includes("bg-black/80")) {
      setIsOpenedDelete(false);
    }
  }

  const form = useForm<SetChatTitleSchema>({
    resolver: zodResolver(validateSetChatTitle),
    defaultValues: {
      title: currentChat?.title || "",
    },
  });

  async function onDelete() {
    setIsLoading(true)
    await deleteChat(chat.project_id, chat.node_id, chat.id)
    if (currentChat?.id === chat.id) {
      setCurrentChat(null);
      setChatMessages(null);
    }
    setIsLoading(false)
    setIsOpenedDelete(false);
    setIsOpenedPopover(false);
  }

  async function onEdit(input: SetChatTitleSchema) {
    setIsLoading(true);
    await editChatTitle(input.title, chat.id, chat.project_id, chat.node_id);
    setIsLoading(false);
    setIsOpenedEdit(false);
    setIsOpenedPopover(false);
  }

  return (
    <Popover open={isOpenedPopover} onOpenChange={setIsOpenedPopover}>
      <PopoverTrigger>
        <MoreHorizontal className="opacity-0 group-hover:opacity-100 w-6" />
      </PopoverTrigger>
      <PopoverContent className="w-36 flex flex-col gap-1 px-2">
        <Dialog open={isOpenedEdit} onOpenChange={setIsOpenedEdit}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-2xl">Edit chat title</DialogTitle>
            <DialogDescription className="text-md">
              Here you can edit the title of your chat
            </DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onEdit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Title</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Your title..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="w-full flex flex-row justify-end">
                  <LoadingButton className="w-full" isLoading={isLoading}>
                    Save
                  </LoadingButton>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <AlertDialog open={isOpenedDelete} onOpenChange={setIsOpenedDelete}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your project.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <LoadingButton
                  onClick={() => onDelete()}
                  className="bg-red-500 hover:bg-red-800 text-foreground font-bold"
                  isLoading={isLoading}
                >
                  Delete
                </LoadingButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
};

export default ChatPopover;
