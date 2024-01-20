import { Variants, easeInOut } from "framer-motion";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const gradientAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0.4,
    transition: {
      duration: 1,
    },
  },
};

export const gradientBackAnimation: Variants = {
  hidden: {
    opacity: 0.3,
    zIndex: 9999,
  },
  visible: {
    opacity: 0,
    zIndex: -1,
    transition: {
      duration: 0.8,
    },
  },
};

export const textSlide: Variants = {
  hidden: {
    opacity: 0,
    x: -800,
  },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom * 0.8,
      ease: easeInOut,
    },
  }),
};

export const textFade: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom * 0.8,
      ease: easeInOut,
    },
  }),
};

export const cardFade: Variants = {
  hidden: {
    opacity: 0,
    x: -800,
  },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: getRandomArbitrary(1, custom),
      ease: easeInOut,
    },
  }),
};

export const buttonsFade: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom * 0.8,
      ease: easeInOut,
    },
  }),
};
