import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import SectionCard from "@/components/ui/SectionCard";
import { VenueForm } from "@/types/venue.types";

interface VenueInformationSectionProps {
  form: VenueForm
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function VenueInformationSection({
  form,
  onChange,
}: VenueInformationSectionProps) {
  return (
    <SectionCard
      title="Venue Information"
      description="Keep your venue information up to date."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput
          label="Venue Name"
          name="name"
          value={form.name}
          onChange={onChange}
        />

        <FormInput
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onChange}
        />

        <div className="md:col-span-2">
          <FormTextArea
            label="Description"
            rows={4}
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </div>

        <div className="md:col-span-2">
          <FormTextArea
            label="Address"
            rows={2}
            name="address"
            value={form.address}
            onChange={onChange}
          />
        </div>

        <FormInput
          label="City"
          name="city"
          value={form.city}
          onChange={onChange}
        />
      </div>
    </SectionCard>
  );
}