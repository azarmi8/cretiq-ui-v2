/**
 * LiveNumber — A number that pulses when its value changes.
 * Creates a subtle "alive" feeling for real-time KPIs.
 */

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '../utils';

export function LiveNumber({
  value,
  pulse = true,
  className,
}: {
  value: ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  const controls = useAnimationControls();
  const prev = useRef(value);
  const isMount = useRef(true);

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
      prev.current = value;
      return;
    }
    if (pulse && prev.current !== value) {
      controls.start({
        opacity: [0.4, 1],
        y: [-6, 0],
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      });
      prev.current = value;
    }
  }, [value, pulse, controls]);

  return (
    <motion.span animate={controls} className={cn('inline-block', className)}>
      {value}
    </motion.span>
  );
}
