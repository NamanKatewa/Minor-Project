"use client";

import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "~/components/layout/ThemeToggle";
import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { useAuth } from "~/hooks/useAuth";

export function Topbar() {
	const { user, isAuthenticated } = useAuth();

	return (
		<header className="flex h-14 shrink-0 items-center justify-between border-border border-b bg-background px-4">
			<div className="flex items-center gap-2">
				<SidebarTrigger />
			</div>

			<div className="flex items-center gap-4">
				{isAuthenticated && user ? (
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
							<User className="h-4 w-4 text-muted-foreground" />
							<span className="text-foreground text-sm">{user.email}</span>
						</div>
						<Button
							className="gap-2"
							onClick={() => signOut({ callbackUrl: "/auth/login" })}
							size="sm"
							variant="outline"
						>
							<LogOut className="h-4 w-4" />
							Sign Out
						</Button>
					</div>
				) : (
					<Button asChild size="sm" variant="default">
						<a href="/auth/login">Sign In</a>
					</Button>
				)}
				<ThemeToggle />
			</div>
		</header>
	);
}
