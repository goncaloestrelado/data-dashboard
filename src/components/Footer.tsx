import React from "react";
import { ChartBarIcon } from "@heroicons/react/24/outline";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
          {/* Project info */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 sm:p-1.5 rounded-lg">
                <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                Analytics Dashboard
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center md:text-left max-w-sm">
              A modern data visualization platform for professional insights and analytics
            </p>
          </div>

          {/* Creator info */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1 text-center">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Built using{" "}
                <a
                  href="https://recharts.org/en-US/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Recharts
                </a>{" "}
                for study purposes
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">by</span>
              <a
                href="https://github.com/goncaloestrelado"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <span>Gonçalo Estrelado</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.42-.012 2.75 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">© 2025 • Open Source Data Dashboard</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
