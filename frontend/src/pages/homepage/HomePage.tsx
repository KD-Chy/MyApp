import Navbar from "../../components/navbar/Navbar";
import MainSection from "./MainSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import AboutSection from "./AboutSection";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* ================================================================
                | NAVBAR
                ================================================================ */}

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
                <Navbar />
            </header>

            {/* ================================================================
                | MAIN CONTENT
                ================================================================ */}

            <MainSection />

            {/* ============================================================
                    ABOUT US SECTION
                ============================================================ */}

            <AboutSection />

            {/* ============================================================
                | CONTACT SECTION
                ============================================================ */}

            <ContactSection />

            {/* ================================================================
                | FOOTER
                ================================================================ */}
            <Footer />


        </div>
    );
}