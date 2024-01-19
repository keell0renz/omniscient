import PersonCard from "@/components/main/mission/PersonCard";

const page = () => {
  return (
    <div className="home overflow-hidden h-fit bg-transparent mx-auto box-border max-w-10xl w-full -mt-10">
      <h1 className="text-6xl bg-gradient-to-t text-foreground w-fit mx-auto sm:text-5xl md:text-6xl font-roboto tracking-tight bg-clip-text font-bold text-center">
        A mission to provide opportunity
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="text-center w-9/12 lg:w-8/12 xl:w-7/12 text-foreground mt-4">
          <p className="mt-6 leading-relaxed">
            Our mission is to provide accessible, personalized and high-quality
            education opportunities to everyone. We believe that in the modern
            era, knowledge and ability to utilize it are keys to creating
            wealth.
          </p>

          <p className="mt-6 leading-relaxed">
            We believe that education will be one of the industries which will
            get the most out of the generative AI revolution. We believe that
            the current state of the industry has substantial efficiency gaps,
            which makes people waste their time, effort and money on ineffective
            solutions. An AI chat-bot and its various subsystems, compared to
            traditional educational means, is an affordable solution for many to
            get personalized one-on-one tutoring.
          </p>

          <p className="mt-6 leading-relaxed">
            We are committed to building a universal platform for knowledge
            creation, sharing and socialization, which would empower individuals
            to maximize their potential and help other fellow learners. Just as
            training powerful AI models makes them do wonderful stuff — imagine
            what humans could do if education process would adapt to learner’s
            unique strengths and passions, imagine how efficient it would become
            to learn something if AI would tackle tedious tasks of constructing
            pathway, finding and extracting knowledge from big data, generating
            personalized assessments and much more.
          </p>

          <p className="mt-6 leading-relaxed">
            The post-AGI world for sure will be a bizarre place. Nobody knows
            what skills will become obsolete, and what skills will bring
            fortunes. But we know for sure that if people have the opportunity
            to learn, master and apply skills in efficient and agile way — there
            is always an opportunity to adapt to fast-changing world. Reality
            shows that ones who adapt quickly — survive. We want Omniscient to
            become an opportunity for many to thrive in the modern, peculiar and
            dynamic world of future.
          </p>

          <div className="w-full border-t my-8"></div>
          <div className="space-y-8">
            <PersonCard
              name="Bohdan Agarkov"
              title="CEO and CTO"
              avatar="/images/bohdan.jpg"
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
