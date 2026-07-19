import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api-response.types";
import {
  Court,
  CreateCourtPayload,
  UpdateCourtPayload,
} from "@/types/court.types";

export function useCourts() {
  return useQuery({
    queryKey: ["courts"],
    queryFn: async () =>
      (await api.get<ApiResponse<Court[]>>("/court")).data.data,
  });
}

export function useCreateCourt() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCourtPayload) =>
      (await api.post("/court", payload)).data.data,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["courts"],
      });
    },
  });
}

export function useUpdateCourt() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      courtId,
      payload,
    }: {
      courtId: string;
      payload: UpdateCourtPayload;
    }) =>
      (await api.patch(`/court/${courtId}`, payload)).data.data,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["courts"],
      });
    },
  });
}

export function useDeleteCourt() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (courtId: string) =>
      (await api.delete(`/court/${courtId}`)).data.data,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["courts"],
      });
    },
  });
}