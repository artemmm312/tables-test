var first_date;
var last_date;
var flightChart;

$('#Date').submit(function (e) {
	e.preventDefault();
	first_date = $("#first_date").val();
	last_date = $("#last_date").val();
	console.log(first_date);
	console.log(last_date);
	console.log(flightChart);
	if (first_date != '' && last_date != '') {
		data = { "first_date": first_date, "last_date": last_date };
		$('#myTable').DataTable().destroy();
		//$("#myChart").destroy();
		table_and_chart(first_date, last_date);
	} else {
		$('#myTable').DataTable().destroy();
		//$("#myChart").destroy();
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
			'url': 'SelectPsg.php', //источник данных ajax для таблицы
			'data': { 'first_date': first_date, 'last_date': last_date },
		},
		'columns': [
			{ data: 'trip_no', title: 'Номер рейса' },
			{ data: 'date', title: 'Дата' },
			{ data: 'ID_psg', title: 'ID пассажира' },
			{ data: 'place', title: 'Место' }
		],
		"drawCallback": function (settings) {  //построение графика
			let charDate = settings.json.chartData;
			console.log(charDate);
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
						label: 'Количества рейсов в дату на текущей странице',
						data: flightCount,
						//radius: '5',
						fill: true,  //заливка под линией
						backgroundColor: [
							'rgba(153, 102, 255, 0.6)',
						],
						borderColor: [
							'rgba(255, 206, 86, 0.35)',
						],
						color: 'rgb(255, 1, 1)',
						lineTension: 0.3, //изгиб линии
						//tension: 0.3, //изгиб линии
						//borderDashOffset: false,
					}],
				},
				options: {
					//responsive: false,
					legend: {
						display: true,
						position: 'top',
						labels: {
							boxWidth: 80,
							fontColor: '#351212',
						}
					}
					/* animations: {
						tension: {
							duration: 5000,
							easing: 'easeInOutSine',
							from: 1,
							to: 0,
							loop: false
						}
					},
					scales: {
						y: { // defining min and max so hiding the dataset does not change scale range
							min: 0,
							max: 5
						}
					},
	
					plugins: {
						title: {
							display: true,
							text: 'График полётов',
						}
					} */
				},
				plugins: [],
				/* data: {
					labels: flightDate,
					datasets: [{
						label: 'График количества рейсов в дату на текущей странице',
						data: flightCount,
						backgroundColor: [
							'rgba(3, 28, 252, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)'
						],
						borderColor: [
							'rgba(252, 3, 190, 0.6)',
							'rgba(58, 226, 17, 0.412)'
						],
						color: [
							'#07cef1',
						]
					}]
				} */
			});
		}
	})
}

let color;
$(document).ready(function () {
	table_and_chart();
});












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