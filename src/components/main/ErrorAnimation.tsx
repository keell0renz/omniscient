"use client";
import Lottie from "lottie-react";
import errorAnimation from "@/components/main/animations/ErrorAnimation.json";

export default function ErrorAnimation() {
  return (
    <Lottie
      animationData={errorAnimation}
      loop={false}
      className="h-36 w-36 -z-10 mx-auto"
    />
  );
}
