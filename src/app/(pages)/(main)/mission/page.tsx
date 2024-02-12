import PersonCard from "@/components/main/mission/PersonCard";
import MissionBigText from "@/components/main/mission/MissionBigText";

const page = () => {
  return (
    <div className="home overflow-hidden h-fit bg-transparent mx-auto box-border max-w-10xl w-full -mt-10 overflow-x-hidden">
      <h1 className="text-6xl bg-gradient-to-t text-foreground w-fit mx-auto sm:text-5xl md:text-6xl font-roboto tracking-tight bg-clip-text font-bold text-center">
        A mission to provide opportunity
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="text-center w-9/12 lg:w-8/12 xl:w-7/12 text-foreground my-16">
          <MissionBigText />
        </div>
      </div>
    </div>
  );
};

export default page;
