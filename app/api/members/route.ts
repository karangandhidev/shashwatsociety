import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { type DefaultUser } from "@prisma/client";

export type GetUserResponse = {
  users: DefaultUser | null;
};

export async function GET() {
  const users = await prisma.defaultUser.findMany();
  // return NextResponse.json<GetProjectResponse>({ project });
  return NextResponse.json({ users });
}
