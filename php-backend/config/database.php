<?php
// Database configuration for MySQL
class Database {
    // Default development settings
    private $host = 'localhost';
    private $db_name = 'fertilizer_management';
    private $username = 'root';
    private $password = '';
    private $conn;
    
    public function __construct() {
        // Override with environment variables if available (for production)
        $this->host = $_ENV['DB_HOST'] ?? $this->host;
        $this->db_name = $_ENV['DB_NAME'] ?? $this->db_name;
        $this->username = $_ENV['DB_USER'] ?? $this->username;
        $this->password = $_ENV['DB_PASS'] ?? $this->password;
    }

    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
}
?>