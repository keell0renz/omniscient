"use client";
import { motion } from "framer-motion";
import {
  textSlide,
  textFade,
} from "@/components/main/animations/framerAnimations";
import ExploreInput from "@/components/main/home/hero/ExploreInput";

export default function HeroText() {
  return (
    <motion.div
      className="flex flex-col gap-5 max-w-[800px] w-fit p-0 sm:p-5 mt-10 mx-auto md:mx-0 z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h1
        variants={textSlide}
        custom={1}
        className="text-4xl sm:text-6xl md:text-7xl whitespase-normal sm:whitespace-nowrap p-2 sm:p-0 text-left text-foreground w-fit font-roboto tracking-tight bg-clip-text font-bold relative"
      >
        Become Omniscient
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-muted-foreground text-left whitespace-normal p-2 sm:p-0 sm:whitespace-nowrap"
        variants={textFade}
        custom={1.2}
      >
        Omniscient is a platform where you build, practice <br />
        and socialize your tech skills at scale.
      </motion.p>
      <motion.div
        variants={textFade}
        custom={1.6}
        className="w-full h-fit"
      >
        <ExploreInput />
      </motion.div>
    </motion.div>
  );
}
