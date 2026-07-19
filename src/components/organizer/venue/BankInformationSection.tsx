import FormInput from "@/components/form/FormInput";
import SectionCard from "@/components/ui/SectionCard";
import { VenueForm } from "@/types/venue.types";

interface BankInformationSectionProps {
  form: VenueForm
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function BankInformationSection({
  form,
  onChange,
}: BankInformationSectionProps) {
  return (
    <SectionCard
      title="Bank Information"
      description="Bank account used to receive booking payment."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput
          label="Bank Name"
          name="bankName"
          value={form.bankName}
          onChange={onChange}
        />

        <FormInput
          label="Account Holder"
          name="accountHolder"
          value={form.accountHolder}
          onChange={onChange}
        />

        <FormInput
          label="Account Number"
          name="accountNumber"
          value={form.accountNumber}
          onChange={onChange}
        />
      </div>
    </SectionCard>
  );
}