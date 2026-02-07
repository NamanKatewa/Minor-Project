"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "~/components/layout/ThemeToggle";
import { Button } from "~/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { useAuth } from "~/hooks/useAuth";

export function Topbar({
	showSidebarTrigger = true,
}: {
	showSidebarTrigger?: boolean;
}) {
	const { user, isAuthenticated } = useAuth();

	return (
		<header className="flex h-14 shrink-0 items-center justify-between border-border border-b-2 bg-background px-4">
			<div className="flex items-center gap-4">
				{showSidebarTrigger && <SidebarTrigger />}

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href="/">
									<span className="font-sans font-semibold text-xs uppercase tracking-wider">
										Home
									</span>
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						{isAuthenticated && (
							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/dashboard">
										<span className="font-sans font-semibold text-xs uppercase tracking-wider">
											Dashboard
										</span>
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<div className="flex items-center gap-4">
				{isAuthenticated && user ? (
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2 border border-border bg-background px-3 py-1.5">
							<User className="h-4 w-4 text-muted-foreground" />
							<span className="text-foreground text-sm">
								{user.name ?? user.email}
							</span>
						</div>
						<Button
							className="gap-2"
							onClick={() => signOut({ callbackUrl: "/login" })}
							size="sm"
							variant="outline"
						>
							<LogOut className="h-4 w-4" />
							Sign Out
						</Button>
					</div>
				) : (
					<Button asChild size="sm" variant="default">
						<a href="/login">Sign In</a>
					</Button>
				)}
				<ThemeToggle />
			</div>
		</header>
	);
}
