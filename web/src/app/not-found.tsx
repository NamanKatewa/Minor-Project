"use client";

import Link from "next/link";
import { Topbar } from "~/components/layout/Topbar";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Topbar showSidebarTrigger={false} />

			<main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
				<div className="relative">
					<h1 className="mb-4 select-none font-black font-serif text-9xl leading-none md:text-[12rem]">
						404
					</h1>
					<div className="absolute -top-6 -right-6 hidden h-12 w-12 animate-bounce rounded-full bg-accent delay-100 md:block" />
				</div>

				<h2 className="mb-6 font-black font-serif text-2xl uppercase tracking-tight md:text-4xl">
					Page Not Found
				</h2>

				<p className="mb-10 max-w-md font-light font-sans text-muted-foreground text-xl leading-relaxed">
					The route you are looking for does not exist in our optimization
					parameters.
				</p>

				<Link
					className="w-fit bg-foreground px-8 py-4 font-sans font-semibold text-background text-sm uppercase tracking-widest transition-colors hover:bg-accent hover:text-accent-foreground"
					href="/"
				>
					Return Home
				</Link>
			</main>

			<footer className="mt-auto border-foreground border-t-2 px-16 py-8 text-center">
				<p className="font-sans text-sm uppercase tracking-widest">
					© 2026 UFOS — SYSTEM ERROR
				</p>
			</footer>
		</div>
	);
}
