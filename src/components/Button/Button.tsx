import clsx from "clsx";

interface ButtonProps {
  text: string;
  type: "primary" | "secondary";
  color?: string;
}

export default function Button({ text, type }: ButtonProps) {
  const className = clsx(
    "px-3 py-2 rounded-lg font-bold cursor-pointer",
    type === "primary" && "text-white bg-secondary hover:bg-secondary-500",
    type === "secondary" &&
      "text-secondary bg-white border border-secondary hover:bg-secondary hover:text-white",
  );
  return <button className={className}>{text}</button>;
}
