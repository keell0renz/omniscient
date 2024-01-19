"use client";
import { motion } from "framer-motion";
import {
  gradientAnimation,
  gradientBackAnimation,
} from "@/components/animations/framerAnimations";

const Gradient = () => {
  return (
    <>
      <motion.div
        variants={gradientAnimation}
        initial="hidden"
        whileInView="visible"
        className={`-z-10 fixed w-1/2 top-1/3 right-[60%] blur-[200px] opacity-40 bg-gradient-to-r from-blue-900 via-blue-600 to-transparent h-60 rotate-[45deg]`}
      />
      <motion.div
        variants={gradientBackAnimation}
        initial="hidden"
        whileInView="visible"
        className="w-screen h-screen bg-black fixed left-0 top-0"
      />
      <motion.div
        variants={gradientAnimation}
        initial="hidden"
        whileInView="visible"
        className={`-z-10 fixed w-1/2 top-1/3  left-[60%] blur-[200px] opacity-40 bg-gradient-to-l  from-blue-900 via-blue-600 to-transparent h-60 -rotate-[45deg]`}
      />
    </>
  );
};
export default Gradient;
