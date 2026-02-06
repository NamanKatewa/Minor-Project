"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Topbar } from "~/components/layout/Topbar";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginMutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				throw new Error("Invalid email or password");
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
		loginMutation.mutate({ email, password });
	};

	return (
		<>
			<Topbar showSidebarTrigger={false} />
			<div className="flex min-h-[calc(100vh-3.5rem)]">
				<div className="flex flex-1 items-center justify-center bg-accent text-accent-foreground">
					<h1 className="origin-center -rotate-6 font-black font-serif text-9xl">
						UFOS
					</h1>
				</div>

				<div className="flex flex-1 items-center justify-center bg-background p-16">
					<div className="w-full max-w-md">
						<h2 className="mb-12 font-black font-serif text-6xl">SIGN IN</h2>

						<form className="space-y-8" onSubmit={handleSubmit}>
							{loginMutation.error && (
								<div className="border-accent border-b-2 bg-accent/10 px-4 py-3 font-sans text-accent text-sm">
									{loginMutation.error.message}
								</div>
							)}

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
									autoComplete="current-password"
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
								disabled={loginMutation.isPending}
								type="submit"
							>
								{loginMutation.isPending ? "Signing in..." : "Login"}
							</button>

							<p className="text-center font-sans text-sm">
								New?{" "}
								<Link className="font-semibold underline" href="/auth/register">
									Create Account
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
