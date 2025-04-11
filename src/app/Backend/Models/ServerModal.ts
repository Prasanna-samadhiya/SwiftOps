import mongoose, { Document, Schema, model, models } from 'mongoose';

// Define the interface for the Server document
export interface IServer extends Document {
  name: string;
  ip: string;
  type: string;
  metrics?: {
    number: string; // ✅ Fixed key name to lowercase
    expiresIn: Date;
  };
  SSH: string;
  alerting: string;
  createdAt?: Date;
}

// Define the Server Schema
const ServerSchema: Schema<IServer> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    ip: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: [true, 'Type is required'], // ✅ Fixed error message
    },
    metrics: {
      number: { type: String }, // ✅ Fixed key structure to match interface
      expiresIn: { type: Date },
    },
    SSH: {
      type: String,
    },
    alerting: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Fix: Check for existing model or define it
const ServerModel = models.Server || model<IServer>('Server', ServerSchema);

export default ServerModel;
