// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import UserModal from '../Models/UserModal';

interface Authenticated extends NextRequest {
    user?:any;
}

// Configuring the routes where this middleware will apply
export const config = {
  matcher: ['src/app/Backend/Routes/CreateProject'], // Example protected routes
};


export async function middleware(req: Authenticated) {
    
  const token = req.cookies.get('mytoken')?.value;
  console.log(token); 
  if (!token) {
    return NextResponse.json({
      success: false,
      message: 'Authentication token not found',
    }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, "prasanna");
    const user = await UserModal.findById(decoded?.id);
    req.user=user;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Invalid authentication token',
    }, { status: 403 });
  }
}

