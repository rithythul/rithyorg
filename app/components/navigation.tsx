"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function SystemStatus() {
  const [uptime, setUptime] = useState(1748164116);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (num: number) => {
    return num.toLocaleString("en-US");
  };

  return (
    <div className="text-xs text-solarized-yellow mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
        <span className="truncate">
          STATUS:{" "}
          <span
            className="text-solarized-green font-medium"
            aria-label="System Status"
          >
            ONLINE
          </span>{" "}
          - rithy.org
        </span>
        <span className="truncate">
          UPTIME:{" "}
          <span
            className="text-solarized-green font-medium"
            aria-label="Uptime Counter"
          >
            {formatUptime(uptime)}
          </span>{" "}
          SECONDS
        </span>
      </div>
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "about", path: "/about" },
    { name: "writing", path: "/writing" },
    { name: "projects", path: "/projects" },
    { name: "social", path: "/social" },
  ];

  return (
    <div className="w-full bg-solarized-base2 border border-solarized-base1 p-3 sm:p-4 mb-6 sm:mb-8 pt-6 sm:pt-8 rounded-sm">
      {/* System Status */}
      <Link href="/" aria-label="Home">
        <SystemStatus />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-solarized-base1 pt-3 gap-3 sm:gap-0">
        <div className="text-xs text-solarized-yellow order-2 sm:order-1">
          <span className="terminal-prompt"></span>
          <span className="terminal-loading"></span>
        </div>

        <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4 order-1 sm:order-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-sm font-light transition-colors py-2 px-1 ${
                pathname === item.path
                  ? "text-solarized-blue font-medium underline"
                  : "text-solarized-cyan hover:text-solarized-blue hover:underline"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
