// routes/index.js
const express = require('express');
const router = express.Router();

// Route dosyalarını import et
const authRoutes = require('./auth');

// Ana sayfa
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'FORMASTORE API - Hoş geldiniz!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth'
    }
  });
});

// Route'ları bağla
router.use('/auth', authRoutes);

module.exports = router;



