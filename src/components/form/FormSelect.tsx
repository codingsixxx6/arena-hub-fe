import React from "react";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormSelect({
  label,
  error,
  className,
  children,
  ...props
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>

      <select
        {...props}
        className={`block rounded-md border border-white/10 p-2 outline-none focus:border-lime-400 *:bg-slate-900 ${className}`}
      >
        {children}
      </select>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}