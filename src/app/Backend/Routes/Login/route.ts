
import { NextRequest, NextResponse } from 'next/server';
import { login } from '../../Contollers/UserController';
import { Request } from 'express';


export async function POST(req:NextRequest){
  if (req.method === 'POST') {
    // If the request is a POST request, handle user registration
    return await login(req);
  }

  return NextResponse.json({ message: 'Method not allowed' },{status:500});
};
