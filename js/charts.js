var testChart;

$(document).ready(function () {
  $.ajax({
    type: 'POST',
    url: 'service/Charts.php',
    //contentType: false,
    //cache: false,
    //processData: false,
    success: function (result) {
      let Data = JSON.parse(result);

      let testData = Data.testData;
      let xData = [];
      let yData = [];
      for (let i = 0; i < testData.length; i++) {
        yData.push(testData[i].sum);
        xData.push(testData[i].trip_no);
      }

      let testData2 = Data.testData2;
      let xData2 = [];
      let yData2 = [];
      for (let i = 0; i < testData2.length; i++) {
        yData2.push(testData2[i].sum);
        xData2.push(testData2[i].trip_no);
      }

      let max = Math.max.apply(null, yData.concat(yData2)) + 1; //максимальное значение для оси y

      if (testChart) {
        testChart.destroy();
      }

      testChart = new Chart($("#testChart"), {
        type: 'line',
        data: {
          labels: xData, //ось x
          datasets: [
            {
              label: 'Количество совершенных рейсов', // название для определенного графика в виде строки
              data: yData, //ось y данные в виде массива с числами, количество должно совпадать с количеством меток по оси X
              borderColor: 'rgba(3, 124, 94, 0.5)', //цвет линии
              borderWidth: 4, // назначаем ширину линий
              fill: true,  //заливка под линией
              backgroundColor: 'rgba(3, 124, 94, 0.20)', //цвет заливки под линией
              cubicInterpolationMode: 'monotone', // сглаживание углов
              pointBorderColor: '#03c945',
              pointBackgroundColor: '#00ff8080',
              pointRadius: 5,
              pointHoverRadius: 7,
              pointHitRadius: 30,
              pointBorderWidth: 2,
              pointStyle: 'rectRounded'
            },
            {
              label: 'Количество пассажиров летавших данным рейсом', // название для определенного графика в виде строки
              data: yData2, //ось y данные в виде массива с числами, количество должно совпадать с количеством меток по оси X
              borderColor: 'rgba(124, 57, 3, 0.5)', //цвет линии
              borderWidth: 3, // назначаем ширину линий
              pointRadius: 5,
              pointHoverRadius: 7,
              pointHitRadius: 30,
              pointBorderWidth: 2,
              pointStyle: 'rectRounded'
            }

          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            xAxes: {
              beginAtZero: true,
              min: 0,
              max: 8,
              title: {
                display: true,
                text: "Номер рейса",
                color: 'rgba(51, 51, 51, 0.8)',
                font: {
                  size: 20,
                }
              },
              grid: {
                borderColor: 'black',
                //borderWidth: 3,
              },
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
              max: max,
              title: {
                display: true,
                text: "Количество",
                color: 'rgba(51, 51, 51, 0.8)',
                font: {
                  size: 20,
                }
              },
              grid: {
                borderColor: 'black',
              },
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
            },
          },
        },
        plugins: [],
      });
    },
  })
})
