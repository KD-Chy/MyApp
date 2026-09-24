import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import type { ReactNode } from "react";

// type PasswordInputProps = {
//     id: string;
//     label: string; 
//     name: string;
//     value: string;
//     placeholder?: string;
//     autoComplete?: string;
//     required?: boolean;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };
interface PasswordInputProps {
    id: string;
    label: ReactNode; 
    name: string;
    value: string;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
    id,
    label,
    name,
    value,
    placeholder,
    autoComplete,
    required,
    onChange
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="font-medium text-gray-700">
                {label}
            </label>

            <div className="relative">
                {/* Left icon */}
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Right icon */}
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    );
}
