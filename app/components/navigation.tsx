"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "about", path: "/about" },
    { name: "writing", path: "/writing" },
    { name: "projects", path: "/projects" },
    { name: "social", path: "/social" },
  ];

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        Rithy Thul
      </Link>
      <div className="flex items-center space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`text-xl ${
              pathname === item.path ? "underline" : "hover:underline"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
