import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
  once = true,
  amount = 0.2,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delayStep: 0.08

      }}
    >
      {children}
    </motion.div>
  );
}
