import { useEffect, useState } from "react";

export const CryptoPrices = () => {
  const [prices, setPrices] = useState({ BTC: null, ETH: null, SOL: null });
  useEffect(() => {
    const ws = new WebSocket(
      "wss://streamer.cryptocompare.com/v2?api_key=1162f895434ff38066365c8eaecbe9415a1e8d25569f1f7ca848e8529d83a8a1"
    );

    ws.onopen = () => {
      console.log("WebSocket opened");
      ws.send(
        JSON.stringify({
          action: "SubAdd",
          subs: ["5~CCCAGG~BTC~USD", "5~CCCAGG~ETH~USD", "5~CCCAGG~SOL~USD"],
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.TYPE === "5" && data.PRICE) {
        const symbol = data.FROMSYMBOL;
        const roundedPrice = data.PRICE.toFixed(2);
        setPrices((prevPrices) => ({
          ...prevPrices,
          [symbol]: roundedPrice,
        }));
        console.log(`${symbol}/USD: ${roundedPrice}`);
      }
    };

    // WebSocket connection will stay open until component unmounts
  }, []);

  return prices;
};
