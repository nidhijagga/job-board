import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
connect();

export async function GET(req = NextRequest, res = NextResponse) {
  try {
    const id = getDataFromToken(req);
    const user = await User.findById({ _id: id }).select("-password");
    return NextResponse.json({ message : "User Found", user: user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
