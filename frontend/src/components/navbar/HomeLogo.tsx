import { SITE_NAME } from "../../constraint/constraints";

import { FaHouse } from "react-icons/fa6";

export default function HomeLogo() {
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

    return (
        <div>
            {/* --------------------------------------------------------
                | Home logo
                -------------------------------------------------------- */}

            <button
                type="button"
                onClick={handleHomeClick}
                className="flex items-center gap-3 cursor-pointer" //items-center removed
                aria-label={`${SITE_NAME} home`}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm">
                    <FaHouse className="text-lg" />
                </div>

                <div>
                    <span className="block text-lg font-bold tracking-tight text-gray-900 text-left">
                        {SITE_NAME}
                    </span>

                    <span className="hidden text-xs text-gray-500 sm:block">
                        Smart. Secure. Simple.
                    </span>
                </div>

            </button>
            
        </div>
    );
}