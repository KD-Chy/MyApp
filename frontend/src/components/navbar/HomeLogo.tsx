import { useEffect, useState } from "react";
import { FaHouse } from "react-icons/fa6";

import { SITE_NAME } from "@/constants/constants";

export default function HomeLogo() {
    /*
    |-------------------------
    | Styles
    |-------------------------
    */

    const homeButtonStyle = {
        base: "flex h-10 items-center justify-center rounded-xl",
        icon: "w-10 text-lg",
        siteName: "w-20 text-lg font-bold tracking-tight",
        scrolled:
            "bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-gray-100",
        top: "bg-gray-600 text-gray-50 hover:bg-gray-100 hover:text-gray-900", // This is unscrolled style
    };

    /*
    |--------------------------------------------------------------------------
    | Handle home click
    |--------------------------------------------------------------------------
    */

    const handleHomeClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /*
    |-------------------------
    | State
    |-------------------------
    */

    const [scrolled, setScrolled] = useState(false);

    /*
    |-------------------------
    | Effects
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

    return (
        /* added min-w-0 2026/10/03 */
        <div className="min-w-0">
            {/* --------------------------------------------------------
                | Home logo
                -------------------------------------------------------- */}

            <button
                type="button"
                onClick={handleHomeClick}
                className="flex items-center gap-1 cursor-pointer"
                aria-label={`${SITE_NAME} home`}
            >
                <div
                    // className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-700 text-white shadow-sm"
                    // className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${scrolled ?
                    //     "bg-gray-400 text-gray-900 hover:bg-gray-900 hover:text-gray-100" :
                    //     "bg-gray-500 text-gray-50 hover:bg-gray-600"
                    //     }`}

                    //Simple form of just above commented className
                    // className={`common-things site-common-things when-scrolled : when-unscrolled}`
                    className={`${homeButtonStyle.base} ${homeButtonStyle.icon} ${scrolled ?
                        homeButtonStyle.scrolled :
                        homeButtonStyle.top
                        }`}
                >
                    <FaHouse />
                </div>

                <div>
                    <span
                        // className={`flex h-10 w-20 items-center justify-center rounded-xl text-lg font-bold tracking-tight ${scrolled ?
                        //     "rounded-lg bg-gray-400 text-gray-900 hover:bg-gray-900 hover:text-gray-100" :
                        //     "bg-gray-500 text-gray-50 hover:bg-gray-600"
                        //     }`}

                        //Simple form of just above commented className
                        // className={`common-things site-common-things when-scrolled : when-unscrolled}`
                        className={`${homeButtonStyle.base} ${homeButtonStyle.siteName} ${scrolled ?
                            homeButtonStyle.scrolled :
                            homeButtonStyle.top
                            }`}
                    >
                        {SITE_NAME}
                    </span>

                    {/* <span className="hidden rounded-xl text-xs sm:block">
                        Smart. Secure. Simple.
                    </span> */}
                </div>

            </button>

        </div>
    );
}