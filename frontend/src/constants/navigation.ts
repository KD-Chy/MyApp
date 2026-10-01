import {
    FaHouse,
    FaCircleInfo,
    FaEnvelope,
} from "react-icons/fa6";

/*
|-------------------------
| Navigation items
|-------------------------
*/

export const navigationItems = [
    {
        label: "Home",
        href: "#home",
        icon: FaHouse,
    },
    {
        label: "About Us",
        href: "#about",
        icon: FaCircleInfo,
    },
    {
        label: "Contact Us",
        href: "#contact",
        icon: FaEnvelope,
    },
] as const;