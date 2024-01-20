"use client";
import { motion } from "framer-motion";
import { textFade } from "@/components/animations/framerAnimations";

const MissionBigText = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="min-h-[80vh] space-y-10 text-left"
    >
      <motion.div
        variants={textFade}
        custom={2}
        className="flex flex-row justify-between"
      >
        <p className="leading-relaxed">
          {
            "Our mission is to provide accessible, personalized and high-quality education opportunities to everyone. We believe that in the modern era, knowledge and ability to utilize it are keys to creating wealth."
          }
        </p>
      </motion.div>

      <motion.div
        variants={textFade}
        custom={2}
        className="flex flex-row justify-between"
      >
        <p className="leading-relaxed">
          {
            'We believe that education will be one of the industries that will get the most out of the generative AI revolution. But we think that "vanilla" chatbots, which cannot access reliable materials and learner\'s context, are not sufficient enough to provide an efficient learning environment. It is difficult to build consistent knowledge, which takes time, with a "mentor" who has amnesia every new lesson and does not have access to relevant knowledge.'
          }
        </p>
      </motion.div>

      <motion.div
        variants={textFade}
        custom={3}
        className="flex flex-row justify-between"
      >
        <p className="leading-relaxed">
          {
            'We decided to create a platform for collecting, sharing and building knowledge and skills. A place where skillful and experienced people build roadmaps and embed relevant resources, and publish these "learning projects" to the learners, which could clone them, making them personal and customizable spaces for learning, and use AI chatbot which has access to the learning context to consume vast amounts of information scattered across the web, practice and receive personalized feedback.'
          }
        </p>
      </motion.div>

      <motion.div
        variants={textFade}
        custom={4}
        className="flex flex-row justify-between"
      >
        <p className="leading-relaxed">
          {
            "The post-AGI world for sure will be a bizarre place. Nobody knows what skills will become obsolete, and what skills will bring fortunes. But we know for sure that if people have the opportunity to learn, master and apply skills in an efficient and agile way — there is always an opportunity to adapt to a fast-changing world. Reality shows that those who adapt quickly — survive. We want Omniscient to become an opportunity for many to thrive in the modern, peculiar and dynamic world of the future."
          }
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MissionBigText;
