const { coreUrl, paymentsUrl, notificationsUrl, adminUrl, customerUrl, tailorUrl } = require('./config');

function targetFor(url, method) {
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
  if (method === 'POST' && /^\/api\/tailors\/[^/]+\/upload-(image|portfolio)$/.test(path)) return coreUrl;
  if (method === 'POST' && /^\/api\/bookings\/[^/]+\/ironing-items\/[^/]+\/photos$/.test(path)) return coreUrl;
  if (path === '/uploads' || path.startsWith('/uploads/')) return coreUrl;
  if (path === '/api/messages' || path.startsWith('/api/messages/')) return customerUrl;
  if (method === 'PUT' && /^\/api\/tailors\/[^/]+$/.test(path)) return tailorUrl;
  if (path === '/api/analytics' || path.startsWith('/api/analytics/')) return tailorUrl;
  if (path === '/api/tailors' || path.startsWith('/api/tailors/')) return customerUrl;
  if (path === '/api/tailor' || path.startsWith('/api/tailor/')) return tailorUrl;
  if (path === '/api/slots/block') return tailorUrl;
  if (path === '/api/bookings/tailor' || path.startsWith('/api/bookings/tailor/')) return tailorUrl;
  if (/^\/api\/bookings\/[^/]+\/status$/.test(path)) return tailorUrl;
  if (/^\/api\/bookings\/[^/]+\/payment-status$/.test(path)) return tailorUrl;
  if (method === 'PUT' && /^\/api\/bookings\/[^/]+\/measurements$/.test(path)) return tailorUrl;
  if (method === 'PUT' && /^\/api\/ratings\/[^/]+\/reply$/.test(path)) return tailorUrl;
  if (path === '/api/ratings' || path.startsWith('/api/ratings/')) return customerUrl;
  if (path === '/api/user' || path.startsWith('/api/user/')) return customerUrl;
  if (path === '/api/measurements' || path.startsWith('/api/measurements/')) return customerUrl;
  if (path === '/api/bookings' || path.startsWith('/api/bookings/')) return customerUrl;
  if (path === '/api' || path.startsWith('/api/')) return coreUrl;
  return null;
}

module.exports = { targetFor };
