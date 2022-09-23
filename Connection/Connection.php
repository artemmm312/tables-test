<?php

namespace Connection;

use Exception;
use PDO;

class Connection
{
	private static Connection $instance;
	private PDO $pdo;

	private function __construct()
	{
		require_once 'configuration.php';
		$dsn = 'mysql:dbname=' . $conf['database'] . ';host=' . $conf['host'];
		$user = $conf['user'];
		$password = $conf['password'];
		$opt = [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false,
		];
		$this->pdo = new PDO($dsn, $user, $password, $opt);
	}

	public static function getInstance(): Connection
	{
		if (!isset(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function __get(string $name): PDO
	{
		if ($name === 'pdo') {
			return $this->pdo;
		}
	}

	private function __clone()
	{
	}

	public function __wakeup(): void
	{
		throw new Exception("Cannot unserialize a singleton.");
	}
}