import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// interfaces
interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(cadidatePassword: string): boolean;
}

interface IRestaurant extends Document {
  name: string;
  address: string;
  cuisine?: string;
  distinction: number;
  description?: string;
  website?: string;
  number?: string;
  green?: number;
  latitude?: string;
  longitude?: string;
}

interface IReview extends Document {
  restaurant: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

// connect to mongodb
const URI = process.env.MONGO_URI as string;

if (!URL) {
  console.error('MONGO_URI is not defined in environment variables');
  throw new Error('MONGO_URI is required');
}

mongoose
  .connect(URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => {
    console.error('MongoDB connection error: ', {
      error: error.message,
      code: error.code,
      uri: URI.replace(/mongodb\+srv:\/\/.*@/, 'mongodb+srv://[hidden]@'),
    });
    throw error;
  });

// Schemas
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

const restaurantSchema = new mongoose.Schema<IRestaurant>({
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

const reviewSchema = new mongoose.Schema<IReview>({
  restaurant: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Review = mongoose.model('Review', reviewSchema);

export { User, Restaurant, Review };
