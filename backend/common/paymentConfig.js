const {
  convertUsdToVnd,
  getDefaultUsdToVndRate,
  normalizeUsdToVndRate,
} = require("./bookingFinance");

const DEFAULT_PAYMENT_CONFIG = {
  bankCode: process.env.PAYMENT_BANK_CODE || "TCB",
  bankName: process.env.PAYMENT_BANK_NAME || "Techcombank",
  accountNumber: process.env.PAYMENT_ACCOUNT_NUMBER || "19071766471019",
  accountName: process.env.PAYMENT_ACCOUNT_NAME || "PHAM XUAN CHUAN",
};

function getPaymentConfig() {
  return {
    ...DEFAULT_PAYMENT_CONFIG,
  };
}

function buildPaymentInfo(booking, platformSettings = {}) {
  const config = getPaymentConfig();
  const amountUsd = Number(booking.totalPrice || 0);
  const exchangeRate = normalizeUsdToVndRate(
    platformSettings.usdToVndRate || getDefaultUsdToVndRate(),
  );
  const amountVnd = convertUsdToVnd(amountUsd, exchangeRate);
  const transferContent =
    booking.paymentReference || booking.bookingCode || `HSBK${booking.id}`;

  return {
    method: booking.paymentMethod || "bank_transfer",
    bankCode: config.bankCode,
    bankName: config.bankName,
    accountNumber: config.accountNumber,
    accountName: config.accountName,
    amount: amountUsd,
    amountUsd,
    amountVnd,
    exchangeRate,
    currency: "VND",
    transferContent,
    qrImageUrl: `https://img.vietqr.io/image/${config.bankCode}-${config.accountNumber}-compact2.png?amount=${encodeURIComponent(
      String(amountVnd),
    )}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(config.accountName)}`,
  };
}

module.exports = {
  getPaymentConfig,
  buildPaymentInfo,
};
