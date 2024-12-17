"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

// WebSocketContextType tipini genişletiyoruz
interface WebSocketContextType {
  prices: { [key: string]: string | null };
  marketCapData: any[]; // Market cap verisi için state
  setPrice: (coin: string, price: string) => void;
}

// WebSocketProviderProps tipini oluşturuyoruz, children özelliğini dahil ediyoruz
interface WebSocketProviderProps {
  children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [prices, setPrices] = useState<{ [key: string]: string | null }>({});
  const [marketCapData, setMarketCapData] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // HANDLING API KEYS I WILL CHANGE THE ALL API KEYS WITH NEW ONES
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_CRYPTOCOMPARE;
    if (!apiKey) {
      console.error("API Key is missing!");
      return;
    }

    const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`);

    socket.onopen = () => {
      const coinsToSubscribe = ["BTC", "ETH", "SOL", "ADA", "XRP", "DOGE"].map(
        (coin) => `5~CCCAGG~${coin}~USD`
      );
      socket.send(JSON.stringify({ action: "SubAdd", subs: coinsToSubscribe }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.TYPE === "5" && data.PRICE) {
        const price = data.PRICE.toFixed(2);
        const coin = data.FROMSYMBOL;
        setPrices((prevPrices) => ({ ...prevPrices, [coin]: price }));
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const fetchMarketCapData = async () => {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/top/mktcap?assetClass=ALL&tsym=USD"
        );
        const result = await response.json();
        if (result.Message === "Success") {
          // Market cap verisini güncelle (coin Name, FullName ve totalVolume24h)
          const parsedData = result.Data.map((coin: any) => ({
            Name: coin.CoinInfo.Name,
            FullName: coin.CoinInfo.FullName,
            totalVolume24h: coin.ConversionInfo.TotalVolume24H.toFixed(2),
          }));
          setMarketCapData(parsedData);
        }
      } catch (error) {
        console.error("Error fetching market cap data:", error);
      }
    };
  
    fetchMarketCapData();
  }, []);
  const setPrice = (coin: string, price: string) => {
    setPrices((prevPrices) => ({ ...prevPrices, [coin]: price }));
  };

  return (
    <WebSocketContext.Provider value={{ prices, marketCapData, setPrice }}>
      {children}
    </WebSocketContext.Provider>
  );
};
