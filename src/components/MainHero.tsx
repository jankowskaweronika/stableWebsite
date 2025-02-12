import React from 'react';

import config from '../config/index.json';

const MainHero = () => {
  const { mainHero } = config;
  const { contact } = config;

  const handleNavigateToMaps = () => {
    const address = encodeURIComponent(contact.information);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
      '_blank'
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 min-h-screen flex flex-col justify-center">
      {/* Mobile-only image */}
      <div className="lg:hidden w-full mb-8">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9">
            <img
              className="w-full h-full object-cover rounded-lg shadow-xl"
              src={mainHero.img}
              alt="main hero"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-green-700 rounded-lg -z-10"></div>
        </div>
      </div>

      <div className="w-full sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-3 sm:mb-0">
          <span className="block xl:inline">{mainHero.title}</span>{' '}
          <span className={`block text-primary xl:inline`}>
            {mainHero.subtitle}
          </span>
        </h1>
        <p className="mt-0 sm:mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          {mainHero.description}
        </p>
        <div className="mt-3 sm:mt-8 sm:flex sm:justify-center lg:justify-start flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="rounded-md shadow w-full sm:w-auto">
            <a
              href={mainHero.primaryAction.href}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {mainHero.primaryAction.text}
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href={`tel:${mainHero.secondaryAction.phoneNumber}`}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {mainHero.secondaryAction.text}
            </a>
          </div>
          {/* Mobile-only button */}
          <div className="w-full sm:hidden">
            <button
              onClick={handleNavigateToMaps}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary`}
            >
              Jak dojechać
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
