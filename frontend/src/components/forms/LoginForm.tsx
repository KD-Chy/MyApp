import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import type { LoginFormData, LoginErrors } from "../../types/auth";
import { login } from "../../services/authservice";
import { validateLogin } from "../../utils/validators";
import TextInput from "../inputs/TextInput";
import PasswordInput from "../inputs/PasswordInput";
import Checkbox from '../inputs/Checkbox';
import GoogleButton from '../buttons/GoogleButton';
import GitHubButton from "../buttons/GitHubButton";
import MicrosoftButton from "../buttons/MicrosoftButton";
import { FaEnvelope } from "react-icons/fa";
import { saveAuth } from "../../services/authStorage";
import { useAuth } from "../../context/AuthContext"

export default function LoginForm() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [form, setForm] = useState<LoginFormData>({
        username: "",
        password: "",
        rememberMe: false,
    });

    const [errorMessage, setErrorMessage] = useState<LoginErrors>({
        username: "",
        password: "",
        rememberMe: "",
    });

    const [loading, setLoading] = useState(false);
    const [isLoginError, setLoginError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear the error message for the field being updated
        setErrorMessage((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Clear server error when user starts typing
        setLoginError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoginError(""); // Clear any previous server error messages

        const validationErrors = validateLogin(form);
        setErrorMessage(validationErrors);
        
        const hasErrors = Object.values(validationErrors).some((error) => error !== ""
        );

        if (hasErrors) return;

        setLoading(true);
        try {
            const payload: LoginFormData = {
                username: form.username.trim(),
                password: form.password,
                rememberMe: form.rememberMe,
            };

            // Calls the backend login api and returns the access and refresh tokens along with user info
            const responseData = await login(payload);

            loginUser(responseData, form.rememberMe)

            saveAuth(responseData, form.rememberMe);

            // Redirect according to the user's role to the appropriate dashboard
            const dashboardRoutes: Record<string, string> = {
                superadmin: "/superadmin",
                admin: "/admin",
                user: "/user",
            };
            const route = dashboardRoutes[responseData.role];
            if (!route) {
                throw new Error("Invalid user role");
            }
            navigate(
                route,
                { replace: true }
            );
        } catch (error) {
            // Developer/debug information
            console.error("Login error:", error);

            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError(
                    "Something went wrong. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-4 overflow-hidden sm:px-6 lg:px-8 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-lg border border-gray-300 bg-pink-100 p-6 shadow-lg">
                {/* Form Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Login Form
                    </h1>
                    <div>
                        <p className="text-md font-medium text-gray-700">
                            Welcome Back 👋
                        </p>
                        <p className="text-sm text-gray-500 italic">
                            Sign in to continue to your account
                        </p>
                    </div>
                </div>

                {/* Display server error */}
                {isLoginError && (
                    <div className="mt-4 w-full rounded-md bg-red-100 px-3 py-2 text-sm text-red-700 justify-center break-words">
                        {isLoginError}
                    </div>
                )}

                {/* Form Fields */}
                <div className="mt-4 space-y-6">
                    <div>
                        <TextInput
                            id="email"
                            label={
                                <>
                                    Email <span className="text-red-500">*</span>:
                                </>
                            }
                            // label="Email *:"
                            name="username"
                            type="email"
                            placeholder="Enter your email"
                            value={form.username}
                            onChange={onChange}
                            autoComplete="email"
                            required
                            icon={FaEnvelope}
                        />
                        {errorMessage.username && (
                            <p className="mt-1 text-red-500 text-sm">
                                {errorMessage.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <PasswordInput
                            id="password"
                            label={
                                <>
                                    Password <span className="text-red-500">*</span>:
                                </>
                            }
                            // label="Password *:"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={onChange}
                            autoComplete="current-password"
                            required
                        />
                        {errorMessage.password && (
                            <p className="mt-1 text-red-500 text-sm">
                                {errorMessage.password}
                            </p>
                        )}
                    </div>

                    {/* Remember Me / Forgot Password */}
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <Checkbox
                                        name="rememberMe"
                                        checked={form.rememberMe}
                                        onChange={onChange}
                                    />
                                    <span>Remember me</span>
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            {errorMessage.rememberMe && (
                                <p className="mt-1 text-red-500 text-sm">
                                    {errorMessage.rememberMe}
                                </p>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit" //type="submit" submits the form when clicked
                            disabled={loading}
                            className="w-full rounded-lg border mb-4 text-white bg-blue-500 px-4 py-2
                                                        shadow-xl font-medium transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70
                                                        cursor-pointer"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* Social Login Buttons */}
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <div className="flex-1 border-t border-gray-500"></div>

                                <span className="mx-3 text-sm text-gray-500">
                                    or continue with
                                </span>

                                <div className="flex-1 border-t border-gray-500"></div>
                            </div>
                            <GoogleButton />
                            <GitHubButton />
                            <MicrosoftButton />
                        </div>

                        {/* Signup */}
                        <p className="text-center text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup-form" //type="button" prevents from submitting the form without login
                                className="ml-1 underline text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                            >
                                Signup
                            </Link>
                        </p>
                        <p className="text-center text-gray-600">
                            Navbar{" "}
                            <Link
                                to="/navbar" //type="button" prevents from submitting the form without login
                                className="ml-1 underline text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                            >
                                Navbar
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}