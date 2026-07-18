import { formatCurrency, formatDate } from "@/helpers/format.helpers";

type BookingInformationProps = {
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  bankName: string;
  accountHolder: string
  accountNumber: string;
};

export default function BookingInformation({
  courtName,
  date,
  startTime,
  endTime,
  totalPrice,
  bankName,
  accountHolder,
  accountNumber
}: BookingInformationProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">Booking Information</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-gray-400">Court</p>

          <p className="text-right font-medium">{courtName}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-gray-400">Date</p>

          <p className="text-right font-medium">{formatDate(date)}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-gray-400">Time</p>

          <p className="text-right font-medium">
            {startTime} - {endTime}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-gray-400">Bank Name</p>

          <p className="text-right font-medium">
            {`${accountHolder} - (${bankName})`}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-gray-400">Bank Account Number</p>

          <p className="text-right font-medium">
            {accountNumber}
          </p>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-400">Total Price</p>

            <p className="text-right text-lg font-bold text-lime-400">
              {formatCurrency(totalPrice)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}