import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(req = NextRequest, res = NextResponse) {
    try{
        const reqBody = await req.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email: email});
        if(!user){
            return NextResponse.json({message: "User does not exist!"});
        }else{
            const isMatch = await bcryptjs.compare(password, user.password);
            if(!isMatch){
                return NextResponse.json({message: "Invalid password!"});
            }
            const tokenData = {
                id : user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            const response = NextResponse.json({message:"Login successful"});
            response.cookies.set("token", token, {
                maxAge: 86400, // expires in 24 hours
                httpOnly: true
            });
            return response;
        }
    }
    catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}