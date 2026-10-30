const http = require('http');
const httpProxy = require('http-proxy');
const { port, coreUrl, paymentsUrl, notificationsUrl, adminUrl, customerUrl, tailorUrl } = require('./config');
const { targetFor } = require('./routes');

const proxy = httpProxy.createProxyServer({ xfwd: true });

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

proxy.on('error', (error, req, res) => {
  console.error(`[gateway] ${req.method} ${req.url} failed: ${error.message}`);
  if (res.writeHead && !res.headersSent) {
    sendJson(res, 502, { error: 'Upstream unavailable' });
    return;
  }
  if (res.destroy) res.destroy();
});

const server = http.createServer((req, res) => {
  const path = (req.url || '/').split('?')[0];
  if (req.method === 'GET' && path === '/') {
    sendJson(res, 200, {
      service: 'stitchbook-gateway',
      status: 'ok',
      core: coreUrl,
      payments: paymentsUrl,
      notifications: notificationsUrl,
      admin: adminUrl,
      customer: customerUrl,
      tailor: tailorUrl,
    });
    return;
  }

  const target = targetFor(req.url || '/', req.method);
  if (!target) {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }
  proxy.web(req, res, { target });
});

server.on('upgrade', (req, socket, head) => {
  const target = targetFor(req.url || '/', req.method);
  if (!target) {
    socket.destroy();
    return;
  }
  proxy.ws(req, socket, head, { target });
});

server.listen(port, () => {
  console.log(`stitchbook-gateway listening on ${port}`);
});
