type DateSelectionProps = {
  date: string;
  minDate: string;
  onDateChange: (date: string) => void;
};

export default function DateSelection({
  date,
  minDate,
  onDateChange,
}: DateSelectionProps) {
  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold">2. Select Date</h2>

        <p className="mt-2 text-gray-400">
          Choose the date you want to play.
        </p>
      </div>

      <input
        type="date"
        value={date}
        min={minDate}
        onChange={(event) => onDateChange(event.target.value)}
        className="mt-6 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400 sm:max-w-sm"
      />
    </section>
  );
}