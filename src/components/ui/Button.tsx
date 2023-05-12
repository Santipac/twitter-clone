import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  small = false,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";

  return (
    <button
      className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses}  ${className}`}
      {...props}
    ></button>
  );
}
