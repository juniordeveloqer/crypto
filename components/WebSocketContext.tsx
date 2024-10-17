"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

// WebSocketContextType tipini oluşturuyoruz
interface WebSocketContextType {
  prices: { [key: string]: string | null };
  setPrice: (coin: string, price: string) => void;
}

// WebSocketProviderProps tipini oluşturuyoruz, children özelliğini dahil ediyoruz
interface WebSocketProviderProps {
  children: React.ReactNode; // children özelliği burada tanımlandı
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
      const coinsToSubscribe = ["BTC", "ETH", "SOL"].map(
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

  const setPrice = (coin: string, price: string) => {
    setPrices((prevPrices) => ({ ...prevPrices, [coin]: price }));
  };

  return (
    <WebSocketContext.Provider value={{ prices, setPrice }}>
      {children}
    </WebSocketContext.Provider>
  );
};
