import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import { Typography } from '@mui/material';

import config from '../config/index.json';
import Divider from './Divider';

const Contact = () => {
  const { contact } = config;
  const { socialMedia, phoneNumbers } = contact;

  return (
    <div
      id="contact"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-primary">
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

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2 w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.0801094366384!2d22.34569511191108!3d51.08852907160298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722f16e619fd6ff%3A0x9dbf1152ee612fc!2sStajnia%20Z%C5%82ota%20Podkowa!5e0!3m2!1spl!2spl!4v1712252138066!5m2!1spl!2spl"
              className="w-full h-full rounded-lg shadow-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Typography variant="h5" className="mb-4">
                {contact.title2}
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                {contact.information}
              </Typography>
            </div>

            <div>
              <Typography variant="h5" className="mb-4">
                Kontakt telefoniczny:
              </Typography>
              {phoneNumbers &&
                phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <PhoneIcon className="text-green-700" />
                    <a
                      href={`tel:${phone}`}
                      className="text-gray-600 hover:text-green-700 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                ))}
            </div>

            <div>
              <Typography variant="h5" className="mb-4">
                {contact.title3}
              </Typography>
              <div className="flex space-x-4">
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-green-700 transition-colors"
                >
                  <FacebookIcon style={{ fontSize: '35px' }} />
                </a>
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-green-700 transition-colors"
                >
                  <InstagramIcon style={{ fontSize: '35px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} designed by Stadnina Złota Podkowa
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
