"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

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
			// Step 1: Register user with FastAPI backend
			const response = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.detail || "Registration failed");
			}

			// Step 2: Sign in with NextAuth
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
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 shadow-lg">
				<div className="text-center">
					<h1 className="font-bold text-3xl text-emerald-500">UFOS</h1>
					<h2 className="mt-2 text-foreground text-xl">Create your account</h2>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{registerMutation.error && (
						<div className="rounded-md border border-destructive bg-destructive/10 p-3 text-center text-destructive text-sm">
							{registerMutation.error.message}
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label
								className="block font-medium text-foreground text-sm"
								htmlFor="name"
							>
								Full Name
							</label>
							<Input
								autoComplete="name"
								className="mt-1"
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
								className="block font-medium text-foreground text-sm"
								htmlFor="email"
							>
								Email
							</label>
							<Input
								autoComplete="email"
								className="mt-1"
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
								className="block font-medium text-foreground text-sm"
								htmlFor="password"
							>
								Password
							</label>
							<Input
								autoComplete="new-password"
								className="mt-1"
								id="password"
								minLength={8}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								required
								type="password"
								value={password}
							/>
							<p className="mt-1 text-muted-foreground text-xs">
								Minimum 8 characters
							</p>
						</div>
					</div>

					<Button
						className="w-full"
						disabled={registerMutation.isPending}
						type="submit"
					>
						{registerMutation.isPending
							? "Creating account..."
							: "Create account"}
					</Button>

					<p className="text-center text-muted-foreground text-sm">
						Already have an account?{" "}
						<Link
							className="text-emerald-500 hover:underline"
							href="/auth/login"
						>
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
