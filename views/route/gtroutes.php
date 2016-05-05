<?php
use yii\helpers\Html;
$this->title = "Стандартные маршруты";
$this->params['breadcrumbs'][] = $this->title;

?>
<img src="./img/285.gif" id="loading-indicator" />
<div class="content-list">
<h1>Маршруты</h1>
<ul class="list-group">
    <?php foreach ($routes as $route): ?>
        <li class="list-group-item">
            <input class="route-input" id="<?= $route->id?>" type="checkbox"/> Маршрут № <b><?= $route->numberoute?></b> <i><?=$route->routepost?></i> Время: <?= $route->time?> Путь: <?= $route->track?>
        </li>
    <?php endforeach; ?>
</ul>
<button id="createXlsx" type="button" class="btn btn-primary">Сформировать</button>
<button type="button" class="btn btn-warning">Изменить</button>
<button type="button" class="btn btn-danger">Удалить</button>
</div>
