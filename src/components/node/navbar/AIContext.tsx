import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";

export default async function AIContext({
  pid,
  nid,
}: {
  pid: string;
  nid: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-row justify-start space-x-2 px-4 py-2 rounded-lg hover:bg-secondary">
          <Bot />
          <h1>AI Context</h1>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row items-center justify-start space-x-2">
              <Bot />
              <h1>AI Context</h1>
            </div>
            <DialogDescription className="text-sm font-normal mt-1">
              Here you can edit AI context of the current node.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <></>
      </DialogContent>
    </Dialog>
  );
}
