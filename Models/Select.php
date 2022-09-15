<?php

namespace Models;

use Connection\Connection;

class Select
{
    private Connection $connection;

    public function __construct()
    {
        $this->connection = Connection::getInstance();
    }

    //Получаем данные из базы данных
    public function getValue(): array
    {
        $date = $this->connection
            ->pdo
            ->query("SELECT * FROM company")
            ->fetchAll();
        return $date;
    }
}