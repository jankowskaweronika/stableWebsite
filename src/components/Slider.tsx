import React from 'react';

import config from '../config/index.json';

const Pricing = () => {
  const { pricing } = config;
  const { title } = pricing;

  return (
    <section className={`bg-background py-8`} id="pricing">
      <div className={`container mx-auto px-2 pt-4 pb-12 text-primary`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};

export default Pricing;
