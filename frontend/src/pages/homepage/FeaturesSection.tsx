import {
    FaShieldHalved,
    FaBolt,
    FaUsers,
    FaChevronRight,
} from "react-icons/fa6"

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
        icon: FaShieldHalved,
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

export default function FeaturesSection () {
    return (
        <div>
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
            
        </div>
    );
}