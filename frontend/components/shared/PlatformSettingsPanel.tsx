"use client";

import { useEffect, useState } from "react";
import { DollarSign, Percent, Save, Settings } from "lucide-react";
import {
  getAdminPlatformSettings,
  updateAdminPlatformSettings,
  type PlatformSettings,
} from "@/services/adminSettingsService";

function formatPercentValue(value: number) {
  return `${Number(value || 0).toFixed(2).replace(/\.00$/, "")}%`;
}

export function PlatformSettingsPanel() {
  const [settings, setSettings] = useState<PlatformSettings>({
    usdToVndRate: 25000,
    platformCommissionRate: 0.1,
    platformCommissionPercent: 10,
  });
  const [formValues, setFormValues] = useState({
    usdToVndRate: "25000",
    platformCommissionPercent: "10",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPlatformSettings() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await getAdminPlatformSettings();
        setSettings(response.settings);
        setFormValues({
          usdToVndRate: String(response.settings.usdToVndRate),
          platformCommissionPercent: String(
            response.settings.platformCommissionPercent,
          ),
        });
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load platform settings right now.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadPlatformSettings();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await updateAdminPlatformSettings({
        usdToVndRate: Number(formValues.usdToVndRate),
        platformCommissionPercent: Number(formValues.platformCommissionPercent),
      });

      setSettings(response.settings);
      setFormValues({
        usdToVndRate: String(response.settings.usdToVndRate),
        platformCommissionPercent: String(
          response.settings.platformCommissionPercent,
        ),
      });
      setSuccessMessage(response.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update platform settings right now.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="hs-card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Settings size={18} color="#2563EB" />
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              color: "#1e293b",
              fontWeight: 800,
              fontSize: "1.05rem",
            }}
          >
            Platform Settings
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.82rem" }}>
            Adjust the exchange rate and platform commission used in QR payments,
            host payouts, and admin reports.
          </p>
        </div>
      </div>

      <div style={{ padding: "22px 24px" }}>
        {errorMessage && (
          <div
            style={{
              marginBottom: 16,
              borderRadius: 12,
              padding: "12px 14px",
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#b91c1c",
              fontSize: "0.84rem",
            }}
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              marginBottom: 16,
              borderRadius: 12,
              padding: "12px 14px",
              border: "1px solid #bbf7d0",
              background: "#f0fdf4",
              color: "#15803d",
              fontSize: "0.84rem",
            }}
          >
            {successMessage}
          </div>
        )}

        <div className="row g-3" style={{ marginBottom: 20 }}>
          <div className="col-md-6">
            <div
              style={{
                borderRadius: 18,
                border: "1px solid #dbeafe",
                background: "#f8fbff",
                padding: "18px 18px 16px",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <DollarSign size={18} color="#2563EB" />
                <div style={{ fontWeight: 700, color: "#1e293b" }}>
                  USD to VND Rate
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.55rem",
                  fontWeight: 800,
                  color: "#1e293b",
                  marginBottom: 4,
                }}
              >
                {isLoading ? "..." : settings.usdToVndRate.toLocaleString("en-US")}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                Used to convert the booking total into a ready-to-pay VND QR
                amount.
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              style={{
                borderRadius: 18,
                border: "1px solid #ede9fe",
                background: "#fbfaff",
                padding: "18px 18px 16px",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <Percent size={18} color="#7c3aed" />
                <div style={{ fontWeight: 700, color: "#1e293b" }}>
                  Platform Commission
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.55rem",
                  fontWeight: 800,
                  color: "#1e293b",
                  marginBottom: 4,
                }}
              >
                {isLoading ? "..." : formatPercentValue(settings.platformCommissionPercent)}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                Host payout automatically uses the remaining{" "}
                {formatPercentValue(100 - settings.platformCommissionPercent)}.
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label
                htmlFor="usdToVndRate"
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 700,
                  color: "#1e293b",
                  fontSize: "0.9rem",
                }}
              >
                Exchange Rate
              </label>
              <input
                id="usdToVndRate"
                type="number"
                min="1"
                step="1"
                value={formValues.usdToVndRate}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    usdToVndRate: event.target.value,
                  }))
                }
                className="form-control"
                style={{ minHeight: 48, borderRadius: 14 }}
              />
              <div style={{ color: "#94a3b8", fontSize: "0.77rem", marginTop: 6 }}>
                Example: `25000` means 1 USD = 25,000 VND.
              </div>
            </div>

            <div className="col-md-6">
              <label
                htmlFor="platformCommissionPercent"
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 700,
                  color: "#1e293b",
                  fontSize: "0.9rem",
                }}
              >
                Commission (%)
              </label>
              <input
                id="platformCommissionPercent"
                type="number"
                min="0"
                max="99.99"
                step="0.01"
                value={formValues.platformCommissionPercent}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    platformCommissionPercent: event.target.value,
                  }))
                }
                className="form-control"
                style={{ minHeight: 48, borderRadius: 14 }}
              />
              <div style={{ color: "#94a3b8", fontSize: "0.77rem", marginTop: 6 }}>
                The system calculates this percentage on each confirmed booking
                before summing the totals.
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              className="btn-primary-hs"
              disabled={isLoading || isSaving}
              style={{
                minWidth: 180,
                opacity: isLoading || isSaving ? 0.7 : 1,
                cursor: isLoading || isSaving ? "not-allowed" : "pointer",
              }}
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
