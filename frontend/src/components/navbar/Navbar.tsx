import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaBars,
    FaXmark,
    // FaMagnifyingGlass,
    FaUserPlus,
    FaRightToBracket,
} from "react-icons/fa6";

import HomeLogo from "./HomeLogo";
import { navigationItems } from "@/constants/navigation";

import NavbarSearch from "./NavbarSearch";



export default function Navbar() {
    /*
    |-------------------------
    | States
    |-------------------------
    */

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    /*
    |-------------------------
    | Effects
    |-------------------------
    */

    /*
    |------------------------------------------------------
    | Effect -> Escape key closes open menus when pressed
    |------------------------------------------------------
    */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

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
    | Effect -> Responsive breakpoint for mobile menu
    |-------------------------
    */

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    /*
    |------------------------------------------
    | Handler -> close mobile navigation menu
    |------------------------------------------
    */
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* ================================================================
                | Navbar
                ================================================================ */}

            <nav
                id="nav-items"
                role="navigation"
                className={`sticky left-0 top-0 z-50 w-full transition-colors duration-300 ${scrolled ?
                    "bg-gray-100 shadow-md" :
                    "bg-primary"
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
                                    //         text-white transition-colors hover:bg-gray-700 hover:text-white"

                                    className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${scrolled ?
                                        "text-gray-900 hover:bg-gray-300" :
                                        "text-gray-100 hover:bg-gray-500 hover:text-gray-100"
                                        }`}
                                >
                                    <Icon className="text-sm transition-colors group-hover:scale-105" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}

                    </div>

                    {/* --------------------------------------------------------
                          Desktop right-side actions
                        -------------------------------------------------------- */}

                    <div className="hidden items-center gap-2 lg:flex">
                        <NavbarSearch
                            scrolled={scrolled}
                            variant="desktop"
                        />

                        <Link
                            to="/login"
                            // className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${scrolled ?
                                "text-gray-900 hover:bg-gray-300" :
                                "text-gray-100 hover:bg-gray-500 hover:text-gray-100"
                                }`}
                        >
                            <FaRightToBracket 
                                aria-hidden="true"
                            />
                            <span>Login</span>
                        </Link>

                        <Link
                            to="/signup"
                            // className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-700"
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${scrolled ?
                                "text-gray-900 hover:bg-gray-300" :
                                "text-gray-100 hover:bg-gray-500 hover:text-gray-100"
                                }`}
                        >
                            <FaUserPlus
                                aria-hidden="true"
                            />
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
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden ${scrolled ?
                            "text-gray-900 hover:bg-gray-300" :
                            "text-gray-100 hover:bg-gray-500"}
                            `}
                        aria-label={
                            mobileMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {mobileMenuOpen ? <FaXmark /> : <FaBars />}
                    </button>
                </div>



                {/* ============================================================
                  MOBILE NAVIGATION
                ============================================================ */}

                {mobileMenuOpen && (
                    <div
                        id="mobile-navigation"
                        // absolute left-0 top-0 z-50 w-full transition-colors duration-300 
                        className={`absolute left-0 top-full z-40 w-full border-t transition-colors duration-300 ${scrolled ?
                            "bg-gray-100 rounded-b-xl shadow-md" :
                            "bg-primary"
                            }`}
                    >

                        <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-auto px-4 py-4 sm:px-6">

                            <nav aria-label="Mobile navigation">

                                <div className="space-y-1">

                                    {navigationItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                onClick={closeMobileMenu}
                                                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${scrolled ?
                                                    "text-gray-900 hover:bg-gray-300" :
                                                    "bg-gray-900 text-gray-100 hover:bg-gray-500 hover:text-gray-100"
                                                    }`}
                                            >
                                                <Icon aria-hidden="true" />
                                                <span>{item.label}</span>
                                            </a>
                                        );
                                    })}

                                </div>
                            </nav>
                            
                            <NavbarSearch
                                variant="mobile"
                                scrolled={scrolled}
                            />

                            {/* Mobile authentication */}
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <div>
                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        <FaRightToBracket
                                            aria-hidden="true"
                                        />
                                        Login
                                    </Link>
                                </div>

                                <div>
                                    <Link
                                        to="/signup"
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                                    >
                                        <FaUserPlus
                                            aria-hidden="true"
                                        />
                                        Sign Up
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>
                )}
            </nav>

        </>
    );
}