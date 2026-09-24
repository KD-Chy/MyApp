import type { IconType } from "react-icons";
import type { ReactNode } from "react";

interface TextInputProps {
    id: string;
    label: ReactNode;
    name: string;
    value: string;
    placeholder?: string;
    type?: string;
    acceptTerms?: boolean;
    autoComplete?: string;
    required?: boolean;
    icon?: IconType;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// type TextInputProps = {
//     id: string;
//     label: string;
//     name: string;
//     value: string;
//     placeholder?: string;
//     type?: string;
//     acceptTerms?: boolean;
//     autoComplete?: string;
//     required?: boolean;
//     icon?: IconType;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };
export default function TextInput({
    id,
    label,
    name,
    value,
    placeholder,
    type,
    autoComplete,
    required,
    icon: Icon,
    onChange
}: TextInputProps) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                )}
                <input
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={onChange}
                    className={`w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${Icon ? "pl-10 pr-4" : "px-4"
                        }`}
                />
            </div>
        </div>
    );
}