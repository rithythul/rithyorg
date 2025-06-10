"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Logo() {
  return (
    <div className="ascii-art text-terminal-green text-center mb-4 text-sm font-mono">
      {`██▀█ █ ▀█▀ █ █ █ █
█▀▀  █  █  █▀█ ▀█▀
█▀▀▀ █  █  █ █  █  .ORG`}
    </div>
  );
}

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
    <div className="text-xs text-terminal-amber mb-4">
      <div className="flex justify-between">
        <span>
          STATUS:{" "}
          <span className="text-terminal-green" aria-label="System Status">
            ONLINE
          </span>
        </span>
        <span>
          UPTIME:{" "}
          <span className="text-terminal-green" aria-label="Uptime Counter">
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
    <div className="terminal-border bg-black p-4 mb-8">
      {/* ASCII Logo */}
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>

      {/* System Status */}
      <SystemStatus />

      {/* Navigation */}
      <nav className="flex items-center justify-between border-t border-terminal-green/30 pt-3">
        <div className="text-xs text-terminal-amber" aria-hidden="true">
          root@rithy.org:~$
        </div>

        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-sm transition-colors ${
                pathname === item.path
                  ? "text-terminal-amber"
                  : "text-terminal-green hover:text-terminal-amber"
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
