import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import config from '../config/index.json';

const About = () => {
  const { about } = config;
  const { socialMedia } = about;

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-x-8 mt-6 h-8">
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
export default About;
