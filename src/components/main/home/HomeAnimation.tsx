"use client"
import Lottie from "lottie-react";
import homeAnimation from "@/components/animations/HomeAnimation.json"

const HomeAnimation = () => {
    return (
        <Lottie
            animationData={homeAnimation}
            className="h-[600px] w-[600px] -z-10 translate-x-[140px] opacity-60"
        />
    );
};

export default HomeAnimation;