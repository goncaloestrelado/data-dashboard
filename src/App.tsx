import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/Layout";
import { Tabs, TabType } from "./components/Tabs";
import { Overview } from "./components/Overview";
import SimpleLineChart from "./components/LineChart";
import ExchangeChart from "./components/ExchangeChart";
import SimpleBarChart from "./components/BarChart";
import SimplePieChart from "./components/PieChart";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [range, setRange] = useState("6m");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const handleCoinSelect = (coinId: string) => {
    setSelectedCoin(coinId);
    setActiveTab("line");
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab !== "line") {
      setSelectedCoin(null);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview onCoinSelect={handleCoinSelect} />;
      case "line":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Price Analysis</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Historical cryptocurrency price trends
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Time Range:
                </label>
                <select
                  className="px-2 py-1.5 sm:px-3 sm:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex-1 sm:flex-initial"
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
            </div>
            <SimpleLineChart range={range} selectedCoin={selectedCoin} />
          </div>
        );
      case "exchange":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Exchange Data</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Real-time cryptocurrency exchange information
              </p>
            </div>
            <ExchangeChart />
          </div>
        );
      case "bar":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Performance Metrics</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Financial performance analysis and comparison
              </p>
            </div>
            <SimpleBarChart />
          </div>
        );
      case "pie":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Portfolio Analysis</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Asset allocation and distribution insights
              </p>
            </div>
            <SimplePieChart />
          </div>
        );
      default:
        return <Overview />;
    }
  };

  return (
    <ThemeProvider>
      <Layout>
        <div className="space-y-6 sm:space-y-8">
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="animate-fade-in">{renderTabContent()}</div>
        </div>
      </Layout>
    </ThemeProvider>
  );
}
