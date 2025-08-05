import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "./Card";

const COINS = [
  { id: "bitcoin", label: "Bitcoin", color: "#f7931a" },
  { id: "ethereum", label: "Ethereum", color: "#627eea" },
  { id: "solana", label: "Solana", color: "#00d4aa" },
  { id: "dogecoin", label: "Dogecoin", color: "#c2a633" },
];

const RANGE_TO_DAYS: Record<string, number> = {
  "1d": 1,
  "7d": 7,
  "14d": 14,
  "1m": 30,
  "3m": 90,
  "6m": 180,
};

interface SimpleLineChartProps {
  range: string;
  selectedCoin?: string | null;
}

export default function SimpleLineChart({ range, selectedCoin }: SimpleLineChartProps) {
  const [coin, setCoin] = useState(selectedCoin || "bitcoin");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCoinData = COINS.find((c) => c.id === coin) || COINS[0];

  // Update coin when selectedCoin prop changes
  useEffect(() => {
    if (selectedCoin) {
      setCoin(selectedCoin);
    }
  }, [selectedCoin]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const days = RANGE_TO_DAYS[range] || 30;

    fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        const prices = json.prices.map(([timestamp, value]: [number, number]) => ({
          name: new Date(timestamp).toLocaleDateString(),
          value: value,
          timestamp: timestamp,
        }));

        // For larger datasets, sample data points
        let processedData = prices;
        if (days > 30) {
          const sampleRate = Math.ceil(prices.length / 50);
          processedData = prices.filter((_: any, index: number) => index % sampleRate === 0);
        }

        setData(processedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [coin, range]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-xs">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {new Date(data.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
            $
            {payload[0].value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title={`${selectedCoinData.label} Price Chart`}
      subtitle={`Price trends over the last ${RANGE_TO_DAYS[range] || 30} days`}
      loading={loading}
      error={error}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Cryptocurrency:</label>
            <select
              className="px-2 py-1.5 sm:px-3 sm:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-0 flex-1 sm:flex-initial"
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            >
              {COINS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium flex items-center space-x-1 self-start sm:self-auto`}
          style={{ backgroundColor: `${selectedCoinData.color}20`, color: selectedCoinData.color }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedCoinData.color }}></div>
          <span>{selectedCoinData.label}</span>
        </div>
      </div>

      {!loading && !error && (
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-700" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={selectedCoinData.color}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: selectedCoinData.color,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
