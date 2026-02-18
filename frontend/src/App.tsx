import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import FeedbackList from "./pages/admin/FeedbackList";
import HomeFeedback from "./pages/HomeFeedback";
import { useAuth } from "./context/AuthContext";
import FeedbackEdit from "./pages/admin/FeedbackEdit";

export default function App() {
	const { isAdmin, login, logout } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-slate-100">
			{/* Top bar */}
			<header className="bg-white border-b border-slate-200">
				<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
					{/* Left side */}
					<div>
						<Link
							to="/"
							className="text-lg font-semibold text-blue-700"
						>
							Feedback Board
						</Link>
						<p className="text-xs text-slate-500">
							Product & data feedback
						</p>
					</div>

					{/* Right side */}
					{isAdmin ? (
						<div className="flex items-center gap-4">
							<Link
								to="/admin"
								className="text-sm font-medium text-slate-600 hover:text-blue-600"
							>
								Feedback List
							</Link>
							<button
								onClick={logout}
								className="text-sm text-slate-500 hover:text-red-600"
							>
								Logout
							</button>
						</div>
					) : (
						<button
							onClick={() => {
								login();
								navigate("/admin");
							}}
							className="text-sm font-medium text-slate-600 hover:text-blue-600"
						>
							Admin login
						</button>
					)}
				</div>
			</header>

			{/* Page content */}
			<main className="py-10">
				<Routes>
					<Route path="/" element={<HomeFeedback />} />

					{/* Admin dashboard */}
					<Route
						path="/admin"
						element={
							isAdmin ? (
								<FeedbackList />
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
					{/* Edit feedback */}
					<Route
						path="/admin/edit/:id"
						element={
							isAdmin ? (
								<FeedbackEdit />
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
				</Routes>
			</main>
		</div>
	);
}
