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
import { NodeAIContext, validateSetNodeAIContext } from "@/schema/node";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { setNodeAIContext } from "@/server/roadmap";

function AIContextForm({
  params,
  setOpen,
  ai_context
}: {
  params: { pid: string; nid: string };
  setOpen: (set: boolean) => void;
  ai_context: string
}) {
  

  const form = useForm<NodeAIContext>({
    resolver: zodResolver(validateSetNodeAIContext),
    defaultValues: {
      ai_context: ai_context,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSetAIContext(input: NodeAIContext) {
    console.log(input);
    setIsLoading(true);
    await setNodeAIContext(input, params.pid, params.nid)
    setIsLoading(false);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSetAIContext)} className="space-y-8">
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
                  className="w-full h-72 resize-none"
                  placeholder="Your AI context..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row justify-end">
          <LoadingButton className="w-full" isLoading={isLoading}>
            Set Context
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

export default function AIContext({
  params,
  ai_context
}: {
  params: { pid: string; nid: string };
  ai_context: string
}) {
  const [openDialog, setIsOpenedDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setIsOpenedDialog}>
      <DialogTrigger>
        <div className="flex flex-row justify-start space-x-2 px-4 py-2 rounded-lg hover:bg-secondary">
          <Bot />
          <h1>AI Context</h1>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Context</DialogTitle>
          <DialogDescription>
            Here you can edit AI context of the current node.
          </DialogDescription>
        </DialogHeader>
        <AIContextForm params={params} setOpen={setIsOpenedDialog} ai_context={ai_context}/>
      </DialogContent>
    </Dialog>
  );
}
