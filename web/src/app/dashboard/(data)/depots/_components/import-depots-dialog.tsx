import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";

interface ImportDepotsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	isPending: boolean;
	validCount: number;
	totalCount: number;
}

export function ImportDepotsDialog({
	open,
	onOpenChange,
	onConfirm,
	isPending,
	validCount,
	totalCount,
}: ImportDepotsDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Import</DialogTitle>
					<DialogDescription>
						You are about to import{" "}
						<span className="font-medium text-foreground">{validCount}</span>{" "}
						valid depots out of{" "}
						<span className="font-medium text-foreground">{totalCount}</span>{" "}
						total parsed.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						className="hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
						disabled={isPending}
						onClick={() => onOpenChange(false)}
						variant="outline"
					>
						Cancel
					</Button>
					<Button
						className="min-w-[120px]"
						disabled={isPending}
						onClick={onConfirm}
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Importing...
							</>
						) : (
							"Import"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
