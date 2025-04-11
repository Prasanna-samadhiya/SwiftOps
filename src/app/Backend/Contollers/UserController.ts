import UserModal from "../Models/UserModal";
import { Request } from "express";
import { NextRequest, NextResponse } from "next/server";
import Config, { SendEmail } from "../Config/Config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const register = async (req:NextRequest) =>{
    const Body = await req.json();
    console.log(Body);
    const  {name,email,password,cpassword} =Body;
    await Config();
    try{
        if(!name||!email||!password){
            return NextResponse.json({
                success:false,
                message:"not all fields are present"
            },{status:400})
        }
        const user =await UserModal.findOne({email:email});

        if(user){
            return NextResponse.json({
            success:false,
            message:"user alrady exists"
          },{status:403})
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user1 = new UserModal({
            name,
            email,
            password:hashedPassword
        })

        await user1.save();
        console.log(user1);
        if(!user1){
            return NextResponse.json({sucess:false,message:"some error happened"},{status:500})
        }

        SendEmail(user1.email,`Welcome ${user1.name}`,"Welcome to our website.");

        return NextResponse.json({success:true,user1},{status:201})
    }catch(err:any){
        return NextResponse.json({
            success:false,
            message:err.message
        },{status:500})
    }
}


export const login = async(req:NextRequest)=>{
    try {
        const body = await req.json();
        const { email, password } = body;
    
        await Config(); // Ensure DB is connected
    
        if (!email || !password) {
          return NextResponse.json(
            { success: false, message: "Fields absent" },
            { status: 400 }
          );
        }
    
        const user = await UserModal.findOne({ email });
    
        if (!user) {
          return NextResponse.json(
            { success: false, message: "User not present" },
            { status: 404 }
          );
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return NextResponse.json(
            { success: false, message: "Password does not match" },
            { status: 403 }
          );
        }
    
        // // Ensure JWT_SECRET is defined
        // if (!process.env.JWT_SECRET) {
        //   console.error("JWT_SECRET is missing from .env");
        //   return NextResponse.json(
        //     { success: false, message: "Internal server error" },
        //     { status: 500 }
        //   );
        // }
    
        // Generate token
        const payload = { id: user._id, name: user.name };
        const token = jwt.sign(payload, "prasanna", {
          expiresIn: "7d", // Token expires in 7 days
        });
        

        // Create response
        const response = NextResponse.json(
          { success: true, message: "Logged in successfully", user ,token:token},
          { status: 200 }
        );
    
        // Set cookie with token
        response.cookies.set("mytoken", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });

        response.headers.set("Authorization", `Bearer ${token}`);
        response.headers.set("user-id", user._id.toString());
    
        return response;
      } catch (err) {
        console.error("Login Error:", err);
        return NextResponse.json(
          { success: false, message: "Unidentified error" },
          { status: 500 }
        );
      }
}

export const DeleteUser = async (req:NextRequest) =>{
   try{
        const {email} = await req.json();

        if(!email){
            return NextResponse.json({
                success:false,
                message:"Please enter email"
            },{status:401})
        }

        const user = await UserModal.findOne({email:email});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not registered"
            },{status:401});
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

   }catch(err){
        return NextResponse.json({
                success:false,
                message:"Unidentified Problems"
               },{status:500})
   }
}

export const SendOtp = async(req:NextRequest)=>{
    try{
        const {email} = await req.json();
        if(!email){
            return NextResponse.json({
                success:false,
                message:"Please enter email"
            },{status:401})
        }

        const user = await UserModal.findOne({email:email});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not registered"
            },{status:401});
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        user.OTP.Number=otp;
        user.save();
        SendEmail(email,"Reset Your Password",`your OTP for reseting password is ${otp} .Do not share your password`)
        return NextResponse.json({success:true,message:"mail send"},{status:201});
    }catch(err){
        return NextResponse.json({
            success:false,
            message:"Unidentified problems"
           },{status:500})
    }
}

export const CreatePassword =async(req:NextRequest)=>{
    try{
       const {email,otp,password} = await req.json();

       if(!email||!otp){
        return NextResponse.json({
            success:false,
            message:"details are not there"
        })
       };

       const user = await UserModal.findOne({email:email});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not registered"
            },{status:401});
        }

        const pass=user.OTP.Number==otp;
        if(!pass){
           return NextResponse.json({
            success:false,
            message:"OTP is not same"
           });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password=hashedPassword;
        user.save();

        return NextResponse.json({
            success:true,
            message:"password changed",
            user
        })

    }catch(err){
        return NextResponse.json({
            success:false,
            message:"Unidentified problems"
           },{status:500})
    }
}