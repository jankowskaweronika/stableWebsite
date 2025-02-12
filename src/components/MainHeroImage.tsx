import React from 'react';

import config from '../config/index.json';

const MainHeroImage = () => {
  const { mainHero } = config;
  return (
    <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        className="h-full w-full object-cover"
        src={mainHero.img}
        alt="main hero"
      />
    </div>
  );
};

export default MainHeroImage;
