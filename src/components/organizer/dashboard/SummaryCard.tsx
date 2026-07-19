type SummaryCardProps = {
  label: string;
  value: string | number;
  description?: string;
  valueClassName?: string;
};

export default function SummaryCard({
  label,
  value,
  description,
  valueClassName = "text-white",
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <p className="text-sm text-gray-400">{label}</p>

      <p className={`mt-3 text-3xl font-bold ${valueClassName}`}>
        {value}
      </p>

      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}