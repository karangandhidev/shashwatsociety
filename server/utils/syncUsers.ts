import { clerkClient } from '@clerk/nextjs';
import { prisma } from '@/server/db';  // Adjust the import based on your prisma setup

export const syncUserWithPrismaByEmail = async (clerkUserId: string) => {
  // Fetch user data from Clerk
  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  const email = clerkUser?.emailAddresses[0]?.emailAddress;

  // Check if the user exists in Prisma by email
  let user = await prisma.defaultUser.findUnique({
    where: { email: email, id: clerkUser.id }, // Use email to find the user
  });
  // If user doesn't exist, create a new user
  if (!user) {
    user = await prisma.defaultUser.create({
      data: {
        id: clerkUser.id,
        email: email!,  // Use Clerk email to create the user
        name: clerkUser.firstName + ' ' + clerkUser.lastName,  // Use Clerk name
        avatar: clerkUser.imageUrl// You can map other Clerk data to your existing Prisma schema fields here
      },
    });

    console.log('New user created in Prisma:', user);
  }

  return user;  // Return the user record from Prisma
};
