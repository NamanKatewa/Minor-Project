"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";

export function Topbar() {
	const { theme, setTheme } = useTheme();

	return (
		<header className="flex h-14 shrink-0 items-center justify-between border-border border-b bg-background px-4">
			<div className="flex items-center gap-2">
				<SidebarTrigger />
				<span className="font-semibold text-foreground">
					University Fleet Optimization System
				</span>
			</div>
			<div className="flex items-center gap-3">
				<Button
					aria-label="Toggle theme"
					onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					size="icon"
					variant="outline"
				>
					<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</Button>
			</div>
		</header>
	);
}
