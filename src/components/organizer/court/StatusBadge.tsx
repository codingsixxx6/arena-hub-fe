import { Badge } from "@/components/ui/badge";

interface Props {
  status: "AVAILABLE" | "MAINTENANCE" | "INACTIVE";
}

export default function StatusBadge({
  status,
}: Props) {
  switch (status) {
    case "AVAILABLE":
      return <Badge>{status}</Badge>;

    case "MAINTENANCE":
      return (
        <Badge variant="secondary">
          {status}
        </Badge>
      );

    case "INACTIVE":
      return (
        <Badge variant="destructive">
          {status}
        </Badge>
      );
  }
}