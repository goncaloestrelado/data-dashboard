import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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

export default function ExchangeChart() {
  const [coin, setCoin] = useState("bitcoin");
  const [range, setRange] = useState("6m");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCoin = COINS.find((c) => c.id === coin) || COINS[0];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData([]);

      const days = RANGE_TO_DAYS[range] || 30;

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        let prices = json.prices.map(([timestamp, value]: [number, number]) => ({
          timestamp: Number(timestamp),
          value,
        }));

        // Downsample for large ranges: keep only one point per day
        if (days > 14) {
          const seen = new Set();
          prices = prices.filter((point: { timestamp: number; value: number }) => {
            const day = new Date(point.timestamp).toISOString().slice(0, 10);
            if (seen.has(day)) return false;
            seen.add(day);
            return true;
          });
        }

        // Sort by timestamp
        prices.sort(
          (a: { timestamp: number; value: number }, b: { timestamp: number; value: number }) =>
            a.timestamp - b.timestamp
        );

        setData(prices);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [coin, range]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(data.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
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
      title={`${selectedCoin.label} Exchange Chart`}
      subtitle={`Real-time exchange data for the last ${RANGE_TO_DAYS[range] || 30} days`}
      loading={loading}
      error={error}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</label>
            <select
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="1d">1 Day</option>
              <option value="7d">7 Days</option>
              <option value="14d">14 Days</option>
              <option value="1m">1 Month</option>
              <option value="3m">3 Months</option>
              <option value="6m">6 Months</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cryptocurrency:</label>
            <select
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}
          style={{ backgroundColor: `${selectedCoin.color}20`, color: selectedCoin.color }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: selectedCoin.color }}></div>
          <span>Live Data</span>
        </div>
      </div>

      {!loading && !error && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-700" />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(ts) =>
                  new Date(ts).toLocaleDateString(undefined, {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  })
                }
                minTickGap={20}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={selectedCoin.color}
                strokeWidth={2}
                fill={selectedCoin.color}
                fillOpacity={0.1}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
