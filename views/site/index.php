<?php
/* @var $this yii\web\View */
$this->title = 'Система расчет маршрута';
?>
<div class="site-index">
    <div class="jumbotron">
        <h1>Система расчет маршрута</h1>
        <p class="lead">Позволяет рассчитать расстояние и время между отделениями связи, с использованием динамической матрицы почтовых отделений. Реализована возможность вносить изменения в элементы матрицы, добавлять новые отделения связи, удалять закрывшиеся отделения связи.</p>
        <p class="lead">Генерирует маршрутные листы в виде Excel файлов.</p>
        <p class="lead"> <img src="./img/1.jpg" class="img-responsive center-block" alt="image"></p>
        <p><a class="btn btn-lg btn-success" href="<?php echo \Yii::$app->request->BaseUrl;?>?r=formationroute%2Fchoose">Войти</a></p>
        <?php //echo Url::toRoute(['site/index'], ['class' => 'btn btn-lg btn-success']); ?>
    </div>
  <!--  <div class="body-content">

        <div class="row">

        </div>

    </div>-->
</div>
