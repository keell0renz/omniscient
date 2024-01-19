import Gradient from "@/components/main/Gradient";
import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Gradient />
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default page;
