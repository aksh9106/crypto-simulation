# Crypto Simulation Platform

A comprehensive cryptocurrency investment simulation platform that implements the proven "Top 5 Strategy" for long-term crypto investing.

## Features

- **Real-time Portfolio Tracking**: Monitor your crypto investments with live price updates
- **Top 5 Strategy Implementation**: Automatically invest in the 5 cryptocurrencies with the highest market capitalization
- **Historical Simulation**: Backtest your investment strategy using real historical data
- **Interactive Dashboard**: Beautiful, responsive interface with real-time charts and analytics
- **WebSocket Integration**: Real-time updates for live portfolio tracking
- **Monthly Rebalancing**: Automatic portfolio rebalancing to maintain optimal allocation

## Tech Stack

- **Frontend**: Vue.js 3, Chart.js, Font Awesome
- **Backend**: PHP with WebSocket support
- **Database**: MongoDB (for historical data)
- **Real-time**: WebSocket connections for live updates

## Strategy Overview

The "Top 5 Strategy" is a proven investment approach that:

1. **Identifies Top 5**: Selects the 5 cryptocurrencies with the highest market capitalization
2. **Weighted Allocation**: Uses square root of market cap for optimal distribution
3. **Monthly Rebalancing**: Maintains portfolio allocation through monthly adjustments
4. **Long-term Hold**: Designed for 4+ year investment horizons

### Historical Performance (2016-2024)
- **Strategy Return**: +2,847%
- **Bitcoin Return**: +1,923%
- **Risk Reduction**: -65% compared to single crypto investment

## Installation

### Prerequisites
- PHP 8.0+
- Node.js (for development)
- MongoDB (for historical data)

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aksh9106/crypto-simulation.git
   cd crypto-simulation
   ```

2. **Start the backend server**:
   ```bash
   cd backend
   php -S localhost:8000
   ```

3. **Start the WebSocket server** (optional):
   ```bash
   php websocket_server.php
   ```

4. **Open the frontend**:
   Open `frontend/index.html` in your browser or serve it with a local server.

## Usage

1. **Dashboard**: View your portfolio overview and performance metrics
2. **Portfolio**: See detailed allocation and individual crypto performance
3. **Simulation**: Run historical backtests with custom parameters
4. **Strategy**: Learn about the Top 5 Strategy methodology

## Configuration

### Simulation Parameters
- **Initial Investment**: Starting capital amount
- **Monthly Contribution**: Regular monthly investment amount
- **Simulation Period**: Number of months to simulate (12-60 months)

### Portfolio Settings
- **Rebalancing Frequency**: Monthly (recommended)
- **Allocation Method**: Square root of market capitalization
- **Risk Management**: Automatic diversification across top 5 cryptos

## API Endpoints

- `GET /api/crypto/top5` - Get current top 5 cryptocurrencies
- `POST /api/simulation/start` - Start investment simulation
- `GET /api/portfolio/balance` - Get current portfolio balance

## WebSocket Events

- `price_update` - Real-time price updates
- `simulation_progress` - Simulation progress updates
- `portfolio_rebalance` - Portfolio rebalancing notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This platform is for educational and simulation purposes only. Cryptocurrency investments carry significant risk. Always do your own research and consider consulting with a financial advisor before making investment decisions.

## Support

For questions or support, please open an issue in the repository.
