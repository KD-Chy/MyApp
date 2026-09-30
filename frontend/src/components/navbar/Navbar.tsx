import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaBars,
    FaXmark,
    FaHouse,
    FaCircleInfo,
    FaEnvelope,
    FaMagnifyingGlass,
    FaUserPlus,
    FaRightToBracket,
} from "react-icons/fa6";

import HomeLogo from "./HomeLogo";

/*
|-------------------------
| Navigation items
|-------------------------
*/

const navigationItems = [
    {
        label: "Home",
        href: "#home",
        icon: FaHouse,
    },
    {
        label: "About Us",
        href: "#about",
        icon: FaCircleInfo,
    },
    {
        label: "Contact Us",
        href: "#contact",
        icon: FaEnvelope,
    },
];

export default function Navbar() {
    /*
    |-------------------------
    | State
    |-------------------------
    */

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);

    /*
    |-------------------------
    | Effects
    |-------------------------
    */

    /*
    |-------------------------
    | Effect -> scroll behavior
    |-------------------------
    */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /*
    |-------------------------
    | Effect -> search outside-click behavior
    |-------------------------
    */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                // Keep search open if user has typed something(space)
                if (searchQuery.trim() !== "") {
                    return;
                }
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchQuery]);

    /*
    |---------------------------
    | Handlers
    |---------------------------
    */

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const query = searchQuery.trim();

        if (!query) {
            return;
        }

        /*
        |------------------------------------------------------
        | Search functionality can be connected later.
        |
        | For now, this keeps the UI ready without pretending
        | that a search backend already exists.
        |------------------------------------------------------
        */

        console.log("Search query:", query);
    };

    const searchRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            {/* ================================================================
                | Navbar
                ================================================================ */}
            {/* <nav
                className="absolute left-0 top-0 z-50 w-full bg-primary"
                aria-label="Main navigation"
            > */}
            <nav
                className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${scrolled ? "bg-white shadow-md" : "bg-primary"
                    }`}
                aria-label="Main navigation"
            >
                <div
                    className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
                >

                    {/* --------------------------------------------------------
                    | Home logo
                    --------------------------------------------------------- */}

                    <HomeLogo />

                    {/* --------------------------------------------------------
                    | Desktop navigation
                    --------------------------------------------------------- */}

                    <div className="hidden items-center gap-1 lg:flex">

                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    // className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium
                                    //         text-white transition hover:bg-gray-700 hover:text-white"

                                    className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${scrolled ?
                                        "text-gray-900 hover:bg-gray-300" :
                                        "text-gray-100 hover:bg-gray-500 hover:text-gray-100"
                                        }`}
                                >
                                    <Icon className="text-sm transition group-hover:scale-105" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}

                    </div>

                    {/* --------------------------------------------------------
                          Desktop right-side actions
                        -------------------------------------------------------- */}

                    <div className="hidden items-center gap-2 lg:flex">
                        <div
                            ref={searchRef}
                            className="flex h-10 items-center overflow-hidden rounded-xl transition-all duration-300"
                        >
                            {/* Search icon */}
                            <button
                                type="button"
                                onClick={() => setSearchOpen((current) => !current)}
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${scrolled
                                    ? "text-gray-900 hover:bg-gray-300"
                                    : "text-gray-100 hover:bg-gray-500"
                                    }`}
                                aria-label={searchOpen ? "Close search" : "Open search"}
                                aria-expanded={searchOpen}
                            >
                                <FaMagnifyingGlass />
                            </button>

                            {searchOpen && (
                                <form
                                    onSubmit={handleSearch}
                                    className="flex items-center"
                                >
                                    {/* Small typing field */}
                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(event) =>
                                            setSearchQuery(event.target.value)
                                        }
                                        placeholder="Search..."
                                        autoFocus
                                        aria-label="Search"
                                        className={`w-26.25 border-0 bg-transparent px-2 text-sm outline-none placeholder:text-gray-400 ${scrolled
                                            ? "text-gray-900"
                                            : "text-gray-100 placeholder:text-gray-300"
                                            }`}
                                    />

                                    {/* Search button */}
                                    <button
                                        type="submit"
                                        className={`mr-1 shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${scrolled
                                            ? "bg-gray-900 text-white hover:bg-gray-700"
                                            : "bg-white text-gray-900 hover:bg-gray-200"
                                            }`}
                                    >
                                        Search
                                    </button>
                                </form>
                            )}
                        </div>
                        <Link
                            to="/login"
                            // className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${scrolled ?
                                "text-gray-900 hover:bg-gray-300" :
                                "text-gray-100 hover:bg-gray-500 hover:text-gray-100"
                                }`}
                        >
                            <FaRightToBracket />
                            <span>Login</span>
                        </Link>

                        {/* Sign Up */}

                        <Link
                            to="/signup"
                            // className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${scrolled ?
                                "text-gray-900 hover:bg-gray-300" :
                                "text-gray-100 hover:bg-gray-500 hover:text-gray-100"
                                }`}
                        >
                            <FaUserPlus />
                            <span>Sign Up</span>
                        </Link>

                    </div>

                    {/* --------------------------------------------------------
                      Mobile menu button
                    -------------------------------------------------------- */}

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
                        {mobileMenuOpen ? <FaXmark /> : <FaBars />}
                    </button>
                </div>

            </nav>

            {/* ============================================================
                  MOBILE NAVIGATION
                ============================================================ */}

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
                            <FaMagnifyingGlass className="text-sm text-gray-400" />

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
                                    <FaRightToBracket />
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

        </div>
    );
}