var first_date;
var last_date;
var flightChart;
var testChart;

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
			//console.log(charDate);
			let flightDate = [];
			let flightCount = [];

			for (let key in charDate) {
				flightDate.push(key);
				//console.log(flightDate);
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
			});


			let testDate = settings.json.testData;
			//console.log(testDate);
			let xDate = [];
			let yDate = [];

			for (let i = 0; i < testDate.length; i++) {

				yDate.push(testDate[i].sum);
				//console.log(xDate);
				xDate.push(testDate[i].trip_no);
				//console.log(yDate);

			}

			console.log(xDate);
			console.log(yDate);

			if (testChart) {
				testChart.destroy();
			}

			testChart = new Chart($("#testChart"), {
				type: 'line',
				data: {
					labels: xDate, //ось x
					datasets: [{
						label: 'Количества рейсов в дату на текущей странице', // название для определенного графика в виде строки
						data: yDate, //ось y данные в виде массива с числами, количество должно совпадать с количеством меток по оси X
						borderColor: 'rgba(255, 206, 86, 0.35)', //цвет линии
						borderWidth: 5, // назначаем ширину линий
						fill: true,  //заливка под линией
						backgroundColor: 'rgba(102, 219, 255, 0.6)', //цвет заливки под линией
						cubicInterpolationMode: 'monotone' // сглаживание углов

					}],
				},
				options: {
					scales: {
						xAxes: {
							//offset: true,
							title: {
								display: true,
								text: "Номер рейса",
								color: 'rgba(228, 24, 24, 0.75)',
							},
							min: 0,
							max: 8,
							ticks: {
								//autoSkip: false,
								//maxRotation: 7,
								//maxTicksLimit: 7,
								//count: 7,
								//sampleSize: 7,
								//max: 5,
								//bounds: 5,
								//stacked: true,
								/* major: {
									enabled: true,
								} */
							},
							backdropColor: 'rgba(238, 5, 5, 0.75)',
						},
						yAxes: {
							beginAtZero: true, // назначили оси Y начинать отсчет с нуля
							min: 0,
							max: 7,
							ticks: {
								stepSize: 1,
							}
						}
					},
					plugins: {
						zoom: {
							pan: {
								enabled: true,
								mode: 'x',
							},
							/* limits: {
								xAxes: { min: 0, max: 5 },
							}, */

						},
					},
				},
				//plugins: [],
			});
			//Chart.register(zoomPlugin);
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