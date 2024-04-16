// import React from 'react';

import config from '../config/index.json';

const Offer = () => {
  // const [isHovered, setIsHovered] = useState(false);

  const { offer } = config;
  const { items: OfferList } = offer;
  return (
    <div className={`py-12 bg-background`} id="offer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h1
            className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
          >
            {offer.title.split(' ').map((word, index) => (
              <span
                key={index}
                className={index % 2 ? 'text-primary' : 'text-border'}
              >
                {word}{' '}
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {OfferList.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div>
                    <img src={feature.image} alt={feature.name} />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Offer;
