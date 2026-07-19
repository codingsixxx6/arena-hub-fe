import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>

      {children}
    </div>
  );
}
