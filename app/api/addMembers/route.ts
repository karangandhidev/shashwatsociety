import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

// Define the expected request body shape
export type AddMemberRequestBody = {
  id: string;       // User ID
  projectId: string; // Project ID
};


// Handle POST request to add users to the member table
export async function POST(req: NextRequest) {
  
    // Parse the request body
    const body: AddMemberRequestBody = await req.json();

    // Add the user to the member table
    const result = await prisma.member.create({
      data: {
        id: body.id,  // Assuming 'userId' is the field in your 'member' table for user reference
        projectId: body.projectId,  // Assuming 'projectId' is a field in your 'member' table
      },
    });
  return NextResponse.json({ result });

}
