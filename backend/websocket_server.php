<?php
require_once 'vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class CryptoWebSocket implements MessageComponentInterface {
    protected $clients;
    protected $cryptoData;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->cryptoData = $this->getInitialCryptoData();
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
        
        // Send initial data
        $conn->send(json_encode([
            'type' => 'initial_data',
            'data' => $this->cryptoData
        ]));
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        
        switch ($data['action'] ?? '') {
            case 'subscribe_portfolio':
                $this->subscribeToPortfolio($from);
                break;
            case 'start_simulation':
                $this->startSimulation($from, $data);
                break;
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    protected function getInitialCryptoData() {
        return [
            [
                'symbol' => 'BTC',
                'name' => 'Bitcoin',
                'price' => 43250.00,
                'change' => 2.45,
                'marketCap' => 1198000000000
            ],
            [
                'symbol' => 'ETH',
                'name' => 'Ethereum',
                'price' => 2650.00,
                'change' => 1.87,
                'marketCap' => 349000000000
            ],
            [
                'symbol' => 'BNB',
                'name' => 'BNB',
                'price' => 315.00,
                'change' => 3.12,
                'marketCap' => 86000000000
            ],
            [
                'symbol' => 'SOL',
                'name' => 'Solana',
                'price' => 98.50,
                'change' => 5.23,
                'marketCap' => 66000000000
            ],
            [
                'symbol' => 'XRP',
                'name' => 'XRP',
                'price' => 0.52,
                'change' => -1.23,
                'marketCap' => 28000000000
            ]
        ];
    }

    protected function subscribeToPortfolio($client) {
        // Start sending real-time updates
        $this->startRealTimeUpdates($client);
    }

    protected function startRealTimeUpdates($client) {
        // Simulate real-time price updates
        while (true) {
            foreach ($this->cryptoData as &$crypto) {
                // Simulate price movement
                $change = (rand(-100, 100) / 100) * 0.02; // ±2% change
                $crypto['price'] *= (1 + $change);
                $crypto['change'] = $change * 100;
            }
            
            $client->send(json_encode([
                'type' => 'price_update',
                'data' => $this->cryptoData,
                'timestamp' => date('Y-m-d H:i:s')
            ]));
            
            sleep(5); // Update every 5 seconds
        }
    }

    protected function startSimulation($client, $data) {
        $initialInvestment = $data['initialInvestment'] ?? 5000;
        $monthlyContribution = $data['monthlyContribution'] ?? 150;
        $period = $data['period'] ?? 48;
        
        $currentValue = $initialInvestment;
        $totalInvested = $initialInvestment;
        
        for ($month = 1; $month <= $period; $month++) {
            // Simulate monthly performance
            $monthlyReturn = (rand(-500, 1500) / 10000); // -5% to +15%
            $currentValue *= (1 + $monthlyReturn);
            $currentValue += $monthlyContribution;
            $totalInvested += $monthlyContribution;
            
            $client->send(json_encode([
                'type' => 'simulation_progress',
                'data' => [
                    'month' => $month,
                    'currentValue' => $currentValue,
                    'totalInvested' => $totalInvested,
                    'progress' => ($month / $period) * 100
                ]
            ]));
            
            usleep(100000); // 0.1 second delay for animation
        }
        
        $finalReturn = (($currentValue - $totalInvested) / $totalInvested) * 100;
        
        $client->send(json_encode([
            'type' => 'simulation_complete',
            'data' => [
                'finalValue' => $currentValue,
                'totalInvested' => $totalInvested,
                'totalReturn' => $finalReturn
            ]
        ]));
    }
}

// Start the WebSocket server
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new CryptoWebSocket()
        )
    ),
    8080
);

echo "WebSocket server started on port 8080\n";
$server->run();
?>
