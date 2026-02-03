"use client";

import { useTheme } from "../ThemeProvider";

export function Topbar() {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="flex h-14 items-center justify-between border-b border-slate-200 bg-slate-50 px-6 dark:border-slate-700 dark:bg-slate-900">
			<div className="font-semibold text-slate-900 dark:text-slate-100">
				University Fleet Optimization System
			</div>
			<div className="flex items-center gap-3">
				<button
					aria-label="Toggle theme"
					className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl transition-colors hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
					onClick={toggleTheme}
					type="button"
				>
					{theme === "light" ? "🌙" : "☀️"}
				</button>
			</div>
		</header>
	);
}
