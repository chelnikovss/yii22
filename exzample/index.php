<?php header('Content-Type: text/html; charset=utf-8'); ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="./js/jquery-2.2.3.min.js"></script>
<!--    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyC2URhf2NqG8Sj_ek-Q2LY3zheCXvtPhm0&callback=initMap"></script>-->
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyC2URhf2NqG8Sj_ek-Q2LY3zheCXvtPhm0"></script>
    <script type="text/javascript" src="./js/function.js"></script>
    <script type="text/javascript" src="./js/script.js"></script>
    <meta charset="UTF-8">
    <title>googleMap</title>
</head>
<body>
<div class="layout">
    <div class="map-content">
        <div class="map-content_title">Расчет маршрута</div>
        <div id="map-canvas" class="map"></div>
    </div>
    <div class="content">
        <div class="route-calc">
            <div>Маршрут</div>
            <div class="list-post-Offices">
                <form id="offices" method="post">
                    <select name="officesPost">
                        <option selected disabled>Выберите отделение почты</option>
                        <optgroup label="Луганск">
                            <option value="2|lugansk">Луганск 2 91002</option>
                            <option value="3|lugansk">Луганск 4 91004</option>
                            <option value="4|lugansk">Луганск 5 91005</option>
                            <option value="5|lugansk">Луганск 6 91006</option>
                            <option value="6|lugansk">Луганск 7 91007</option>
                        </optgroup>
                    </select>
                    <input type="submit" value="Добавить точку к маршруту">
                </form>
            </div>
            <div class="office-route">
                <div class="office-route_title">Маршрут по выбранным почтовым отделениям </div>
            </div>
            <div class="res-dist">
                <h2>Результат</h2>
                <p id="res"></p>
                <p id="resTime"></p>
                <button id="calc" type="button" >Рассчитать</button>
            </div>
    </div>
        <div class="route-add">
            <form id="add-route" action="">
            <label for="number">Номер маршрута
                <input id="number" type="number" min="1" max="201" required/>
            </label>
                <input type="submit" value="Запомнить маршрут" />
            </form>
        </div>
    </div>
</div>

</body>
</html>

