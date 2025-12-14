import clsx from "clsx";

interface ButtonProps {
  text: string;
  type: "primary" | "secondary";
  color?: "secondary" | "green";
  className?: string;
}

export default function Button({
  text,
  type,
  color = "secondary",
  className,
}: ButtonProps) {
  const classNameNew = clsx(
    `w-fit px-3 py-2 rounded-lg font-bold cursor-pointer ${className}`,
    type === "primary" && `text-white bg-${color}-400 hover:bg-${color}-500`,
    type === "secondary" &&
      `text-${color}-400 bg-white border border-${color}-400 hover:bg-${color}-400 hover:text-white`,
  );
  return <button className={classNameNew}>{text}</button>;
}
