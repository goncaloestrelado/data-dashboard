import React from "react";
import { ChartBarIcon, PresentationChartLineIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export type TabType = "overview" | "line" | "exchange" | "bar" | "pie";

interface Tab {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "overview",
    label: "Overview",
    icon: ChartBarIcon,
    description: "Dashboard overview with key metrics",
  },
  {
    id: "line",
    label: "Line Chart",
    icon: PresentationChartLineIcon,
    description: "Cryptocurrency price trends",
  },
  {
    id: "exchange",
    label: "Exchange",
    icon: CurrencyDollarIcon,
    description: "Real-time exchange data",
  },
  {
    id: "bar",
    label: "Bar Chart",
    icon: ChartBarIcon,
    description: "Comparative analysis",
  },
  {
    id: "pie",
    label: "Pie Chart",
    icon: ChartPieIcon,
    description: "Distribution analysis",
  },
];

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-6 sm:mb-8 animate-fade-in">
      {/* Mobile dropdown */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-base"
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value as TabType)}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop tabs */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200/50 dark:border-gray-700/50">
          <nav className="-mb-px flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    group relative whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-sm flex-shrink-0
                    transition-all duration-300 animate-scale-in
                    ${
                      isActive
                        ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Icon
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                    />
                    <span className="text-xs sm:text-sm">{tab.label}</span>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-fade-in"></div>
                  )}

                  {/* Hover effect */}
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-lg
                    ${isActive ? "opacity-20" : ""}
                  `}
                  ></div>

                  {/* Tooltip - hidden on small screens */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 hidden lg:block">
                    {tab.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
