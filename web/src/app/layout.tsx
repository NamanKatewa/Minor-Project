import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { QueryProvider } from "~/components/QueryProvider";
import { ThemeProvider } from "~/components/ThemeProvider";

export const metadata: Metadata = {
	title: "UFOS - University Fleet Optimization System",
	description: "Automated routing and scheduling for university bus fleet",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en" suppressHydrationWarning>
			<body className="bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
				<ThemeProvider>
					<QueryProvider>{children}</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
