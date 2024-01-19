import ExploreSearch from "@/components/main/explore/ExploreSearch";

const page = () => {
    return (
        <div className="home overflow-hidden h-fit bg-transparent mx-auto box-border max-w-10xl w-full -mt-10 flex flex-col">
            <h1 className="text-center text-6xl font-bold">Search any Project you want to</h1>
            <ExploreSearch />
        </div>
    );
};

export default page;