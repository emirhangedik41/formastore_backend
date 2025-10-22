// config/database.js
const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    console.log(`🔗 MongoDB bağlantısı kuruluyor: ${config.MONGODB_URI}`);
    
    const conn = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('💡 MongoDB bağlantı hatası. Lütfen şunları kontrol edin:');
    console.error('   1. MongoDB servisi çalışıyor mu?');
    console.error('   2. Bağlantı stringi doğru mu?');
    console.error('   3. Ağ bağlantısı var mı?');
    console.error(`🔍 Kullanılan URI: ${config.MONGODB_URI}`);
    process.exit(1);
  }
};

module.exports = connectDB;
