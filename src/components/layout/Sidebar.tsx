import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Home,
  Users,
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { to: "/dashboard/home", label: "Home", icon: Home },
    { to: "/dashboard/users", label: "Usuários", icon: Users },
    { to: "/dashboard/deposit", label: "Depósito", icon: ArrowDownCircle },
    { to: "/dashboard/withdraw", label: "Saque", icon: ArrowUpCircle },
    { to: "/dashboard/convert", label: "Conversão", icon: Repeat },
  ];

  return (
    <aside
      className={`
   ${collapsed ? "w-20" : "w-64"}
   transition-all duration-300
   bg-white dark:bg-gray-800
   border-r border-gray-200 dark:border-gray-700
   p-4 flex flex-col
   `}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-2 mb-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Menu size={22} className="text-black dark:text-white"/>
      </button>

      {!collapsed && (
        <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
          Crypto Admin
        </h2>
      )}

      <nav className="space-y-2">

    {links.map(({ to, label, icon: Icon }) => (

     <NavLink
  key={to}
  to={to}
  className={({ isActive }) =>
    `
    relative group
    flex items-center
    ${collapsed ? "justify-center" : "gap-3"}
    px-3 py-2 rounded-lg
    transition
    text-gray-700 dark:text-white
    ${
      isActive
        ? "bg-blue-500 text-white"
        : "hover:bg-gray-100 dark:hover:bg-gray-700"
    }
    `
  }
>
  <Icon size={20} />

  {!collapsed && <span>{label}</span>}

  {collapsed && (
    <span
      className="absolute px-2 py-1 text-xs text-white transition-transform scale-0 bg-gray-900 rounded shadow-lg left-14 whitespace-nowrap group-hover:scale-100"
    >
      {label}
    </span>
  )}
</NavLink>

    ))}

   </nav>
    </aside>
  );
}
