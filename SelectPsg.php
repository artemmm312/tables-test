<?php

require __DIR__ . '/vendor/autoload.php';

use Connection\Connection;

$conn = Connection::getInstance();

## значение параметров ajax запроса Datatable
$draw = $_POST['draw']; //счетчик для последовательных ajax-возвратов из запросов на обработку на стороне сервера
$row = $_POST['start']; //индикатор пейджинга первой записи (0)
$rowperpage = $_POST['length']; //количество записей
$columnIndex = $_POST['order'][0]['column']; //индекц столбца, к которому следует применить сортировку
$columnName = $_POST['columns'][$columnIndex]['data']; //источник данных столбца
$columnSortOrder = $_POST['order'][0]['dir']; //упорядочения по возрастанию или убывания для столбца
$searchValue = $_POST['search']['value']; //значение глобального поиска

$firstDate = '';
$lastDate = '';
if (isset($_POST['first_date']) && isset($_POST['last_date'])) {
	$firstDate = $_POST['first_date'];
	$lastDate = $_POST['last_date'];
}


$searchArray = array();

## поиск
$searchQuery = " ";
if ($searchValue !== '') {
	$searchQuery = " AND trip_no LIKE :trip_no OR
        date LIKE :date OR
        ID_psg LIKE :ID_psg OR
        place LIKE :place ";
	$searchArray = array(
		'trip_no' => "%$searchValue%",
		'date' => "%$searchValue%",
		'ID_psg' => "%$searchValue%",
		'place' => "%$searchValue%"
	);
}

## общее количество записей без фильтрации
if ($firstDate != '' && $lastDate != '') {
	$date = " AND `date` BETWEEN " . $firstDate . " AND " .  $lastDate . '"';
	$stmt = $conn->pdo->prepare("SELECT COUNT(*) AS allcount FROM pass_in_trip" . $date);
} else {
	$stmt = $conn->pdo->prepare("SELECT COUNT(*) AS allcount FROM pass_in_trip");
}
$stmt->execute();
$records = $stmt->fetch();
$totalRecords = $records['allcount'];

## общее количество записей с фильтрацией
if ($firstDate != '' && $lastDate != '') {
	$date = " AND date BETWEEN " . $firstDate . " AND " .  $lastDate;
	$stmt = $conn->pdo->prepare("SELECT COUNT(*) AS allcount FROM pass_in_trip WHERE 1" . $searchQuery . $date);
} else {
	$stmt = $conn->pdo->prepare("SELECT COUNT(*) AS allcount FROM pass_in_trip WHERE 1" . $searchQuery);
}
$stmt->execute($searchArray);
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## получить записи
$stmt = $conn->pdo->prepare("SELECT * FROM pass_in_trip WHERE  1" . $searchQuery . " ORDER BY " . $columnName . " " . $columnSortOrder . " LIMIT :limit,:offset");

//связать значения
foreach ($searchArray as $key => $search) {
	$stmt->bindValue(':' . $key, $search, PDO::PARAM_STR);
}

$stmt->bindValue(':limit', (int)$row, PDO::PARAM_INT);
$stmt->bindValue(':offset', (int)$rowperpage, PDO::PARAM_INT);
$stmt->execute();
$empRecords = $stmt->fetchAll();

$data = array();

foreach ($empRecords as $row) {
	$data[] = array(
		"trip_no" => $row['trip_no'],
		"date" => $row['date'],
		"ID_psg" => $row['ID_psg'],
		"place" => $row['place']
	);
}

## ответ
$response = array(
	"draw" => (int)$draw,
	"iTotalRecords" => $totalRecords,
	"iTotalDisplayRecords" => $totalRecordwithFilter,
	"aaData" => $data
);

echo json_encode($response);