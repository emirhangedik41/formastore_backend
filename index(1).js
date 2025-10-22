const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Config ve database import
const config = require('./config/config');
const connectDB = require('./config/database');

// Middleware import
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Routes import
const routes = require('./routes');

// Database bağlantısını başlat
connectDB();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS, // 15 dakika
  max: config.RATE_LIMIT_MAX_REQUESTS, // Her IP için maksimum 100 istek
  message: {
    success: false,
    message: 'Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin'
  }
});

// Middleware
app.use(limiter);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`🚀 FORMASTORE Server ${PORT} portunda çalışıyor`);
  console.log(`📱 API Endpoints: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${config.NODE_ENV}`);
});



