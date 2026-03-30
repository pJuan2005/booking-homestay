function normalizeMoney(value) {
  return Number(Number(value || 0).toFixed(2));
}

function getDefaultUsdToVndRate() {
  const parsed = Number(process.env.USD_TO_VND_RATE || 25000);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 25000;
}

function getDefaultPlatformCommissionRate() {
  const parsed = Number(process.env.PLATFORM_COMMISSION_RATE || 0.1);
  return Number.isFinite(parsed) && parsed >= 0 && parsed < 1 ? parsed : 0.1;
}

function normalizeUsdToVndRate(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0
    ? normalizeMoney(parsed)
    : getDefaultUsdToVndRate();
}

function normalizePlatformCommissionRate(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 && parsed < 1
    ? Number(parsed.toFixed(4))
    : getDefaultPlatformCommissionRate();
}

function convertUsdToVnd(amountUsd, exchangeRate = getDefaultUsdToVndRate()) {
  return Math.round(Number(amountUsd || 0) * normalizeUsdToVndRate(exchangeRate));
}

function calculateRevenueSplit(
  grossRevenue,
  commissionRate = getDefaultPlatformCommissionRate(),
) {
  const gross = normalizeMoney(grossRevenue);
  const normalizedCommissionRate =
    normalizePlatformCommissionRate(commissionRate);
  const platformRevenue = normalizeMoney(gross * normalizedCommissionRate);
  const hostPayout = normalizeMoney(gross - platformRevenue);

  return {
    grossRevenue: gross,
    platformCommissionRate: normalizedCommissionRate,
    platformRevenue,
    hostPayout,
  };
}

function calculateRevenueTotals(rows, commissionRate) {
  return (Array.isArray(rows) ? rows : []).reduce(
    (totals, row) => {
      const split = calculateRevenueSplit(row?.totalPrice, commissionRate);
      totals.grossRevenue = normalizeMoney(totals.grossRevenue + split.grossRevenue);
      totals.platformRevenue = normalizeMoney(
        totals.platformRevenue + split.platformRevenue,
      );
      totals.hostPayout = normalizeMoney(totals.hostPayout + split.hostPayout);

      return totals;
    },
    {
      grossRevenue: 0,
      platformRevenue: 0,
      hostPayout: 0,
      platformCommissionRate: normalizePlatformCommissionRate(commissionRate),
    },
  );
}

module.exports = {
  normalizeMoney,
  getDefaultUsdToVndRate,
  getDefaultPlatformCommissionRate,
  normalizeUsdToVndRate,
  normalizePlatformCommissionRate,
  convertUsdToVnd,
  calculateRevenueSplit,
  calculateRevenueTotals,
};
