"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserProvider";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  | React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
  | { link: string; className: string }
>(({ className, ...props }, ref) => {
  const router = useRouter();
  const { user } = useUser();
  const link = (props as { link: string }).link;
  return (
    <AvatarPrimitive.Root
      ref={ref}
      onClick={() => {
        if (link) {
          if (link === user.id) {
            router.push("/profile");
            return;
          } else {
            router.push("/friend/" + link);
          }
        }
      }}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" +
          `${
            link
              ? " cursor-pointer hover:shadow-lg hover:shadow-ring/30 transition-all duration-300"
              : ""
          }`,
        className
      )}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
