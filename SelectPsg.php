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
$date = '';

if (isset($_POST['first_date']) && isset($_POST['last_date'])) {
	$firstDate = $_POST['first_date'];
	$lastDate = $_POST['last_date'];
}


$searchArray = array();

## поиск
$searchQuery = " ";
if ($searchValue !== '') {
	$searchQuery = " AND trip_no LIKE :trip_no OR
        `date` LIKE :date OR
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
	$firstDate = date("Y-m-d H:i:s", strtotime($firstDate));
	$lastDate = date("Y-m-d H:i:s", strtotime($lastDate));
	$dateArray = array('firstDate' => $firstDate, 'lastDate' => $lastDate);
	$date = " AND `date` BETWEEN :firstDate AND :lastDate";
	$stmt = $conn->pdo->prepare("SELECT COUNT(*) AS allcount FROM pass_in_trip WHERE 1" . $date);
	$stmt->execute($dateArray);
} else {
	$stmt = $conn->pdo->prepare("SELECT COUNT(*) AS allcount FROM pass_in_trip");
	$stmt->execute();
}
$records = $stmt->fetch();
$totalRecords = $records['allcount'];


## общее количество записей с фильтрацией
$stmt = $conn->pdo->prepare("SELECT COUNT(*) AS allcount FROM pass_in_trip WHERE 1" . $date . $searchQuery);
if ($date != '') {
	$stmt->execute(array_merge($dateArray, $searchArray));
} else {
	$stmt->execute($searchArray);
}
$records = $stmt->fetch();
$totalRecordwithFilter = $records['allcount'];

## получить записи для таблицы
$stmt = $conn->pdo->prepare("SELECT * FROM pass_in_trip WHERE 1" . $date . $searchQuery . " ORDER BY " . $columnName . " " . $columnSortOrder . " LIMIT :limit,:offset");

//связать значения
if ($date != '') {
	$stmt->bindValue('firstDate', $firstDate, PDO::PARAM_STR);
	$stmt->bindValue('lastDate', $lastDate, PDO::PARAM_STR);
}

foreach ($searchArray as $key => $search) {
	$stmt->bindValue(':' . $key, $search, PDO::PARAM_STR);
}

$stmt->bindValue(':limit', (int)$row, PDO::PARAM_INT);
$stmt->bindValue(':offset', (int)$rowperpage, PDO::PARAM_INT);
$stmt->execute();

$empRecords = $stmt->fetchAll();

//данные для таблицы
$tableData = array();
foreach ($empRecords as $xyi) {
	$tableData[] = array(
		"trip_no" => $xyi['trip_no'],
		"date" => date("d.m.Y", strtotime($xyi['date'])),
		"ID_psg" => $xyi['ID_psg'],
		"place" => $xyi['place']
	);
}

//данные для графика
$arrayDate = array();
foreach ($empRecords as $xyi2) {
	$arrayDate[] = date("d.m.Y", strtotime($xyi2['date']));
}
//sort($arrayDate);
function date_sort($a, $b)
{
	return strtotime($a) - strtotime($b);
}
usort($arrayDate, "date_sort");
$chartData = array_count_values($arrayDate);


$stm2 = $stmt = $conn->pdo->query("SELECT trip_no, COUNT(*) AS `sum` FROM pass_in_trip GROUP BY trip_no");
$testDate = $stm2->fetchAll();


## ответ
$response = array(
	"draw" => (int)$draw,
	"iTotalRecords" => $totalRecords,
	"iTotalDisplayRecords" => $totalRecordwithFilter,
	"aaData" => $tableData,
	"chartData" => $chartData,
	"testData" => $testDate
);

echo json_encode($response);
