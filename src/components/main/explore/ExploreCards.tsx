"use client"
import {
    MCard,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { cardFade } from "@/components/animations/framerAnimations";

const ExploreCards = () => {
    const { toast } = useToast()

    const handleClick = () => {
        toast({
            title: "🚀 In development!",
            description: "This functionality is currently in development, check out later. 😊",
            className: "bg-blue-600 text-white",
        })
    }

    const hardcodedCards = [
        {
            title: "sossoso",
            description: "description",
            author: "jajabuka"
        },
        {
            title: "sosososo",
            description: "description",
            author: "bibibuka"
        },
        {
            title: "sosososo",
            description: "description",
            author: "memebuka"
        },
        {
            title: "sosososo",
            description: "description",
            author: "sosobuka"
        },
        {
            title: "sosososo",
            description: "description",
            author: "sosobuka"
        },
        {
            title: "sosososo",
            description: "description",
            author: "sosobuka"
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
                        <CardDescription
                            className="text-lg truncate"
                        >{card.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-row justify-between">
                        <div className="flex items-center">
                            <Avatar>
                                <AvatarFallback>
                                    {card.author[0]}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-sm ml-2">
                                by @
                                {`${card.author}`}
                            </p>
                        </div>
                    </CardFooter>
                </MCard>
            ))}
        </>
    );
};

export default ExploreCards;