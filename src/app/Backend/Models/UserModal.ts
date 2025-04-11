import mongoose, { Document, Schema, model, models } from 'mongoose';

// Define the interface for the user document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  OTP?: { Number: string; ExpiresIn: Date };
  Cicds: mongoose.Types.ObjectId[]; // ✅ Now an array of ObjectIds
  Servers: mongoose.Types.ObjectId[]; // ✅ Now an array of ObjectIds
  Workflows: mongoose.Types.ObjectId[]; // ✅ Now an array of ObjectIds
  createdAt?: Date;
}

// Define the User Schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    OTP: {
      Number: {
        type: String,
        required: false,
      },
      ExpiresIn: {
        type: Date,
        required: false,
        default: Date.now,
      },
    },
    Cicds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CICD', // ✅ Reference to CICD model
      },
    ],
    Servers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server', // ✅ Reference to Server model
      },
    ],
    Workflows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workflow', // ✅ Reference to Workflow model
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Mongoose model if it doesn’t already exist
export default models.User || model<IUser>('User', userSchema);
