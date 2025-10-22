// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const {
  validateUserRegistration,
  validateUserLogin
} = require('../middleware/validation');

// @route   POST /api/auth/register
// @desc    Kullanıcı kaydı
// @access  Public
router.post('/register', validateUserRegistration, authController.register);

// @route   POST /api/auth/login
// @desc    Kullanıcı girişi
// @access  Public
router.post('/login', validateUserLogin, authController.login);

// @route   GET /api/auth/profile
// @desc    Kullanıcı profili getir
// @access  Private
router.get('/profile', authenticateToken, authController.getProfile);

// @route   PUT /api/auth/profile
// @desc    Profil güncelle
// @access  Private
router.put('/profile', authenticateToken, authController.updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Şifre değiştir
// @access  Private
router.put('/change-password', authenticateToken, authController.changePassword);

module.exports = router;

