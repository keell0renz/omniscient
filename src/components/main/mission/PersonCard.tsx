import { cn } from "@/lib/utils";

interface Contact {
  title: string;
  href: string;
}

interface PersonCardProps {
  name: string;
  title: string;
  avatar: string;
  className?: string;
  contacts?: Contact[];
}

export default function PersonCard({
  name,
  title,
  avatar,
  contacts,
  className,
}: PersonCardProps) {
  return (
    <div className={cn("flex flex-row justify-start w-full", className)}>
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-row">
          <h2 className="text-xl font-bold ml-4">{name}</h2>
          <span className="text-xl">, {title}</span>
        </div>
        {contacts?.map((contact, index) => (
          <p className="ml-4 mt-1" key={index}>
            <a
              href={contact.href}
              className="text-blue-600 hover:text-blue-800"
            >
              {contact.title}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}
