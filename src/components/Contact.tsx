import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import config from '../config/index.json';

const Contact = () => {
  const { contact } = config;
  const { socialMedia } = contact;

  return (
    <div
      id="contact"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {contact.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <div className="flex items-center gap-x-8 mt-6 h-8">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.0801094366384!2d22.34569511191108!3d51.08852907160298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722f16e619fd6ff%3A0x9dbf1152ee612fc!2sStajnia%20Z%C5%82ota%20Podkowa!5e0!3m2!1spl!2spl!4v1712252138066!5m2!1spl!2spl"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
          <div>
            <a
              aria-label="facebook"
              href={socialMedia.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon
                className="fill-current text-gray-800 dark:text-white hover:text-primary"
                style={{
                  fontSize: '35px',
                }}
              />
            </a>
          </div>
          <a
            aria-label="instagram"
            href={socialMedia.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon
              className="fill-current text-gray-800 dark:text-white hover:text-primary"
              style={{
                fontSize: '35px',
              }}
            />
          </a>
        </div>
        <div className="flex items-center mt-6">
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
            &copy; {new Date().getFullYear()} designed by Stajnia Złota Podkowa
          </p>
        </div>
      </div>
    </div>
  );
};
export default Contact;
