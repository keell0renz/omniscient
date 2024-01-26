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
import LoadingButton from "@/components/ui/LoadingButton";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Node } from "reactflow";

const NodeDelete = ({ currentNode }: { currentNode: Node | null }) => {
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleOverlayClick(event: any) {
        if (event.target?.getAttribute("class")?.includes("bg-black/80")) {
            setIsOpenedDialog(false);
        }
    }

    async function onDelete() {
        console.log("delete node", currentNode)
        setIsLoading(true);
        setIsOpenedDialog(false);
        setIsLoading(false);
    }

    return (
        <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
            <AlertDialogTrigger asChild>
                <Trash2 className="hover:text-blue-800 cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)} className="bg-secondary/5">
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this
                            node.
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
    );
};

export default NodeDelete;