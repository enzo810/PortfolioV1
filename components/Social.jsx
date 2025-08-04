import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    icon: <FaGithub />,
    link: "https://github.com/enzo810",
    label: "Visit my GitHub profile",
    platform: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/enzo-sousa-a165b72b7/",
    label: "Visit my LinkedIn profile",
    platform: "LinkedIn",
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.link}
          className={iconStyles}
          target="_blank"
          aria-label={social.label}
          title={social.platform}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;
