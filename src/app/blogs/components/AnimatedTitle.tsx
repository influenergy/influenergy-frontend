import { motion } from "framer-motion";

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedTitle({
  children,
  className,
}: AnimatedTitleProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
