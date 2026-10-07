import { useMemo, useState } from "react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { checkPasswordStrength } from "@/services/passwordStrength";

type RequirementProps = {
    fulfilled: boolean;
    text: string;
};

type PasswordStrength = {
    label: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";
    colorClass: string;
    width: string;
};

const Requirement = ({ fulfilled, text }: RequirementProps) => {
    return (
        <li className="flex items-center gap-2 text-sm">
            <span
                className={`flex h-4 w-4 items-center justify-center rounded-full ${fulfilled
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
            >
                {fulfilled && <FaCheck className="text-[9px]" />}
            </span>

            <span
                className={
                    fulfilled ? "text-gray-700" : "text-gray-400"
                }
            >
                {text}
            </span>
        </li>
    );
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
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordRequirements = useMemo(
        () => ({
            minLength: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialCharacter: /[^A-Za-z0-9]/.test(password),
        }),
        [password]
    );

    const passwordStrengthResult = useMemo(
        () => checkPasswordStrength(password),
        [password]
    );

    const strength = useMemo(
        () => getPasswordStrength(passwordStrengthResult.score),
        [passwordStrengthResult.score]
    );

    const filledPieces = Math.min(passwordStrengthResult.score + 1, 4);

    const isPasswordValid =
        passwordRequirements.minLength &&
        passwordRequirements.uppercase &&
        passwordRequirements.lowercase &&
        passwordRequirements.number &&
        passwordRequirements.specialCharacter;

    const passwordsMatch =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

    const canSubmit = isPasswordValid && passwordsMatch;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //very very important to check if the form can be submitted before proceeding
        // This means that the password meets all requirements and matches the confirmation password
        // This means that the user can't submit the form until every frontend requirement is met or passes, which is a good UX practice and also prevents unnecessary API calls
        // if (!canSubmit) {
        //     return;
        // }

        // Connect your reset-password API here.
        console.log("Reset password");
    };

    
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6"
        >
            {/* Logo */}
            <div className="flex justify-center">
                {/* Actual logo component */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-xl font-bold text-white">
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
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
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
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition hover:text-gray-700"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {/* Password strength */}
            <div className="flex items-center gap-3">
                {/* Four-piece progressive strength bar */}
                <div
                    className="flex flex-1 gap-1"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={4}
                    aria-valuenow={filledPieces}
                    aria-label={`Password strength: ${strength.label}`}
                >
                    {[1, 2, 3, 4].map((piece) => (
                        <div
                            key={piece}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                piece <= filledPieces
                                    ? strength.colorClass
                                    : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>

                {/* Strength label */}
                {password.length > 0 && (
                    <span
                        className={`shrink-0 text-xs font-semibold ${
                            strength.label === "Very Strong" || strength.label === "Strong"
                                ? "text-green-600"
                                : strength.label === "Medium"
                                    ? "text-yellow-600"
                                    : strength.label === "Weak"
                                        ? "text-orange-600"
                                        : strength.label === "Very Weak"
                                            ? "text-red-600"
                                            : "text-gray-300"
                            }`}
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
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        autoComplete="new-password"
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
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition hover:text-gray-700"
                    >
                        {showConfirmPassword ? (
                            <FaEyeSlash />
                        ) : (
                            <FaEye />
                        )}
                    </button>
                </div>
            </div>

            {/* Password requirements */}
            <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                    Password requirements
                </p>

                <ul className="space-y-2">
                    <Requirement
                        fulfilled={passwordRequirements.minLength}
                        text="At least 8 characters"
                    />

                    <Requirement
                        fulfilled={passwordRequirements.uppercase}
                        text="Uppercase letter"
                    />

                    <Requirement
                        fulfilled={passwordRequirements.lowercase}
                        text="Lowercase letter"
                    />

                    <Requirement
                        fulfilled={passwordRequirements.number}
                        text="Number"
                    />

                    <Requirement
                        fulfilled={passwordRequirements.specialCharacter}
                        text="Special character"
                    />
                </ul>
            </div>

            {/* Password mismatch */}
            {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-sm text-red-600">
                    Passwords do not match.
                </p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Reset password
            </button>
        </form>
    );
};



export default CreatePasswordForm;
