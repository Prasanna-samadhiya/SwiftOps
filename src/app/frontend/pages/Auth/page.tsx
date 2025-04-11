"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Navbar from "../../Created Components/Navbar/page"
import Footer from "../../Created Components/Footer/page"
import { ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { login } from "../../Redux/Slices/AuthSlice"

function Page() {
  
  const [rform,setrform] = useState({name:"",email:"",password:"",cpassword:""});
  const [lform,setlform] = useState({email:"",password:""});
  const [Pform,setPform] = useState({OTP:0,password:"",cpassword:""});
  const [showp,setshowp] = useState(true);
  const [showc,setshowc] = useState(true);
  const [Eform,setEform] = useState("");
  const [Ler,setLer] = useState("");
  const [Rer,setRer] = useState("");
 
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(()=>{
  
    if(rform.name==""||rform.cpassword==""||rform.email==""||rform.password==""){
      setRer("Empty Field")
    }else if(rform.email.includes("@gmail.com")==false){
      setRer("Invalid Email")
    }else if(rform.password.length<4){
      setRer("password must contain at least 4 character")
    }else{
      setRer("")
    }
       
   
    
    if(lform.email==""||lform.password==""){
      setLer("Empty Field")
    }else if(lform.email.includes("@gmail.com")==false){
      setLer("Invalid Email")
    }else if(lform.password.length<4){
      setLer("At Least 4 characters")
    }else{
      setLer("")
    }

    
   
  },[rform,lform])



  const handleRChange = (e:ChangeEvent<HTMLInputElement>)=>{
     setrform({...rform,[e.target.name]:e.target.value});
     console.log(rform);
  }

  const handleLChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setlform({...lform,[e.target.name]:e.target.value});
    console.log(lform);
 }

 const handleEChange = (e:ChangeEvent<HTMLInputElement>)=>{
  setEform(e.target.value);
  console.log(Eform);
}
 
const handlePChange = (e:ChangeEvent<HTMLInputElement>)=>{
  setPform({...Pform,[e.target.name]:e.target.value});
  console.log(Pform);
}




 const handlerclick =async()=>{
      try{
        if(Rer==""){
        await axios.post("http://localhost:3000/Backend/Routes/Register",rform).then((response)=>{
           console.log(response.data);
           alert("Registered successfully")
        }).catch((err)=>{
           console.log(err.response.data);
        })
      }else{
        console.log("invalid")
      }
      }catch(err){
        console.log(err);
      }
 }

 const handleOclick =async()=>{
  try{
    
    console.log("hi");
    await axios.post("http://localhost:3000/Backend/Routes/SendOtp",{email:Eform}).then((response)=>{
       console.log(response.data);
       setshowc(false);
       
    }).catch((err)=>{
       console.log(err.response.data);
    })
    
  }catch(err){
    console.log(err);
  }
}

const handlePclick =async()=>{
  try{
    console.log("hi");
    await axios.post("http://localhost:3000/Backend/Routes/CreatePassword",{email:"prasannasamadhiya035@gmail.com",otp:Pform.OTP,password:Pform.password}).then((response)=>{
       console.log(response.data);
       setshowp(true);
    }).catch((err)=>{
       console.log(err.response.data);
    })
    
  }catch(err){
    console.log(err);
  }
}

 const handlelclick =async()=>{
  try{
    const response = await axios.post("http://localhost:3000/Backend/Routes/Login", lform);
    console.log(response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log(response.data); // ✅ Should work
      dispatch(login({ name: response.data.user.name, email: response.data.user.email }));
      router.push("Dashboard");
    } else {
      alert("Login failed: No token received.");
    }
  }catch(err){
    console.log(err);
  }
}

  return (
    <div>
    <Navbar/>
    { showp?
    <div className='flex justify-center align-middle  bg-slate-200 py-8 h-[900px]'>
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Register</TabsTrigger>
        <TabsTrigger value="password">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Register to our platform and make devopps easy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" onChange={handleRChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Enter your email" onChange={handleRChange}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleRChange}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="cpassword">Confirm Password</Label>
              <Input id="cpassword" name="cpassword" type="password" placeholder="Confirm your password" onChange={handleRChange}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlerclick}>Register</Button>
            <div className="text-red-700 text-center mx-[50px] ">{Rer}</div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" onChange={handleLChange}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" onChange={handleLChange}/>
            </div>
          </CardContent>
          
          <div className="text-slate-600 underline mx-32 cursor-pointer" onClick={()=>{setshowp(false)}}>Forgot Password?</div>
          <CardFooter>
            <Button onClick={handlelclick}>Login</Button>
            <div className="text-red-700 text-center mx-[50px] ">{Ler}</div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div> :
    showc?
    <div className=" flex justify-center align-middle py-10 bg-slate-200 h-[720px]">
      <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Forgot your password reset it through email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Pedro Duarte" onChange={handleEChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleOclick}>Send OTP</Button>
          </CardFooter>
        </Card>  
    </div>:
    <div className=" flex justify-center align-middle py-10 bg-slate-200 h-[720px]">
    <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Forgot your password reset it through email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Pedro Duarte" onChange={handlePChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Confirm Password</Label>
            <Input id="cpassword" name="cpassword" type="password" placeholder="Pedro Duarte" onChange={handlePChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">One Time Password</Label>
            <Input id="password" name="OTP" type="number" onChange={handlePChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePclick}>Reset Password</Button>
        </CardFooter>
      </Card>  
  </div>
    }
    <Footer/>
    </div>
  )
}

export default Page