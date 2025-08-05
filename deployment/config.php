<?php
// Production configuration for PlanetHoster
define('PRODUCTION_MODE', true);
define('BASE_URL', 'https://your-domain.com'); // Replace with your actual domain

// Database configuration (if using MySQL)
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');

// API configuration
define('API_VERSION', 'v1');
define('CORS_ORIGIN', '*');

// Logging
define('LOG_ENABLED', true);
define('LOG_FILE', 'logs/app.log');

// Security
define('API_KEY', 'your_api_key_here'); // Generate a secure API key
?>
