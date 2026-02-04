import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Topbar />
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
