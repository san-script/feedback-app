import { useState } from "react";
import { trpc } from "../trpc";

export default function HomeFeedback() {
	const [submitted, setSubmitted] = useState(false);
	const [rating, setRating] = useState<number>(0);

	const mutation = trpc.feedback.create.useMutation({
		onSuccess: () => {
			setSubmitted(true);
		},
	});

	if (submitted) {
		return (
			<div className="max-w-xl mx-auto px-6">
				<div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
					<h2 className="text-xl font-semibold text-slate-900">
						Thank you!
					</h2>
					<p className="mt-2 text-slate-600">
						Your feedback has been submitted and will help improve
						the platform.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-xl mx-auto px-6">
			<div className="bg-white rounded-lg shadow-sm border border-slate-200">
				{/* Header */}
				<div className="px-6 py-4 border-b border-slate-200">
					<h1 className="text-xl font-semibold text-slate-900">
						Submit feedback
					</h1>
					<p className="text-sm text-slate-500">
						Share feedback on product features, data quality, or
						usability.
					</p>
				</div>

				{/* Form */}
				<form
					className="px-6 py-6 space-y-6"
					onSubmit={(e) => {
						e.preventDefault();
						mutation.mutate({
							message: (e.currentTarget.message as any).value,
							rating,
							author:
								(e.currentTarget.author as any).value ||
								undefined,
						});
					}}
				>
					{/* Message */}
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Feedback
						</label>
						<textarea
							name="message"
							required
							rows={4}
							className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Describe the issue or suggestion…"
						/>
					</div>

					{/* Rating */}
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-2">
							Rating
						</label>

						<div className="flex items-center gap-2">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
								<button
									type="button"
									key={value}
									onClick={() => setRating(value)}
									className="focus:outline-none"
								>
									<Star filled={value <= rating} />
								</button>
							))}

							{rating > 0 && (
								<span className="ml-2 text-sm text-slate-600">
									{rating} / 10
								</span>
							)}
						</div>

						{rating === 0 && (
							<p className="text-xs text-slate-500 mt-1">
								Please select a rating
							</p>
						)}
					</div>

					{/* Author */}
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Name (optional)
						</label>
						<input
							name="author"
							type="text"
							className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Your name"
						/>
					</div>

					{/* Submit */}
					<div className="pt-2">
						<button
							type="submit"
							disabled={rating === 0 || mutation.isPending}
							className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
						>
							{mutation.isPending
								? "Submitting…"
								: "Submit feedback"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

/* Star component */
function Star({ filled }: { filled: boolean }) {
	return (
		<svg
			className={`h-6 w-6 ${
				filled ? "text-yellow-400" : "text-slate-300"
			}`}
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.954L10 0l2.951 5.956 6.561.954-4.756 4.635 1.122 6.545z" />
		</svg>
	);
}
