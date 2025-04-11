import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '../../Middleware/middleware';
import UserModal from '../../Models/UserModal';
import Config from '../../Config/Config';
import jwt from 'jsonwebtoken';
import Workflow from '../../Models/WorkflowModal';

export async function POST(req: NextRequest) {
  await Config();

  // 1️⃣ Extract the token from the Authorization header
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token missing from headers" },
      { status: 401 }
    );
  }

  try {
    // 2️⃣ Verify the token (Runs in Node.js environment)
    const decoded = jwt.verify(token, "prasanna") as { id: string };
    const user = await UserModal.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Parse request body
    const body = await req.json();
    const { name, url, branch, buildscript, testscript, deploymentscript } = body;

    // 4️⃣ Validate request body
    if (!name || !url || !branch || !buildscript || !testscript || !deploymentscript) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 5️⃣ Save the Workflow to MongoDB
    const newWorkflow = new Workflow({
      name,
      url,
      branch,
      buildscript,
      testscript,
      deploymentscript,
    });

    await newWorkflow.save();

    user.Workflows.push(newWorkflow._id);

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Workflow created successfully",
      userId: user,
      workflow: newWorkflow,
    });
  } catch (error) {
    console.error("Error creating workflow:", error);
    return NextResponse.json(
      { success: false, message: "Invalid authentication token" },
      { status: 403 }
    );
  }
}
