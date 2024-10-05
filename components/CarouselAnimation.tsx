// app/components/ScrollerAnimation.tsx
'use client';

import { useEffect } from 'react';

interface ScrollerAnimationProps {
  coinData: any[]; // Burayı CoinInfo türü ile değiştirebilirsiniz
}

const ScrollerAnimation: React.FC<ScrollerAnimationProps> = ({ coinData }) => {
  useEffect(() => {
    const scrollers = document.querySelectorAll<HTMLDivElement>(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTimeout(() => {
        scrollers.forEach((scroller) => {
          scroller.setAttribute("data-animated", "true");

          const scrollerInner =
            scroller.querySelector<HTMLUListElement>(".scroller__inner");
          const scrollerContent = Array.from(scrollerInner?.children || []);

          // İçeriği klonlayarak sonsuz bir kaydırma efekti yaratıyoruz.
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerInner?.appendChild(duplicatedItem);
          });
        });
      }, 0); // Render tamamlandıktan sonra çalışması için setTimeout kullanıyoruz.
    }
  }, [coinData]); // coinData değiştiğinde useEffect'i tetikle

  return null; // Görsel içerik üretmiyoruz, sadece animasyonu uyguluyoruz.
};

export default ScrollerAnimation;
