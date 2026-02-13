"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface StopOption {
	id: string;
	name: string;
}

interface StopComboboxProps {
	stops: StopOption[];
	value: string | null;
	onSelect: (id: string | null) => void;
	placeholder?: string;
	disabled?: boolean;
}

export function StopCombobox({
	stops,
	value,
	onSelect,
	placeholder = "Select stop...",
	disabled = false,
}: StopComboboxProps) {
	const [open, setOpen] = useState(false);
	const selectedStop = stops.find((s) => s.id === value);

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger asChild>
				<Button
					className="w-full justify-between font-normal"
					disabled={disabled}
					role="combobox"
					size="sm"
					variant="outline"
				>
					<span className="truncate">
						{selectedStop ? selectedStop.name : placeholder}
					</span>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className="w-[var(--radix-popover-trigger-width)] p-0"
			>
				<Command>
					<CommandInput placeholder="Search stops..." />
					<CommandList>
						<CommandEmpty>No stop found.</CommandEmpty>
						<CommandGroup>
							{stops.map((stop) => (
								<CommandItem
									key={stop.id}
									onSelect={() => {
										onSelect(stop.id === value ? null : stop.id);
										setOpen(false);
									}}
									value={stop.name}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === stop.id ? "opacity-100" : "opacity-0",
										)}
									/>
									{stop.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
