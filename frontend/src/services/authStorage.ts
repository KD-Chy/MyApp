import type { LoginResponse } from "../types/auth";

const STORAGE_KEYS = {
    accessToken: "access_token",
    refreshToken: "refresh_token",
    role: "role",
    username: "username",
    firstName: "first_name",
    lastName: "last_name",
} as const;

function getStorage(rememberMe: boolean): Storage {
    return rememberMe ? localStorage : sessionStorage;
}

function clearStorage(storage: Storage): void {
    storage.removeItem(STORAGE_KEYS.accessToken);
    storage.removeItem(STORAGE_KEYS.refreshToken);
    storage.removeItem(STORAGE_KEYS.role);
    storage.removeItem(STORAGE_KEYS.username);
    storage.removeItem(STORAGE_KEYS.firstName);
    storage.removeItem(STORAGE_KEYS.lastName);
}

export function saveAuth(
    response: LoginResponse,
    rememberMe: boolean
): void {
    const storage = getStorage(rememberMe);

    const otherStorage =
        rememberMe ? sessionStorage : localStorage;

    // Remove stale authentication data
    // from the storage that is not being used.
    clearStorage(otherStorage);

    // Save JWT tokens
    storage.setItem(
        STORAGE_KEYS.accessToken,
        response.access
    );

    storage.setItem(
        STORAGE_KEYS.refreshToken,
        response.refresh
    );

    // Save user information
    storage.setItem(
        STORAGE_KEYS.role,
        response.role
    );

    storage.setItem(
        STORAGE_KEYS.username,
        response.username
    );

    storage.setItem(
        STORAGE_KEYS.firstName,
        response.first_name
    );

    storage.setItem(
        STORAGE_KEYS.lastName,
        response.last_name
    );
}

export function clearAuthStorage(): void {
    clearStorage(localStorage);
    clearStorage(sessionStorage);
}

export function getAccessToken(): string | null {
    return (
        localStorage.getItem(STORAGE_KEYS.accessToken) ??
        sessionStorage.getItem(STORAGE_KEYS.accessToken)
    );
}

export function getRefreshToken(): string | null {
    return (
        localStorage.getItem(STORAGE_KEYS.refreshToken) ??
        sessionStorage.getItem(STORAGE_KEYS.refreshToken)
    );
}

export function getAuthUser(): {
    username: string;
    first_name: string;
    last_name: string;
    role: string;
} | null {
    const username =
        localStorage.getItem(STORAGE_KEYS.username) ??
        sessionStorage.getItem(STORAGE_KEYS.username);

    const first_name =
        localStorage.getItem(STORAGE_KEYS.firstName) ??
        sessionStorage.getItem(STORAGE_KEYS.firstName);

    const last_name =
        localStorage.getItem(STORAGE_KEYS.lastName) ??
        sessionStorage.getItem(STORAGE_KEYS.lastName);

    const role =
        localStorage.getItem(STORAGE_KEYS.role) ??
        sessionStorage.getItem(STORAGE_KEYS.role);

    if (!username || !role) {
        return null;
    }

    return {
        username,
        first_name: first_name ?? "",
        last_name: last_name ?? "",
        role,
    };
}