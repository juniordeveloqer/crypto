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

  const coinLogos = [
    "/images/coin1.png",
    "/images/coin2.png",
    "/images/coin3.png",
    "/images/coin4.png",
  ];

  return (
    <div>
      <h1 className="text-center text-white">Infinite Scroll Animation</h1>

      {/* İlk animasyon */}
      <div className="scroller" data-speed="fast">
        <ul className="tag-list scroller__inner">
          <li><span>Bitcoin</span><img src={coinLogos[0]} alt="Bitcoin" /></li>
          <li><span>Ethereum</span><img src={coinLogos[1]} alt="Ethereum" /></li>
          <li><span>Ripple</span><img src={coinLogos[2]} alt="Ripple" /></li>
          <li><span>Litecoin</span><img src={coinLogos[3]} alt="Litecoin" /></li>
        </ul>
      </div>

      {/* İkinci animasyon */}
      <div className="scroller" data-direction="right" data-speed="slow">
        <ul className="tag-list scroller__inner">
          <li><span>Bitcoin</span><img src={coinLogos[0]} alt="Bitcoin" /></li>
          <li><span>Ethereum</span><img src={coinLogos[1]} alt="Ethereum" /></li>
          <li><span>Ripple</span><img src={coinLogos[2]} alt="Ripple" /></li>
          <li><span>Litecoin</span><img src={coinLogos[3]} alt="Litecoin" /></li>
        </ul>
      </div>

      {/* Üçüncü animasyon */}
      <div className="scroller" data-speed="medium">
        <ul className="tag-list scroller__inner">
          <li><span>Bitcoin</span><img src={coinLogos[0]} alt="Bitcoin" /></li>
          <li><span>Ethereum</span><img src={coinLogos[1]} alt="Ethereum" /></li>
          <li><span>Ripple</span><img src={coinLogos[2]} alt="Ripple" /></li>
          <li><span>Litecoin</span><img src={coinLogos[3]} alt="Litecoin" /></li>
        </ul>
      </div>

      {/* Dördüncü animasyon */}
      <div className="scroller" data-direction="left" data-speed="fast">
        <ul className="tag-list scroller__inner">
          <li><span>Bitcoin</span><img src={coinLogos[0]} alt="Bitcoin" /></li>
          <li><span>Ethereum</span><img src={coinLogos[1]} alt="Ethereum" /></li>
          <li><span>Ripple</span><img src={coinLogos[2]} alt="Ripple" /></li>
          <li><span>Litecoin</span><img src={coinLogos[3]} alt="Litecoin" /></li>
        </ul>
      </div>

      {/* Beşinci animasyon */}
      <div className="scroller" data-speed="slow">
        <ul className="tag-list scroller__inner">
          <li><span>Bitcoin</span><img src={coinLogos[0]} alt="Bitcoin" /></li>
          <li><span>Ethereum</span><img src={coinLogos[1]} alt="Ethereum" /></li>
          <li><span>Ripple</span><img src={coinLogos[2]} alt="Ripple" /></li>
          <li><span>Litecoin</span><img src={coinLogos[3]} alt="Litecoin" /></li>
        </ul>
      </div>
    </div>
  );
};

export default Scroller;
