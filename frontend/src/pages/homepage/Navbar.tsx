import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaBars,
    FaTimes,
    FaHome,
    FaInfoCircle,
    FaEnvelope,
    FaSearch,
    FaUserPlus,
    FaSignInAlt,

} from "react-icons/fa";

import { SITE_NAME } from "../../constraint/constraints";

/*
|--------------------------------------------------------------------------
| Website configuration
|--------------------------------------------------------------------------
| Keep the main branding information in one place.
| When you decide the final website name, change it here.
|--------------------------------------------------------------------------
*/

{SITE_NAME}

/*
|--------------------------------------------------------------------------
| Navigation items
|--------------------------------------------------------------------------
*/

const navigationItems = [
    {
        label: "Home",
        href: "#home",
        icon: FaHome,
    },
    {
        label: "About Us",
        href: "#about",
        icon: FaInfoCircle,
    },
    {
        label: "Contact Us",
        href: "#contact",
        icon: FaEnvelope,
    },
];

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Close mobile menu
    |--------------------------------------------------------------------------
    */

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Search handler
    |--------------------------------------------------------------------------
    */

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const query = searchQuery.trim();

        if (!query) {
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Search functionality can be connected later.
        |
        | For now, this keeps the UI ready without pretending
        | that a search backend already exists.
        |--------------------------------------------------------------------------
        */

        console.log("Search query:", query);
    };

    const handleHomeClick = () => {
        closeMobileMenu();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <div>
            {/* ================================================================
                | NAVBAR
                ================================================================= */}

            {/* <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md"> */}

                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
                    aria-label="Main navigation"
                >

                    {/* --------------------------------------------------------
                        | Logo
                        --------------------------------------------------------- */}

                    <Link
                        to="/"
                        onClick={handleHomeClick}
                        className="flex items-center gap-3"
                        aria-label={`${SITE_NAME} home`}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm">
                            <FaHome className="text-lg" />
                        </div>

                        <div>
                            <span className="block text-lg font-bold tracking-tight text-gray-900">
                                {SITE_NAME}
                            </span>

                            <span className="hidden text-xs text-gray-500 sm:block">
                                Smart. Secure. Simple.
                            </span>
                        </div>
                    </Link>

                    {/* --------------------------------------------------------
                          Desktop navigation
                        --------------------------------------------------------- */}

                    <div className="hidden items-center gap-1 lg:flex">

                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <Icon className="text-sm transition group-hover:scale-105" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}

                    </div>

                    {/* --------------------------------------------------------
                          Desktop right-side actions
                        --------------------------------------------------------- */}

                    <div className="hidden items-center gap-2 lg:flex">

                        {/* Search */}

                        <div className="relative">

                            <button
                                type="button"
                                onClick={() => setSearchOpen((current) => !current)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                aria-label="Open search"
                                aria-expanded={searchOpen}
                            >
                                <FaSearch />
                            </button>

                            {searchOpen && (
                                <form
                                    onSubmit={handleSearch}
                                    className="absolute right-0 top-12 flex w-72 items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                                >
                                    <FaSearch className="ml-2 text-sm text-gray-400" />

                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(event) =>
                                            setSearchQuery(event.target.value)
                                        }
                                        placeholder="Search..."
                                        className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-400"
                                        aria-label="Search"
                                        autoFocus
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                                    >
                                        Search
                                    </button>
                                </form>
                            )}

                        </div>

                        {/* Login */}

                        <Link
                            to="/login"
                            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>

                        {/* Sign Up */}

                        <Link
                            to="/signup"
                            className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                        >
                            <FaUserPlus />
                            <span>Sign Up</span>
                        </Link>

                    </div>

                    {/* --------------------------------------------------------
                          Mobile menu button
                        --------------------------------------------------------- */}

                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenuOpen((current) => !current)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 lg:hidden"
                        aria-label={
                            mobileMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </nav>

                {/* ============================================================
                      MOBILE NAVIGATION
                    ============================================================= */}

                {mobileMenuOpen && (
                    <div className="border-t border-gray-200 bg-white lg:hidden">

                        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

                            <div className="space-y-1">

                                {navigationItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                        >
                                            <Icon />
                                            <span>{item.label}</span>
                                        </a>
                                    );
                                })}

                            </div>

                            <div className="my-4 border-t border-gray-200" />

                            {/* Mobile search */}

                            <form
                                onSubmit={handleSearch}
                                className="mb-3 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2"
                            >
                                <FaSearch className="text-sm text-gray-400" />

                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search..."
                                    className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none"
                                    aria-label="Search"
                                />

                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-900 px-3 py-2 text-xs font-semibold text-white"
                                >
                                    Search
                                </button>
                            </form>

                            {/* Mobile authentication */}

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <FaSignInAlt />
                                        Login
                                    </Link>
                                </div>

                                <div>
                                    <Link
                                        to="/signup"
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                                    >
                                        <FaUserPlus />
                                        Sign Up
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>
                )}

            {/* </header> */}
        </div>
    );
}