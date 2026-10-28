# stitchbook-gateway

Public entry point for StitchBook. The app talks to this service. It listens on port **8080**.

| Path | Forwards to |
| --- | --- |
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

`GET /` returns the gateway name and the three upstream addresses.
