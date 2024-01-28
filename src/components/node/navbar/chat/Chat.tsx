import { MoreHorizontal } from "lucide-react";

export default function Chat({
  chat_id,
  title,
}: {
  chat_id: string;
  title: string;
}) {
  return (
    <div className="group py-2 px-2 rounded-lg hover:bg-secondary flex flex-row justify-between items-center">
      <h1 className="text-sm truncate w-64">{title}</h1>
      <MoreHorizontal className="opacity-0 group-hover:opacity-100 w-6" />
    </div>
  );
}
