import { useState } from "react";
import { trpc } from "../../trpc";
import { Link } from "react-router-dom";

export default function FeedbackList() {
	const utils = trpc.useUtils();
	const { data, isLoading, error } = trpc.feedback.getAll.useQuery();
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const deleteMutation = trpc.feedback.delete.useMutation({
		onSuccess: () => utils.feedback.getAll.invalidate(),
	});

	return (
		<div className="max-w-6xl mx-auto px-6">
			{/* Card */}
			<section className="bg-white rounded-lg shadow-sm border border-slate-200">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
					<div>
						<h1 className="text-xl font-semibold text-slate-900">
							Feedback
						</h1>
						<p className="text-sm text-slate-500">
							What users are saying
						</p>
					</div>
				</div>

				{/* Content */}
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="bg-slate-50 text-slate-600">
							<tr>
								<th className="px-6 py-3 text-left font-medium">
									Message
								</th>
								<th className="px-6 py-3 text-left font-medium">
									Rating
								</th>
								<th className="px-6 py-3 text-left font-medium">
									Author
								</th>
								<th className="px-6 py-3 text-left font-medium">
									Date
								</th>
								<th className="px-6 py-3 text-right font-medium">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-slate-200">
							{isLoading && (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-10 text-center text-slate-500"
									>
										Loading…
									</td>
								</tr>
							)}

							{error && (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-10 text-center text-red-600"
									>
										Failed to load feedback
									</td>
								</tr>
							)}

							{data?.map((item) => (
								<tr
									key={item.id}
									className="hover:bg-slate-50 transition"
								>
									<td className="px-6 py-4 text-slate-900">
										{item.message}
									</td>

									<td className="px-6 py-4">
										<span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
											{item.rating}/10
										</span>
									</td>

									<td className="px-6 py-4 text-slate-600">
										{item.author ?? "—"}
									</td>
									<td className="px-6 py-4 text-slate-600">
										{item.createdAt
											? new Date(
													item.createdAt,
												).toLocaleDateString(
													undefined,
													{
														year: "numeric",
														month: "short",
														day: "numeric",
													},
												)
											: "—"}
									</td>

									<td className="px-6 py-4 text-right space-x-4">
										<Link
											to={`/admin/edit/${item.id}`}
											className="text-blue-600 font-medium hover:underline"
										>
											Edit
										</Link>

										<button
											className="text-red-600 font-medium hover:underline"
											onClick={() => setDeleteId(item.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}

							{!isLoading && data?.length === 0 && (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-10 text-center text-slate-500"
									>
										No feedback yet
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>

			{/* confirmation modal */}
			{deleteId !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					{/* Backdrop */}
					<div
						className="absolute inset-0 bg-black/30"
						onClick={() => setDeleteId(null)}
					/>

					{/* Modal */}
					<div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
						<h2 className="text-lg font-semibold text-slate-900">
							Delete feedback
						</h2>

						<p className="mt-2 text-sm text-slate-600">
							Are you sure you want to delete this feedback? This
							action cannot be undone.
						</p>

						<div className="mt-6 flex justify-end gap-3">
							<button
								onClick={() => setDeleteId(null)}
								className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
							>
								Cancel
							</button>

							<button
								onClick={() => {
									deleteMutation.mutate({ id: deleteId });
									setDeleteId(null);
								}}
								className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
