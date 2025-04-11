import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Config from '../../Config/Config';
import UserModal from '../../Models/UserModal';
import ServerModal from '../../Models/ServerModal';

export async function POST(req: NextRequest) {
  await Config();

  // 1️⃣ Extract the token from the Authorization header
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // "Bearer <token>"
  console.log(token)
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

    // 3️⃣ Extract request body
    const body = await req.json();
    const { name, ip, type, metrics, SSH, alerting } = body;

    // 4️⃣ Validate request body
    if (!name || !ip || !type || !SSH || !alerting) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // 5️⃣ Create new Server entry
    const newServer = new ServerModal({
      name,
      ip,
      type,
      metrics,
      SSH,
      alerting,
    });

    await newServer.save();

    user.Servers.push(newServer._id);

    await user.save();

    // 7️⃣ Return response
    return NextResponse.json({
      success: true,
      message: "Server created successfully",
      server: newServer,
      user: user
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid authentication token",errorocc:error },
      { status: 403 }
    );
  }
}
