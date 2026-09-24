import { Link } from "react-router-dom";
import {
    FaCheckCircle,
    FaArrowRight,
    FaInfoCircle,
    FaBolt,
    FaShieldAlt,
    FaUsers,
    FaChevronRight,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import { SITE_NAME } from "../../constraint/constraints"

/*
|--------------------------------------------------------------------------
| Feature data
|--------------------------------------------------------------------------
*/

const features = [
    {
        title: "Secure & Reliable",
        description:
            "Built with security and reliability in mind to provide a dependable experience for every user.",
        icon: FaShieldAlt,
    },
    {
        title: "Fast & Efficient",
        description:
            "Designed for a smooth and efficient experience with clear navigation and responsive performance.",
        icon: FaBolt,
    },
    {
        title: "User Focused",
        description:
            "A simple and intuitive platform designed to make important features easy to access and use.",
        icon: FaUsers,
    },
];
export default function MainSection() {
    return (
        <div>
            {/* ================================================================
                | MAIN CONTENT
                ================================================================ */}

            <main>

                {/* ============================================================
                    | HERO SECTION
                    ============================================================ */}

                <section
                    id="home"
                    className="scroll-mt-24"
                >

                    <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">

                        {/* Hero content */}

                        <div className="max-w-2xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                                <FaCheckCircle className="text-gray-700" />
                                <span>Welcome to {SITE_NAME}</span>
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                A smarter way to manage your digital experience.
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
                                {SITE_NAME} provides a modern, secure, and
                                user-focused platform designed to make your
                                everyday digital experience simple and efficient.
                            </p>

                            {/* Hero actions */}

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/signup"
                                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                                >
                                    Get Started
                                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </Link>

                                <a
                                    href="#about"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    <FaInfoCircle />
                                    Learn More
                                </a>

                            </div>

                            {/* Trust indicators */}

                            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-between text-sm text-gray-500">

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    Secure Platform
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    Simple and Responsive Design
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    User Friendly
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    User Friendly
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    User Friendly
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    User Friendly
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    User Friendly
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    User Friendly
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    User Friendly
                                </div>

                            </div>

                        </div>

                        {/* Hero visual */}

                        <div className="relative">

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
                                                <FaShieldAlt />
                                            </div>

                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">
                                                    Secure
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Designed with security in mind
                                                </p>
                                            </div>

                                            <FaCheckCircle className="text-gray-700" />
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

                                            <FaCheckCircle className="text-gray-700" />
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

                                            <FaCheckCircle className="text-gray-700" />
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>



                {/* ============================================================
                    FEATURES SECTION
                ============================================================= */}

                <section
                    id="features"
                    className="scroll-mt-24 border-y border-gray-200 bg-gray-50 py-20 sm:py-24"
                >

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                Features
                            </span>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Everything designed around your experience
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                A clean and reliable platform with the essential
                                features you need in one place.
                            </p>

                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-3">

                            {features.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <article
                                        key={feature.title}
                                        className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                                            <Icon className="text-lg" />
                                        </div>

                                        <h3 className="mt-6 text-xl font-semibold text-gray-900">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-3 leading-7 text-gray-600">
                                            {feature.description}
                                        </p>

                                        <a
                                            href="#about"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:gap-3"
                                        >
                                            Learn more
                                            <FaChevronRight className="text-xs" />
                                        </a>

                                    </article>
                                );
                            })}

                        </div>

                    </div>

                </section>

                {/* ============================================================
                    ABOUT US SECTION
                ============================================================= */}

                <section
                    id="about"
                    className="scroll-mt-24 py-20 sm:py-24"
                >

                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

                        {/* About visual */}

                        <div className="rounded-3xl bg-gray-900 p-8 text-white sm:p-10">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-900">
                                <FaInfoCircle className="text-xl" />
                            </div>

                            <h2 className="mt-8 text-3xl font-bold sm:text-4xl">
                                Built with people in mind.
                            </h2>

                            <p className="mt-5 leading-8 text-gray-300">
                                {SITE_NAME} is designed around a simple idea:
                                technology should make everyday tasks easier,
                                clearer, and more accessible.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4">

                                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                                    <FaShieldAlt className="text-xl" />

                                    <p className="mt-3 font-semibold">
                                        Security
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                                    <FaUsers className="text-xl" />

                                    <p className="mt-3 font-semibold">
                                        Community
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* About content */}

                        <div>

                            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                About Us
                            </span>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                A platform designed for simplicity and growth.
                            </h2>

                            <p className="mt-6 leading-8 text-gray-600">
                                Our goal is to provide a modern platform where
                                users can access the tools and services they
                                need without unnecessary complexity.
                            </p>

                            <div className="mt-8 space-y-5">

                                <div className="flex gap-4">
                                    <FaCheckCircle className="mt-1 shrink-0 text-gray-700" />

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Simple experience
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Clear navigation and intuitive
                                            interfaces make the platform easy
                                            to understand.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <FaCheckCircle className="mt-1 shrink-0 text-gray-700" />

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Built to scale
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            The application architecture is
                                            designed to grow as new features
                                            and services are introduced.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <FaCheckCircle className="mt-1 shrink-0 text-gray-700" />

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Security conscious
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Authentication and role-based
                                            access are handled separately from
                                            the public website.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ============================================================
                    CONTACT SECTION
                    ============================================================= */}

                <section
                    id="contact"
                    className="scroll-mt-24 border-t border-gray-200 bg-gray-50 py-20 sm:py-24"
                >

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                Contact Us
                            </span>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                We'd love to hear from you
                            </h2>

                            <p className="mt-4 leading-7 text-gray-600">
                                Have a question, suggestion, or need help?
                                Get in touch with our team.
                            </p>

                        </div>

                        <div className="mt-12 grid gap-6 sm:grid-cols-3">

                            {/* Email */}

                            <a
                                href="mailto:kdchy12515@gmail.com"
                                target="_blank"
                                className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                                    <FaEnvelope />
                                </div>

                                <h3 className="mt-5 font-semibold text-gray-900">
                                    Email
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    kdchy12515@gmail.com
                                </p>
                            </a>

                            {/* Phone */}

                            <a
                                href="tel:+9779824651537"
                                className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                                    <FaPhone />
                                </div>

                                <h3 className="mt-5 font-semibold text-gray-900">
                                    Phone
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    +9779824651537
                                </p>
                            </a>

                            {/* Address */}

                            <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                                    <FaMapMarkerAlt />
                                </div>

                                <h3 className="mt-5 font-semibold text-gray-900">
                                    Address
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Kailari Ga. Pa. -05, Gobaraila
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

            </main >

        </div>

    );
}