<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="styles/style.css">
  <link rel="stylesheet" type="text/css" href="js/DataTables/datatables.min.css">

  <script type=" text/javascript" src="js/jquery-3.6.1.min.js"></script>
  <script type="text/javascript" src="js/DataTables/datatables.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"
    integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/1.2.1/chartjs-plugin-zoom.min.js"
    integrity="sha512-klQv6lz2YR+MecyFYMFRuU2eAl8IPRo6zHnsc9n142TJuJHS8CG0ix4Oq9na9ceeg1u5EkBfZsFcV3U7J51iew=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body>
  <div class="container">
    <form class="variableDate" id="Date" method="post">
      <div class="fromDate">
        <label>Введите начальную дату:</label><br />
        <input type="date" id="first_date" name="first_date"><br>
      </div>
      <div class="toDate">
        <label>Введите конечную дату:</label><br />
        <input type="date" id="last_date" name="last_date"><br>
      </div>
      <input class="chekDate" type="submit" name="done" id="done" value="Показать диапазон"><br>
    </form>
  </div>
  <div class="container">
    <div class="table_and_chart">
      <table id="myTable" class="display dataTable">
      </table>
      <canvas id="myChart"></canvas>
    </div>
  </div>
  <div class="container charts">
    <div class="chart1">
      <canvas id="testChart1"></canvas>
    </div>
    <div class="chart2">
      <canvas id="testChart2"></canvas>
    </div>
  </div>
  <div class="footer-adaptiv__menu">
    <input type="checkbox" id="menu4" checked="false">
    <label for="menu4">
      Главный корпу
      <img class="stroke-down" src="img/footer/top-footer/stroke/stroke-down.svg">
      <img class="stroke-up" src="img/footer/top-footer/stroke/stroke-up.svg">
    </label>
  </div>
  <script type="text/javascript" src="js/tableAndchart.js"></script>
  <script type="text/javascript" src="js/charts.js"></script>
</body>

</html>