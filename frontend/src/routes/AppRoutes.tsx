import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoutes";
import RoleProtectedRoute from "./RoleProtectedRoute";

const HomePage = lazy(
    () => import("../pages/homepage/HomePage")
)

const SignupForm = lazy(
    () => import("../components/forms/SignupForm")
);

const LoginPage = lazy(
    () => import("../pages/LoginPage")
);

const LoginForm = lazy(
    () => import("../components/forms/LoginForm")
);

const SignupPage = lazy(
    () => import("../pages/SignupPage")
);

const ForgotPassword = lazy(
    () => import("../components/ForgotPassword")
);

const SuperAdminDashboard = lazy(
    () => import("../pages/dashboard/SuperAdminDashboard")
);

const AdminDashboard = lazy(
    () => import("../pages/dashboard/AdminDashboard")
);

const UserDashboard = lazy(
    () => import("../pages/dashboard/UserDashboard")
);

const Navbar = lazy(
    () => import("../pages/homepage/Navbar")
)

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Routes>

                {/* =====================================================
                    PUBLIC ROUTES
                    These pages can be accessed without authentication.
                   ===================================================== */}

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/navbar"
                    element={<Navbar />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/signup"
                    element={<SignupPage />}
                />

                <Route
                    path="/login-form"
                    element={<LoginForm />}
                />

                <Route
                    path="/signup-form"
                    element={<SignupForm />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                {/* =====================================================
                    AUTHENTICATED ROUTES

                    ProtectedRoute checks only:

                    "Is the user authenticated?"

                    If NOT authenticated:
                        → /signin

                    If authenticated:
                        → allow access to the nested routes.
                   ===================================================== */}

                <Route element={<ProtectedRoute />}>

                    {/* =================================================
                        SUPERADMIN ROUTES

                        ProtectedRoute:
                            Is the user authenticated?

                        RoleProtectedRoute:
                            Does the user have "superadmin" role?
                       ================================================= */}

                    <Route
                        element={
                            <RoleProtectedRoute
                                allowedRoles={["superadmin"]}
                            />
                        }
                    >
                        <Route
                            path="/superadmin"
                            element={<SuperAdminDashboard />}
                        />
                    </Route>

                    {/* =================================================
                        ADMIN ROUTES

                        Only users with role "admin" can access.
                       ================================================= */}

                    <Route
                        element={
                            <RoleProtectedRoute
                                allowedRoles={["admin"]}
                            />
                        }
                    >
                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />
                    </Route>

                    {/* =================================================
                        NORMAL USER ROUTES

                        Only users with role "user" can access.
                       ================================================= */}

                    <Route
                        element={
                            <RoleProtectedRoute
                                allowedRoles={["user"]}
                            />
                        }
                    >
                        <Route
                            path="/user"
                            element={<UserDashboard />}
                        />
                    </Route>


                </Route>

            </Routes>

        </Suspense >
    );
}