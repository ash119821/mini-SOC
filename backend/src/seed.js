require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Log = require('./models/Log');

(async () => {
  const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/miniSOC';
  await mongoose.connect(MONGO);
  const pwd = 'admin123';
  const hash = await bcrypt.hash(pwd, 10);
  const admin = await User.findOneAndUpdate({ username: 'admin' }, {
    username: 'admin', email: 'admin@example.com', passwordHash: hash, role: 'admin'
  }, { upsert: true, new: true });
  console.log('Admin user created:', admin.username, 'password:', pwd);

  // Sample logs
  await Log.create([
    { attackType: 'SQLI', sourceIP: '45.112.13.90', target: '/login', message: "admin' OR '1'='1" },
    { attackType: 'XSS', sourceIP: '198.51.100.22', target: '/profile', message: '<script>alert(1)</script>' }
  ]);
  console.log('Sample logs created');
  process.exit(0);
})();
