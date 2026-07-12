import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/** Parent container that cascades its <StaggerItem> children into view. */
export const StaggerGroup = ({ children, className, stagger = 0.08 }: StaggerGroupProps) => (
  <motion.div
    className={className}
    variants={staggerContainer(stagger)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
  >
    {children}
  </motion.div>
);

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export const StaggerItem = ({ children, className }: StaggerItemProps) => (
  <motion.div className={className} variants={staggerItem}>
    {children}
  </motion.div>
);
