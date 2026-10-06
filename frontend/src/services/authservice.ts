import type {
    LoginFormData,
    SignupFormData,
    LoginResponse
} from "../types/auth";

// This lets us to use:
// development to localhost Django server and
// production to production API django server, without changing the code in the future.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BASE_SIGNIN = `${API_BASE_URL}/login/`;
const API_BASE_SIGNUP = `${API_BASE_URL}/signup/`;
const FORGOT_PASSWORD_API = `${API_BASE_URL}/auth/password-reset/request/`;
const PASSWORD_RESET_CONFIRM_API = `${API_BASE_URL}/auth/password-reset/confirm/`;

export type PasswordResetConfirmPayload = {
    token: string;
    new_password: string;
    confirm_password: string;
};
// Login API
export async function login(
    payload: LoginFormData
): Promise<LoginResponse> {
    const response = await fetch(API_BASE_SIGNIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Converting JS object to a JSON string to send in the request.body
    });

    // Parse the JSON response from backend
    const responseData = await response.json();

    // Handle unsuccessful HTTP responses
    if (!response.ok) {

        // Authentication failure
        if (response.status === 401) {
            throw new Error(
                responseData.error || "Invalid username or password. Please try again."
            );
        }

        // Backend encountered an unexpected error
        if (response.status === 500) {
            throw new Error(
                "Something went wrong from our side. Please try again later."
            );
        }

        // Service temporarily unavailable
        if (response.status === 502 ||
            response.status === 503 ||
            response.status === 504
        ) {
            throw new Error(
                "The service is temporarily unavailable. Please try again later"
            );
        }

        // Other client/API errors
        throw new Error(
            responseData.Error || "Unable to complete your response. Please try again."
        );
    }
    return responseData;
}

export async function signup(payload: SignupFormData) {
    const response = await fetch(API_BASE_SIGNUP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Converting JS object to a JSON string to send in the request.body
    });

    // Parsing that JSON response from the server into a JavaScript object
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.error || "Failed to sign up");
    }
    return responseData;
}

export const forgotPassword = async (email: string) => {
    const response = await fetch(
        FORGOT_PASSWORD_API,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
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
    return response.json();
}

export const confirmPasswordReset = async (
    payload: PasswordResetConfirmPayload
) => {
    const response = await fetch(
        PASSWORD_RESET_CONFIRM_API,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data?.detail ||
            data?.message ||
            "Unable to reset your password."
        );
    }

    return data;
};