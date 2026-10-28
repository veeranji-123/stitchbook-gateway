require('dotenv').config();

const REQUIRED_ENV = ['CORE_URL', 'PAYMENTS_URL', 'NOTIFICATIONS_URL'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  missing.forEach((key) => console.error(`[fatal] Missing required environment variable: ${key}`));
  process.exit(1);
}

function trim(url) {
  return url.replace(/\/$/, '');
}

module.exports = {
  port: parseInt(process.env.PORT || '8080', 10),
  coreUrl: trim(process.env.CORE_URL),
  paymentsUrl: trim(process.env.PAYMENTS_URL),
  notificationsUrl: trim(process.env.NOTIFICATIONS_URL),
};
