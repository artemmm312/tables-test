
$(document).ready(function () {
	$('#Date').submit(function (e) {
		e.preventDefault();
		let first_date = document.querySelector('input[name="first_date"]').value;
		let last_date = document.querySelector('input[name="last_date"]').value;
		let text = $("#text").val();
		console.log(first_date);
		// $.ajax({
		// 	type: "POST",
		// 	url: "test.php",
		// 	data: {
		// 		title: "test"
		// 	},
		// 	success: function (result) {
		// 		console.log(result);
		// 	}
		// });
		$.ajax({
			type: 'POST',
			url: 'test.php',
			//data: new FormData(this),
			data: { "first_date": first_date, "last_date": last_date, "text": text },
			//contentType: false,
			//cache: false,
			//processData: false,
			success: function (result) {
				alert(result);
			},
		});
	});
});


// document.getElementById('Date').onsubmit = async (e) => {
// 	e.preventDefault();
//
// 	let first_date = document.querySelector('input[name="first_date"]').value;
// 	let last_date = document.querySelector('input[name="last_date"]').value;
// 	let text = document.querySelector('input[name="text"]').value;
// 	console.log(first_date);
// 	console.log(last_date);
// 	console.log(text);
//
// 	let response = await fetch('test.php', {
// 		method: 'POST',
// 		body: JSON.stringify({"first_date": first_date, "last_date": last_date, "text": text})
// 		//body: new FormData(document.getElementById('Date'))
// 	});
//
// 	//let result = await response.json();
//
// 	//alert(result.message);
// 	alert(response.json());
// };

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