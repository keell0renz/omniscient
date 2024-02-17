import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function PublicProject({ user_id }: { user_id: string }) {
    // const user = await clerkClient.users.getUser(user_id);

    return (
        <div className="flex items-center">
            {/* <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                    {user.firstName &&
                        user.lastName &&
                        `${user.firstName[0]} ${user.lastName[0]}`}
                </AvatarFallback>
            </Avatar>
            <p className="text-sm ml-2">
                by @
                {user.username
                    ? user.username
                    : `${user.firstName} ${user.lastName}`}
            </p> */}
        </div>
    );
}