export interface AuthFormData {
    username: string;
    password: string;
};

export interface LoginFormData extends AuthFormData {
    rememberMe: boolean;
};

export interface SignupFormData extends AuthFormData {
    firstName: string;
    lastName: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

export interface AuthErrors {
    username: string;
    password: string;
}

export interface LoginErrors extends AuthErrors {
    rememberMe: string;
};

export interface SignupErrors extends AuthErrors {
    firstName: string;
    lastName: string;
    confirmPassword: string;
    acceptTerms: string;
}


export interface LoginResponse {
    access: string;
    refresh: string;
    role: string;
    username: string;
    first_name: string;
    last_name: string;
}

export interface AuthUser{
    username: string;
    first_name: string;
    last_name: string;
    role: string;
}