<?php
use yii\helpers\Html;
$this->title = "Добавление данных";
$this->params['breadcrumbs'][] = $this->title;
use \app\assets\AppAdd;
AppAdd::register($this);
?>
<h2>Добавление данных</h2>
<div class="panel-group" id="accordion">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Добавить почтовое отделение</a>
            </h4>
        </div>
        <div id="collapse1" class="panel-collapse collapse in">
            <div class="panel-body">
                <?=Html::beginForm(['formationroute/add'],'post',['id'=>'addpochta'])?>
                <div class="form-group">
                    <label for="namepochtaid" class="label-width">Название почтового отделения:</label>
                    <?=Html::input('text','namepochta','',['id' =>'namepochtaid', 'class' =>'form-control','required'=>'']);?>
                </div>
                <div class="form-group">
                    <label for="adresid" class="label-width">Адрес почтового отделения:</label>
                    <?=Html::input('text','adress','',['id' =>'adresid','class' =>'form-control'])?>
                </div>
                <div class="form-group">
                    <label for="numberpochta">Номер центра:</label>
                    <select class="form-control" id="numberpochta">
                        <option value="-1">Выберите номер центр</option>
                        <option value="0">0 (Луганск)</option>
                        <option value="1">1 (Алчевск)</option>
                        <option value="2">2 (Первомайск)</option>
                        <option value="3">3 (Антрацит)</option>
                        <option value="4">4 (Краснодон)</option>
                    </select>
                </div>
                <button id="addpocthacenter" type="submit" class="btn btn-default">Добавить</button>
                <?=Html::endForm();?>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                    Добавить данные в матрицу расстояний</a>
            </h4>
        </div>
        <div id="collapse2" class="panel-collapse collapse">
            <div class="panel-body">
                <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <select class="form-control" id="matrx-numberpochta">
                                        <option value="-1">Выберите номер центр</option>
                                        <option value="0">0 (Луганск)</option>
                                        <option value="1">1 (Алчевск)</option>
                                        <option value="2">2 (Первомайск)</option>
                                        <option value="3">3 (Антрацит)</option>
                                        <option value="4">4 (Краснодон)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group ">
                                        <input type="text" class="form-control" id="matrx-pochta" placeholder="Введите название почтового отделения:">
                                    </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                <button id="matrx-getkey" type="button" class="btn btn-default btn-block" data-info="Узнать номер из таблицы `distancesmatrix`"><span class="glyphicon glyphicon-cloud-download"></span> Получить ключ</button>
                            </div>
                        </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <form class="matrx-form" role="form">
                            <div class="form-group">
                                    <div id="matrx-form"></div>
                            </div>
                            <button id="matrx-addroute" type="button" class="btn btn-default"><span class="glyphicon glyphicon-cloud-upload"> Добавить</button>
                        </form>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                    Удалить</a>
            </h4>
        </div>
        <div id="collapse3" class="panel-collapse collapse">
            <div class="panel-body">333</div>
        </div>
    </div>
</div>
</div>