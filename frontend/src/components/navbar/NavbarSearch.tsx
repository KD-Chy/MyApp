import { useState, useEffect, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface NavbarSearchProps {
    scrolled: boolean;
    variant: "desktop" | "mobile";
}

// Issue: mobile variant still creates searchOpen state,
// even though mobile search doesn't use searchOpen state.
export default function NavbarSearch({
    scrolled,
    variant,
}: NavbarSearchProps) {

    /*
    |-------------------------
    | States
    |-------------------------
    */

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    /*
    |------------------------------------------
    | Refs
    |------------------------------------------
    */

    const searchRef = useRef<HTMLDivElement>(null);

    /*
    |------------------------------------------
    | Effect -> search outside-click behavior
    |------------------------------------------
    */

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                searchRef.current &&
                !searchRef.current.contains(target)
            ) {
                // Keep search open if user has typed something(space)
                if (searchQuery.trim() !== "") {
                    return;
                }
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [searchQuery]);


    /*
    |---------------------------
    | Handlers
    |---------------------------
    */
    
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const query = searchQuery.trim();

        if (!query) {
            return;
        }

        /*
        |------------------------------------------------------
        | Search functionality can be connected later.
        |
        | For now, this keeps the UI ready without pretending
        | that a search backend already exists.
        |------------------------------------------------------
        */

        console.log("Search query:", query);
    };

    /*
    |------------------------------------------
    | Mobile search
    |------------------------------------------
    */

    if (variant === "mobile") {
        return (
            <div ref={searchRef} className="mt-4">
                <form
                    onSubmit={handleSearch}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${scrolled
                        ? "border-gray-300"
                        : "border-transparent bg-gray-800"
                        }`}
                >
                    <FaMagnifyingGlass
                        aria-hidden="true"
                        className={
                            scrolled
                                ? "text-gray-900"
                                : "text-gray-100"
                        }
                    />

                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(event.target.value)
                        }
                        placeholder="Search..."
                        aria-label="Search"
                        className={`min-w-0 flex-1 border-0 bg-transparent py-1 outline-none ${scrolled
                            ? "text-gray-900 placeholder:text-gray-900"
                            : "text-gray-100 placeholder:text-gray-100"
                            }`}
                    />

                    <button
                        type="submit"
                        className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium transition-colors ${scrolled
                            ? "bg-gray-900 text-white hover:bg-gray-700"
                            : "bg-white text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        Search
                    </button>
                </form>
            </div>
        );
    }

    /*
    |------------------------------------------
    | Desktop search
    |------------------------------------------
    | Rendered when variant === "desktop".
    |------------------------------------------
    */

    return (
        <div
            ref={searchRef}
            className="flex h-10 items-center overflow-hidden rounded-xl transition-all duration-300"
        >
            <button
                type="button"
                onClick={() => setSearchOpen((current) => !current)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${scrolled
                        ? "text-gray-900 hover:bg-gray-300"
                        : "text-gray-100 hover:bg-gray-500"
                    }`}
                aria-label={
                    searchOpen ?
                        "Close search" :
                        "Open search"
                }
                aria-expanded={searchOpen}
                aria-controls="desktop-search"
            >
                <FaMagnifyingGlass aria-hidden="true" />
            </button>
            {searchOpen && (
                <form
                    id="desktop-search"
                    onSubmit={handleSearch}
                    className="flex items-center"
                >
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(event.target.value)
                        }
                        placeholder="Search..."
                        autoFocus
                        aria-label="Search"
                        className={`w-26.25 border-0 bg-transparent px-2 text-sm outline-none placeholder:text-gray-400 ${scrolled
                            ? "text-gray-900"
                            : "text-gray-100 placeholder:text-gray-300"
                            }`}
                    />
                    <button
                        type="submit"
                        className={`mr-1 shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${scrolled
                            ? "bg-gray-900 text-white hover:bg-gray-700"
                            : "bg-white text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        Search
                    </button>
                </form>
            )}
        </div>
    );
}