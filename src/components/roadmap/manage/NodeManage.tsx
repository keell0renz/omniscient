"use client";
import { CheckCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import NodeStatus from "@/components/roadmap/manage/NodeStatus";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { GraphNodeValidator, GraphNodeSchema } from "@/schema/roadmap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useNodeStore from "@/store/NodeStore";
import { useEffect } from "react";
import NodeDelete from "./NodeDelete";
import { editNode } from "@/server/roadmap";

const NodeManage = () => {
  const { currentNode, setCurrentNode } = useNodeStore();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  async function onEdit(input: GraphNodeSchema) {
    setIsEditMode(false);
    await editNode(input, currentNode?.data.primary_key);
    console.log("send for server", input);
  }

  function handleClose() {
    setIsEditMode(false);
    setIsSheetOpen(false);
    setCurrentNode(null);

    form.reset({
      title: currentNode?.data.label || "",
      about: currentNode?.data.about || "",
    });
  }

  const form = useForm<GraphNodeSchema>({
    resolver: zodResolver(GraphNodeValidator),
    defaultValues: {
      title: currentNode?.data.label || "",
      about: currentNode?.data.about || "",
    },
  });

  useEffect(() => {
    setIsSheetOpen(!!currentNode); // Set isSheetOpen to true if currentNode is present, otherwise false
    form.reset({
      title: currentNode?.data.label || "",
      about: currentNode?.data.about || "",
    });
  }, [currentNode]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleClose}>
      <SheetContent className="p-5 pr-10">
        <div className="flex flex-row w-full gap-2">
          <NodeStatus />
          <Link href="#" className="w-1/2">
            <div className="w-full h-[50px] text-xl inline-flex items-center justify-center hover:border-foreground/70 rounded-xl border border-foreground">
              Open
            </div>
          </Link>
        </div>
        <Form {...form}>
          <form className="h-full" onSubmit={form.handleSubmit(onEdit)}>
            <div className="pt-3 h-full flex-col">
              <div className="h-fit mb-2 flex flex-row flex-nowrap w-full items-center justify-between">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          {isEditMode ? (
                            <input
                              className="text-2xl bg-transparent focus-visible:outline-none max-w-64"
                              placeholder="Untitled"
                              {...field}
                            />
                          ) : (
                            <h2 className="max-w-[290px] text-2xl truncate">
                              {field.value}
                            </h2>
                          )}
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <div className="flex flex-row flex-nowrap min-w-fit max-w-fit items-center gap-2">
                  {!isEditMode ? (
                    <Edit
                      className="text-foreground/90 hover:text-foreground cursor-pointer"
                      onClick={() => setIsEditMode(!isEditMode)}
                    />
                  ) : (
                    <CheckCircle
                      onClick={form.handleSubmit(onEdit)}
                      className="text-foreground/90 hover:text-foreground cursor-pointer"
                    />
                  )}
                  <NodeDelete currentNode={currentNode} />
                </div>
              </div>
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormControl>
                      {isEditMode ? (
                        <Textarea
                          className="p-0 text-lg resize-none w-full mt-2 max-w-full h-full bg-transparent focus-visible:ring-0 focus-visible:outline-none border-none scrollbar-hide"
                          placeholder="This node is about..."
                          {...field}
                        />
                      ) : (
                        <p className="text-lg max-w-1/2 h-full mt-2 overflow-hidden overflow-ellipsis break-word">
                          {field.value}
                        </p>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default NodeManage;
