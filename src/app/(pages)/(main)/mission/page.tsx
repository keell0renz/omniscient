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

          <hr className="w-full my-8" />

          <div className="space-y-10">
            <PersonCard
              name="Bohdan Agarkov"
              title="CEO and CTO"
              avatar="/images/bohdan.jpg"
              className="justify-start"
              contacts={[
                {
                  title: "cognitar.ai@gmail.com",
                  href: "mailto:cognitar.ai@gmail.com",
                },
                {
                  title: "@keellorenz",
                  href: "https://t.me/keellorenz",
                },
              ]}
            />

            <PersonCard
              name="Alina Voronina"
              title="COO and CDO"
              avatar="/images/alina.jpeg"
              className="justify-center"
              contacts={[
                {
                  title: "LinkedIn",
                  href: "https://www.linkedin.com/in/alina-voronina-b7585723b/",
                },
                {
                  title: "Instagram",
                  href: "https://www.instagram.com/voroninalina_?igshid=OGQ5ZDc2ODk2ZA==",
                },
              ]}
            />

            <PersonCard
              name="Dima Matushinets"
              title="Developer"
              avatar="/images/dima.jpg"
              className="justify-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
