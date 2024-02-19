"use client";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload } from "lucide-react";

const ShareDialog = () => {
  const params = useParams<{ id: string }>();
  const { editProject, data, isMutating, isLoading } = useProject(params.id);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  function handleOverlayClick(event: any) {
    if (event.target?.getAttribute("id")?.includes("overlay")) {
      setIsOpenDialog(false);
    }
  }

  async function onShare() {
    try {
      await editProject({ public: !data?.public });
    } finally {
      setIsOpenDialog(false);
    }
  }

  return (
    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className={`text-white ${data?.public ? "bg-destructive hover:bg-destructive/90" : "bg-blue-600 hover:bg-blue-500"}`}
          disabled={isLoading}
        >
          {data?.public ? "Unpublish" : "Publish"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will make your project publicly
              {data?.public ? " unavailable" : " available"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LoadingButton
              onClick={() => onShare()}
              className={`text-white ${data?.public ? "bg-destructive hover:bg-destructive/90" : "bg-blue-600 hover:bg-blue-500"}`}
              isLoading={isMutating}
              disabled={isLoading}
            >
              {data?.public ? "Unpublish" : "Publish"}
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default function ShareSettings() {
  const params = useParams<{ id: string }>();
  const { data } = useProject(params.id);

  return (
    <Card className="flex flex-col justify-between items-center w-full max-w-[800px]">
      <CardHeader className="w-full">
        <CardTitle className="flex flex-row justify-start items-center text-xl font-semibold gap-2">
          <Upload />
          Project Publicity
        </CardTitle>
      </CardHeader>
      <CardFooter className="px-4 py-2 flex flex-row justify-between border-t w-full">
        <p className="mx-2 text-sm text-muted-foreground">
          Make the project{" "}
          {data?.public
            ? "unavailable for the community to clone."
            : "available for the community to clone."}{" "}
          <br />
        </p>
        <ShareDialog />
      </CardFooter>
    </Card>
  );
}
