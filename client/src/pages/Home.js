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
    icon: <EnvelopeIcon className="h-5 w-5 text-accent" />,
    label: 'Email',
    text: 'yeabsirad9@gmail.com',
    href: 'mailto:yeabsirad9@gmail.com',
  },
  {
    icon: <PhoneIcon className="h-5 w-5 text-accent" />,
    label: 'Phone',
    text: '+251918472342',
    href: 'tel:+251918472342',
  },
  {
    icon: <FaGithub className="h-5 w-5 text-accent" />,
    label: 'GitHub',
    text: 'yeabsiradaniel',
    href: 'https://github.com/yeabsiradaniel',
  },
  {
    icon: <FaLinkedin className="h-5 w-5 text-accent" />,
    label: 'LinkedIn',
    text: 'Yeabsira Daniel',
    href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373',
  },
];

const SectionDivider = () => (
  <div className="flex justify-center py-2">
    <div className="w-2/5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

const Home = () => {
  useDocumentTitle('Yeabsira Daniel | Portfolio');

  return (
    <>
      <section id="home">
        <Hero />
      </section>

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

      <SectionDivider />

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <Section>
            <div className="text-center mb-12">
              <h2 className="text-sm uppercase tracking-widest text-accent font-sans font-semibold mb-2">Portfolio</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold">My Work</h3>
            </div>
            <ProjectGrid />
          </Section>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-sm uppercase tracking-widest text-accent font-sans font-semibold mb-2">Let's Work Together</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">Get In Touch</h3>
            <p className="text-gray-600 dark:text-gray-400 font-sans max-w-lg mx-auto transition-colors duration-300 text-sm leading-relaxed">
              Available for remote contract work. Based in Addis Ababa, Ethiopia (UTC+3), overlapping with EU, UK, and Middle East business hours.
            </p>
          </div>

          {/* Contact cards */}
          <div className="max-w-2xl mx-auto mb-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {contactDetails.map((detail, index) => (
              <a
                key={index}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 rounded-2xl glass-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  {detail.icon}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 font-sans">{detail.label}</span>
                <span className="font-sans text-xs font-medium text-gray-700 dark:text-gray-300 text-center truncate w-full">{detail.text}</span>
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
