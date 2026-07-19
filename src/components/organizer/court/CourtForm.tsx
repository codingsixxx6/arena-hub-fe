import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import Button from "@/components/ui/button";

import { CourtStatus, SportType } from "@/types/court.types";

interface CourtFormData {
  name: string;
  sportType: SportType | "";
  pricePerHour: number | "";
  status?: CourtStatus;
}

interface CourtFormProps {
  form: CourtFormData;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;

  isPending?: boolean;

  isEdit?: boolean;
}

export default function CourtForm({
  form,
  onChange,
  onSubmit,
  isPending = false,
  isEdit = false,
}: CourtFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
    >
      <FormInput
        label="Court Name"
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Padel Court A"
      />

      <FormSelect
        label="Sport Type"
        name="sportType"
        value={form.sportType}
        onChange={onChange}
        className="*:bg-slate-900"
      >
        <option value="">Select Sport</option>
        <option value="BADMINTON">Badminton</option>
        <option value="FUTSAL">Futsal</option>
        <option value="BASKET">Basket</option>
        <option value="MINI_SOCCER">Mini Soccer</option>
        <option value="TENNIS">Tennis</option>
        <option value="PADEL">Padel</option>
      </FormSelect>

      <FormInput
        label="Price Per Hour"
        type="number"
        name="pricePerHour"
        value={form.pricePerHour}
        onChange={onChange}
        placeholder="50000"
      />

      {isEdit && (
        <FormSelect
          label="Status"
          name="status"
          value={form.status}
          onChange={onChange}
        >
          <option value="AVAILABLE">
            Available
          </option>

          <option value="MAINTENANCE">
            Maintenance
          </option>

          <option value="INACTIVE">
            Inactive
          </option>
        </FormSelect>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          disabled={isPending}
        >
          {isEdit ? "Save Changes" : "Create Court"}
        </Button>
      </div>
    </form>
  );
}