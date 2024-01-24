import Gradient from "@/components/main/Gradient";
import { SignIn } from "@clerk/nextjs";

const page = ({
  searchParams,
}: {
  searchParams?: { redirect_url: string };
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Gradient />
      <SignIn signUpUrl="/sign-up" redirectUrl={searchParams?.redirect_url} />
    </div>
  );
};

export default page;
