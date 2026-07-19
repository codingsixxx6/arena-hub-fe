"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CourtForm from "./CourtForm";
import { CourtFormData, SportType } from "@/types/court.types";
import { useCreateCourt } from "@/hooks/useCourt";
import { toast } from "react-toastify";

export default function CreateCourtDialog() {
  const [open, setOpen] = useState(false);
  const createCourtMutation = useCreateCourt();
  const [form, setForm] = useState<CourtFormData>({
    name: "",
    sportType: "" as SportType | "",
    pricePerHour: "" as number | "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "pricePerHour" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createCourtMutation.mutateAsync({
        name: form.name,
        sportType: form.sportType as SportType,
        pricePerHour: Number(form.pricePerHour),
      });

      toast.success("Court created successfully.");

      setForm({
        name: "",
        sportType: "",
        pricePerHour: "",
      });

      setOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Court
          </Button>
        }
      />

      <DialogContent className="max-w-lg border border-white/10 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Add New Court</DialogTitle>

          <DialogDescription>
            Fill in the information below to create a new court.
          </DialogDescription>
        </DialogHeader>

        <CourtForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isPending={createCourtMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
