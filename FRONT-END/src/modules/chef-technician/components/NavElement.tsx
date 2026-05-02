import { NavLink } from "react-router-dom";



export function NavElement({ to, label, end = false }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-all rounded-md ${
          isActive 
            ? "text-[#289c9c] " 
            : "text-gray-400 hover:text-[#388E8E] hover:bg-gray-50"
        }`
      }
    >
      {label}
    </NavLink>
  );
}