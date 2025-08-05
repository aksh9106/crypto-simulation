const { createApp } = Vue;

createApp({
    data() {
        return {
            // Navigation
            currentSection: 'dashboard',
            
            // Portfolio data with real-time updates
            portfolio: [
                {
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                    price: 43250.00,
                    change: 2.45,
                    allocation: 45.4,
                    value: 2275.00,
                    quantity: 0.0526,
                    marketCap: 1198000000000,
                    volume24h: 28450000000
                },
                {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
                    price: 2650.00,
                    change: 1.87,
                    allocation: 24.4,
                    value: 1230.00,
                    quantity: 0.4642,
                    marketCap: 349000000000,
                    volume24h: 15800000000
                },
                {
                    name: 'BNB',
                    symbol: 'BNB',
                    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
                    price: 315.00,
                    change: 3.12,
                    allocation: 12.2,
                    value: 610.00,
                    quantity: 1.9365,
                    marketCap: 86000000000,
                    volume24h: 1250000000
                },
                {
                    name: 'Solana',
                    symbol: 'SOL',
                    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
                    price: 98.50,
                    change: 5.23,
                    allocation: 11.1,
                    value: 535.00,
                    quantity: 5.4314,
                    marketCap: 66000000000,
                    volume24h: 3200000000
                },
                {
                    name: 'XRP',
                    symbol: 'XRP',
                    icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
                    price: 0.52,
                    change: -1.23,
                    allocation: 7.0,
                    value: 350.00,
                    quantity: 673.0769,
                    marketCap: 28000000000,
                    volume24h: 1850000000
                }
            ],
            
            // Dashboard stats
            portfolioValue: 5000.00,
            portfolioChange: 8.45,
            top5Allocation: 100,
            simulationPeriod: 48,
            totalReturn: 2847.00,
            
            // Simulation settings
            initialInvestment: 5000,
            monthlyContribution: 150,
            isSimulating: false,
            simulationComplete: false,
            currentMonth: 0,
            simulationProgress: 0,
            
            // Simulation results
            totalInvested: 0,
            finalValue: 0,
            annualizedReturn: 0,
            
            // Enhanced chart data
            performanceChart: null,
            priceChart: null,
            allocationChart: null,
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Portfolio Value',
                    data: [],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            
            // Real-time data
            realTimeData: {
                btcPrice: 43250,
                ethPrice: 2650,
                bnbPrice: 315,
                solPrice: 98.5,
                xrpPrice: 0.52
            },
            
            // Market overview
            marketOverview: {
                totalMarketCap: 2847000000000,
                marketChange24h: 2.34,
                totalVolume24h: 68500000000,
                btcDominance: 45.2
            }
        }
    },
    
    mounted() {
        this.initializeNavigation();
        this.initializeCharts();
        this.loadHistoricalData();
        this.startRealTimeUpdates();
    },
    
    methods: {
        // Navigation
        initializeNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = link.getAttribute('href').substring(1);
                    this.showSection(target);
                });
            });
        },
        
        showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            document.getElementById(sectionId).classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
            
            this.currentSection = sectionId;
            
            // Update charts when switching to dashboard
            if (sectionId === 'dashboard') {
                this.$nextTick(() => {
                    this.updateCharts();
                });
            }
        },
        
        // Enhanced chart initialization
        initializeCharts() {
            setTimeout(() => {
                this.initializePerformanceChart();
                this.initializePriceChart();
                this.initializeAllocationChart();
            }, 100);
        },
        
        initializePerformanceChart() {
            const ctx = document.getElementById('performanceChart');
            if (ctx) {
                this.performanceChart = new Chart(ctx, {
                    type: 'line',
                    data: this.chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    color: '#333',
                                    font: {
                                        size: 12,
                                        weight: 'bold'
                                    }
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                borderColor: '#667eea',
                                borderWidth: 1,
                                callbacks: {
                                    label: function(context) {
                                        return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    color: '#666'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value.toLocaleString();
                                    },
                                    color: '#666'
                                }
                            }
                        }
                    }
                });
            }
        },
        
        initializePriceChart() {
            const ctx = document.getElementById('priceChart');
            if (ctx) {
                this.priceChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: this.portfolio.map(crypto => crypto.symbol),
                        datasets: [{
                            label: 'Price ($)',
                            data: this.portfolio.map(crypto => crypto.price),
                            backgroundColor: [
                                '#f7931a',
                                '#627eea',
                                '#f3ba2f',
                                '#9945ff',
                                '#23292f'
                            ],
                            borderColor: [
                                '#f7931a',
                                '#627eea',
                                '#f3ba2f',
                                '#9945ff',
                                '#23292f'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                });
            }
        },
        
        initializeAllocationChart() {
            const ctx = document.getElementById('allocationChart');
            if (ctx) {
                this.allocationChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: this.portfolio.map(crypto => crypto.name),
                        datasets: [{
                            data: this.portfolio.map(crypto => crypto.allocation),
                            backgroundColor: [
                                '#f7931a',
                                '#627eea',
                                '#f3ba2f',
                                '#9945ff',
                                '#23292f'
                            ],
                            borderWidth: 2,
                            borderColor: '#fff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 20,
                                    usePointStyle: true
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.label + ': ' + context.parsed.toFixed(1) + '%';
                                    }
                                }
                            }
                        }
                    }
                });
            }
        },
        
        // Load historical data with better simulation
        async loadHistoricalData() {
            const months = 48;
            const data = [];
            const labels = [];
            
            let currentValue = this.initialInvestment;
            let currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() - months);
            
            for (let i = 0; i <= months; i++) {
                const monthDate = new Date(currentDate);
                monthDate.setMonth(monthDate.getMonth() + i);
                labels.push(monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
                
                // More realistic crypto market simulation
                const baseGrowth = 0.02; // 2% monthly base growth
                const volatility = 0.15; // 15% monthly volatility
                const cycleEffect = Math.sin(i * 0.5) * 0.05; // 4-year cycle
                const randomFactor = (Math.random() - 0.5) * volatility;
                
                const monthlyGrowth = baseGrowth + cycleEffect + randomFactor;
                currentValue *= (1 + monthlyGrowth);
                
                if (i > 0) {
                    currentValue += this.monthlyContribution;
                }
                
                data.push(Math.max(currentValue, 0));
            }
            
            this.chartData.labels = labels;
            this.chartData.datasets[0].data = data;
            
            this.updateCharts();
        },
        
        // Real-time updates
        startRealTimeUpdates() {
            setInterval(() => {
                this.updatePrices();
                this.updatePortfolioValue();
            }, 5000); // Update every 5 seconds
        },
        
        updatePrices() {
            this.portfolio.forEach(crypto => {
                // Simulate realistic price movements
                const priceChange = (Math.random() - 0.5) * 0.02; // ±1% change
                crypto.price *= (1 + priceChange);
                crypto.change = priceChange * 100;
                crypto.value = crypto.quantity * crypto.price;
            });
            
            this.portfolioValue = this.portfolio.reduce((sum, crypto) => sum + crypto.value, 0);
        },
        
        updatePortfolioValue() {
            const oldValue = this.portfolioValue;
            this.portfolioValue = this.portfolio.reduce((sum, crypto) => sum + crypto.value, 0);
            this.portfolioChange = ((this.portfolioValue - oldValue) / oldValue) * 100;
        },
        
        // Portfolio management
        rebalancePortfolio() {
            // Simulate rebalancing with realistic market movements
            this.portfolio.forEach(crypto => {
                const priceChange = (Math.random() - 0.5) * 0.05; // ±2.5% change
                crypto.price *= (1 + priceChange);
                crypto.change = priceChange * 100;
                crypto.value = crypto.quantity * crypto.price;
            });
            
            this.portfolioValue = this.portfolio.reduce((sum, crypto) => sum + crypto.value, 0);
            this.updateCharts();
        },
        
        // Enhanced simulation
        async startSimulation() {
            this.isSimulating = true;
            this.simulationComplete = false;
            this.currentMonth = 0;
            this.simulationProgress = 0;
            
            let currentValue = this.initialInvestment;
            let totalInvested = this.initialInvestment;
            const results = [];
            
            for (let month = 1; month <= this.simulationPeriod; month++) {
                if (!this.isSimulating) break;
                
                this.currentMonth = month;
                this.simulationProgress = (month / this.simulationPeriod) * 100;
                
                // Enhanced simulation with market cycles
                const baseReturn = 0.02; // 2% monthly base return
                const volatility = 0.15; // 15% volatility
                const cycleEffect = Math.sin(month * 0.5) * 0.05; // 4-year cycle
                const randomFactor = (Math.random() - 0.5) * volatility;
                
                const monthlyReturn = baseReturn + cycleEffect + randomFactor;
                currentValue *= (1 + monthlyReturn);
                currentValue += this.monthlyContribution;
                totalInvested += this.monthlyContribution;
                
                results.push({
                    month,
                    value: currentValue,
                    invested: totalInvested,
                    return: ((currentValue - totalInvested) / totalInvested) * 100
                });
                
                // Update portfolio values
                this.portfolio.forEach(crypto => {
                    const cryptoReturn = (Math.random() - 0.5) * 0.1; // ±5% crypto return
                    crypto.price *= (1 + cryptoReturn);
                    crypto.change = cryptoReturn * 100;
                    crypto.value = crypto.quantity * crypto.price;
                });
                
                this.portfolioValue = this.portfolio.reduce((sum, crypto) => sum + crypto.value, 0);
                
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            this.isSimulating = false;
            this.simulationComplete = true;
            
            // Calculate final results
            this.totalInvested = totalInvested;
            this.finalValue = currentValue;
            this.totalReturn = ((currentValue - totalInvested) / totalInvested) * 100;
            this.annualizedReturn = (Math.pow(currentValue / totalInvested, 12 / this.simulationPeriod) - 1) * 100;
        },
        
        pauseSimulation() {
            this.isSimulating = false;
        },
        
        resetSimulation() {
            this.isSimulating = false;
            this.simulationComplete = false;
            this.currentMonth = 0;
            this.simulationProgress = 0;
            
            this.portfolioValue = this.initialInvestment;
            this.portfolio.forEach(crypto => {
                crypto.change = 0;
                crypto.value = (crypto.allocation / 100) * this.initialInvestment;
                crypto.quantity = crypto.value / crypto.price;
            });
        },
        
        // Chart updates
        updateCharts() {
            if (this.performanceChart) {
                this.performanceChart.update();
            }
            if (this.priceChart) {
                this.priceChart.update();
            }
            if (this.allocationChart) {
                this.allocationChart.update();
            }
        },
        
        // Utility methods
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        },
        
        formatPercentage(value) {
            if (value >= 0) {
                return '+' + value.toFixed(2) + '%';
            } else {
                return value.toFixed(2) + '%';
            }
        },
        
        formatMarketCap(value) {
            if (value >= 1e12) return '$' + (value / 1e12).toFixed(2) + 'T';
            if (value >= 1e9) return '$' + (value / 1e9).toFixed(2) + 'B';
            if (value >= 1e6) return '$' + (value / 1e6).toFixed(2) + 'M';
            return '$' + value.toLocaleString();
        }
    }
}).mount('#app');
