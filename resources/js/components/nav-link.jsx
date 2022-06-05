import { Link } from "@inertiajs/inertia-react";
import { classNames } from "../utils";

const NavLink = ({ href, current = false, children }) => {
    return (
        <Link
            href={href}
            className={classNames(
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                current
                    ? "border-red-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            )}
        >
            {children}
        </Link>
    );
};

export default NavLink;
