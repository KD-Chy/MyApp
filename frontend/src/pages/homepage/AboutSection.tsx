import {
    FaCircleInfo,
    FaShieldHalved,
    FaUsers,
    FaCircleCheck,
} from "react-icons/fa6";

import { SITE_NAME } from "../../constraint/constraints";

export default function AboutSection() {
    return (
        <div>
            {/* ============================================================
                    ABOUT US SECTION
                ============================================================ */}

            <section
                id="about"
                className="scroll-mt-24 py-20 sm:py-24"
            >

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

                    {/* About visual */}

                    <div className="rounded-3xl bg-gray-900 p-8 text-white sm:p-10">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-900">
                            <FaCircleInfo className="text-xl" />
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
                                <FaShieldHalved className="text-xl" />

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
                                <FaCircleCheck className="mt-1 shrink-0 text-gray-700" />

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
                                <FaCircleCheck className="mt-1 shrink-0 text-gray-700" />

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
                                <FaCircleCheck className="mt-1 shrink-0 text-gray-700" />

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

        </div>

    );
}