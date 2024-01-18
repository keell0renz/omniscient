"use client"
import { motion } from "framer-motion"
import { textSlide, textFade } from "@/components/animations/framerAnimations";

const TextAnimation = () => {
    return (
        <motion.div
            className="flex flex-col gap-5 backdrop-blur-md max-w-[800px] w-fit p-0 sm:p-5 mt-10 mx-auto md:mx-0"
            initial='hidden'
            whileInView='visible'
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
                className="text-lg sm:text-2xl md:text-3xl text-muted-foreground text-left whitespace-normal p-2 sm:p-0 sm:whitespace-nowrap"
                variants={textFade}
                custom={1.2}
            >
                Omniscient is a platform where you <br />
                build, refine and socialize your knowledge at scale.
            </motion.p>
        </motion.div>
    );
};

export default TextAnimation;