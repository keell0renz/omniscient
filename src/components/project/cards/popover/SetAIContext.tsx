"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";
import { useForm } from "react-hook-form";
import { SetAIContextSchema, validateSetAIContext } from "@/schema/project";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { setAIContextForProject } from "@/server/project";
import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useContext } from "react";
import { PopoverContext } from "@/components/project/cards/popover/context/PopoverContext";

function SetAIContextForm({
  setIsOpenedDialog,
}: {
  setIsOpenedDialog: (open: boolean) => void;
}) {
  const { project, setOpenPopover } = useContext(PopoverContext);
  const form = useForm<SetAIContextSchema>({
    resolver: zodResolver(validateSetAIContext),
    defaultValues: {
      ai_context: project.ai_context ? project.ai_context : "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onEdit(input: SetAIContextSchema) {
    setIsLoading(true);
    await setAIContextForProject(input, project.id);
    setIsLoading(false);
    setIsOpenedDialog(false);
    setOpenPopover?.(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onEdit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ai_context"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                AI Context
              </FormLabel>
              <FormControl>
                <Textarea
                  className="w-full h-64 resize-none"
                  placeholder="Instructions and context for AI..."
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
  );
}

export default function SetAIContext() {
  const [openDialog, setIsOpenedDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setIsOpenedDialog}>
      <DialogTrigger>
        <div className="p-2 hover:bg-secondary rounded-md text-start flex flex-row justify-start">
          <span className="mr-2">
            <Bot />
          </span>
          AI Context
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Context</DialogTitle>
          <DialogDescription>
            Here you can edit the AI context of the project, <br />
            project-level AI context is directly injected in <br />
            each chat associated with the project. Be concise!
          </DialogDescription>
        </DialogHeader>
        <SetAIContextForm setIsOpenedDialog={setIsOpenedDialog} />
      </DialogContent>
    </Dialog>
  );
}
