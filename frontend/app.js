const { createApp } = Vue;

createApp({
    data() {
        return {
            // Navigation
            currentSection: 'dashboard',
            
            // Portfolio data
            portfolio: [
                {
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                    price: 43250.00,
                    change: 2.45,
                    allocation: 45.4,
                    value: 2275.00,
                    quantity: 0.0526
                },
                {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
                    price: 2650.00,
                    change: 1.87,
                    allocation: 24.4,
                    value: 1230.00,
                    quantity: 0.4642
                },
                {
                    name: 'BNB',
                    symbol: 'BNB',
                    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
                    price: 315.00,
                    change: 3.12,
                    allocation: 12.2,
                    value: 610.00,
                    quantity: 1.9365
                },
                {
                    name: 'Solana',
                    symbol: 'SOL',
                    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
                    price: 98.50,
                    change: 5.23,
                    allocation: 11.1,
                    value: 535.00,
                    quantity: 5.4314
                },
                {
                    name: 'XRP',
                    symbol: 'XRP',
                    icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
                    price: 0.52,
                    change: -1.23,
                    allocation: 7.0,
                    value: 350.00,
                    quantity: 673.0769
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
            
            // Chart data
            performanceChart: null,
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Portfolio Value',
                    data: [],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            }
        }
    },
    
    mounted() {
        this.initializeNavigation();
        this.initializeChart();
        this.loadHistoricalData();
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
        },
        
        // Chart initialization
        initializeChart() {
            const ctx = document.getElementById('performanceChart');
            if (ctx) {
                this.performanceChart = new Chart(ctx, {
                    type: 'line',
                    data: this.chartData,
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
        
        // Load historical data
        async loadHistoricalData() {
            // Simulate loading historical data
            const months = 48;
            const data = [];
            const labels = [];
            
            let currentValue = this.initialInvestment;
            
            for (let i = 0; i <= months; i++) {
                const month = new Date();
                month.setMonth(month.getMonth() - (months - i));
                labels.push(month.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
                
                // Simulate monthly growth with some volatility
                const monthlyGrowth = (Math.random() * 0.15) - 0.05; // -5% to +10%
                currentValue *= (1 + monthlyGrowth);
                
                if (i > 0) {
                    currentValue += this.monthlyContribution;
                }
                
                data.push(Math.max(currentValue, 0));
            }
            
            this.chartData.labels = labels;
            this.chartData.datasets[0].data = data;
            
            if (this.performanceChart) {
                this.performanceChart.update();
            }
        },
        
        // Portfolio management
        rebalancePortfolio() {
            // Simulate rebalancing
            this.portfolio.forEach(crypto => {
                // Simulate price changes
                const priceChange = (Math.random() * 0.1) - 0.05; // -5% to +5%
                crypto.price *= (1 + priceChange);
                crypto.change = priceChange * 100;
                
                // Update values based on new prices
                crypto.value = crypto.quantity * crypto.price;
            });
            
            // Recalculate total portfolio value
            this.portfolioValue = this.portfolio.reduce((sum, crypto) => sum + crypto.value, 0);
            
            // Update chart
            this.updateChart();
        },
        
        // Simulation methods
        async startSimulation() {
            this.isSimulating = true;
            this.simulationComplete = false;
            this.currentMonth = 0;
            this.simulationProgress = 0;
            
            let currentValue = this.initialInvestment;
            let totalInvested = this.initialInvestment;
            
            for (let month = 1; month <= this.simulationPeriod; month++) {
                if (!this.isSimulating) break; // Check for pause
                
                this.currentMonth = month;
                this.simulationProgress = (month / this.simulationPeriod) * 100;
                
                // Simulate monthly performance
                const monthlyReturn = (Math.random() * 0.2) - 0.05; // -5% to +15%
                currentValue *= (1 + monthlyReturn);
                
                // Add monthly contribution
                currentValue += this.monthlyContribution;
                totalInvested += this.monthlyContribution;
                
                // Update portfolio values
                this.portfolio.forEach(crypto => {
                    const cryptoReturn = (Math.random() * 0.15) - 0.075; // -7.5% to +7.5%
                    crypto.price *= (1 + cryptoReturn);
                    crypto.change = cryptoReturn * 100;
                    crypto.value = crypto.quantity * crypto.price;
                });
                
                this.portfolioValue = this.portfolio.reduce((sum, crypto) => sum + crypto.value, 0);
                
                // Wait for animation
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
            
            // Reset portfolio to initial state
            this.portfolioValue = this.initialInvestment;
            this.portfolio.forEach(crypto => {
                crypto.change = 0;
                crypto.value = (crypto.allocation / 100) * this.initialInvestment;
                crypto.quantity = crypto.value / crypto.price;
            });
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
        
        updateChart() {
            if (this.performanceChart) {
                this.performanceChart.update();
            }
        }
    }
}).mount('#app');
