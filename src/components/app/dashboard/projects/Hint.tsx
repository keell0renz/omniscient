import { ArrowUpRightFromSquare } from "lucide-react";

import { motion } from "framer-motion";

export default function Hint() {
  // Animation variants for the hint
  const variants = {
    hidden: { x: 15, y: 31, opacity: 0 },
    visible: { x: 0, y: 31, opacity: 1 },
  };

  return (
    <motion.div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-l-md flex items-center z-9999"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      Open <ArrowUpRightFromSquare className="ml-1.5 h-5 w-5" />
    </motion.div>
  );
}
