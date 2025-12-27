import clsx from "clsx";

interface ButtonProps {
  // text: string;
  type: "primary" | "secondary";
  color?: "secondary" | "green";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const colorClasses = {
  secondary: {
    text: "text-secondary-400",
    bg: "bg-secondary-400",
    bgHover: "hover:bg-secondary-500",
    border: "border-secondary-400",
  },
  green: {
    text: "text-green-400",
    bg: "bg-green-400",
    bgHover: "hover:bg-green-500",
    border: "border-green-400",
  },
};

export default function Button({
  type,
  color = "secondary",
  className,
  onClick,
  children,
}: ButtonProps) {
  const c = colorClasses[color];

  const classNameNew = clsx(
    `w-fit px-3 py-2 rounded-lg font-bold cursor-pointer ${className}`,
    type === "primary" && ["text-white", c.bg, c.bgHover],
    type === "secondary" && [
      c.text,
      "bg-white",
      "border",
      c.border,
      c.bgHover,
      "hover:text-white",
    ],
  );
  return (
    <button onClick={onClick} className={classNameNew}>
      {children}
    </button>
  );
}
