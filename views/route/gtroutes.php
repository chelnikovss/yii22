<?php
use yii\helpers\Html;
$this->title = "Стандартные маршруты";
$this->params['breadcrumbs'][] = $this->title;

?>
<h1>Маршруты</h1>
<ul class="list-group">
    <?php foreach ($routes as $route): ?>
        <li class="list-group-item">
            <input id="<?= $route->id?>" type="checkbox"/> Маршрут: <?= $route->numberoute?> <?=$route->routepost?> Время: <?= $route->time?> Путь: <?= $route->track?>
        </li>
    <?php endforeach; ?>
</ul>
<button type="button" class="btn btn-primary">Сформировать</button>
<button type="button" class="btn btn-warning">Изменить</button>
<button type="button" class="btn btn-danger">Удалить</button>
