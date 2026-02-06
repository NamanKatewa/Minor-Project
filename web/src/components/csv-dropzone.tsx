"use client";

import { AlertCircle, CheckCircle2, File, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";

interface UploadResult {
	created: number;
	updated?: number;
	skipped?: number;
	total_errors?: number;
	depots_created?: number;
}

interface CsvDropzoneProps {
	onUpload?: (file: File) => Promise<UploadResult>;
	onFileSelect?: (file: File) => void;
	title?: string;
	description?: string;
}

export function CsvDropzone({
	onUpload,
	onFileSelect,
	title = "Upload CSV",
	description = "Drag and drop your CSV file here, or click to select",
}: CsvDropzoneProps) {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<UploadResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				const selectedFile = acceptedFiles[0] || null;
				setFile(selectedFile);
				setError(null);
				setResult(null);
				setProgress(0);

				if (onFileSelect && selectedFile) {
					onFileSelect(selectedFile);
				}
			}
		},
		[onFileSelect],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"text/csv": [".csv"],
			"application/vnd.ms-excel": [".csv"],
		},
		maxFiles: 1,
		disabled: uploading,
	});

	const handleUpload = async () => {
		if (!file || !onUpload) return;

		setUploading(true);
		setProgress(20);

		try {
			const interval = setInterval(() => {
				setProgress((p) => Math.min(p + 10, 90));
			}, 200);

			const res = await onUpload(file);

			clearInterval(interval);
			setProgress(100);
			setResult(res);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(false);
		}
	};

	const removeFile = () => {
		setFile(null);
		setResult(null);
		setError(null);
		setProgress(0);
	};

	return (
		<div className="space-y-4">
			{!file ? (
				<div
					{...getRootProps()}
					className={cn(
						"cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:bg-muted/50",
						isDragActive
							? "border-primary bg-primary/5"
							: "border-muted-foreground/25",
					)}
				>
					<input {...getInputProps()} />
					<div className="flex flex-col items-center justify-center space-y-2">
						<Upload className="h-8 w-8 text-muted-foreground" />
						<div className="font-medium text-lg">{title}</div>
						<p className="text-muted-foreground text-sm">{description}</p>
					</div>
				</div>
			) : (
				<div className="rounded-lg border bg-card p-6">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="rounded-full bg-primary/10 p-2">
								<File className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="font-medium">{file.name}</p>
								<p className="text-muted-foreground text-xs">
									{(file.size / 1024).toFixed(2)} KB
								</p>
							</div>
						</div>
						{!uploading && !result && (
							<Button onClick={removeFile} size="icon" variant="ghost">
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>

					{uploading && (
						<div className="space-y-2">
							<Progress className="h-2" value={progress} />
							<p className="text-center text-muted-foreground text-xs">
								Uploading...
							</p>
						</div>
					)}

					{!uploading && !result && onUpload && (
						<div className="flex justify-end pt-2">
							<Button onClick={handleUpload}>Upload File</Button>
						</div>
					)}

					{result && (
						<div className="mt-4 border-t pt-4">
							<div className="mb-2 flex items-center space-x-2 text-green-600">
								<CheckCircle2 className="h-4 w-4" />
								<span className="font-medium">Upload Complete</span>
							</div>
							<div className="space-y-1 text-muted-foreground text-sm">
								<p>Created: {result.created}</p>
								{(result.updated ?? 0) > 0 && <p>Updated: {result.updated}</p>}
								{(result.skipped ?? 0) > 0 && <p>Skipped: {result.skipped}</p>}
								{(result.total_errors ?? 0) > 0 && (
									<p className="font-medium text-destructive">
										Errors: {result.total_errors}
									</p>
								)}
							</div>
						</div>
					)}

					{error && (
						<Alert className="mt-4" variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{(result || error) && !uploading && (
						<div className="flex justify-end pt-4">
							<Button onClick={removeFile} size="sm" variant="outline">
								Upload Another
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
