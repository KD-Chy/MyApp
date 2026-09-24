import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import type { SignupFormData, SignupErrors } from "../../types/auth";
import { signup } from "../../services/authservice";
import { validateSignup } from "../../utils/validators";
import TextInput from "../inputs/TextInput";
import PasswordInput from "../inputs/PasswordInput";
import Checkbox from '../inputs/Checkbox';
import GoogleButton from '../buttons/GoogleButton';
import GitHubButton from '../buttons/GitHubButton';
import MicrosoftButton from '../buttons/MicrosoftButton';
import { FaUser, FaEnvelope } from "react-icons/fa";

export default function SignupForm() {
    const [form, setForm] = useState<SignupFormData>({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });

    const [errorMessage, setErrorMessage] = useState<SignupErrors>({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        acceptTerms: "",
    });

    const [loading, setLoading] = useState(false);
    const [isSignupError, setSignupError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            // e.target.name denotes or represents username, password in this case.
            // e.target.name contains the value entered by the user in the input field.
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear the error message for the field being updated
        setErrorMessage((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Clear server error when user starts typing
        setSignupError("");
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Stops the browser's default form submission, allows us to handle it with our custom logic.
        e.preventDefault();

        // Clear any previous server error messages
        setSignupError("");

        const validationErrors = validateSignup(form);
        setErrorMessage(validationErrors);

        const hasErrors = Object.values(validationErrors).some((error) => error !== ""
        );

        if (hasErrors) return;

        //these final data values are sent to the backend for processing and storage in the database.

        setLoading(true);
        try {
            const payload = {
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                username: form.username.trim(),
                password: form.password.trim(),
                confirmPassword: form.confirmPassword.trim(),
                acceptTerms: form.acceptTerms,
            };
            // Here you can add your logic to send the form data to your backend or API
            const responseData = await signup(payload);
            alert(responseData.message);
            navigate("/login");
        } catch (error: unknown) {
            // Developer/debug information
            console.error("Signup error:", error);
            if (error instanceof Error) {
                setSignupError(error.message)
            } else {
                setSignupError(
                    "Something went wrong. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 bg-pink-100 border border-gray-300 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        Create Account
                    </h1>

                    <p className="text-sm text-gray-600 italic">
                        Join us by creating an account
                    </p>
                </div>

                {/* Display server error */}
                {isSignupError && (
                    <div className="mt-4 w-full rounded-md bg-red-100 px-3 py-2 text-sm text-red-700 justify-center break-words">
                        {isSignupError}
                    </div>
                )}

                {/* Form Fields */}
                <div className="mt-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            id="firstName"
                            label="First Name *:"
                            name="firstName"
                            placeholder="Enter first name"
                            value={form.firstName}
                            onChange={onChange}
                            autoComplete="given-name"
                            required
                            icon={FaUser}
                        />
                        {errorMessage.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errorMessage.firstName}
                            </p>
                        )}
                        <TextInput
                            id="lastName"
                            label="Last Name *:"
                            name="lastName"
                            placeholder="Enter last name"
                            value={form.lastName}
                            onChange={onChange}
                            autoComplete="family-name"
                            required
                            icon={FaUser}
                        />
                        {errorMessage.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errorMessage.lastName}
                            </p>
                        )}
                    </div>
                    <TextInput
                        id="username"
                        label="Email *:"
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
                        <p className="text-red-500 text-sm">
                            {errorMessage.username}
                        </p>
                    )}
                    <PasswordInput
                        id="password"
                        label="Password *:"
                        name="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={onChange}
                        autoComplete="new-password"
                        required
                    />
                    {errorMessage.password && (
                        <p className="text-red-500 text-sm">
                            {errorMessage.password}
                        </p>
                    )}
                    <div className='space-y-3'>
                        <PasswordInput
                            id="confirmPassword"
                            label="Confirm Password *:"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={form.confirmPassword}
                            onChange={onChange}
                            autoComplete="new-password"
                            required
                        />
                        {errorMessage.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errorMessage.confirmPassword}
                            </p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                                name="acceptTerms"
                                checked={form.acceptTerms}
                                onChange={onChange}
                            />
                            <span>You must accept the {" "}
                                <a
                                    href="/terms-of-service"
                                    target="_blank"
                                    className="text-blue-600 hover:underline hover:text-blue-800"
                                >
                                    Terms of Service
                                </a>
                                {" "}and{" "}
                                <a
                                    href="/security-policy"
                                    target="_blank"
                                    className="text-blue-600 hover:underline hover:text-blue-800"
                                >
                                    Security Policy
                                </a>
                            </span>
                        </label>
                        {errorMessage.acceptTerms && (
                            <p className="text-red-500 text-sm">
                                {errorMessage.acceptTerms}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit" //type="submit" submits the form when clicked
                        disabled={loading}
                        className="w-full mb-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 border rounded-lg
                                    shadow-xl font-medium disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70
                                    cursor-pointer"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                    <div className="flex items-center">
                        <div className="flex-1 border-t border-gray-500"></div>

                        <span className="mx-3 text-sm text-gray-500">
                            or continue with
                        </span>

                        <div className="flex-1 border-t border-gray-500"></div>
                    </div>
                    <div className="space-y-2">
                        <GoogleButton />
                        <GitHubButton />
                        <MicrosoftButton />
                    </div>
                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login" //type="button" prevents from submitting the form without login
                            className="ml-1 underline text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </form >
        </div >
    );
}