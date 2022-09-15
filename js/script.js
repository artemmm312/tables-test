var first_date;
var last_date;
var data;

$('#Date').submit(function (e) {
	e.preventDefault();
	first_date = $("#first_date").val();
	last_date = $("#last_date").val();
	if (first_date != '' && last_date != '') {
		data = { "first_date": first_date, "last_date": last_date };
		$('#table_id').DataTable().destroy();
		table(first_date, last_date);
	} else {
		$('#table_id').DataTable().destroy();
		table();
	}
});

$(document).ready(function () {
	table();
});

function table(first_data = '', last_date = '') {
	$('#table_id').DataTable({
		"language": {
			"url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
		}, //язык интерфейса самой таблицы
		'processing': true, //индикатор загрузки
		'serverSide': true, //обработка на стороне сервера
		'serverMethod': 'post',
		'ajax': {
			'url': 'SelectPsg.php', //источник данных ajax для таблицы
			'data': { 'first_date': first_date, 'last_date': last_date }
		},
		'columns': [
			{ data: 'trip_no', title: 'Номер рейса' },
			{ data: 'date', title: 'Дата' },
			{ data: 'ID_psg', title: 'ID пассажира' },
			{ data: 'place', title: 'Место' }
		]
	})
}











/* $(document).ready(function () {
	$('#Date').submit(function (e) {
		e.preventDefault();
		let first_date = document.querySelector('input[name="first_date"]').value;
		let last_date = document.querySelector('input[name="last_date"]').value;
		let text = $("#text").val();
		console.log(first_date);
		$.ajax({
			type: 'POST',
			url: 'test.php',
			data: { "first_date": first_date, "last_date": last_date, "text": text },
			contentType: 'application/json;charset=utf-8',
			success: function (result) {
				alert(result);
			},
		});
	});
}); */