import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from "@/utils/passwordRules";

export type PasswordValidationResult =
    | {
        isValid: true;
        error: null;
    }
    | {
        isValid: false;
        error: string;
    };

export function validatePassword(
    password: string
): PasswordValidationResult {
    // Use Array.from to correctly count characters, including surrogate pairs
    const passwordLength = Array.from(password).length;

    // Early error returns for empty/invalid passwords
    if (passwordLength === 0) {
        return {
            isValid: false,
            error: "Password is required.",
        };
    }

    if (passwordLength < PASSWORD_MIN_LENGTH) {
        return {
            isValid: false,
            error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
        };
    }

    if (passwordLength > PASSWORD_MAX_LENGTH) {
        return {
            isValid: false,
            error: `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters.`,
        };
    }

    return {
        isValid: true,
        error: null,
    };
}