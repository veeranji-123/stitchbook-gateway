# stitchbook-gateway

Public entry point for StitchBook. The app talks to this service. It listens on port **8080**.

| Path | Forwards to |
| --- | --- |
| `/api/auth` customer paths, `/api/tailors`, `/api/user`, `/api/measurements`, `/api/ratings`, customer bookings | `stitchbook-customer` |
| `PUT /api/bookings/:id/measurements`, `PUT /api/ratings/:id/reply` | `stitchbook-tailor` |
| `/api/auth/login/tailor`, `/api/auth/register/tailor`, `/api/tailor`, `/api/slots/block`, `PUT /api/tailors/:id`, `/api/analytics`, shop booking updates | `stitchbook-tailor` |
| `/api/admin` | `stitchbook-admin` |
| `/api/payments` | `stitchbook-payments` |
| `/api/notifications`, `/api/push`, `/socket.io` | `stitchbook-notifications` |
| other `/api/` paths | `stitchbook-core` |

`/internal` is not forwarded. Core, payments, and notifications call each other directly.

The request body is passed through unchanged, so Razorpay webhook signatures still match.

## Run

```bash
cp .env.example .env
npm install
npm start
```

`GET /` returns the gateway name and the upstream addresses.
