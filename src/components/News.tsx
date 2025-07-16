import React from 'react';

import Divider from './Divider';

const News = () => {
  return (
    <section className="py-16" id="news">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-primary">
          <span className="text-primary">Aktualności</span>
        </h1>
        <Divider />
        <div className="mt-8 space-y-8">
          {/* Przykładowe aktualności - do podmiany na dynamiczne */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Nowa oferta letnich obozów!
            </h2>
            <p className="text-gray-700">
              Zapraszamy do zapisów na letnie obozy jeździeckie 2024.
              Gwarantujemy niezapomniane wrażenia, profesjonalną opiekę i
              mnóstwo zabawy z końmi!
            </p>
            <span className="text-sm text-gray-400">12 czerwca 2024</span>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Sukcesy naszych podopiecznych
            </h2>
            <p className="text-gray-700">
              Gratulujemy naszym jeźdźcom udanych startów w zawodach
              regionalnych! Jesteśmy dumni z Waszych osiągnięć.
            </p>
            <span className="text-sm text-gray-400">5 czerwca 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
