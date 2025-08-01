# Crypto Dashboard

A React + TypeScript dashboard for tracking cryptocurrency prices with interactive charts and dark mode.

## Features

- Real-time crypto prices (Bitcoin, Ethereum, Solana, Dogecoin)
- Multiple chart types (line, bar, pie, area)
- Dark/light theme toggle
- Responsive design
- Historical price data with different time ranges

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Recharts for charts
- CoinGecko API

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

- `/src/components` - React components (charts, layout, cards)
- `/src/contexts` - Theme context for dark/light mode
- `tailwind.config.js` - Custom Tailwind configuration

## API

Uses the free [CoinGecko API](https://www.coingecko.com/api) for cryptocurrency data.
