// src/presentation/motion/atoms/stagger.tsx
import type { ReactNode } from "react";
import { m } from "framer-motion";
import { VIEWPORT } from "@kernel";
import { CASCADE, staggerContainer, staggerItem } from "../vocabulary";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/** Parent container that cascades its <StaggerItem> children into view. */
export const StaggerGroup = ({
  children,
  className,
  stagger = CASCADE.stagger,
}: StaggerGroupProps) => (
  <m.div
    className={className}
    variants={staggerContainer(stagger)}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT.reveal}
  >
    {children}
  </m.div>
);

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export const StaggerItem = ({ children, className }: StaggerItemProps) => (
  <m.div className={className} variants={staggerItem}>
    {children}
  </m.div>
);
