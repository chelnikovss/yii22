<?php
use yii\helpers\Html;
use \app\assets\AppCreate;
AppCreate::register($this);
?>
<img src="./img/285.gif" id="loading-indicator">
<h2 id="topic-route" data-idcenter="<?=$postoffices['id'];?>" data-tdate="<?=$postoffices['dataroute'];?>">Маршрут <small>на <?=date("d-m-Y",strtotime($postoffices['dataroute']));?></small></h2>
<?= Html::beginForm(['formationroute/create'], 'post', ['id' => 'mainform' ]) ?>
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
                       <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 checkbox amendment">
                              <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 35px;">
                                      <?=Html::checkbox('pochta',false, ['label'=>$office->namepochta,'id' => $office->idcenterspost,'class' =>"pochta-input",'data-adress' => $office->adress]);?>
                                      <?=Html::tag('p','',['id'=>'choicepochta'.$office->idcenterspost]) ;?>
                                  </div>
                              </div>
                           <div class="row">
                               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <small><i><?=$office->adress;?></i></small>
                               </div>
                           </div>
                           <div class="row">
                               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <?= Html::input('time', 'timesharing', '00:05', ['id' =>'time-sharing'.$office->idcenterspost]) ?>
                               </div>
                           </div>
                           <div class="row">
                               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                   <span for="time-sharing<?=$office->idcenterspost;?>">Время обмена</span>
                               </div>
                           </div>
                       </div>
            <?php endforeach ;?>
    </div>
    </li>
    <li class="list-group-item">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 timetransport">
                <input type="time"  id="time-departure" value="05:55"  name="timedeparture">
                <label for="time-departure">Время выезда из гаража</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 timetransport">
               <!-- <input type="time"  id="time-sharing" value="00:10" name="timesharing">
                <label for="time-sharing">Время обмена</label>-->
                <input type="text"  id="route-name" name="routename" value="<?=$postoffices['nameoffices'];?>" placeholder="Название маршрута">
                <label for="route-name">Название маршрута</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 timetransport">
                <input type="time"  id="duration-break" name="durationbreak" value="00:20">
                <label for="duration-break">Продолжительность перерыва</label>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 timetransport">
                <div class="btn-group">
                    <select class="form-control" name="placebreak" id="place-break" style="max-width: 190px">
                        <option value="-1">Место перерыва</option>
                    </select>
                </div>
                <span class="placebreak placebreak-hide">Место перерыва</span>
            </div>

        </div>
        <div class="row">
            <div class="col-xs-10 col-sm-10 col-md-11 col-lg-11 timetransport settling">
                <input type="time"  class="settling-time" name="durationbreak" value="00:00">
                <label for="settling-time">Время отстоя</label>
                <div class="btn-group">
                    <select class="form-control place-settling" name="placesettling" style="max-width: 190px">
                        <option value="-1">Место отстоя</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-1 col-lg-1 timetransport">
                <button id="settling-btn" type="button" class="btn btn-default btn-sm" >
                    <span class="glyphicon glyphicon-plus" data-toggle="tooltip" title="Добавить поле для времени отстоя!"></span>
                </button>
            </div>
        </div>
    </li>
</ul>
    <?= Html::Button('Создать маршрут', ['id' =>'create-route','class' => 'btn btn-default submit']) ?>
    <?= Html::Button('Добавить новый маршрут', ['id' =>'add-new-route', 'class' => 'btn btn-primary btn-disable',]) ?>
    <?= Html::submitButton('Сформировать расписание', ['id' =>'shape-schedule', 'class' => 'btn btn-primary btn-disable',]) ?>
<?= Html::endForm();?>

<div class="alert alert-info" style="margin-top: 20px;"></div>


