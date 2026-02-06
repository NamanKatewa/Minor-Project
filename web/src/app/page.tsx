"use client";

import Link from "next/link";
import { Topbar } from "~/components/layout/Topbar";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background">
			<Topbar showSidebarTrigger={false} />

			<section className="grid min-h-[85vh] grid-cols-[1.2fr_0.8fr]">
				<div className="flex flex-col justify-center px-16 py-20">
					<h2 className="mb-8 font-black font-serif text-8xl leading-[0.95]">
						UNIVERSITY
						<br />
						FLEET
						<br />
						<span className="bg-accent px-2 text-accent-foreground">
							OPTIMIZATION
						</span>
					</h2>
					<p className="mb-10 max-w-xl font-light font-sans text-xl leading-relaxed">
						Automated routing and scheduling for 40+ university buses across 682
						stops in the extended NCR. Replace manual planning with mathematical
						optimization to reduce fuel costs and ensure equitable service.
					</p>
					<Link
						className="w-fit bg-foreground px-8 py-4 font-sans font-semibold text-background text-sm uppercase tracking-widest transition-colors hover:bg-accent hover:text-accent-foreground"
						href="/dashboard"
					>
						View Dashboard
					</Link>
				</div>

				<div className="flex items-center justify-center bg-foreground p-16 text-background">
					<div className="relative h-64 w-64">
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="relative h-full w-full">
								<div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 bg-accent"></div>
								<div className="absolute top-0 left-1/2 h-1/2 w-1 -translate-x-1/2 bg-background"></div>
								<div className="absolute bottom-0 left-1/2 h-1/2 w-1 -translate-x-1/2 bg-background"></div>
								<div className="absolute top-1/2 left-0 h-1 w-1/2 -translate-y-1/2 bg-background"></div>
								<div className="absolute top-1/2 right-0 h-1 w-1/2 -translate-y-1/2 bg-background"></div>
								<div className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-accent"></div>
								<div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 bg-accent"></div>
								<div className="absolute top-1/2 left-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-accent"></div>
								<div className="absolute top-1/2 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 bg-accent"></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="-my-8 -skew-y-2 bg-accent py-24 text-accent-foreground">
				<div className="skew-y-2 px-16">
					<div className="mx-auto max-w-6xl">
						<h3 className="mb-8 font-black font-serif text-6xl">
							ZERO-COST OPEN SOURCE ARCHITECTURE
						</h3>
						<p className="max-w-4xl font-light font-sans text-2xl leading-relaxed">
							Self-hosted routing engine using OSRM, Google OR-Tools
							optimization, and offline map tiles. No paid APIs. Complete
							control over your data.
						</p>
					</div>
				</div>
			</section>

			<section className="grid grid-cols-3">
				<div className="border-foreground border-r bg-background p-16">
					<div className="mb-6 font-black font-serif text-7xl opacity-30">
						01
					</div>
					<h4 className="mb-6 font-black font-serif text-4xl">CVRPTW Solver</h4>
					<p className="font-sans leading-relaxed">
						Google OR-Tools optimization engine handles 40+ buses and 682 stops
						with capacity, time window, and ride duration constraints.
					</p>
				</div>

				<div className="border-foreground border-r bg-foreground p-16 text-background">
					<div className="mb-6 font-black font-serif text-7xl opacity-30">
						02
					</div>
					<h4 className="mb-6 font-black font-serif text-4xl">
						Self-Hosted OSRM
					</h4>
					<p className="font-sans leading-relaxed">
						Local routing engine with custom bus profile. Real travel times
						using OpenStreetMap data for extended NCR region.
					</p>
				</div>

				<div className="bg-accent p-16 text-accent-foreground">
					<div className="mb-6 font-black font-serif text-7xl opacity-30">
						03
					</div>
					<h4 className="mb-6 font-black font-serif text-4xl">Cost Analysis</h4>
					<p className="font-sans leading-relaxed">
						Automated fuel cost estimation per route. Compare scenarios to
						identify savings and optimize budget allocation.
					</p>
				</div>
			</section>

			<section className="grid grid-cols-4 gap-12 bg-foreground px-16 py-24 text-background">
				<div>
					<div className="mb-4 font-black font-serif text-7xl">40+</div>
					<div className="font-sans text-lg uppercase tracking-widest">
						Buses
					</div>
				</div>
				<div>
					<div className="mb-4 font-black font-serif text-7xl">682</div>
					<div className="font-sans text-lg uppercase tracking-widest">
						Stops
					</div>
				</div>
				<div>
					<div className="mb-4 font-black font-serif text-7xl">120min</div>
					<div className="font-sans text-lg uppercase tracking-widest">
						Max Ride Time
					</div>
				</div>
				<div>
					<div className="mb-4 font-black font-serif text-7xl">50</div>
					<div className="font-sans text-lg uppercase tracking-widest">
						Max Capacity
					</div>
				</div>
			</section>

			<footer className="border-foreground border-t-2 px-16 py-8 text-center">
				<p className="font-sans text-sm uppercase tracking-widest">
					© 2026 UFOS — DESIGNED FOR THE FUTURE
				</p>
			</footer>
		</div>
	);
}
