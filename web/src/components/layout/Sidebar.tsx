"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ href: "/dashboard", label: "Dashboard", icon: "📊" },
	{ href: "/stops", label: "Stops", icon: "📍" },
	{ href: "/buses", label: "Buses", icon: "🚌" },
	{ href: "/optimize", label: "Optimize", icon: "⚡" },
	{ href: "/settings", label: "Settings", icon: "⚙️" },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
			<div className="border-b border-slate-200 p-4 dark:border-slate-700">
				<h1 className="text-2xl font-bold text-emerald-500">UFOS</h1>
			</div>
			<nav className="flex flex-1 flex-col gap-1 p-3">
				{navItems.map((item) => (
					<Link
						className={`flex items-center gap-3 rounded-lg px-4 py-3 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 ${
							pathname === item.href
								? "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white"
								: ""
						}`}
						href={item.href}
						key={item.href}
					>
						<span className="text-xl">{item.icon}</span>
						<span>{item.label}</span>
					</Link>
				))}
			</nav>
		</aside>
	);
}
