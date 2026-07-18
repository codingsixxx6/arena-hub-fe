import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-2xl bg-lime-400 px-8 py-4 font-semibold text-slate-950 transition hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,255,0,.4)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
