"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonsFade } from "@/components/animations/framerAnimations";

const ButtonsAnimation = () => {
  return (
    <motion.div
      className="flex flex-row w-fit mx-auto md:ml-5 justify-start mt-12 gap-2 h-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={buttonsFade}
      custom={2}
    >
      <Link href="/mission" className="z-50" passHref>
        <Button className="h-full w-32 rounded-xl font-semibold" variant={"outline"}>
          Explore
        </Button>
      </Link>
      <Link href="/projects" className="z-50" passHref>
        <Button className="h-full w-32 font-semibold bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white rounded-xl">
          Open
        </Button>
      </Link>
    </motion.div>
  );
};

export default ButtonsAnimation;
