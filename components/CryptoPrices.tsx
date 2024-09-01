import React, { useState, useEffect, useRef } from "react";

interface WebSocketData {
  TYPE: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  PRICE: string;
}

const CryptoPrices: React.FC = () => {
  const [prices, setPrices] = useState<WebSocketData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    const apiKey =
      "1162f895434ff38066365c8eaecbe9415a1e8d25569f1f7ca848e8529d83a8a1";
    const url = `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`;

    const connect = () => {
      if (wsRef.current) {
        wsRef.current.close(); // Close any existing connection
      }

      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established");
        reconnectAttemptsRef.current = 0; // Reset the reconnect attempts counter

        // Ensure the WebSocket is open before sending data
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              action: "SubAdd",
              subs: [
                "5~CCCAGG~BTC~USD",
                "5~CCCAGG~ETH~USD",
                "5~CCCAGG~ADA~USD",
                "5~CCCAGG~XRP~USD",
                "5~CCCAGG~DOGE~USD",
              ],
            })
          );
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketData = JSON.parse(event.data);
          if (message.TYPE === "5") {
            setPrices((prevPrices) => {
              const updatedPrices = [...prevPrices];
              const index = updatedPrices.findIndex(
                (item) => item.FROMSYMBOL === message.FROMSYMBOL
              );
              if (index !== -1) {
                updatedPrices[index] = message;
              } else {
                updatedPrices.push(message);
              }
              return updatedPrices;
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message", error);
        }
      };

      wsRef.current.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError("WebSocket error occurred.");
      };

      wsRef.current.onclose = (event) => {
        console.log("WebSocket connection closed", event);
        setError(
          `WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`
        );
        // Try to reconnect after a delay, with a limit on the number of attempts
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1;
          setTimeout(connect, 5000);
        } else {
          console.error("Max reconnect attempts reached.");
        }
      };
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Crypto Prices</h1>

      {prices.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <ul>
        {prices.map((item) => (
          <li key={`${item.FROMSYMBOL}-${item.TOSYMBOL}`}>
            {item.FROMSYMBOL}/{item.TOSYMBOL}: $
            {parseFloat(item.PRICE).toFixed(2)}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default CryptoPrices;
