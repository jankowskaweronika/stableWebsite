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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Lekcje Jazdy Konnej
            </h2>
            <p className="text-gray-700 mb-2">
              Zapraszamy na lekcje jazdy konnej! Prowadzimy zajęcia dla osób na
              każdym poziomie zaawansowania – od początkujących, którzy dopiero
              poznają konia, po doświadczonych jeźdźców chcących doskonalić
              swoje umiejętności.
            </p>
            <p className="text-gray-700 mb-2">
              Nasze doświadczone instruktorki zapewniają bezpieczeństwo i
              komfort nauki w przyjaznej atmosferze. Niezależnie od wieku czy
              doświadczenia, każdy znajdzie coś dla siebie w naszej ofercie
              zajęć.
            </p>
            <p className="text-gray-700 mb-2">
              Zainteresowani? Skontaktujcie się z nami, aby umówić się na
              lekcję! 🐴
            </p>
            <span className="text-sm text-gray-400">7 kwietnia 2026</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Sekcja Jeździecka
            </h2>
            <p className="text-gray-700 mb-2">
              Chcemy z radością poinformować, iż od lipca ruszamy z sekcją
              jeździecką, której celem będzie przygotowanie jeźdźców do odznak
              oraz uczestnictwo w zawodach.
            </p>
            <p className="text-gray-700 mb-2">
              Aby zostać członkiem sekcji należy płynnie poruszać się w trzech
              chodach.
            </p>
            <p className="text-gray-700 mb-2">
              Osoby zainteresowane prosimy o kontakt telefoniczny w celu
              zapoznania się ze szczegółami. 😉
            </p>
            <span className="text-sm text-gray-400">1 lipca 2025</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Sukcesy naszych koni na XXVIII Narodowym Czempionacie Koni Rasy
              Małopolskiej
            </h2>
            <p className="text-gray-700 mb-2">
              W dniach 14-15 czerwca 2025 roku odbył się XXVIII Narodowy
              Czempionat Koni Rasy Małopolskiej w Stadninie Koni Białka.
            </p>
            <p className="text-gray-700 mb-2">
              W zawodach wzięło udział 72 koni z całej Polski.
            </p>
            <p className="text-gray-700 mb-2">
              Od nas ze stajni udział wzięło 3 konie:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>
                <b>Encanto</b> w klasie OGIERKI ROCZNE – otrzymał 70,25 pkt
              </li>
              <li>
                <b>El Bili AA</b> w klasie OGIERY TRZYLETNIE – otrzymał 64,24
                pkt
              </li>
              <li>
                <b>El Kili AA</b> w klasie OGIERY TRZYLETNIE – otrzymał 70,53
                pkt
              </li>
            </ul>
            <a
              href="https://www.lzhk.pl/2025/06/16/28-narodowy-mlodziezowy-czempionat-koni-rasy-malopolskiej-wyniki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Wyniki Narodowego Czempionatu Koni Rasy Małopolskiej
            </a>
            <span className="text-sm text-gray-400 block mt-2">
              1 lipca 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
