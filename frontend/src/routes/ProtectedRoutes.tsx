import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    const location = useLocation();

    // Wait until AuthProvider checks
    // localStorage/sessionStorage.
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">
                    Checking authentication...
                </p>
            </div>
        );
    }

    // User is not authenticated.
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // User is authenticated.
    return <Outlet />;
}