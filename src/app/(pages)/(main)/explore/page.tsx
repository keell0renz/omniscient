import ExploreSearch from "@/components/main/explore/ExploreSearch";

const page = () => {
  return (
    <>
      <div className="home overflow-hidden h-fit bg-transparent mx-auto box-border max-w-10xl w-full -mt-10 flex flex-col">
        <ExploreSearch />
      </div>
      <div className="mt-[20vh] px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-hidden"></div>
    </>
  );
};

export default page;
