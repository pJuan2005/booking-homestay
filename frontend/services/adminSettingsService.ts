import { apiRequest } from "@/lib/apiClient";

export interface PlatformSettings {
  usdToVndRate: number;
  platformCommissionRate: number;
  platformCommissionPercent: number;
}

interface PlatformSettingsResponse {
  message?: string;
  settings: PlatformSettings;
}

function mapPlatformSettings(payload: any): PlatformSettings {
  return {
    usdToVndRate: Number(payload?.usdToVndRate || 25000),
    platformCommissionRate: Number(payload?.platformCommissionRate || 0.1),
    platformCommissionPercent: Number(payload?.platformCommissionPercent || 10),
  };
}

export async function getAdminPlatformSettings() {
  const response = await apiRequest<PlatformSettingsResponse>("/api/admin/settings");

  return {
    settings: mapPlatformSettings(response.settings),
  };
}

export async function updateAdminPlatformSettings(payload: {
  usdToVndRate: number;
  platformCommissionPercent: number;
}) {
  const response = await apiRequest<PlatformSettingsResponse>("/api/admin/settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return {
    message: response.message || "Platform settings updated successfully.",
    settings: mapPlatformSettings(response.settings),
  };
}
