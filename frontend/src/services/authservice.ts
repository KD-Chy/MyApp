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

// This can create cors issues if the frontend and backend are on different domains.
// const API_BASE_SIGNIN = 'http://127.0.0.1:8000/api/login/';
// const API_BASE_SIGNUP = 'http://127.0.0.1:8000/api/signup/';

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
        throw new Error (
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

