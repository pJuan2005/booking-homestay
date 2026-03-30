const PlatformSetting = require("../models/platform-setting.model");
const {
  normalizePlatformCommissionRate,
  normalizeUsdToVndRate,
} = require("../common/bookingFinance");

function mapSettingsResponse(settings) {
  const platformCommissionRate = normalizePlatformCommissionRate(
    settings.platformCommissionRate,
  );

  return {
    usdToVndRate: normalizeUsdToVndRate(settings.usdToVndRate),
    platformCommissionRate,
    platformCommissionPercent: Number((platformCommissionRate * 100).toFixed(2)),
  };
}

exports.getAdminPlatformSettings = async (_req, res) => {
  try {
    const settings = await PlatformSetting.getPlatformSettings();

    return res.json({
      settings: mapSettingsResponse(settings),
    });
  } catch (_error) {
    return res.status(500).json({
      message: "Unable to load platform settings right now.",
    });
  }
};

exports.updateAdminPlatformSettings = async (req, res) => {
  const usdToVndRate = Number(req.body.usdToVndRate);
  const platformCommissionPercent = Number(req.body.platformCommissionPercent);

  if (!Number.isFinite(usdToVndRate) || usdToVndRate <= 0) {
    return res.status(400).json({
      message: "Please provide a valid USD to VND exchange rate.",
    });
  }

  if (
    !Number.isFinite(platformCommissionPercent) ||
    platformCommissionPercent < 0 ||
    platformCommissionPercent >= 100
  ) {
    return res.status(400).json({
      message: "Platform commission must be between 0 and 99.99 percent.",
    });
  }

  try {
    const settings = await PlatformSetting.updatePlatformSettings({
      usdToVndRate,
      platformCommissionRate: platformCommissionPercent / 100,
    });

    return res.json({
      message: "Platform settings updated successfully.",
      settings: mapSettingsResponse(settings),
    });
  } catch (_error) {
    return res.status(500).json({
      message: "Unable to update platform settings right now.",
    });
  }
};
