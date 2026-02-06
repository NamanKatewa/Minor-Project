"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Topbar } from "~/components/layout/Topbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const registerMutation = useMutation({
		mutationFn: async ({
			name,
			email,
			password,
		}: {
			name: string;
			email: string;
			password: string;
		}) => {
			const response = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.detail || "Registration failed");
			}

			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (!result?.ok) {
				throw new Error(
					"Registration successful, but automatic login failed. Please sign in.",
				);
			}

			return result;
		},
		onSuccess: () => {
			router.push("/dashboard");
			router.refresh();
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		registerMutation.mutate({ name, email, password });
	};

	return (
		<>
			<Topbar showSidebarTrigger={false} />
			<div className="flex min-h-[calc(100vh-3.5rem)]">
				<div className="flex flex-1 items-center justify-center bg-background p-16">
					<div className="w-full max-w-md">
						<h2 className="mb-12 font-black font-serif text-6xl">JOIN UFOS</h2>

						<form className="space-y-6" onSubmit={handleSubmit}>
							{registerMutation.error && (
								<div className="border-accent border-b-2 bg-accent/10 px-4 py-3 font-sans text-accent text-sm">
									{registerMutation.error.message}
								</div>
							)}

							<div>
								<label
									className="mb-3 block font-sans font-semibold text-xs uppercase tracking-widest"
									htmlFor="name"
								>
									Name
								</label>
								<input
									autoComplete="name"
									className="w-full border-foreground border-b-2 bg-transparent py-3 font-sans text-lg outline-none transition-colors focus:border-accent"
									id="name"
									onChange={(e) => setName(e.target.value)}
									placeholder="John Doe"
									required
									type="text"
									value={name}
								/>
							</div>

							<div>
								<label
									className="mb-3 block font-sans font-semibold text-xs uppercase tracking-widest"
									htmlFor="email"
								>
									Email
								</label>
								<input
									autoComplete="email"
									className="w-full border-foreground border-b-2 bg-transparent py-3 font-sans text-lg outline-none transition-colors focus:border-accent"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
									placeholder="your@email.com"
									required
									type="email"
									value={email}
								/>
							</div>

							<div>
								<label
									className="mb-3 block font-sans font-semibold text-xs uppercase tracking-widest"
									htmlFor="password"
								>
									Password
								</label>
								<input
									autoComplete="new-password"
									className="w-full border-foreground border-b-2 bg-transparent py-3 font-sans text-lg outline-none transition-colors focus:border-accent"
									id="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									required
									type="password"
									value={password}
								/>
							</div>

							<button
								className="w-full bg-foreground px-8 py-4 font-sans font-semibold text-background text-sm uppercase tracking-widest transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
								disabled={registerMutation.isPending}
								type="submit"
							>
								{registerMutation.isPending
									? "Creating Account..."
									: "Create Account"}
							</button>

							<p className="text-center font-sans text-sm">
								Have Account?{" "}
								<Link className="font-semibold underline" href="/auth/login">
									Sign In
								</Link>
							</p>
						</form>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-center bg-foreground text-background">
					<h1 className="origin-center rotate-6 font-black font-serif text-8xl text-accent">
						WELCOME!
					</h1>
				</div>
			</div>
		</>
	);
}
