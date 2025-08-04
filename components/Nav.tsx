"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import SignOutButton from "./SignOutButton";

export const links = [
  {
    name: "home",
    path: "#home",
    id: "home",
  },
  {
    name: "projects",
    path: "#projects",
    id: "projects",
  },
  {
    name: "Timeline",
    path: "#timeline",
    id: "timeline",
  },
  {
    name: "Contact",
    path: "#contact",
    id: "contact",
  },
];

const Nav = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const findVisibleSection = () => {
      let currentSection = "home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight * 0.6) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    findVisibleSection();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="flex gap-8 items-center">
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          className={cn(
            "capitalize font-medium hover:text-neon hover:drop-shadow-neon transition-all",
            activeSection === link.id &&
              "text-neon drop-shadow-neon border-b-2 border-neon"
          )}
        >
          {link.name}
        </Link>
      ))}
      <SignOutButton />
    </nav>
  );
};

export default Nav;
