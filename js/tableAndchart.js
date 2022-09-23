var first_date;
var last_date;
var flightChart;

$('#Date').submit(function (e) {
	e.preventDefault();
	first_date = $("#first_date").val();
	last_date = $("#last_date").val();
	//console.log(first_date);
	//console.log(last_date);
	//console.log(flightChart);
	if (first_date != '' && last_date != '') {
		data = { "first_date": first_date, "last_date": last_date };
		$('#myTable').DataTable().destroy();
		table_and_chart(first_date, last_date);
	} else {
		$('#myTable').DataTable().destroy();
		table_and_chart();
	}
});



function table_and_chart(first_date = '', last_date = '') {
	$('#myTable').DataTable({
		"language": {
			"url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
		}, //язык интерфейса самой таблицы
		'processing': true, //индикатор загрузки
		'serverSide': true, //обработка на стороне сервера
		'serverMethod': 'post',
		'ajax': {
			'url': 'service/DataTableAndChart.php', //источник данных ajax для таблицы
			'data': { 'first_date': first_date, 'last_date': last_date },
		},
		'columns': [
			{ data: 'trip_no', title: 'Номер рейса' },
			{ data: 'date', title: 'Дата' },
			{ data: 'ID_psg', title: 'ID пассажира' },
			{ data: 'place', title: 'Место' }
		],
		"drawCallback": function (settings) {
			let charDate = settings.json.chartData;
			let flightDate = [];
			let flightCount = [];

			for (let key in charDate) {
				flightDate.push(key);
				flightCount.push(charDate[key]);
			}

			if (flightChart) {
				flightChart.destroy();
			}

			flightChart = new Chart($("#myChart"), {
				type: 'line',
				data: {
					labels: flightDate,
					datasets: [{
						label: 'Количество выкупленых мест на дату (на текущей странице таблицы, при текущей фильтрации)',
						data: flightCount,
						fill: true,  //заливка под линией
						backgroundColor: [
							'rgba(161, 102, 255, 0.178)',
						],
						borderColor: [
							'rgba(131, 86, 255, 0.973)',
						],
						color: 'rgb(255, 1, 1)',
						lineTension: 0.3, //изгиб линии
						//tension: 0.3, //изгиб линии
						//borderDashOffset: false,
					}],
				},
				options: {
					//responsive: false,
					scales: {
						yAxes: {
							beginAtZero: true, // назначили оси Y начинать отсчет с нуля
							min: 0,
							max: 5,
							ticks: {
								stepSize: 1,
							}
						}
					},
				},
				plugins: [],
			});
		}
	})
}

$(document).ready(function () {
	table_and_chart();
});
