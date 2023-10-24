import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Application from "@/models/applicationModel";
import Job from "@/models/jobModel";

connect(); // Connect to the MongoDB database


export async function GET(req = NextRequest, {params}) {
    try {
        const userId = params.id;
      // Find all applications for the user
      const applications = await Application.find({ seekerID: userId });
  
      // Extract job IDs from the applications
      const jobIds = applications.map((app) => app.jobID);
  
      // Find jobs that match the job IDs in the applications
      const matchingJobs = await Job.find({ _id: { $in: jobIds } });
      console.log(matchingJobs);
  
      return NextResponse.json(matchingJobs);
    } catch (error) {
      return NextResponse.json({ error:"Backend Error : " +  error.message }, { status: 500 });
    }
  }
  