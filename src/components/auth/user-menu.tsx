"use client";

import { useUser, UserButton } from "@clerk/nextjs";

export default function UserMenu() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--blue-primary)]">
        {user.fullName}
      </span>
      <UserButton />
    </div>
  );
}
