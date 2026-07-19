"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
import { Court, SportType } from "@/types/court.types";
import { useUpdateCourt } from "@/hooks/useCourt";

interface EditCourtDialogProps {
  court: Court;
}

export default function EditCourtDialog({
  court,
}: EditCourtDialogProps) {
  const [open, setOpen] = useState(false);

  const updateCourtMutation = useUpdateCourt();

  const [form, setForm] = useState({
    name: "",
    sportType: "" as SportType | "",
    pricePerHour: "" as number | "",
    status: court.status,
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: court.name,
        sportType: court.sportType,
        pricePerHour: court.pricePerHour,
        status: court.status,
      });
    }
  }, [open, court]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "pricePerHour"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await updateCourtMutation.mutateAsync({
        courtId: court.id,
        payload: {
          name: form.name,
          sportType: form.sportType as SportType,
          pricePerHour: Number(form.pricePerHour),
          status: form.status,
        },
      });

      toast.success("Court updated successfully.");

      setOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button>
            Edit
          </Button>
        }
      />

      <DialogContent className="max-w-lg border border-white/10 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>
            Edit Court
          </DialogTitle>

          <DialogDescription>
            Update your court information.
          </DialogDescription>
        </DialogHeader>

        <CourtForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isPending={updateCourtMutation.isPending}
          isEdit
        />
      </DialogContent>
    </Dialog>
  );
}