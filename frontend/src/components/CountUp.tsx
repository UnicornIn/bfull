import type { CSSProperties } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";
import { fmtN } from "../lib/utils";

type Props = {
  to: number;
  fmt?: (n: number) => string;
  /** Si se omite, la cuenta arranca al entrar en pantalla. */
  run?: number | boolean;
  dur?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

export function CountUp({ to, fmt = fmtN, run, dur, threshold = 0.5, className, style }: Props) {
  const [ref, seen] = useInView<HTMLSpanElement>(threshold);
  const value = useCountUp(to, run === undefined ? seen : run, dur);
  return (
    <span ref={ref} className={className} style={style}>
      {fmt(value)}
    </span>
  );
}
