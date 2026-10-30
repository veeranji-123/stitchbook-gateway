const { coreUrl, paymentsUrl, notificationsUrl, adminUrl } = require('./config');

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
  if (path === '/api' || path.startsWith('/api/')) return coreUrl;
  return null;
}

module.exports = { targetFor };
