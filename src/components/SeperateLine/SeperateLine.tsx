interface SeperateLineProps {
  className?: string;
}

export default function SeperateLine({ className }: SeperateLineProps) {
  return <div className={`h-0.5 bg-primary-light ${className}`}></div>;
}
