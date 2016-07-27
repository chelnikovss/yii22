<?php
use yii\helpers\Html;
use \app\assets\AppCreate;
AppCreate::register($this);
?>
<div class="body-content">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h2>Формирование маршрута</h2>
            <p class="lead">1) Для формирования маршрута перейдите на страницу формирования маршрута</p>
            <p class="lead">2) В поле 'дата' введите дату на которую нужно сформировать накладную (при запуске программа выводит текущую дату) </p>
            <p class="lead">3) Выберите почтовый центр, нажав на поле возле соответствующего центра (Луганск, Алчевск, Первомайск, Антрацит, Краснодон)</p>
            <p class="lead">4) Нажмите на кнопку 'Выбрать', после чего произойдет переход на следующую страницу формирования маршрута</p>
            <p class="lead">5) На страинице 'Маршрут' отобразяться все почтовые отделения, выберите в порядке следования почтовые отделения, выберите вид транспрота и место перерыва.</p>
            <p class="lead">6) После этого нажмите на кнопку 'Создать маршрут'</p>
            <p class="lead">7) Затем отобразиться предпросмотор выбранного маршрута (ниже кнопки 'Создать маршрут') и станут активными кнопки 'Добавить новый маршрут', 'Сформировать расписание'.</p>
            <p class="lead">8.1) Если нужно добавить новый маршрут для данного почтового центра - нажмите кнопку 'Добавить новый машрут' - и повторите последовательность действий из 5 и 6 пункта.</p>
            <p class="lead">8.2) Если же нужно получить сформированную накладную в виде Excel файла нажмите кнопку 'Сформировать расписание', после генерации файла, его можно загрузить на свой компьютер - нажав на кнопку 'Скачать файл'.</p>
        </div>
    </div>

</div>