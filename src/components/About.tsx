import React from 'react';

import config from '../config/index.json';
import Divider from './Divider';

const About = () => {
  const { about } = config;

  const shouldBeRightAligned = (title: string) => {
    return (
      title.includes('🌿 Blisko natury') ||
      title.includes('🎓 Warsztaty jeździeckie')
    );
  };

  return (
    <section className={`bg-green-50 py-16`} id="about">
      <div className={`container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {about.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />

        <div className="mt-16 space-y-16">
          {about.items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg shadow-xl"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-green-700 rounded-lg -z-10"></div>
                </div>
              </div>

              <div
                className={`w-full lg:w-1/2 space-y-4 ${
                  shouldBeRightAligned(item.title) ? 'text-right' : 'text-left'
                }`}
              >
                <h3 className="text-3xl font-bold text-gray-800">
                  {item.title}
                </h3>
                <div
                  className={`w-20 h-1 bg-green-700 ${
                    shouldBeRightAligned(item.title) ? 'ml-auto' : ''
                  }`}
                ></div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
