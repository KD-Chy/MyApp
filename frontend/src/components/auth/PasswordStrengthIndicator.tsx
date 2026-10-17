import { useMemo } from "react";

import { checkPasswordStrength } from "@/services/passwordStrength";

type StrengthLevel = {
    label: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";
    colorClass: string;
    textColorClass: string;
    filledPieces: number;
};

type PasswordStrengthIndicatorProps = {
    password: string;
};

type StrengthScore = 0 | 1 | 2 | 3 | 4;

const STRENGTH_LEVELS: Record<StrengthScore, StrengthLevel> = {
    0: {
        label: "Very Weak",
        colorClass: "bg-red-500",
        textColorClass: "text-red-600",
        filledPieces: 1,
    },
    1: {
        label: "Weak",
        colorClass: "bg-orange-500",
        textColorClass: "text-orange-600",
        filledPieces: 2,
    },
    2: {
        label: "Medium",
        colorClass: "bg-yellow-500",
        textColorClass: "text-yellow-700",
        filledPieces: 3,
    },
    3: {
        label: "Strong",
        colorClass: "bg-green-500",
        textColorClass: "text-green-600",
        filledPieces: 4,
    },
    4: {
        label: "Very Strong",
        colorClass: "bg-green-600",
        textColorClass: "text-green-700",
        filledPieces: 4,
    },
};

const PasswordStrengthIndicator = ({
    password,
}: PasswordStrengthIndicatorProps) => {
    const result = useMemo(
        () => checkPasswordStrength(password),
        [password],
    );

    // It doesn't show a strength rating for an empty password.
    if (!password) {
        return null;
    }

    const normalizedScore: StrengthScore =
    Number.isFinite(result.score)
        ? Math.max(0, Math.min(4, Math.floor(result.score))
          ) as StrengthScore
        : 0;

    const strength = STRENGTH_LEVELS[normalizedScore];

    return (
        <div className="flex w-full items-center justify-end gap-2">
            <div
                className="flex w-16 shrink-0 gap-0.5"
                role="progressbar"
                aria-label={`Password strength: ${strength.label}`}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-valuenow={strength.filledPieces}
            >
                {Array.from({ length: 4 }, (_, index) => {
                    const isFilled = index < strength.filledPieces;

                    return (
                        <span
                            key={index}
                            aria-hidden="true"
                            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                                isFilled
                                    ? strength.colorClass
                                    : "bg-gray-300"
                            }`}
                        />
                    );
                })}
            </div>

            <span
                className={`shrink-0 whitespace-nowrap text-xs font-semibold ${strength.textColorClass}`}
            >
                {strength.label}
            </span>
        </div>
    );
};

export default PasswordStrengthIndicator;