'use client'
import { SignInButton, useUser, UserButton, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { useFullURL } from "@/hooks/use-full-url";

const TopNavbar: React.FC = () => {
  const { user } = useUser();
  const [url] = useFullURL();
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <div className="flex h-12 w-full items-center justify-between border-b px-4">
      <div className="flex items-center gap-x-2">
        <Image
          src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
          alt="Jira logo"
          width={25}
          height={25}
        />
        <span className="text-sm font-medium text-gray-600">Shashwat Society Dashboard</span>
      </div>
      {user ? (
        <div className="flex items-center gap-x-2">
          <span className="text-sm font-medium text-gray-600">
            {user?.fullName ?? user?.emailAddresses[0]?.emailAddress ?? "Guest"}
          </span>
          <UserButton/>
          <Button onClick={handleSignOut} className="rounded-sm bg-inprogress px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-x-3">
          <div className="rounded-sm bg-inprogress px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
            <SignInButton mode="modal" redirectUrl={url} />
          </div>
        </div>
      )}
    </div>
  );
};

export { TopNavbar };
