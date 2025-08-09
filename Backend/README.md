# Solo Seller Marketplace Backend

## Features
- Node.js + Express REST API
- MongoDB (Mongoose) for products, orders, admin
- Redis for caching and stock lock
- Razorpay payment integration (webhook ready)
- JWT-based admin authentication

## Structure
- `src/config/` - DB, Redis config
- `src/controllers/` - Route logic
- `src/models/` - Mongoose schemas
- `src/routes/` - Express routers
- `src/services/` - Razorpay, webhook
- `src/middlewares/` - Auth
- `src/utils/` - JWT helpers

## Setup
1. `npm install`
2. Set up `.env` (see sample)
3. `node src/server.js`

## Endpoints
- `/api/products` - Product CRUD
- `/api/orders` - Order create/track/admin
- `/api/admin` - Admin login/analytics
- `/api/auth` - Auth login

---

See code for details. Frontend and deployment instructions in root README.
