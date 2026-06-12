import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const socials = [
    { icon: FaGithub, href: 'https://github.com/yeabsiradaniel', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/yeabsiradaniel', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#BBA1C3] dark:bg-[#455E3D] transition-colors duration-800 ease-in-out">
      <div className="flex justify-center">
        <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans transition-colors duration-300">
            &copy; {new Date().getFullYear()} Yeabsira Daniel
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-300"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
