<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" type="text/css" href="js/DataTables/datatables.min.css">

  <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
  <script type="text/javascript" src="js/DataTables/datatables.min.js"></script>
</head>

<body>
  <div>
    <form id="Date" method="post">
      <label>Введите начальную дату:</label><br />
      <input type="date" id="first_date" name="first_date"><br>
      <label>Введите конечную дату:</label><br />
      <input type="date" id="last_date" name="last_date"><br>
      <input type="submit" name="done" id="done" value="Показать"><br>
    </form>
  </div>
  <table id="table_id" class="display dataTable">
  </table>
  <script type="text/javascript" src="js/script.js"></script>
  <!--<script type="text/javascript" src="js/test.js"></script>-->
</body>

</html>