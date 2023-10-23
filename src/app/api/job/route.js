import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Job from "@/models/jobModel";

connect(); // Connect to the MongoDB database

export async function POST(req = NextRequest, res = NextResponse) {
  const reqBody = await req.json();
  const { title, description, location, salary, userId } = reqBody;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      providerID: userId,
    });
    await newJob.save();
    return NextResponse.json(newJob);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const jobs = await Job.find();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
