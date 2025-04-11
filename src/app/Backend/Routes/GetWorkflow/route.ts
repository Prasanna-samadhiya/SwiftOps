import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '../../Middleware/middleware';
import UserModal from '../../Models/UserModal';
import Config from '../../Config/Config';
import jwt from 'jsonwebtoken';
import CICDModal from '../../Models/CICDModal';


export async function GET(req: NextRequest) {
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
      console.log(token)
      const decoded = jwt.verify(token,"prasanna") as { id: string };
      console.log(decoded)
      const user = await UserModal.findById(decoded.id).populate("Workflows").exec();;
      

      console.log(user.Workflows)
    return NextResponse.json({
        success: true,
        message: "Access granted",
        workflow: user.Workflows
      });
    } catch (error:any) {
      return NextResponse.json(
        { success: false, message: "Invalid authentication token" ,errorocc:error.message},
        { status: 403 }
      );
    }
  }  