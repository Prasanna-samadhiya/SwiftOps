import { NextRequest, NextResponse } from 'next/server';
import UserModal from '../../Models/UserModal';
import Config from '../../Config/Config';
import jwt from 'jsonwebtoken';
import CICDModal from '../../Models/CICDModal';
import ServerModal from '../../Models/ServerModal';

export async function DELETE(req: NextRequest) {
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
    // 2️⃣ Verify the token and get the user ID
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
    const { serverId } = body;

    // 4️⃣ Validate request body
    if (!serverId) {
      return NextResponse.json(
        { success: false, message: "Server ID is required" },
        { status: 400 }
      );
    }

    // 5️⃣ Find and delete the CICD pipeline
    const deletedServer = await ServerModal.findByIdAndDelete(serverId);

    if (!deletedServer) {
      return NextResponse.json(
        { success: false, message: "Server not found" },
        { status: 404 }
      );
    }

    // 6️⃣ Remove CICD ID from the user's Cicds array
    await UserModal.findByIdAndUpdate(user._id, {
      $pull: { Servers: serverId }
    });

    return NextResponse.json({
      success: true,
      message: "Server deleted successfully and removed from user",
      deleted: deletedServer,
      user:user
    });
  } catch (error) {
    console.error("Error deleting Server :", error);
    return NextResponse.json(
      { success: false, message: "Invalid authentication token" },
      { status: 403 }
    );
  }
}
