"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

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
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 shadow-lg">
				<div className="text-center">
					<h1 className="font-bold text-3xl text-emerald-500">UFOS</h1>
					<h2 className="mt-2 text-foreground text-xl">
						Sign in to your account
					</h2>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{loginMutation.error && (
						<div className="rounded-md border border-destructive bg-destructive/10 p-3 text-center text-destructive text-sm">
							{loginMutation.error.message}
						</div>
					)}

					<div className="space-y-4">
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
								autoComplete="current-password"
								className="mt-1"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								required
								type="password"
								value={password}
							/>
						</div>
					</div>

					<Button
						className="w-full"
						disabled={loginMutation.isPending}
						type="submit"
					>
						{loginMutation.isPending ? "Signing in..." : "Sign in"}
					</Button>

					<p className="text-center text-muted-foreground text-sm">
						Don't have an account?{" "}
						<Link
							className="text-emerald-500 hover:underline"
							href="/auth/register"
						>
							Register
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
