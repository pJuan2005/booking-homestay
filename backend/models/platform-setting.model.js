const db = require("../common/db");
const {
  getDefaultPlatformCommissionRate,
  getDefaultUsdToVndRate,
  normalizePlatformCommissionRate,
  normalizeUsdToVndRate,
} = require("../common/bookingFinance");

const DEFAULT_PLATFORM_SETTINGS = {
  usdToVndRate: getDefaultUsdToVndRate(),
  platformCommissionRate: getDefaultPlatformCommissionRate(),
};

const SETTING_KEYS = {
  usdToVndRate: "usd_to_vnd_rate",
  platformCommissionRate: "platform_commission_rate",
};

const PlatformSetting = {};

function buildSettingsResponse(rows = []) {
  const settings = { ...DEFAULT_PLATFORM_SETTINGS };

  for (const row of rows) {
    if (row.setting_key === SETTING_KEYS.usdToVndRate) {
      settings.usdToVndRate = normalizeUsdToVndRate(row.setting_value);
    }

    if (row.setting_key === SETTING_KEYS.platformCommissionRate) {
      settings.platformCommissionRate = normalizePlatformCommissionRate(
        row.setting_value,
      );
    }
  }

  return settings;
}

async function ensureDefaultSettings() {
  await db.promise().query(
    `CREATE TABLE IF NOT EXISTS app_settings (
      id INT NOT NULL AUTO_INCREMENT,
      setting_key VARCHAR(100) NOT NULL,
      setting_value VARCHAR(255) NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY idx_app_settings_key (setting_key)
    )`,
  );

  await db.promise().query(
    `INSERT INTO app_settings (setting_key, setting_value)
     VALUES
       (?, ?),
       (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = setting_value`,
    [
      SETTING_KEYS.usdToVndRate,
      String(DEFAULT_PLATFORM_SETTINGS.usdToVndRate),
      SETTING_KEYS.platformCommissionRate,
      String(DEFAULT_PLATFORM_SETTINGS.platformCommissionRate),
    ],
  );
}

PlatformSetting.getPlatformSettings = async () => {
  try {
    await ensureDefaultSettings();

    const [rows] = await db.promise().query(
      `SELECT setting_key, setting_value
       FROM app_settings
       WHERE setting_key IN (?, ?)`,
      [SETTING_KEYS.usdToVndRate, SETTING_KEYS.platformCommissionRate],
    );

    return buildSettingsResponse(rows);
  } catch (error) {
    throw error;
  }
};

PlatformSetting.updatePlatformSettings = async (payload) => {
  await ensureDefaultSettings();

  await db.promise().query(
    `INSERT INTO app_settings (setting_key, setting_value)
     VALUES
       (?, ?),
       (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [
      SETTING_KEYS.usdToVndRate,
      String(normalizeUsdToVndRate(payload.usdToVndRate)),
      SETTING_KEYS.platformCommissionRate,
      String(normalizePlatformCommissionRate(payload.platformCommissionRate)),
    ],
  );

  return PlatformSetting.getPlatformSettings();
};

module.exports = PlatformSetting;
