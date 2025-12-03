import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import Joi from 'joi';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [FRONTEND_URL];

// ============================================
// Security Middleware
// ============================================

// Helmet: Set various HTTP headers for security
app.use(helmet());

// CORS: Restrict to allowed origins
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
}));

// Rate limiting: General endpoint rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => NODE_ENV === 'development',
});

// Rate limiting: Stricter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Body parsers with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Apply rate limiting
app.use(generalLimiter);

// ============================================
// Input Validation Schemas
// ============================================

const messageSchema = Joi.object({
  text: Joi.string().min(1).max(1000).required().trim(),
  sender: Joi.string().valid('user', 'bot').required(),
  timestamp: Joi.date(),
});

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().trim(),
  email: Joi.string().email().required().trim(),
  subject: Joi.string().min(5).max(200).required().trim(),
  message: Joi.string().min(10).max(5000).required().trim(),
});

// ============================================
// Validation Middleware
// ============================================

const validateInput = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  req.body = value;
  next();
};

// ============================================
// API Routes
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Chat endpoint - receive messages
app.post('/api/chat', authLimiter, validateInput(messageSchema), (req, res) => {
  try {
    const { text, sender } = req.body;

    // Simple bot response logic
    let botResponse = '';
    const lowerText = text.toLowerCase();

    if (lowerText.includes('peace') || lowerText.includes('justice')) {
      botResponse = 'BornAgain is dedicated to promoting peace and justice in Tunisia. We focus on SDG 16 to create sustainable development.';
    } else if (lowerText.includes('help') || lowerText.includes('support')) {
      botResponse = 'We provide support through various community programs. How can we assist you today?';
    } else if (lowerText.includes('volunteer') || lowerText.includes('join')) {
      botResponse = 'We\'d love to have you join us! Please visit our Instagram @born_again_tn or contact us for more information.';
    } else {
      botResponse = 'Thank you for your message. The BornAgain team will review your inquiry. Feel free to ask more questions!';
    }

    res.status(200).json({
      success: true,
      botMessage: botResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      message: NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// Contact form submission
app.post('/api/contact', authLimiter, validateInput(contactSchema), (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // In production, send email via email service (SendGrid, Nodemailer, etc.)
    console.log('Contact form submitted:', { name, email, subject, message });

    // TODO: Integrate email service
    // await sendEmail({
    //   to: 'contact@bornagain.tn',
    //   from: email,
    //   subject: `Contact: ${subject}`,
    //   html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    // });

    res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      error: 'Failed to submit contact form',
      message: NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// Newsletter subscription
app.post('/api/newsletter', authLimiter, validateInput(Joi.object({
  email: Joi.string().email().required().trim(),
})), (req, res) => {
  try {
    const { email } = req.body;

    // TODO: Save to database and send confirmation email
    console.log('Newsletter subscription:', email);

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      error: 'Failed to subscribe',
      message: NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// ============================================
// Error Handling Middleware
// ============================================

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);

  // CORS errors
  if (err.message === 'CORS not allowed') {
    return res.status(403).json({ error: 'CORS not allowed for this origin' });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    message: NODE_ENV === 'development' ? err.stack : 'An error occurred',
  });
});

// ============================================
// Server Startup
// ============================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║    BornAgain Backend Server Started              ║
╠═══════════════════════════════════════════════════╣
║ Environment: ${NODE_ENV.padEnd(40)} ║
║ Port: ${String(PORT).padEnd(49)}║
║ Allowed Origins: ${ALLOWED_ORIGINS[0].padEnd(38)}║
║ URL: http://localhost:${PORT}/api/health          │
╚═══════════════════════════════════════════════════╝
  `);
});

export default app;
