<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" type="text/css" href="js/DataTables/datatables.min.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"
    integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/1.2.1/chartjs-plugin-zoom.min.js"
    integrity="sha512-klQv6lz2YR+MecyFYMFRuU2eAl8IPRo6zHnsc9n142TJuJHS8CG0ix4Oq9na9ceeg1u5EkBfZsFcV3U7J51iew=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script type=" text/javascript" src="js/jquery-3.6.1.min.js"></script>
  <script type="text/javascript" src="js/DataTables/datatables.min.js"></script>
</head>

<body>
  <div class="container">
    <form id="Date" method="post">
      <label>Введите начальную дату:</label><br />
      <input type="date" id="first_date" name="first_date"><br>
      <label>Введите конечную дату:</label><br />
      <input type="date" id="last_date" name="last_date"><br>
      <input type="submit" name="done" id="done" value="Показать"><br>
    </form>
  </div>
  <div class="container">
    <table id="myTable" class="display dataTable">
    </table>
  </div>
  <div class="container">
    <canvas id="myChart"></canvas>
  </div>
  <div class="container testChar" style="height: 600px; width: 100%">
    <canvas id="testChart" style="max-height: 600px; max-width: 1200px"></canvas>
  </div>
  <script type="text/javascript" src="js/script.js"></script>
  <script type="text/javascript" src="js/charts.js"></script>
</body>

</html>