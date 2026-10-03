import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaEnvelope,
    FaLock,
    FaShieldHalved,
} from "react-icons/fa6";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setMessage("");

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            setError("Please enter your email address.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_BASE_URL}/auth/password-reset/request/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: normalizedEmail,
                    }),
                }
            );

            /*
             * Important:
             * The backend should return a generic response whether
             * the email exists or does not exist.
             *
             * This prevents account enumeration.
             */
            if (!response.ok) {
                throw new Error("Unable to process your request.");
            }

            setMessage(
                "If an account exists for this email, you will receive a password reset link shortly."
            );

            setEmail("");
        } catch {
            setError(
                "We couldn't process your request right now. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
                <section
                    className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                    aria-labelledby="forgot-password-title"
                >
                    {/* Security icon */}
                    <div className="mb-4 flex justify-center">
                        <div
                            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-sm"
                            aria-hidden="true"
                        >
                            <FaLock className="text-xl" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center">
                        <h1
                            id="forgot-password-title"
                            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                        >
                            Forgot your password?
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Enter the email address associated with your
                            account and we'll send you a secure password
                            reset link.
                        </p>
                    </div>

                    {/* Security information */}
                    <div
                        className="mt-6 flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
                        role="note"
                    >
                        <FaShieldHalved
                            className="mt-0.5 shrink-0 text-gray-700"
                            aria-hidden="true"
                        />

                        <p className="text-xs leading-5 text-gray-600">
                            For your security, we don't reveal whether an
                            account exists for a particular email address.
                        </p>
                    </div>

                    {/* Success message */}
                    {message && (
                        <div
                            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-5 text-green-800"
                            role="status"
                            aria-live="polite"
                        >
                            {message}
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div
                            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-5 text-danger"
                            role="alert"
                            aria-live="assertive"
                        >
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    {!message && (
                        <form
                            onSubmit={handleSubmit}
                            className="mt-7 space-y-5"
                            noValidate
                        >
                            <div>
                                <label
                                    htmlFor="forgot-password-email"
                                    className="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Email address
                                </label>

                                <div className="relative">
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"
                                        aria-hidden="true"
                                    >
                                        <FaEnvelope
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <input
                                        id="forgot-password-email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        inputMode="email"
                                        spellCheck={false}
                                        autoCapitalize="none"
                                        disabled={loading}
                                        aria-invalid={Boolean(error)}
                                        aria-describedby={
                                            error
                                                ? "forgot-password-error"
                                                : undefined
                                        }
                                        className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                                    />
                                </div>

                                {error && (
                                    <p
                                        id="forgot-password-error"
                                        className="mt-2 text-xs text-red-600"
                                    >
                                        {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                            aria-hidden="true"
                                        />
                                        Sending reset link...
                                    </>
                                ) : (
                                    "Send reset link"
                                )}
                            </button>
                        </form>
                    )}

                    {/* Back to login */}
                    <div className="mt-7 text-center">
                        <Link
                            to="/login-form"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-gray-900 focus:outline-none focus:rounded-lg focus:px-2 focus:py-2 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                            <FaArrowLeft
                                className="text-xs transition-transform group-hover:-translate-x-1"
                                aria-hidden="true"
                            />
                            Back to login
                        </Link>
                    </div>

                    {/* Footer security statement */}
                    <p className="mt-8 text-center text-xs leading-5 text-gray-500">
                        Your account security and privacy are important to us.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default ForgotPassword;