import Navbar from "../../components/navbar/Navbar";
import HeroSection from "./HeroSection";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import FeaturesSection from "./FeaturesSection";

export default function HomePage() {
    return (
        <div className="min-h-screen text-gray-900">
            {/* ================================================================
                | Navbar
                ================================================================ */}

            <header className="sticky top-0 z-50">
                <Navbar />
            </header>
            {/* ================================================================
                | MAIN CONTENT
                ================================================================ */}

            <main>

                {/* ============================================================
                    | HERO SECTION
                    ============================================================ */}

                <HeroSection />

                {/* ============================================================
                    | FEATURES SECTION
                    ============================================================ */}

                <FeaturesSection />

                {/* ============================================================
                    | ABOUT US SECTION
                    ============================================================ */}

                <AboutSection />

                {/* ============================================================
                    | CONTACT SECTION
                    ============================================================ */}

                <ContactSection />

            </main>

            {/* ================================================================
                | FOOTER
                ================================================================ */}
            <Footer />

        </div>
    );
}