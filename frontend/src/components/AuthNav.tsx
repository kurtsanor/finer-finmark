import { Link, useLocation } from "react-router-dom";

// Navigation links used by authentication layout.
const AUTH_LINKS = [
  { to: "/sign-in", label: "Sign In" },
  { to: "/sign-up", label: "Sign Up" },
];

/**
 * AuthNav
 * Renders a small horizontal navigation used on authentication pages
 * to toggle between Sign In and Sign Up views. It highlights the
 * active route using the current location pathname.
 */
const AuthNav = () => {
  const pathname = useLocation().pathname;
  const links = AUTH_LINKS.map((link) => {
    const style =
      pathname === link.to ? "text-black" : "text-neutral-400 hover:text-black";

    return (
      <Link
        key={link.label}
        className={`font-medium tracking-tight ${style} transition-colors duration-200`}
        to={link.to}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="flex gap-5 p-2.5 sm:w-115 w-full border-t border-l border-r border-neutral-200 bg-white">
      {links}
    </div>
  );
};

export default AuthNav;
