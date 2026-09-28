import {
    FaEnvelope,
    FaPhone,
    FaLocationDot,
} from "react-icons/fa6";

export default function ContactSection() {

    return (

        <div>
            {/* ============================================================
                | CONTACT SECTION
                ============================================================ */}
            <section
                id="contact"
                className="scroll-mt-24 border-t border-gray-200 bg-gray-50 py-20 sm:py-24"
            >

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">

                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                            Contact Me
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Get In Touch
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            Have a project in mind or want to collaborate? I'd love to hear from you!
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
                                <FaLocationDot />
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

        </div>

    );
}