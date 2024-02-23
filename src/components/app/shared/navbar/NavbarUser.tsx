import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

export default async function NavbarUser() {
  const user = await currentUser();

  return (
    <Link
      href="#"
      className="mt-1 hover:underline hover:underline-offset-4 cursor-pointer"
    >{`@${user?.username}`}</Link>
  );
}
