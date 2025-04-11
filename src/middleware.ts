import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/Backend/Routes/CreateCICD",
    "/Backend/Routes/CreateServer",
    "/Backend/Routes/CreateWorkflow",
    "/Backend/Routes/DeleteCICD",
    "/Backend/Routes/DeleteServer",
    "/Backend/Routes/DeleteWorkflow",
    "/Backend/Routes/GetCICD",
    "/Backend/Routes/GetServer",
    "/Backend/Routes/GetWorkflow"], // Apply middleware only to this route
};

export function middleware(req: NextRequest) {
  console.log("Middleware ran");

  // 1️⃣ Extract the token from cookies
  const token = req.cookies.get("mytoken")?.value;

  // 2️⃣ If no token is found, return an error response
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Authentication token not found" },
      { status: 401 }
    );
  }

  // 3️⃣ Forward the token to the API route using headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("Authorization", `Bearer ${token}`);

  return NextResponse.next({ request: { headers: requestHeaders } });
}
