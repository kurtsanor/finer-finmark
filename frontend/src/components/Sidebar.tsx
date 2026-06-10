import { Link } from "react-router-dom";
import { customerNavigations } from "../constants/sidebarButtons";

const Sidebar = () => {
  const navigations = customerNavigations.map((nav) => (
    <>
      <p className="ml-5 mb-1 font-semibold">{nav.category}</p>
      {nav.items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="flex gap-3 items-center py-2 px-6 hover:bg-neutral-100 transition-colors"
        >
          {item.icon({ className: "w-5 h-5" })} {item.name}
        </Link>
      ))}
    </>
  ));

  return (
    <nav className="sticky top-15 h-[calc(100vh-3.75rem)] w-72 border-r border-neutral-300 pt-3 overflow-y-auto bg-white">
      {navigations}
    </nav>
  );
};

export default Sidebar;
