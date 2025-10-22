// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');

// Validation hatalarını kontrol et
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation hatası',
      errors: errors.array()
    });
  }
  next();
};

// Kullanıcı kayıt validation
const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Kullanıcı adı 3-20 karakter arasında olmalıdır')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Kullanıcı adı sadece harf, rakam ve _ içerebilir'),
  
  body('email')
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalıdır')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir'),
  
  body('firstName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Ad 2-50 karakter arasında olmalıdır'),
  
  body('lastName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Soyad 2-50 karakter arasında olmalıdır'),
  
  handleValidationErrors
];

// Kullanıcı giriş validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Şifre gereklidir'),
  
  handleValidationErrors
];

// Ürün validation
const validateProduct = [
  body('name')
    .isLength({ min: 3, max: 100 })
    .withMessage('Ürün adı 3-100 karakter arasında olmalıdır'),
  
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Açıklama 10-1000 karakter arasında olmalıdır'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Fiyat 0\'dan büyük olmalıdır'),
  
  body('category')
    .isIn(['jersey', 'shoes', 'accessories', 'equipment'])
    .withMessage('Geçerli bir kategori seçiniz'),
  
  body('brand')
    .isLength({ min: 2, max: 50 })
    .withMessage('Marka 2-50 karakter arasında olmalıdır'),
  
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stok miktarı 0\'dan küçük olamaz'),
  
  body('sizes')
    .isArray({ min: 1 })
    .withMessage('En az bir beden seçilmelidir'),
  
  body('colors')
    .isArray({ min: 1 })
    .withMessage('En az bir renk seçilmelidir'),
  
  handleValidationErrors
];

// Sipariş validation
const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('En az bir ürün seçilmelidir'),
  
  body('items.*.product')
    .isMongoId()
    .withMessage('Geçerli bir ürün ID\'si giriniz'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Miktar en az 1 olmalıdır'),
  
  body('items.*.size')
    .notEmpty()
    .withMessage('Beden seçilmelidir'),
  
  body('items.*.color')
    .notEmpty()
    .withMessage('Renk seçilmelidir'),
  
  body('paymentMethod')
    .isIn(['credit_card', 'bank_transfer', 'cash_on_delivery'])
    .withMessage('Geçerli bir ödeme yöntemi seçiniz'),
  
  body('shippingAddress.firstName')
    .isLength({ min: 2, max: 50 })
    .withMessage('Ad 2-50 karakter arasında olmalıdır'),
  
  body('shippingAddress.lastName')
    .isLength({ min: 2, max: 50 })
    .withMessage('Soyad 2-50 karakter arasında olmalıdır'),
  
  body('shippingAddress.street')
    .isLength({ min: 5, max: 200 })
    .withMessage('Adres 5-200 karakter arasında olmalıdır'),
  
  body('shippingAddress.city')
    .isLength({ min: 2, max: 50 })
    .withMessage('Şehir 2-50 karakter arasında olmalıdır'),
  
  body('shippingAddress.postalCode')
    .isLength({ min: 5, max: 10 })
    .withMessage('Posta kodu 5-10 karakter arasında olmalıdır'),
  
  body('shippingAddress.country')
    .isLength({ min: 2, max: 50 })
    .withMessage('Ülke 2-50 karakter arasında olmalıdır'),
  
  body('shippingAddress.phone')
    .isMobilePhone('tr-TR')
    .withMessage('Geçerli bir telefon numarası giriniz'),
  
  handleValidationErrors
];

// MongoDB ObjectId validation
const validateObjectId = (paramName) => [
  param(paramName)
    .isMongoId()
    .withMessage('Geçerli bir ID formatı giriniz'),
  
  handleValidationErrors
];

// Query parametreleri validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Sayfa numarası 1\'den büyük olmalıdır'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit 1-100 arasında olmalıdır'),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateProduct,
  validateOrder,
  validateObjectId,
  validatePagination,
  handleValidationErrors
};

