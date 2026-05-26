import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const socials = [
    { icon: FaGithub, href: 'https://github.com/yeabsiradaniel', hoverColor: 'hover:text-white' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373', hoverColor: 'hover:text-[#0077b5]' },
    { icon: FaInstagram, href: 'https://instagram.com/yeabsiradaniel', hoverColor: 'hover:text-[#E1306C]' },
  ];

  return (
    <footer className="bg-[#BBA1C3] dark:bg-[#455E3D] transition-colors duration-800 ease-in-out">
      {/* Gradient divider */}
      <div className="flex justify-center">
        <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-sm mb-4 md:mb-0 transition-colors duration-800 ease-in-out">
            &copy; {new Date().getFullYear()} Yeabsira Daniel. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-5">
            {socials.map(({ icon: Icon, href, hoverColor }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 dark:text-gray-400 ${hoverColor} transition-all duration-300 hover:scale-125`}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export the Footer component
export default Footer;