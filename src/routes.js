const { coreUrl, paymentsUrl, notificationsUrl, adminUrl, customerUrl, tailorUrl } = require('./config');

function targetFor(url) {
  const path = url.split('?')[0];
  if (path === '/internal' || path.startsWith('/internal/')) return null;
  if (path === '/api/payments' || path.startsWith('/api/payments/')) return paymentsUrl;
  if (path === '/api/admin' || path.startsWith('/api/admin/')) return adminUrl;
  if (
    path === '/api/notifications' || path.startsWith('/api/notifications/')
    || path === '/api/push' || path.startsWith('/api/push/')
    || path === '/socket.io' || path.startsWith('/socket.io/')
  ) {
    return notificationsUrl;
  }
  if (path === '/api/auth/register/tailor' || path === '/api/auth/login/tailor') return tailorUrl;
  if (path === '/api/auth' || path.startsWith('/api/auth/')) return customerUrl;
  if (path === '/api/tailors' || path.startsWith('/api/tailors/')) return customerUrl;
  if (path === '/api/bookings/tailor' || path.startsWith('/api/bookings/tailor/')) return tailorUrl;
  if (/^\/api\/bookings\/[^/]+\/status$/.test(path)) return tailorUrl;
  if (/^\/api\/bookings\/[^/]+\/payment-status$/.test(path)) return tailorUrl;
  if (path === '/api/bookings' || path.startsWith('/api/bookings/')) return customerUrl;
  if (path === '/api' || path.startsWith('/api/')) return coreUrl;
  return null;
}

module.exports = { targetFor };
