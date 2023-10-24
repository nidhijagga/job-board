import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Application from "@/models/applicationModel";
import Job from "@/models/jobModel";

connect(); // Connect to the MongoDB database

export async function POST(req = NextRequest, res = NextResponse) {
  const reqBody = await req.json();
  const { jobId, userId } = reqBody;
  try {
    const newApplication = new Application({
      jobID: jobId,
      seekerID: userId,
    });
    await newApplication.save();
    return NextResponse.json(newApplication);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
