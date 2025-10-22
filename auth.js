// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// JWT token doğrulama middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Erişim token\'ı bulunamadı'
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Hesabınız deaktif edilmiş'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token süresi dolmuş'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Admin yetkisi kontrolü
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Bu işlem için admin yetkisi gereklidir'
    });
  }
  next();
};

// Kullanıcı kendi hesabına mı erişiyor kontrolü
const requireOwnershipOrAdmin = (req, res, next) => {
  const userId = req.params.userId || req.params.id;
  
  if (req.user.role === 'admin' || req.user._id.toString() === userId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Bu işlem için yetkiniz yok'
  });
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireOwnershipOrAdmin
};

