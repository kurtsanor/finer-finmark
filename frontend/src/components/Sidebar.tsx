import { Link, useLocation } from "react-router-dom";
import { customerNavigations } from "../constants/sidebarButtons";
import { Fragment } from "react/jsx-runtime";

const Sidebar = () => {
  const pathname = useLocation().pathname;

  // console.log(pathname);

  const navigations = customerNavigations.map((nav) => (
    <Fragment key={nav.category}>
      <p className="ml-7 mb-1 mt-2 font-semibold">{nav.category}</p>
      {nav.items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex gap-3 items-center py-2 px-6 hover:bg-neutral-100 transition-all ml-1 ${
            pathname === item.path ? "border-l-4" : ""
          }`}
        >
          {item.icon({ className: "w-5 h-5" })} {item.name}
        </Link>
      ))}
    </Fragment>
  ));

  return (
    <nav className="sticky top-15 h-[calc(100vh-3.75rem)] w-72 border-r border-neutral-300 pt-3 overflow-y-auto bg-white">
      {navigations}
    </nav>
  );
};

export default Sidebar;
