import React, { useState } from 'react';

import config from '../config/index.json';
import Divider from './Divider';

const Gallery = () => {
  const { slider } = config;
  const images = slider?.images || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div id="gallery" className=" py-16">
      <div className="container mx-auto px-4">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-primary">
          {slider.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />

        <div className="mt-12">
          {/* Kontener dla głównego zdjęcia ze stałymi wymiarami */}
          <div className="relative w-full max-w-3xl mx-auto mb-8">
            <div className="w-full h-[450px]">
              {' '}
              {/* Zmniejszona wysokość */}
              <img
                src={images[selectedImageIndex]?.imgPath}
                alt={images[selectedImageIndex]?.label}
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Miniatury */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === index
                      ? 'ring-4 ring-green-600 ring-offset-2'
                      : 'hover:ring-2 hover:ring-green-400 hover:ring-offset-1'
                  }`}
                >
                  <div className="w-full h-[100px]">
                    {' '}
                    {/* Stała wysokość dla miniatur */}
                    <img
                      src={image.imgPath}
                      alt={image.label}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-green-600 bg-opacity-20 rounded-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
