import "~/styles/globals.css";

import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "~/components/QueryProvider";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
	title: "UFOS - University Fleet Optimization System",
	description: "Automated routing and scheduling for university bus fleet",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const playfair = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "700", "900"],
	variable: "--font-playfair",
});

const workSans = Work_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "600"],
	variable: "--font-work-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={`${playfair.variable} ${workSans.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			<body className="bg-background text-foreground antialiased">
				<SessionProvider>
					<ThemeProvider>
						<QueryProvider>
							{children}
							<Toaster />
						</QueryProvider>
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
