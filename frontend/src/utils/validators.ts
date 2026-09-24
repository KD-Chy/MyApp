import type {
    LoginFormData,
    LoginErrors,
    SignupErrors,
    SignupFormData
} from "../types/auth";
export function validateLogin(form: LoginFormData): LoginErrors {
    const errors: LoginErrors = {
        username: "",
        password: "",
        rememberMe: "",
    };
    if (!form.username.trim()) {
        errors.username = "Username is required.";
    }
    if (!form.password.trim()) {
        errors.password = "Password is required.";
    }
    return errors;
}

export function validateSignup(form: SignupFormData): SignupErrors {
    const errors: SignupErrors = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        acceptTerms: "",

    };
    if (!form.firstName.trim()) {
        errors.firstName = "First name is required.";
    }
    if (!form.lastName.trim()) {
        errors.lastName = "Last name is required.";
    }
    if (!form.username.trim()) {
        errors.username = "Username is required.";
    }
    if (!form.password.trim()) {
        errors.password = "Password is required.";
    }
    if (!form.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm password is required.";
    } else if (form.password != form.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }
    if (!form.acceptTerms) {
        errors.acceptTerms = "You must have to accept Terms of Service and Security Policy"
    }
    return errors;
};