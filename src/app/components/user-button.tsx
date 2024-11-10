/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useSession } from "next-auth/react";

const getFirstTwoCapitalLetters = (name?: string | null) => {
  const match = (name || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
};

const UserButton = ({
    onSignIn,
    onSignOut,
    }: {
    onSignIn: () => Promise<void>;
    onSignOut: () => Promise<void>;
}) => {
    const  { data: session, status } = useSession();
    
    return (
      <div>
        {status === "authenticated" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={session?.user?.image!} />
                <AvatarFallback>
                  {getFirstTwoCapitalLetters(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button onClick={onSignOut}>Sign out</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {status !== "authenticated" && (
          <Button onClick={onSignIn}>Sign in</Button>
        )}
      </div>
    );
}


export default UserButton;