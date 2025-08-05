import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  subtitle,
  loading = false,
  error = null,
  onClick,
}) => {
  return (
    <div
      className={`
      group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg 
      rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 
      shadow-lg hover:shadow-xl dark:shadow-2xl
      transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1
      animate-slide-up
      ${onClick ? "cursor-pointer" : ""}
      ${className}
    `}
      onClick={onClick}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

      {/* Content */}
      <div className="relative p-4 sm:p-6">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-3 sm:mb-4">
            {title && (
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
            )}
            {subtitle && <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-6 sm:py-8">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 border-4 border-transparent border-r-purple-600 dark:border-r-purple-400 rounded-full animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
              ></div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center py-6 sm:py-8">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm px-4">{error}</p>
            </div>
          </div>
        )}

        {/* Main content */}
        {!loading && !error && children}
      </div>
    </div>
  );
};
