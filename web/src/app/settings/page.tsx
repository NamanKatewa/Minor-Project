export default function SettingsPage() {
	return (
		<div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-4 text-center">
			<div className="rounded-full bg-muted p-6">
				<div className="font-black font-serif text-5xl opacity-20">⚙️</div>
			</div>
			<div>
				<h1 className="font-bold text-3xl">Settings</h1>
				<p className="text-muted-foreground">
					System configuration features coming in Phase 8.
				</p>
			</div>
			<div className="max-w-md rounded-lg border bg-card p-6 text-left shadow-sm">
				<div className="mb-4 font-semibold text-sm uppercase tracking-widest">
					Planned Features
				</div>
				<ul className="list-inside list-disc space-y-2 text-muted-foreground text-sm">
					<li>Profile & Account Management</li>
					<li>OSRM Routing Engine Configuration</li>
					<li>Clustering Threshold Preferences</li>
					<li>Data Management & Backup</li>
					<li>Appearance & Theme Settings</li>
				</ul>
			</div>
		</div>
	);
}
