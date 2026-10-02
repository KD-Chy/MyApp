import { Link } from "react-router-dom";

import {
    FaCircleCheck,
    FaArrowRight,
    FaCircleInfo,
    FaBolt,
    FaShieldHalved,
    FaUsers,
} from "react-icons/fa6"

import { SITE_NAME } from "@/constants/constants";

export default function HeroSection() {
    return (
        <div>
            {/* ============================================================
                | HERO SECTION
                ============================================================ */}

            <section
                id="home"
                className="bg-gray-500 scroll-mt-24"
            >
                {/* Navbar already contains 81px height that's why minus 81px */}
                <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-0 px-4 py-10 sm:gap-0 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-10">

                    {/* Hero content */}

                    <div className="max-w-2xl">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                            <FaCircleCheck className="text-gray-700" />
                            <span>Welcome to {SITE_NAME}</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl lg:text-6xl">
                            A smarter way to manage your digital experience.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">
                            {SITE_NAME} provides a modern, secure, and
                            user-focused platform designed to make your
                            everyday digital experience simple and efficient.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Link
                                to="/signup"
                                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                            >
                                Let's Work Together
                                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                            </Link>

                            <a
                                href="#about"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                <FaCircleInfo />
                                Learn More
                            </a>

                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-between text-sm text-gray-500">

                            <div className="flex items-center gap-2">
                                <FaCircleCheck />
                                Secure Platform
                            </div>

                            <div className="flex items-center gap-2">
                                <FaCircleCheck />
                                Simple and Responsive Design
                            </div>

                            <div className="flex items-center gap-2">
                                <FaCircleCheck />
                                User Friendly
                            </div>

                        </div>

                    </div>

                    {/* Hero visual */}

                    <div
                        className="relative"
                        aria-hidden="true"
                    >

                        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-xl sm:p-8">

                            <div className="rounded-2xl bg-white p-6 shadow-sm">

                                <div className="mb-8 flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Platform Overview
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                            Everything in one place
                                        </h2>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                                        <FaBolt />
                                    </div>

                                </div>

                                <div className="space-y-4">

                                    <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                            <FaShieldHalved />
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">
                                                Secure
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Designed with security in mind
                                            </p>
                                        </div>

                                        <FaCircleCheck className="text-gray-700" />
                                    </div>

                                    <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                            <FaUsers />
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">
                                                User Focused
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Simple and intuitive experience
                                            </p>
                                        </div>

                                        <FaCircleCheck className="text-gray-700" />
                                    </div>

                                    <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                            <FaBolt />
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">
                                                Efficient
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Built for a smooth experience
                                            </p>
                                        </div>

                                        <FaCircleCheck className="text-gray-700" />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}