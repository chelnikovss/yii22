<?php
use yii\helpers\Html;
?>
<h2>Маршрут <small>на <?=date("d-m-Y",strtotime($postoffices['dataroute']));?></small></h2>
<?= Html::beginForm(['formationroute/xxx', ], 'post') ?>
<ul class="list-group">
    <li class="list-group-item">
        <div class="row transport">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h4>Вид транспорта</h4>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
        <label class="radio-inline">
            <input type="radio" value="8|10" name="typestransport">Ведомственный транспорт
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
                   <label>
                       <input type="checkbox" value=""><?=$office->namepochta;?>

                   </label>
                   <br />
                   <small><i><?=$office->adress;?></i></small>
<!--                   --><?php //echo Html::checkbox('name','false', ['label'=>'$office->namepochta','value'=>'']);?>
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
                <input type="time"  id="time-sharing" value="09:00" name="timesharing">
                <label for="time-sharing">Время обмена</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <div class="btn-group">
                    <select class="form-control" name="placebreak" id="place-break">
                        <option value="0">Место перерыва</option>
                        <option value="">11111111</option>
                        <option value="">22222222</option>
                        <option value="">3333333</option>
                    </select>
                </div>

            </div>
        </div>

         <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <input type="time"  id="duration-break" name="durationbreak" value="00:45">
                <label for="duration-break">Продолжительность перерыва</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 timetransport">
                <input type="text"  id="route-name" name="routename" value="" placeholder="Название маршрута">
            </div>
         </div>
    </li>
</ul>
    <?= Html::submitButton('Создать маршрут', ['class' => 'submit']) ?>
<?= Html::endForm() ?>

