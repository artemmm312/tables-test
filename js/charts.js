var testChart;
var testChart2;

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

      testChart = new Chart($("#testChart1"), {
        type: 'bar',
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

      let dataChart2 = Data.testData3;
      let xData3 = [];
      let yData3 = [];
      for (let i = 0; i < dataChart2.length; i++) {
        yData3.push(dataChart2[i].sum);
        xData3.push('Место ' + dataChart2[i].place);
      }

      if (testChart2) {
        testChart2.destroy();
      }

      testChart2 = new Chart($("#testChart2"), {
        type: 'pie',
        data: {
          labels: xData3,
          datasets: [{
            data: yData3,
            backgroundColor: [
              'rgba(250, 40, 40, 1)',
              'rgba(250, 108, 64, 1)',
              'rgba(252, 179, 71, 1)',
              'rgba(247, 214, 71, 1)',
              'rgba(206, 252, 79, 1)',
              'rgba(161, 255, 99, 1)',
              'rgba(99, 255, 146, 1)',
              'rgba(99, 255, 177, 1)',
              'rgba(99, 255, 242, 1)',
              'rgba(99, 206, 255, 1)',
              'rgba(31, 133, 250, 1)',
              'rgba(49, 69, 250, 1)',
              'rgba(109, 49, 250, 1)',
              'rgba(153, 49, 250, 1)',
              'rgba(203, 49, 250, 1)',
              'rgba(250, 49, 233, 1)',
              'rgba(250, 49, 149, 1)',
            ],
            borderColor: '#424242',
            borderWidth: 1,
            hoverOffset: 50,
            borderAlign: 'center',
            radius: '90%', //максимальны радиус
            //offset: 100,
          }]
        },
        options: {
          animation: {
            animateScale: true,
          },
          plugins: {
            legend: {
              position: 'left',
              onHover: '',
            },
            title: {
              display: true,
              text: 'Диаграмма частоты покупки определенных мест в рейсах:',
              padding: {
                top: 50,
                bottom: -800
              }
            }
          }
        }
      });
      //testChart2.options.plugins.legend.onHover.animateScale;
    },
  })
})
