import config from '../config/index.json';
import Divider from './Divider';

const Offer = () => {
  const { offer } = config;
  const { items: OfferList } = offer;

  return (
    <section className="bg-green-50 py-16" id="offer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            {offer.title.split(' ').map((word, index) => (
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

        <div className="mt-16">
          <div className="grid md:grid-cols-2 gap-12">
            {OfferList.map((feature) => (
              <div
                key={feature.name}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
              >
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      className="w-full h-64 object-cover"
                      src={feature.image}
                      alt={feature.name}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {feature.name}
                  </h3>
                  <div className="w-16 h-1 bg-green-700 mb-4" />
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
