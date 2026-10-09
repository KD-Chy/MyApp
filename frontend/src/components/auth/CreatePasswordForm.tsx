import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";

import { checkPasswordStrength } from "@/services/passwordStrength";
import { confirmPasswordReset } from "@/services/authService";



type PasswordStrength = {
    label: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";
    colorClass: string;
    width: string;
};

export const getPasswordStrength = (score: number): PasswordStrength => {
    switch (score) {
        case 0:
            return {
                label: "Very Weak",
                colorClass: "bg-red-500",
                width: "w-1/4",
            };
        case 1:
            return {
                label: "Weak",
                colorClass: "bg-red-500",
                width: "w-2/4",
            };
        case 2:
            return {
                label: "Medium",
                colorClass: "bg-yellow-500",
                width: "w-3/4",
            };
        case 3:
            return {
                label: "Strong",
                colorClass: "bg-green-500",
                width: "w-full",
            };
        case 4:
            return {
                label: "Very Strong",
                colorClass: "bg-green-600",
                width: "w-full",
            };
        default:
            return {
                label: "Very Weak",
                colorClass: "bg-red-500",
                width: "w-1/4",
            };
    }
}

const CreatePasswordForm = () => {
    const { token } = useParams<{ token: string }>();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const passwordStrengthResult = useMemo(
        () => checkPasswordStrength(password),
        [password]
    );

    const strength = useMemo(
        () => getPasswordStrength(passwordStrengthResult.score),
        [passwordStrengthResult.score]
    );

    const filledPieces =
        password.length > 0
            ? Math.min(passwordStrengthResult.score + 1, 4)
            : 0;

    const meetsMinimumLength = password.length >= 8;


    const passwordsMatch =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

    const canSubmit =
        Boolean(token) &&
        meetsMinimumLength &&
        passwordsMatch &&
        !isSubmitting &&
        !isSuccess;

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setErrorMessage("");

        // very very important to check if the form can be submitted before proceeding
        // This means that the password meets all requirements and matches the confirmation password
        // This means that the user can't submit the form until every frontend requirement is met or passes, which is a good UX practice and also prevents unnecessary API calls
        // if (!canSubmit) {
        //     return;
        // }

        // Connect your reset-password API here.

        if (isSubmitting || isSuccess) {
            return;
        }
        if (!token) {
            setErrorMessage(
                "This password reset link is invalid. Please request a new link."
            );
            return;
        }
        if (!meetsMinimumLength) {
            setErrorMessage(
                "Your password must contain at least 8 charaters."
            )
            return;
        }
        if (!passwordsMatch) {
            setErrorMessage("Your passwords do not match");
            return;
        }
        if (!canSubmit) {
            return;
        }
        setIsSubmitting(true);
        try {
            await confirmPasswordReset({
                token,
                new_password: password,
                confirm_password: confirmPassword,
            });

            setIsSuccess(true);
            setPassword("");
            setConfirmPassword("");
        } catch (error: unknown) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to reset your password. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };
    const strengthTextColor =
        strength.label === "Very Strong" || strength.label === "Strong"
            ? "text-green-600"
            : strength.label === "Medium"
                ? "text-yellow-600"
                : strength.label === "Weak"
                    ? "text-orange-600"
                    : "text-red-600";

    if (isSuccess) {
        return (
            <section
                className="w-full max-w-md space-y-6"
                aria-labelledby="reset-success-heading"
                aria-live="polite"
            >
                <div className="flex justify-center">
                    {/* Actual logo component */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-xl font-bold text-white">
                        A
                    </div>
                </div>
                <div className="text-center">
                    <div className="max-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <FaCheck
                            className="text-xl"
                            aria-hidden="true"
                        />
                    </div>
                    <h1
                        id="reset-success-heading"
                        className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                        Password reset successful
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Your password has been updated. You can now sign in
                        using your new password.
                    </p>
                </div>

                <Link
                    to="/login-form"
                    className="block w-full rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                    Go to sign in
                </Link>
            </section>
        )
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6"
            noValidate
        >
            {/* Logo */}
            <div className="flex justify-center">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-xl font-bold text-white"
                    aria-label="MyApp"
                >
                    A
                </div>
            </div>

            {/* Heading */}
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Create a new password
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Enter a strong password for your account.
                </p>
            </div>

            {/* New password */}
            <div>
                <label
                    htmlFor="new-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    New password
                </label>

                <div className="relative">
                    <input
                        id="new-password"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setErrorMessage("");
                        }}
                        autoComplete="new-password"
                        required
                        minLength={8}
                        maxLength={128}
                        autoCapitalize="none"
                        spellCheck={false}
                        aria-describedby="password-requirement"
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                        placeholder="Enter your new password"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition hover:text-gray-700"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {/* Four-piece progressive strength bar */}
            <div className="flex items-center gap-3">
                <div
                    className="flex flex-1 gap-1"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={4}
                    aria-valuenow={filledPieces}
                    aria-label={
                        password.length > 0
                            ? `Password strength: ${strength.label}`
                            : "Password strength not yet evaluated"
                    }
                >
                    {[1, 2, 3, 4].map((piece) => (
                        <div
                            key={piece}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${piece <= filledPieces
                                ? strength.colorClass
                                : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>

                {/* Strength label */}
                {password.length > 0 && (
                    <span
                        className={`shrink-0 text-xs font-semibold ${strengthTextColor}`}
                    >
                        {strength.label}
                    </span>
                )}
            </div>

            {/* Confirm password */}
            <div>
                <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Confirm password
                </label>

                <div className="relative">
                    <input
                        id="confirm-password"
                        name="confirmPassword"
                        type={
                            showConfirmPassword ? "text" : "password"
                        }
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                            setErrorMessage("");
                        }}
                        autoComplete="new-password"
                        required
                        maxLength={128}
                        autoCapitalize="none"
                        spellCheck={false}
                        aria-invalid={
                            confirmPassword.length > 0 && !passwordsMatch
                        }
                        aria-describedby={
                            confirmPassword.length > 0 && !passwordsMatch
                                ? "password-mismatch"
                                : undefined
                        }
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                        placeholder="Confirm your new password"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword((current) => !current)
                        }
                        aria-label={
                            showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                        }
                        aria-pressed={showConfirmPassword}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition hover:text-gray-700"
                    >
                        {showConfirmPassword ? (
                            <FaEyeSlash />
                        ) : (
                            <FaEye />
                        )}
                    </button>
                </div>

                {confirmPassword.length > 0 && !passwordsMatch && (
                    <p
                        id="password-mismatch"
                        className="mt-2 text-sm text-red-600"
                    >
                        Passwords do not match.
                    </p>
                )}

            </div>

            {/* API error */}
            {errorMessage && (
                <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {errorMessage}
                </p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? "Resetting password..."
                    : "Reset password"
                }
            </button>
        </form>
    );
};

export default CreatePasswordForm;

// type RequirementProps = {
//     fulfilled: boolean;
//     text: string;
// };

// const Requirement = ({ fulfilled, text }: RequirementProps) => {
//     return (
//         <li className="flex items-center gap-2 text-sm">
//             <span
//                 className={`flex h-4 w-4 items-center justify-center rounded-full ${fulfilled
//                     ? "bg-green-100 text-green-600"
//                     : "bg-gray-100 text-gray-400"
//                     }`}
//             >
//                 {fulfilled && <FaCheck className="text-[9px]" />}
//             </span>

//             <span
//                 className={
//                     fulfilled ? "text-gray-700" : "text-gray-400"
//                 }
//             >
//                 {text}
//             </span>
//         </li>
//     );
// };


{/* Password requirements */ }
{/* <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                    Password requirements
                </p>

                <ul id="password-requirement" className="space-y-2">
                    <Requirement
                        fulfilled={meetsMinimumLength}
                        text="At least 8 characters000"
                    />
                </ul>
            </div> */}