import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';

import config from '../config/index.json';
import Divider from './Divider';

const Contact = () => {
  const { contact } = config;
  const { socialMedia } = contact;
  const phoneNumber = '+48 513 097 988';

  return (
    <section className=" py-8 sm:py-12 lg:py-16" id="contact">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-primary mb-4">
            {contact.title.split(' ').map((word, index) => (
              <span
                key={index}
                className={index % 2 ? 'text-primary' : 'text-border'}
              >
                {word}{' '}
              </span>
            ))}
          </h1>
          <Divider />
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Map */}
          <div className="lg:col-span-2 relative">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.080109436627!2d22.345695111946824!3d51.08852907160319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722f16e619fd6ff%3A0x9dbf1152ee612fc!2sStajnia%20Z%C5%82ota%20Podkowa!5e0!3m2!1spl!2spt!4v1739297253906!5m2!1spl!2spt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Lokalizacja Stajni Złota Podkowa"
              />
              <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-green-700 rounded-lg -z-10"></div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl relative flex items-center">
            <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-green-700 rounded-lg -z-10"></div>
            <div className="w-full space-y-8">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {contact.title2}
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  {contact.information}
                </p>
              </div>

              {/* Phone Number Section */}
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  Zadzwoń do nas:
                </h2>
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center space-x-2 text-green-700 hover:text-primary transition-colors duration-300"
                >
                  <PhoneIcon style={{ fontSize: '24px' }} />
                  <span className="text-lg font-medium">{phoneNumber}</span>
                </a>
              </div>

              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  {contact.title3}
                </h2>
                <div className="flex justify-center space-x-6">
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="transform transition-transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <FacebookIcon
                      className="text-green-700 hover:text-primary"
                      style={{ fontSize: '40px' }}
                    />
                  </a>
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="transform transition-transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <InstagramIcon
                      className="text-green-700 hover:text-primary"
                      style={{ fontSize: '40px' }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            &copy; {new Date().getFullYear()} designed by Stadnina Złota Podkowa
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
