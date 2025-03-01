require("dotenv").config(); // Ensure environment variables are loaded

if (!process.env.PAYTM_MID || !process.env.PAYTM_KEY || !process.env.PAYTM_WEBSITE) {
  throw new Error("Missing required Paytm configuration variables. Check your .env file.");
}

const PaytmConfig = Object.freeze({
  MID: process.env.PAYTM_MID,
  KEY: process.env.PAYTM_KEY,
  WEBSITE: process.env.PAYTM_WEBSITE,
  INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID || "Retail",
  CHANNEL_ID: process.env.PAYTM_CHANNEL_ID || "WEB",
  CALLBACK_URL: process.env.PAYTM_CALLBACK_URL || "http://localhost:4000/api/payment/callback",
});

module.exports = PaytmConfig;
