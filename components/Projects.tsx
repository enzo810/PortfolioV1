"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { CgWorkAlt } from "react-icons/cg";
import {
  FaBootstrap,
  FaCss3Alt,
  FaDocker,
  FaGamepad,
  FaHtml5,
  FaImage,
  FaJava,
  FaLaravel,
  FaPhp,
  FaReact,
  FaShip,
  FaSpotify,
  FaSymfony,
  FaTwitter,
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import {
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiSupabase,
  SiTailwindcss,
} from "react-icons/si";
import { Card } from "./ui/card";

const technologies = [
  { label: "HTML", icon: FaHtml5, value: "html" },
  { label: "CSS", icon: FaCss3Alt, value: "css" },
  { label: "JavaScript", icon: SiJavascript, value: "javascript" },
  { label: "PHP", icon: FaPhp, value: "php" },
  { label: "React", icon: FaReact, value: "react" },
  { label: "Bootstrap", icon: FaBootstrap, value: "bootstrap" },
  { label: "MySQL", icon: SiMysql, value: "mysql" },
  { label: "Docker", icon: FaDocker, value: "docker" },
  { label: "Symfony", icon: FaSymfony, value: "symfony" },
  { label: "Tailwind", icon: SiTailwindcss, value: "tailwind" },
  { label: "Laravel", icon: FaLaravel, value: "laravel" },
  { label: "Next.js", icon: SiNextdotjs, value: "nextjs" },
  { label: "Supabase", icon: SiSupabase, value: "supabase" },
  { label: "Java", icon: FaJava, value: "java" },
];

const projects = [
  {
    label: "Twitter",
    technologies: ["html", "css", "javascript", "php", "mysql"],
    video: "/twitter.mp4",
    icon: FaTwitter,
    description:
      "Replica of Twitter featuring tweet management, profile customization, and an integrated messaging system.",
  },
  {
    label: "E-Spotify",
    technologies: ["react", "bootstrap", "docker"],
    video: "/spotify.mov",
    icon: FaSpotify,
    description: "Spotify replica with data filtering and suggestion system.",
  },
  {
    label: "Morpion",
    technologies: ["html", "css", "javascript"],
    video: "/morpion.mp4",
    icon: FaGamepad,
    description: "Tic-tac-toe game created to practice algorithmic logic.",
  },
  {
    label: "Sprite Sheet Generator",
    technologies: ["php"],
    video: "/css_generator.mp4",
    icon: FaImage,
    description: "Generator based on recursion and file manipulation.",
  },
  {
    label: "Battleship",
    technologies: ["javascript", "html", "css"],
    video: "/battleship.mp4",
    icon: FaShip,
    description: "Game based on advanced management of arrays and JS modules.",
  },
  {
    label: "My restaurant",
    technologies: ["java", "tailwind"],
    video: "/my-restaurant.mov",
    icon: GiMeal,
    description: "Configurable restaurant website with admin panel.",
  },
  {
    label: "Neatlead",
    technologies: ["nextjs", "docker", "supabase", "tailwind"],
    video: "/nextlead.mov",
    icon: CgWorkAlt,
    description:
      "One of my apprenticeship projects. We developed a CRM, check nextlead.app.",
  },
];

const Projects = () => {
  const [index, setIndex] = useState(0);

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < projects.length - 1) {
      setIndex(index + 1);
    }
  };

  const currentProject = projects[index]!;

  const ProjectIcon = currentProject?.icon;

  return (
    <section className="flex flex-col gap-4" id="projects">
      <h2 className="text-xl block lg:hidden text-center text-neon drop-shadow-neon">
        Technologies by project
      </h2>
      <Card className="flex justify-between px-8 xs:px-20 items-center lg:text-xl py-4">
        <p onClick={handlePrevious} className="cursor-pointer select-none">
          Previous
        </p>
        <p className="text-3xl hidden lg:block text-neon drop-shadow-neon">
          Technologies by project
        </p>
        <p className="cursor-pointer select-none" onClick={handleNext}>
          Next
        </p>
      </Card>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="p-3 w-full lg:w-[60%]">
          <div className="flex items-center gap-3 mb-4 text-neon drop-shadow-neon">
            <ProjectIcon className="text-lg lg:text-3xl" />
            <h3 className="text-lg lg:text-2xl font-bold">
              {currentProject?.label}
            </h3>
          </div>
          <p className="mb-4 max-lg:text-sm">{currentProject?.description}</p>
          <video
            src={currentProject.video}
            controls
            className="w-full"
            preload="metadata"
            title={`Video demonstration of the project ${currentProject?.label}`}
          >
            Your browser does not support videos.
          </video>
        </Card>
        <Card className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-4 gap-4 overflow-auto p-3 w-full lg:w-auto lg:h-auto">
          {technologies.map((item) => {
            const isUsed = currentProject.technologies.includes(item.value);
            return (
              <Card
                key={item.label}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center font-medium overflow-hidden p-2 transition-all duration-300 border-gray-700",
                  isUsed
                    ? "border-neon bg-background shadow-[0_0_15px_rgba(0,238,255,0.3)] scale-105"
                    : "opacity-50 scale-95"
                )}
              >
                <item.icon
                  className={cn(
                    "text-4xl sm:text-5xl lg:text-6xl mb-2 transition-all duration-300",
                    isUsed ? "text-neon" : "text-gray-700"
                  )}
                />
                <span
                  className={cn(
                    "lg:block hidden text-sm font-medium transition-all duration-300",
                    isUsed ? "text-neon" : "text-gray-700"
                  )}
                >
                  {item.label}
                </span>
              </Card>
            );
          })}
        </Card>
      </div>
    </section>
  );
};

export default Projects;
