<?php

require __DIR__ . '/../vendor/autoload.php';

use Connection\Connection;

$conn = Connection::getInstance();

$stmt = $conn->pdo->query("SELECT trip_no, COUNT(DISTINCT `date`) AS `sum` FROM pass_in_trip  GROUP BY trip_no");

$testData = $stmt->fetchAll();

$stmt2 = $conn->pdo->query("SELECT trip_no, COUNT(*) AS `sum` FROM pass_in_trip  GROUP BY trip_no");

$testData2 = $stmt2->fetchAll();

$response = array(
  "testData" => $testData,
  "testData2" => $testData2,
);

echo json_encode($response);