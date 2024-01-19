import Gradient from "@/components/main/Gradient";
import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Gradient />
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default page;
