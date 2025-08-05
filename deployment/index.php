<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Simple router
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Parse the URL
$path = parse_url($request, PHP_URL_PATH);
$path = trim($path, '/');

// Routes
switch ($path) {
    case 'api/crypto/top5':
        if ($method === 'GET') {
            getTop5Cryptos();
        }
        break;
        
    case 'api/simulation/start':
        if ($method === 'POST') {
            startSimulation();
        }
        break;
        
    case 'api/portfolio/balance':
        if ($method === 'GET') {
            getPortfolioBalance();
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

function getTop5Cryptos() {
    // Simulate top 5 cryptocurrencies with market cap data
    $cryptos = [
        [
            'name' => 'Bitcoin',
            'symbol' => 'BTC',
            'price' => 43250.00,
            'marketCap' => 1198000000000, // 1.198 trillion
            'change24h' => 2.45,
            'icon' => 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
        ],
        [
            'name' => 'Ethereum',
            'symbol' => 'ETH',
            'price' => 2650.00,
            'marketCap' => 349000000000, // 349 billion
            'change24h' => 1.87,
            'icon' => 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
        ],
        [
            'name' => 'BNB',
            'symbol' => 'BNB',
            'price' => 315.00,
            'marketCap' => 86000000000, // 86 billion
            'change24h' => 3.12,
            'icon' => 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
        ],
        [
            'name' => 'Solana',
            'symbol' => 'SOL',
            'price' => 98.50,
            'marketCap' => 66000000000, // 66 billion
            'change24h' => 5.23,
            'icon' => 'https://cryptologos.cc/logos/solana-sol-logo.png'
        ],
        [
            'name' => 'XRP',
            'symbol' => 'XRP',
            'price' => 0.52,
            'marketCap' => 28000000000, // 28 billion
            'change24h' => -1.23,
            'icon' => 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
        ]
    ];
    
    // Calculate weighted allocation using square root of market cap
    $totalSqrt = 0;
    foreach ($cryptos as $crypto) {
        $totalSqrt += sqrt($crypto['marketCap']);
    }
    
    foreach ($cryptos as &$crypto) {
        $crypto['allocation'] = (sqrt($crypto['marketCap']) / $totalSqrt) * 100;
    }
    
    echo json_encode([
        'success' => true,
        'data' => $cryptos,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

function startSimulation() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $initialInvestment = $input['initialInvestment'] ?? 5000;
    $monthlyContribution = $input['monthlyContribution'] ?? 150;
    $period = $input['period'] ?? 48;
    
    // Simulate historical performance
    $results = [];
    $currentValue = $initialInvestment;
    $totalInvested = $initialInvestment;
    
    for ($month = 1; $month <= $period; $month++) {
        // Simulate monthly return (historical crypto market data)
        $monthlyReturn = simulateMonthlyReturn($month);
        $currentValue *= (1 + $monthlyReturn);
        
        // Add monthly contribution
        $currentValue += $monthlyContribution;
        $totalInvested += $monthlyContribution;
        
        $results[] = [
            'month' => $month,
            'value' => $currentValue,
            'invested' => $totalInvested,
            'return' => (($currentValue - $totalInvested) / $totalInvested) * 100
        ];
    }
    
    $finalValue = $currentValue;
    $totalReturn = (($finalValue - $totalInvested) / $totalInvested) * 100;
    $annualizedReturn = (pow($finalValue / $totalInvested, 12 / $period) - 1) * 100;
    
    echo json_encode([
        'success' => true,
        'data' => [
            'results' => $results,
            'summary' => [
                'totalInvested' => $totalInvested,
                'finalValue' => $finalValue,
                'totalReturn' => $totalReturn,
                'annualizedReturn' => $annualizedReturn
            ]
        ]
    ]);
}

function simulateMonthlyReturn($month) {
    // Simulate realistic crypto market returns with volatility
    // Based on historical Bitcoin data patterns
    
    $baseReturn = 0.02; // 2% average monthly return
    $volatility = 0.15; // 15% monthly volatility
    
    // Add some cyclical patterns
    $cycle = sin($month * 0.5) * 0.05; // 4-year cycle
    
    // Add random noise
    $noise = (rand(-100, 100) / 100) * $volatility;
    
    return $baseReturn + $cycle + $noise;
}

function getPortfolioBalance() {
    // Simulate current portfolio balance
    $portfolio = [
        'totalValue' => 5234.67,
        'totalChange' => 4.69,
        'assets' => [
            [
                'symbol' => 'BTC',
                'value' => 2375.45,
                'allocation' => 45.4,
                'change' => 2.45
            ],
            [
                'symbol' => 'ETH',
                'value' => 1277.89,
                'allocation' => 24.4,
                'change' => 1.87
            ],
            [
                'symbol' => 'BNB',
                'value' => 638.23,
                'allocation' => 12.2,
                'change' => 3.12
            ],
            [
                'symbol' => 'SOL',
                'value' => 580.45,
                'allocation' => 11.1,
                'change' => 5.23
            ],
            [
                'symbol' => 'XRP',
                'value' => 362.65,
                'allocation' => 7.0,
                'change' => -1.23
            ]
        ]
    ];
    
    echo json_encode([
        'success' => true,
        'data' => $portfolio
    ]);
}
?>
