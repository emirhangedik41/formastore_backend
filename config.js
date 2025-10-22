module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  MONGODB_URI: getMongoURI(),
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_this_in_production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 900000,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || 100
};

