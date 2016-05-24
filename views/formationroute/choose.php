<?php
use yii\helpers\Html;
$this->title = "Формирование маршрута";
$this->params['breadcrumbs'][] = $this->title;
?>
<h2>Формирование маршрута</h2>
<?= Html::beginForm(['formationroute/create', ], 'post') ?>
        <div class="form-group">
        <label for="data">Дата</label>
        <input id="data" type="date" name="dataroute" required>
        <p class="help-block">Введите дату выполнения маршрута</p>
        </div>
        <div class="form-group">
            <?php foreach($postoffices as $key=>$post): ?>
                <div class="radio">
                        <?php
                        if($key == 0):
                            echo Html::radio('optradio',true, ['label'=>$post['nameoffices'],'id'=>$post['idoffices'],'value'=>$post['nameoffices']]);
                        else:
                            echo Html::radio('optradio',false, ['label'=>$post['nameoffices'],'id'=>$post['idoffices'],'value'=>$post['nameoffices']]);
                        endif;
                        ?>
                </div>
            <?php endforeach;?>
        </div>
    <?= Html::submitButton('Выбрать', ['class' => 'submit']) ?>
<?= Html::endForm() ?>