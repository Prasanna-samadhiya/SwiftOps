import mongoose, { Document, Schema, model, models } from 'mongoose';

// Define the interface for CICD documents
export interface ICICD extends Document {
  name: string;
  url: string;
  branch: string;
  buildscript: string;
  testscript: string;
  deploymentscript: string;
  createdAt?: Date;
}

// ✅ Fix OverwriteModelError and Schema Registration Issue
const CICDSchema: Schema<ICICD> = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    branch: { type: String, required: true },
    buildscript: { type: String, required: true },
    testscript: { type: String, required: true },
    deploymentscript: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Use TypeScript type assertion to prevent type errors
const CICDModel =
  (mongoose.models.CICD as mongoose.Model<ICICD>) ||
  mongoose.model<ICICD>('CICD', CICDSchema);

export default CICDModel;
