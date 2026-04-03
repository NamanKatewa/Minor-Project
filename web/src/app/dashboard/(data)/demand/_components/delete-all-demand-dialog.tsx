import { Loader2, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

interface DeleteAllDemandDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	isPending: boolean;
	isDisabled: boolean;
}

export function DeleteAllDemandDialog({
	open,
	onOpenChange,
	onConfirm,
	isPending,
	isDisabled,
}: DeleteAllDemandDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogTrigger asChild>
				<Button disabled={isDisabled} variant="destructive">
					<Trash2 className="mr-2 h-4 w-4" /> Delete All Demand
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete ALL
						demand records from the database.
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
						variant="destructive"
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						) : (
							"Delete All"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
