<?php
/* @var $this yii\web\View */
$this->title = 'Система расчет маршрута';
?>
<div class="site-index">
    <div class="jumbotron">
        <h1>Система расчета маршрута</h1>
        <p class="lead"> <img src="./img/1.jpg" class="img-responsive center-block" alt="image"></p>
        <?php //echo Url::toRoute(['site/index'], ['class' => 'btn btn-lg btn-success']); ?>
    </div>
  <div class="body-content">
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4" >
                <p class="lead">Позволяет рассчитать расстояние и время между отделениями связи, с использованием динамической матрицы почтовых отделений. </p>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4" >
                <p class="lead">Реализована возможность вносить изменения в элементы матрицы (изменения  расстояний между почтовыми отделениями), добавлять новые отделения связи, удалять закрывшиеся отделения связи.</p>

            </div>
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4" >
                <p class="lead">Генерирует накладные, для маршрутных  листов, в виде Excel файлов.</p>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                <p style="text-align: center;"><a class="btn btn-lg btn-success" href="<?php echo \Yii::$app->request->BaseUrl;?>?r=formationroute%2Fchoose">Войти</a></p>
            </div>

        </div>
    </div>
</div>
