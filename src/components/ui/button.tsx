import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-semibold transition",

        // size
        {
          "px-4 py-2 text-sm rounded-xl": size === "sm",
          "px-6 py-3 rounded-2xl": size === "md",
          "px-8 py-4 rounded-2xl": size === "lg",
          "h-10 w-10 flex items-center justify-center rounded-full": size === "icon",
        },

        // variant
        {
          "bg-lime-400 text-slate-950 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,255,0,.4)]":
            variant === "primary",

          "bg-white/10 text-white hover:bg-white/20":
            variant === "secondary",

          "bg-red-500 text-white hover:bg-red-600":
            variant === "danger",

          "bg-transparent text-white hover:bg-white/10":
            variant === "ghost",
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}