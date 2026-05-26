import React from 'react';
import Hero from '../components/home/Hero';
import AboutMe from '../components/about/AboutMe';
import Skills from '../components/about/Skills';
import Timeline from '../components/about/Timeline';
import ProjectGrid from '../components/projects/ProjectGrid';
import ContactForm from '../components/contact/ContactForm';
import Section from '../components/common/Section';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import useDocumentTitle from '../hooks/useDocumentTitle';

const contactDetails = [
  {
    icon: <EnvelopeIcon className="h-6 w-6 text-accent" />,
    label: 'Email',
    text: 'yeabsirad9@gmail.com',
    href: 'mailto:yeabsirad9@gmail.com',
  },
  {
    icon: <PhoneIcon className="h-6 w-6 text-accent" />,
    label: 'Phone',
    text: '+251918472342',
    href: 'tel:+251918472342',
  },
  {
    icon: <FaGithub className="h-6 w-6 text-accent" />,
    label: 'GitHub',
    text: 'yeabsiradaniel',
    href: 'https://github.com/yeabsiradaniel',
  },
  {
    icon: <FaLinkedin className="h-6 w-6 text-accent" />,
    label: 'LinkedIn',
    text: 'Yeabsira Daniel',
    href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373',
  },
];

const GradientDivider = () => (
  <div className="flex justify-center">
    <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
  </div>
);

const Home = () => {
  useDocumentTitle('Yeabsira Daniel | Portfolio');

  return (
    <>
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Sections below hero - overlaps hero bottom slightly for seamless transition */}
      <div className="relative bg-[#BBA1C3] dark:bg-[#455E3D] transition-colors duration-800" style={{ marginTop: '-80px', paddingTop: '80px', zIndex: 1 }}>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <AboutMe />
          <Section>
            <Skills />
          </Section>
          <Section>
            <Timeline />
          </Section>
        </div>
      </section>

      <GradientDivider />

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <Section>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12">My Work</h2>
            <ProjectGrid />
          </Section>
        </div>
      </section>

      <GradientDivider />

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">Get In Touch</h2>
          <div className="max-w-2xl mx-auto mb-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {contactDetails.map((detail, index) => (
              <a
                key={index}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-3 sm:p-5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  {detail.icon}
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 font-sans">{detail.label}</span>
                <span className="font-sans text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center truncate w-full">{detail.text}</span>
              </a>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>

      </div>
    </>
  );
};

export default Home;
