# BornAgain Backend

Secure, production-ready backend API for the BornAgain NGO application.

## Features

✅ **Security**
- Helmet.js for HTTP headers security
- CORS with origin whitelist
- Rate limiting on endpoints
- Input validation with Joi
- XSS, CSRF protection

✅ **API Endpoints**
- `GET /api/health` - Health check
- `POST /api/chat` - Chatbot message handling
- `POST /api/contact` - Contact form submissions
- `POST /api/newsletter` - Newsletter subscriptions

✅ **Best Practices**
- Environment-based configuration
- Error handling middleware
- Request validation
- Comprehensive logging
- Status codes compliance

## Installation

```bash
cd backend
npm install
# or with pnpm
pnpm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your values:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

## Running

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## API Documentation

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "text": "Hello, how can you help?",
  "sender": "user"
}
```

**Response:**
```json
{
  "success": true,
  "botMessage": "...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I would like to know more about your programs..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Newsletter Subscription
```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Headers

The following security headers are automatically set:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy: default-src 'self'`

## Rate Limiting

- **General endpoints**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes

Rate limiting is skipped in development mode.

## Error Handling

All errors are returned with appropriate HTTP status codes:
- `400` - Bad request / validation error
- `403` - CORS not allowed
- `404` - Not found
- `429` - Too many requests (rate limited)
- `500` - Server error

## Development

### Technologies
- Express.js - Web framework
- Helmet.js - HTTP security headers
- CORS - Cross-origin request handling
- Express Rate Limit - Rate limiting
- Joi - Input validation
- Dotenv - Environment variable management

### Project Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Deployment

### Vercel
```bash
vercel deploy
```

### Heroku
```bash
git push heroku main
```

### Docker
```bash
docker build -t born-again-backend .
docker run -p 3001:3001 born-again-backend
```

## TODO

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email service integration (SendGrid/Nodemailer)
- [ ] Authentication with JWT
- [ ] User session management
- [ ] Analytics integration
- [ ] Logging service (Winston/Pino)
- [ ] Testing (Jest/Mocha)
- [ ] API documentation (Swagger/OpenAPI)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## License

© 2024 BornAgain NGO. All rights reserved.
