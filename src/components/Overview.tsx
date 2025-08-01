import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  loading?: boolean;
  onClick?: () => void;
  coinId?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon: Icon, loading, onClick }) => {
  return (
    <Card
      className={`h-full ${onClick ? "cursor-pointer hover:shadow-lg transition-shadow duration-200" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {loading ? <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div> : value}
            </p>
            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              <span>{change}</span>
            </div>
          </div>
        </div>
        <div
          className={`p-3 rounded-full ${
            isPositive
              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
              : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

interface OverviewProps {
  onCoinSelect?: (coinId: string) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onCoinSelect }) => {
  const [cryptoData, setCryptoData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true"
        );
        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    return `${Math.abs(change).toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(marketCap);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
          Market Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Real-time cryptocurrency market data and insights</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Bitcoin (BTC)"
          value={loading ? "---" : formatPrice(cryptoData.bitcoin?.usd || 0)}
          change={loading ? "---" : formatChange(cryptoData.bitcoin?.usd_24h_change || 0)}
          isPositive={!loading && (cryptoData.bitcoin?.usd_24h_change || 0) > 0}
          icon={CurrencyDollarIcon}
          loading={loading}
          onClick={() => onCoinSelect?.("bitcoin")}
        />
        <MetricCard
          title="Ethereum (ETH)"
          value={loading ? "---" : formatPrice(cryptoData.ethereum?.usd || 0)}
          change={loading ? "---" : formatChange(cryptoData.ethereum?.usd_24h_change || 0)}
          isPositive={!loading && (cryptoData.ethereum?.usd_24h_change || 0) > 0}
          icon={ArrowTrendingUpIcon}
          loading={loading}
          onClick={() => onCoinSelect?.("ethereum")}
        />
        <MetricCard
          title="Solana (SOL)"
          value={loading ? "---" : formatPrice(cryptoData.solana?.usd || 0)}
          change={loading ? "---" : formatChange(cryptoData.solana?.usd_24h_change || 0)}
          isPositive={!loading && (cryptoData.solana?.usd_24h_change || 0) > 0}
          icon={ChartBarIcon}
          loading={loading}
          onClick={() => onCoinSelect?.("solana")}
        />
        <MetricCard
          title="Dogecoin (DOGE)"
          value={loading ? "---" : formatPrice(cryptoData.dogecoin?.usd || 0)}
          change={loading ? "---" : formatChange(cryptoData.dogecoin?.usd_24h_change || 0)}
          isPositive={!loading && (cryptoData.dogecoin?.usd_24h_change || 0) > 0}
          icon={GlobeAltIcon}
          loading={loading}
          onClick={() => onCoinSelect?.("dogecoin")}
        />
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Market Summary" className="lg:col-span-2">
          <div className="space-y-4">
            {Object.entries(cryptoData).map(([coin, data]: [string, any]) => (
              <div
                key={coin}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors duration-200"
                onClick={() => onCoinSelect?.(coin)}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                    {coin.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Market Cap: {data.usd && formatMarketCap(data.usd * 19000000)} {/* Rough estimation */}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{data.usd && formatPrice(data.usd)}</p>
                  <p
                    className={`text-sm font-medium ${
                      (data.usd_24h_change || 0) >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {data.usd_24h_change && formatChange(data.usd_24h_change)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Market Insights">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Market Trend</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                The crypto market is showing mixed signals with Bitcoin leading the charge.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Volume Analysis</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Trading volume has increased by 15% in the last 24 hours.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Market Sentiment</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Overall sentiment remains bullish across major cryptocurrencies.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
