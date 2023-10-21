import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req = NextRequest, res = NextResponse) {
  try {
    const reqBody = await req.json();
    const { username, email, password, role } = reqBody;
    const user = await User.findOne({email: email});
    console.log(user);
    if(user){
       return NextResponse.json({message: "User already exists!"})
    }
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const newUser = await new User({
        username: username,
        email: email,
        password: hashedPassword,
        role: role
    })

    const savedUser =await newUser.save();
    return NextResponse.json({message: "User Registered", savedUser: savedUser});
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
