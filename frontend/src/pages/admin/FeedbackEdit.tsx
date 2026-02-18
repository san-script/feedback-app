import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { trpc } from "../../trpc";

export default function FeedbackEdit() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const utils = trpc.useUtils();

	const feedbackId = Number(id);
	const [errors, setErrors] = useState<{
		message?: string;
		rating?: string;
	}>({});

	const { data, isLoading } = trpc.feedback.getById.useQuery(
		{ id: feedbackId },
		{ enabled: !isNaN(feedbackId) },
	);

	const updateMutation = trpc.feedback.update.useMutation({
		onSuccess: () => {
			utils.feedback.getAll.invalidate();
			navigate("/admin");
		},
	});

	const [form, setForm] = useState({
		message: "",
		rating: 1,
		author: "",
	});

	useEffect(() => {
		if (data) {
			setForm({
				message: data.message,
				rating: data.rating,
				author: data.author ?? "",
			});
		}
	}, [data]);

	if (isLoading) {
		return <div className="p-10 text-slate-500">Loading…</div>;
	}

	if (!data) {
		return <div className="p-10 text-red-600">Feedback not found</div>;
	}

	return (
		<div className="max-w-xl mx-auto px-6">
			<div className="bg-white rounded-lg shadow-sm border border-slate-200">
				{/* Header */}
				<div className="px-6 py-4 border-b border-slate-200">
					<h1 className="text-xl font-semibold text-slate-900">
						Edit feedback
					</h1>
					<p className="text-sm text-slate-500">
						Update feedback details
					</p>
				</div>

				{/* Form */}
				<form
					className="px-6 py-6 space-y-5"
					onSubmit={(e) => {
						e.preventDefault();
						const newErrors: typeof errors = {};

						if (!form.message.trim()) {
							newErrors.message = "Message is required";
						}

						if (!form.rating || form.rating < 1) {
							newErrors.rating = "Rating is required";
						}

						if (Object.keys(newErrors).length > 0) {
							setErrors(newErrors);
							return;
						}

						setErrors({});
						updateMutation.mutate({
							id: feedbackId,
							message: form.message,
							rating: form.rating,
							author: form.author || undefined,
						});
					}}
				>
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Message
						</label>
						<textarea
							rows={4}
							required
							className={`w-full border rounded px-3 py-2 text-sm ${
								errors.message ? "border-red-500" : ""
							}`}
							value={form.message}
							onChange={(e) =>
								setForm({ ...form, message: e.target.value })
							}
						/>

						{errors.message && (
							<p className="mt-1 text-sm text-red-600">
								{errors.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-700 mb-2">
							Rating
						</label>

						<div className="flex items-center gap-2">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
								<button
									key={value}
									type="button"
									onClick={() =>
										setForm({ ...form, rating: value })
									}
									className="focus:outline-none"
								>
									<Star filled={value <= form.rating} />
								</button>
							))}

							<span className="ml-2 text-sm text-slate-600">
								{form.rating} / 10
							</span>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Author
						</label>
						<input
							className="w-full border rounded px-3 py-2 text-sm"
							value={form.author}
							onChange={(e) =>
								setForm({ ...form, author: e.target.value })
							}
						/>
					</div>

					<div className="flex items-center gap-4 pt-2">
						<button
							type="submit"
							disabled={updateMutation.isPending}
							className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
						>
							Save changes
						</button>

						<button
							type="button"
							onClick={() => navigate("/admin")}
							className="text-sm text-slate-500 hover:underline"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

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
