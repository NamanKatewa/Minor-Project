import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<div className="ml-60 flex flex-1 flex-col">
				<Topbar />
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</div>
		</div>
	);
}
