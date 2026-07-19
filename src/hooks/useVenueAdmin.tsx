import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { OperatingHour, VenueAdminResponse, VenueUpdatePayload } from "@/types/venue.types";
import { ApiResponse } from "@/types/api-response.types";

export function useMyVenue() {
  return useQuery({
    queryKey: ["venue", "me"],
    queryFn: async () => (await api.get<ApiResponse<VenueAdminResponse>>("/venue")).data.data,
  });
}

export function useUpdateVenue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: VenueUpdatePayload) => (await api.patch("/venue", payload)).data.data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["venue"] }),
  });
}

export function useUpdateOperatingHours() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (operatingHours: OperatingHour[]) =>
      (await api.put("/venue/operating-hours", { operatingHours })).data.data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["venue"] }),
  });
}