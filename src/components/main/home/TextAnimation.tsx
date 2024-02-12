"use client";
import { motion } from "framer-motion";
import { textSlide, textFade } from "@/components/animations/framerAnimations";

export default function TextAnimation() {
  return (
    <motion.div
      className="flex flex-col gap-5 max-w-[800px] w-fit p-0 sm:p-5 mt-10 mx-auto md:mx-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h1
        variants={textSlide}
        custom={1}
        className="text-4xl sm:text-6xl md:text-7xl whitespase-normal sm:whitespace-nowrap p-2 sm:p-0 text-left text-foreground w-fit font-roboto tracking-tight bg-clip-text font-bold relative z-10"
      >
        Become Omniscient
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-muted-foreground text-left whitespace-normal p-2 sm:p-0 sm:whitespace-nowrap z-10"
        variants={textFade}
        custom={1.2}
      >
        Omniscient is a platform where you build, refine <br />
        and socialize your knowledge at scale.
      </motion.p>
    </motion.div>
  );
}
