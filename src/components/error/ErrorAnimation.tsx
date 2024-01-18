"use client"
import Lottie from "lottie-react";
import errorAnimation from "@/components/animations/ErrorAnimation.json"

const ErrorAnimation = () => {
    return (
        <Lottie
            animationData={errorAnimation}
            loop={false}
            className="h-36 w-36 -z-10 mx-auto"
        />
    );
};

export default ErrorAnimation;