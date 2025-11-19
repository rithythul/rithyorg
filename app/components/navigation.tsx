"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Index", path: "/" },
    { name: "Writing", path: "/writing" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled || isOpen
          ? "bg-background/80 backdrop-blur-md border-foreground/10 py-4"
          : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="container-custom flex justify-between items-center">
          <Link
            href="/"
            className="font-serif font-bold text-xl tracking-tight hover:text-amber-600 transition-colors z-50 relative"
            onClick={() => setIsOpen(false)}
          >
            The Living Archive
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-mono transition-colors ${pathname === item.path
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-amber-600"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 relative p-2 -mr-2 text-foreground hover:opacity-70 transition-opacity"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col justify-center items-center transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`font-serif text-4xl font-bold transition-colors ${pathname === item.path
                ? "text-foreground"
                : "text-muted hover:text-amber-600"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
