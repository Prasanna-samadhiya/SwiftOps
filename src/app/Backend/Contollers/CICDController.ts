import { NextRequest, NextResponse } from "next/server";
import CICDModal from "../Models/CICDModal";
import UserModal from "../Models/UserModal";

export const CreateCICD = async (req:NextRequest) =>{
   try{
        const body = await req.json();

        if(!body){
            return NextResponse.json({
                success:false,
                message:"Please enter something"
            },{status:401})
        }

        // const user = await UserModal.findOne({id:id});
        // if(!user){
        //     return NextResponse.json({
        //         success:false,
        //         message:"User not registered"
        //     },{status:401});
        // }

        const cicd = await CICDModal.create({
            name:body.name,
            url:body.url,
            branch:body.branch,
            buildscript:body.buildscript,
            testscript:body.testscript,
            deploymentscript:body.deploymentscript
        })

        return NextResponse.json({
            success:true,
            message:"Successfully created",
            cicd
        })

   }catch(err){
        return NextResponse.json({
                success:false,
                message:"Unidentified Problems"
               },{status:500})
   }
}
