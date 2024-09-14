import React, { useEffect } from 'react';

const Scroller: React.FC = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll<HTMLDivElement>('.scroller');

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', 'true');

        const scrollerInner = scroller.querySelector<HTMLUListElement>('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner?.children || []);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute('aria-hidden', 'true');

          scrollerInner?.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  const coinNames = [
    "Bitcoin",
    "Ethereum",
    "Ripple",
    "Litecoin",
    "Cardano",
    "Polkadot",
    "Chainlink",
    "Stellar"
  ];

  return (
    <div>
      <h1 className="text-center text-white mb-6">Infinite Scroll Animation</h1>

      <div className="scroller" data-speed="fast">
        <ul className="tag-list scroller__inner">
          {coinNames.map((name, index) => (
            <li key={index} className="coin-box">
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="scroller row1" data-speed="fast">
        <ul className="tag-list scroller__inner">
          {coinNames.map((name, index) => (
            <li key={index} className="coin-box">
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="scroller row2" data-speed="fast">
        <ul className="tag-list scroller__inner">
          {coinNames.map((name, index) => (
            <li key={index} className="coin-box">
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scroller;
