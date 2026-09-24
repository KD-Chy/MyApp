import { Link } from "react-router-dom";

import{
    FaHome,
    FaLinkedin,
    FaGithub,
    FaTwitter,
} from "react-icons/fa";

import { SITE_NAME } from "../../constraint/constraints";

export default function Footer() {
    return (
        <div>
            {/* ================================================================
                | FOOTER
                ================================================================ */}

            <footer className="bg-gray-950 text-gray-300">

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                        {/* Brand */}

                        <div className="lg:col-span-2">

                            <Link
                                to="/"
                                className="inline-flex items-center gap-3 text-white"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-950">
                                    <FaHome />
                                </div>

                                <span className="text-xl font-bold">
                                    {SITE_NAME}
                                </span>
                            </Link>

                            <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
                                A modern platform designed to provide a
                                secure, simple, and user-focused digital
                                experience.
                            </p>

                            {/* Social icons */}

                            <div className="mt-6 flex gap-3">

                                <a
                                    href="#"
                                    aria-label="GitHub"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                                >
                                    <FaGithub />
                                </a>

                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                                >
                                    <FaLinkedin />
                                </a>

                                <a
                                    href="#"
                                    aria-label="Twitter"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                                >
                                    <FaTwitter />
                                </a>

                            </div>

                        </div>

                        {/* Quick links */}

                        <div>

                            <h3 className="font-semibold text-white">
                                Quick Links
                            </h3>

                            <ul className="mt-5 space-y-3">

                                <li>
                                    <a
                                        href="#home"
                                        className="text-sm transition hover:text-white"
                                    >
                                        Home
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#about"
                                        className="text-sm transition hover:text-white"
                                    >
                                        About Us
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#contact"
                                        className="text-sm transition hover:text-white"
                                    >
                                        Contact Us
                                    </a>
                                </li>

                            </ul>

                        </div>

                        {/* Account */}

                        <div>

                            <h3 className="font-semibold text-white">
                                Account
                            </h3>

                            <ul className="mt-5 space-y-3">

                                <li>
                                    <Link
                                        to="/login"
                                        className="text-sm transition hover:text-white"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/signup"
                                        className="text-sm transition hover:text-white"
                                    >
                                        Sign Up
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm transition hover:text-white"
                                    >
                                        Forgot Password
                                    </Link>
                                </li>

                            </ul>

                        </div>

                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6">

                        <p className="text-center text-sm text-gray-500">
                            © {new Date().getFullYear()} {SITE_NAME}. All
                            rights reserved.
                        </p>

                    </div>

                </div>

            </footer>

        </div>
        
    );
}