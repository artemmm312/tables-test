
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
// 	});
//
// 	alert(response.json());
// };

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