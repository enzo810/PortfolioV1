"use client";

import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { Card } from "./ui/card";

const timeline = [
  {
    year: "2022",
    title: "Foodtruck festivals",
    description:
      "From September to November 2022, I worked as a multi-skilled employee in the C ET K ASSOCIATES food truck at major festivals such as Lollapalooza and Elektric Park.\nI was responsible for food preparation, stock management, compliance with hygiene standards and customer service in a dynamic environment.\nThis experience enabled me to develop my responsiveness, organizational skills and team spirit. It was also during this period that I started to learn PHP self-taught from a book, and quickly discovered a real passion for web development.",
  },
  {
    year: "2023",
    title: "Arrival at Epitech",
    description:
      "Since November 2023, I've been following a training program in full-stack web development at the Web@cadémie by Epitech.\nThis two-year program combines theory and practice through projects, supervised by experienced instructors. I learn to master different programming languages, design modern, intuitive interfaces and develop complex functionalities. Teamwork plays a central role, enabling me to strengthen my communication, project management and problem-solving skills.\nEach project pushes me to go further, to be creative, and to adapt to constraints close to those of the professional world.",
  },
  {
    year: "2024",
    title: "Beginning of apprenticeship",
    description:
      "I started my apprenticeship at CREACH Agency, an innovative start-up, at the end of September 2024. Since my arrival, I've been actively involved in the development of NextLead, a customized CRM designed to optimize customer management.\nWorking on this project alongside the team has given me a lot: I've discovered what it's like behind the scenes in a start-up environment, learned to collaborate with a variety of profiles (developers, designer, product manager), and above all, I've been able to put my technical skills to work on a real product that's constantly evolving.\nThis experience has helped me grow both professionally and personally, pushing me to be more autonomous, reactive and always on the lookout for concrete solutions.",
  },
];

const Timeline = () => {
  const [index, setIndex] = useState(0);
  return (
    <section className="flex flex-col gap-10" id="timeline">
      <h2 className="text-center text-xl lg:text-3xl font-bold">
        <span className="text-neon drop-shadow-neon">My background</span>{" "}
        <span className="text-gray-700">(color haha)</span>
      </h2>

      <div className="w-[80%] mx-auto">
        <div className="flex justify-between mb-4 px-4">
          {timeline.map((item, i) => (
            <span
              key={i}
              className={cn(
                "text-sm lg:text-lg font-medium transition-all duration-300 cursor-pointer",
                i <= index
                  ? "text-neon drop-shadow-neon scale-125"
                  : "text-foreground"
              )}
              onClick={() => setIndex(i)}
            >
              {item.year}
            </span>
          ))}
        </div>

        <div className="flex items-center w-full relative gap-2">
          {timeline.map((_, i) => (
            <Fragment key={i}>
              <div
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300 cursor-pointer",
                  index >= i
                    ? "bg-neon drop-shadow-neon scale-125"
                    : "bg-gray-700"
                )}
                onClick={() => setIndex(i)}
              />

              {i < timeline.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[3px] transition-all duration-300",
                    index > i ? "bg-neon drop-shadow-neon" : "bg-gray-700"
                  )}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <Card className="p-8 border-foreground rounded-lg shadow-lg">
        <h3 className="text-lg lg:text-2xl font-bold text-neon drop-shadow-neon mb-4">
          {timeline[index]!.title}
        </h3>
        <p className="text-foreground leading-relaxed text-sm lg:text-lg">
          {timeline[index]!.description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
              <br />
            </span>
          ))}
        </p>
      </Card>
    </section>
  );
};

export default Timeline;
