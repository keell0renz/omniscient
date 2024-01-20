"use client";
import {
  MCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { cardFade } from "@/components/animations/framerAnimations";

const ExploreCards = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "🚀 In development!",
      description: "These are just examples for now, check out later. 😊",
      className: "bg-blue-600 text-white",
    });
  };

  const hardcodedCards = [
    {
      title: "Computer Science Fundamentals",
      description:
        "Dive into the core principles of computing, including algorithms, data structures, and computational theory.",
      author: "techguru101",
      image: "/images/techguru101.png",
    },
    {
      title: "Introduction to Programming",
      description:
        "Begin your coding journey with fundamental concepts in popular programming languages like Python, Java, and C++.",
      author: "codestarter",
      image: "/images/codestarter.png",
    },
    {
      title: "Prompt Engineering Essentials",
      description:
        "Learn the art of crafting effective prompts for AI models, focusing on clarity, context, and creativity.",
      author: "aicrafter",
      image: "/images/aicrafter.png",
    },
    {
      title: "Data Science & Analytics",
      description:
        "Explore data analysis, visualization, and machine learning to turn data into actionable insights.",
      author: "datawizard",
      image: "/images/datawizard.png",
    },
    {
      title: "Advanced TypeScript",
      description:
        "Deepen your TypeScript knowledge with advanced topics like generics, decorators, and type manipulation.",
      author: "typemaster",
      image: "/images/typemaster.png",
    },
    {
      title: "Full-Stack Development with Next.js",
      description:
        "Master full-stack web development using Next.js, from server-side rendering to API routes and front-end frameworks.",
      author: "nextgendev",
      image: "/images/nextgendev.png",
    },
  ];

  return (
    <>
      {hardcodedCards.map((card, index) => (
        <MCard
          onClick={() => handleClick()}
          key={index}
          className="w-full h-[200px] flex flex-col justify-between hover:border-primary cursor-pointer hover:scale-[120]"
          initial="hidden"
          whileInView="visible"
          variants={cardFade}
          custom={1.5}
        >
          <CardHeader>
            <CardTitle className="truncate flex flex-row justify-between text-2xl">
              {card.title}
            </CardTitle>
            <CardDescription className="text-lg truncate-2-lines">
              {card.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-row justify-between">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={card.image} />
                <AvatarFallback>{card.author[0]}</AvatarFallback>
              </Avatar>
              <p className="text-sm ml-2">by @{`${card.author}`}</p>
            </div>
          </CardFooter>
        </MCard>
      ))}
    </>
  );
};

export default ExploreCards;
