<?php

require __DIR__ . '/../vendor/autoload.php';

use Connection\Connection;

$conn = Connection::getInstance();

/* $stmt = $conn->pdo->query("SELECT trip_no, COUNT(DISTINCT `date`) AS `sum` FROM pass_in_trip  GROUP BY trip_no");

$testData = $stmt->fetchAll(); */

$testData = $conn->pdo->query("SELECT trip_no, COUNT(DISTINCT `date`) AS `sum` FROM pass_in_trip  GROUP BY trip_no")->fetchAll();

/* $stmt2 = $conn->pdo->query("SELECT trip_no, COUNT(*) AS `sum` FROM pass_in_trip  GROUP BY trip_no");

$testData2 = $stmt2->fetchAll(); */

$testData2 = $conn->pdo->query("SELECT trip_no, COUNT(*) AS `sum` FROM pass_in_trip  GROUP BY trip_no")->fetchAll();

$testData3 = $conn->pdo->query("SELECT place, COUNT(*) AS `sum` FROM pass_in_trip GROUP BY place")->fetchAll();
//var_dump($testData3);
$response = array(
  "testData" => $testData,
  "testData2" => $testData2,
  "testData3" => $testData3,
);

echo json_encode($response);
