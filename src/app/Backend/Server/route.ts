import { Request } from "express";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Config from "../Config/Config";

export async function GET(req:Request){
    try{
        await Config();
        return NextResponse.json({"msg":"success"},{status:200});
    }catch(err){
        return NextResponse.json({"msg":"something"},{status:200});
    }
}