import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleProtectedRouteProps {
    allowedRoles: string[];
}

export default function RoleProtectedRoute({
    allowedRoles,
}: RoleProtectedRouteProps) {
    const { user, isLoading } = useAuth();

    // Wait until AuthProvider finishes checking
    // localStorage/sessionStorage.
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">
                    Checking authorization...
                </p>
            </div>
        );
    }

    // User is not authenticated.
    // This is normally handled by ProtectedRoute,
    // but this is an additional safety check.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, but their role
    // is not allowed to access this route.
    if (!allowedRoles.includes(user.role)) {
        // Send the user to their own dashboard.
        if (user.role === "superadmin") {
            return <Navigate to="/superadmin" replace />;
        }

        if (user.role === "admin") {
            return <Navigate to="/admin" replace />;
        }

        return <Navigate to="/user" replace />;
    }

    // User is authenticated and has an allowed role.
    return <Outlet />;
}