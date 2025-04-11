import mongoose, { Document, Schema, model, models } from "mongoose";

// Define the interface for Workflow documents
export interface IWorkflow extends Document {
  name: string;
  url: string;
  branch: string;
  buildscript: string;
  testscript: string;
  deploymentscript: string;
  createdAt?: Date;
}

// ✅ Avoid Mongoose Cache Issue and OverwriteModelError
const WorkflowSchema: Schema<IWorkflow> = new Schema(
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

// ✅ Use models.Workflow to prevent duplicate model registration
const WorkflowModel =
  (mongoose.models.Workflow as mongoose.Model<IWorkflow>) ||
  mongoose.model<IWorkflow>("Workflow", WorkflowSchema);

export default WorkflowModel;
