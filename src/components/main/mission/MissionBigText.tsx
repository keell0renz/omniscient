"use client"
import { motion } from 'framer-motion';
import { textFade } from '@/components/animations/framerAnimations';

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
                custom={1}
                className="flex flex-row justify-between"
            >
                <p
                    className="leading-relaxed"
                >
                    Our mission is to provide accessible, personalized and high-quality
                    education opportunities to everyone. We believe that in the modern
                    era, knowledge and ability to utilize it are keys to creating
                    wealth.
                </p>
            </motion.div>

            <motion.div
                variants={textFade}
                custom={2}
                className="flex flex-row justify-between"
            >
                <p
                    className="leading-relaxed"
                >
                    We believe that education will be one of the industries which will
                    get the most out of the generative AI revolution. We believe that
                    the current state of the industry has substantial efficiency gaps,
                    which makes people waste their time, effort and money on ineffective
                    solutions. An AI chat-bot and its various subsystems, compared to
                    traditional educational means, is an affordable solution for many to
                    get personalized one-on-one tutoring.
                </p>
            </motion.div>

            <motion.div
                variants={textFade}
                custom={3}
                className="flex flex-row justify-between"
            >
                <p
                    className="leading-relaxed"
                >
                    We are committed to building a universal platform for knowledge
                    creation, sharing and socialization, which would empower individuals
                    to maximize their potential and help other fellow learners. Just as
                    training powerful AI models makes them do wonderful stuff — imagine
                    what humans could do if education process would adapt to learner’s
                    unique strengths and passions, imagine how efficient it would become
                    to learn something if AI would tackle tedious tasks of constructing
                    pathway, finding and extracting knowledge from big data, generating
                    personalized assessments and much more.
                </p>
            </motion.div>

            <motion.div
                variants={textFade}
                custom={4}
                className="flex flex-row justify-between"
            >
                <p
                    className="leading-relaxed"
                >
                    The post-AGI world for sure will be a bizarre place. Nobody knows
                    what skills will become obsolete, and what skills will bring
                    fortunes. But we know for sure that if people have the opportunity
                    to learn, master and apply skills in efficient and agile way — there
                    is always an opportunity to adapt to fast-changing world. Reality
                    shows that ones who adapt quickly — survive. We want Omniscient to
                    become an opportunity for many to thrive in the modern, peculiar and
                    dynamic world of future.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default MissionBigText;