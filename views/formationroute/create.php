<?php
use yii\helpers\Html;
use \app\assets\AppCreate;
AppCreate::register($this);
?>
<img src="./img/285.gif" id="loading-indicator">
<h2 data-idcenter="<?=$postoffices['id'];?>">Маршрут <small>на <?=date("d-m-Y",strtotime($postoffices['dataroute']));?></small></h2>
<?= Html::beginForm(['formationroute/xxx',], 'post', ['id' => 'mainform' ]) ?>
<ul class="list-group">
    <li class="list-group-item">
        <div class="row transport">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h4>Вид транспорта</h4>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <label class="radio-inline">
            <input  type="radio" value="8|10" name="typestransport" required>Ведомственный транспорт
        </label>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-8 col-lg-10">
        <label class="radio-inline">
            <input type="radio" value="2|2" name="typestransport">Наемный транспорт
        </label>
        </div>
    </div>
    </li>
    <li class="list-group-item">
        <div class="row">
    <?php foreach ($postcenters as $office): ?>
               <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 checkbox amendment">
                      <?=Html::checkbox('pochta',false, ['label'=>$office->namepochta,'id' => $office->idcenterspost,'class' =>"pochta-input",'data-adress' => $office->adress]);?>
                      <?=Html::tag('span','',['id'=>'choicepochta'.$office->idcenterspost]) ;?>
                   <br />
                   <small><i><?=$office->adress;?></i></small>
               </div>
    <?php endforeach ;?>
    </div>
    </li>
    <li class="list-group-item">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <input type="time"  id="time-departure" value="05:55"  name="timedeparture">
                <label for="time-departure">Время выезда из гаража</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <input type="time"  id="time-sharing" value="00:10" name="timesharing">
                <label for="time-sharing">Время обмена</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <div class="btn-group">
                    <select class="form-control" name="placebreak" id="place-break" style="max-width: 190px">
                        <option value="-1">Место перерыва</option>
                    </select>
                </div>
                <span class="placebreak placebreak-hide">Место перерыва</span>

            </div>
        </div>

         <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <input type="time"  id="duration-break" name="durationbreak" value="00:20">
                <label for="duration-break">Продолжительность перерыва</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <input type="text"  id="route-name" name="routename" value="Первомайск" placeholder="Название маршрута">
            </div>
         </div>
    </li>
</ul>
    <?= Html::Button('Создать маршрут', ['id' =>'create-route','class' => 'btn btn-default submit']) ?>
    <?= Html::Button('Добавить новый маршрут', ['id' =>'add-new-route', 'class' => 'btn btn-primary btn-disable',]) ?>
    <?= Html::submitButton('Сформировать расписание', ['id' =>'shape-schedule', 'class' => 'btn btn-primary btn-disable',]) ?>
<?= Html::endForm() ?>

<div class="alert alert-info" style="margin-top: 20px;"></div>


