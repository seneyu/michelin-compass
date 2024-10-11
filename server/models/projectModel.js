const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// // connect to mongodb
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('MongoDB connection error: ', err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashpassword: {
    type: String,
    required: true,
  },
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
  },
  distinction: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  number: {
    type: String,
  },
  green: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { User, Restaurant };
