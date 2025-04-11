import mongoose from "mongoose";
import nodemailer from "nodemailer";

export default async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/Devopstool12").then(()=>{
            console.log("DB connected");
            console.log(mongoose.models);
        }).catch((err)=>{
            console.log(err);
        })
    }catch(err){
        console.log(err);
    }
}

export const SendEmail = (to:string,subject:string,text:string)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'prasannasamadhiya02@gmail.com',
          pass: 'qidv xwvs kvdb klvu'
        }
      });
      
      var mailOptions = {
        from: "prasannasamadhiya02@gmail.com",
        to: to,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}