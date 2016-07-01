<?php
use yii\helpers\Html;
$this->title = "Формирование маршрута";
$this->params['breadcrumbs'][] = $this->title;

?>
<h2>Формирование маршрута</h2>
<?= Html::beginForm(['formationroute/create', ], 'post') ?>
        <div class="form-group">
        <label for="data">Дата</label>
        <input id="data" type="date" name="dataroute" value="<?php echo date("Y-m-d");?>" required/>
        <p class="help-block">Введите дату выполнения маршрута</p>
        </div>
        <div class="form-group">
            <?php foreach($postoffices as $key=>$post): ?>
                <div class="radio">
                        <?php
                        if($key == 2):
                            echo Html::radio('optradio',true, ['label'=>$post['nameoffices'],'id'=>$post['idcenter'],'value'=>$post['nameoffices'].'|'.$post['idcenter']]);
                        else:
                            echo Html::radio('optradio',false, ['label'=>$post['nameoffices'],'id'=>$post['idcenter'],'value'=>$post['nameoffices'].'|'.$post['idcenter']]);
                        endif;
                        ?>
                </div>
            <?php endforeach;?>
        </div>
    <?= Html::submitButton('Выбрать', ['class' => 'submit']) ?>
<?= Html::endForm() ?>