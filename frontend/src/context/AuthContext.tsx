import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
	isAdmin: boolean;
	login: () => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAdmin, setIsAdmin] = useState(false);

	const login = () => setIsAdmin(true);
	const logout = () => setIsAdmin(false);

	return (
		<AuthContext.Provider value={{ isAdmin, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return ctx;
}
