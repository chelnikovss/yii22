$(document).ready(function () {
    var map;
    var myLatlng = new google.maps.LatLng(48.578058, 39.302333);
    var title = "Почта ЛНР";
    var flagLoad = false;
    var coordinate = [];
    var allOffice = [];
    var departureOffice = [];
    var allDistanceTime = [];
    var calcTrackTime = {};

    function initialize() {

            var myOptions = {
                zoom:12,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
         map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        //var e = {map: map};


         placeMarker(myLatlng, title);
         google.maps.event.addListener (map, 'click', function (event) { placeMarker(event.latLng, title); });
     };

    function addMarker(location,title) {
        //console.log("location", location);
       var locationAdd = {};
       locationAdd.lat = Number(location.lat);
       locationAdd.lng = Number(location.lng);

        console.log("locationAdd",locationAdd);

        var marker = new google.maps.Marker({
            position: locationAdd,
            map: map,
            title: title
        });
        var infowindow = new google.maps.InfoWindow({ content: title });
        infowindow.open(map, marker);
    }

   /*add route on map*/
    function drawRouteBetweenMarker(officesCoord, callbackdrawroute) {
    //var officesCoord = officesCoord;
        console.log("function drawRouteBetweenMarker", "officesCoord",officesCoord);
        $body = $("body");
        $body.addClass("loading");

        //запоминаем времени пути (отправление)
        calcTrackTime.exitime = $('#departure').val();
        $('#indicator-draw').show(1000,function () {

            //Ограничение для google api 8 точек рисует, больше нет, только попарно ниже else
            //officesCoord.length количество офисов
            //officesCoord.length<1 временно
            if(officesCoord.length<1){
                console.log("officesCoord",officesCoord);
                var mapRoute = {map: map};
                var directionsDisplay = new google.maps.DirectionsRenderer(mapRoute);

                var start = officesCoord[0].lat+','+ officesCoord[0].lng;
                var end = officesCoord[officesCoord.length-1].lat+','+ officesCoord[officesCoord.length-1].lng;

                var wps = [];
                ///первый и последний офис не вносим только промежуточные точки
                for(var i=1; i<officesCoord.length-1; i++){
                    var point = new google.maps.LatLng(officesCoord[i].lat,officesCoord[i].lng);
                    //объект должен включать поле location для google api
                    wps.push({location:point});
                }

                var request = {
                    origin: start,
                    destination: end,
                    waypoints: wps,
                    //travelMode: google.maps.TravelMode.DRIVING
                    travelMode:google.maps.DirectionsTravelMode.DRIVING
                };
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(request,function (response, status) {
                    //console.log("directionsService.route");
                    if(status == google.maps.DirectionsStatus.OK){
                        //console.log("status == google.maps.DirectionsStatus.OK");
                        directionsDisplay.setDirections(response);
                        //directionsDisplay.setMap(map);
                    }
                    else{
                        console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status)
                    }
                })
            }
            else
            {
                //var paramSetTime = 0;
                //officesCoord.length-1 ==> интервал меньше на один чем отделений связи
                for(var i = 0, len = officesCoord.length-1; i<len; i++)
                {
                    //directionsService.route использует аякс запросы поэтому - замыкание
                    (function drawRoute (i) {
                        setTimeout(function () {
                            var j = i;
                            console.log("j", j);
                            let directionsDisplay;
                            let directionsService = new google.maps.DirectionsService();
                            let mapRoute = {map: map};
                            directionsDisplay = new google.maps.DirectionsRenderer(mapRoute);
                            let start = officesCoord[j].lat+','+ officesCoord[j].lng;
                            let end = officesCoord[j+1].lat+','+ officesCoord[j+1].lng;
                            let request = {
                                origin: start,
                                destination: end,
                                travelMode: google.maps.TravelMode.DRIVING
                            };
                            directionsService.route(request, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                    //officesCoord.length-2 ==> последний интервал
                                    if(callbackdrawroute && officesCoord.length-2 == i)
                                    {
                                        console.log("callbackdrawroute ========= i : ", i );
                                        var timeFlag = 500;
                                        if(officesCoord.length>10)
                                            timeFlag = 3000;
                                        setTimeout(function () {
                                            callbackdrawroute();
                                            $body.removeClass("loading");
                                            $('#indicator-draw').hide(500);
                                        }, timeFlag);
                                    }
                                }
                                else
                                {
                                    if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
                                    {
                                        //если превышен лимит запросов к google
                                        //рекурсивно вызываем через 250 мсек
                                        console.log("failed status: " + status, "j", j);
                                        setTimeout(drawRoute(j),500);
                                    }
                                    else
                                    {
                                        console.log("failed status: " + status);
                                    }
                                    //console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6));
                                }

                            })

                        },500);
                        //By using setTimeout() and calling it recursively, you're ensuring that all previous
                        //operations inside the timeout are complete before the next iteration of the code begins.

                    }(i));
                }
            }

        });



    }
    //http://stackoverflow.com/questions/7691762/how-to-add-a-callback-to-a-function-in-javascript
    function callbackdrawroute(){
        $('#calc').show(1000);
    }

    function placeMarker(location,title) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title
        });

        if(!flagLoad)
            {
                var contentString = '<div id="content">Главпочтамп ЛНР</div>';
            }
        else{
            var contentString = '<div id="content">'+location.lat()+"<br> "+location.lng()+'</div>';
            }
        var infowindow = new google.maps.InfoWindow({ content: contentString });

        infowindow.open(map, marker);

        if(flagLoad){
            console.log(location.lat()+" "+location.lng());
            //create dynamic array
            var local = {};
            local.lat = location.lat();
            local.lng = location.lng();
            coordinate.push(local);
            console.log(coordinate);
        }
        if(!flagLoad)
            flagLoad = true;
    }

    ////
    //window.addEventListener('load',function(){
    //     if(document.getElementById('map-canvas')){
    //         google.load("maps", "3",{
    //             callback:function(){
    //                 new google.maps.Map(document.getElementById('map-canvas'), {
    //                     center: new google.maps.LatLng(0,0),
    //                     zoom: 3
    //                 });
    //             }
    //         });
    //     }
    // },false);

    if(document.getElementById('map-canvas')){
        google.maps.event.addDomListener(window,'load',initialize);
    }

    //TODO:: jquery-ajax-submit-form
    $("#offices").submit(function (e) {
        e.preventDefault();
        console.log("submit Добавить точку");
        var url = '?r=site/main';
        $.ajax({
            type: "POST",
            url: url,
            //dataType: "json",
            data: $("#offices").serializeArray(),
            success: function (data) {
                var office = JSON.parse(data);
                addOfficeRoute(office);
            }
        });
    });
    
    function addOfficeRoute(office) {
        console.log("office:",office);
        //var timeUnix = Math.round(+new Date()/1000);
        var milliseconds = new Date().getTime();
        var input = $("<input type='time' id="+office.id+''+milliseconds+" data-id="+milliseconds+" value='00:05' min='00:00' max='23:59'/>");
        $( ".office-route").append(" "+office.indexmail+" > ").append(input);

        var addOffice = {};
        addOffice.lat = office.latlocation;
        addOffice.lng = office.lnglocation;
        addOffice.indexmail = office.indexmail;
        addOffice.addressDesc = office.addressDesc;
        addOffice.id = office.id;
        addOffice.idmilliseconds = office.id+''+milliseconds;
        console.log("addOffice.idmilliseconds:",addOffice.idmilliseconds);
        addOffice.milliseconds = milliseconds;
        allOffice.push(addOffice);

        addMarker(addOffice, office.indexmail);

        console.log("allOffice:",allOffice);
        $(".office-route").show();
        $(".res-dist").show();
    }
    
    /*distance count google api*/
    function distanceCount(start, finish , call) {
        (function (start, finish , call) {
            console.log("distanceCount");
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [start],
                    destinations: [finish],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                },
                callback);

            function callback(response, status) {
                if(status === google.maps.DistanceMatrixStatus.OK)
                {
                    //var origins = response.originAddresses; var destinations = response.destinationAddresses;
                    console.log("response:", response);
                    // console.log("response.rows[0].elements[0].distance.text:", response.rows[0].elements[0].distance.text);
                    var info = {};
                    info.distance = response.rows[0].elements[0].distance.value;
                    info.time = response.rows[0].elements[0].duration.value;
                    info.timetext = response.rows[0].elements[0].duration.text;
                    call(info);

                }
                else
                {
                    console.log('Error was: ' + status);
                }
            }
        }(start, finish , call))
    }

    $('#calc').click(function () {
        //временная заглушка
        if(allOffice.length<2) return;
        var sumDistance = 0,
            sumTime = 0;
        console.log("allOffice in distanceCount: ", allOffice);
        for(var i=0, j = allOffice.length - 1; i<j; i++)
        {
                (function (i) {
                    setTimeout(function () {
                        //формируем данные для гугла - без этого ошибка
                        var start = allOffice[i].lat+','+allOffice[i].lng;
                        var end = allOffice[i+1].lat+','+allOffice[i+1].lng;
                        console.log("start:",start, " end:", end);

                        distanceCount(start, end, function (info) {
                                console.log("distanceCount","i: ",i,"info.distance:",info.distance);
                                var distanceTime = {};
                                distanceTime.i = i;
                                distanceTime.distance = info.distance;
                                distanceTime.distancetime = info.time;
                                distanceTime.distancetimetext = info.timetext;
                                console.log("allOffice[i].id: ",allOffice[i].id, "$(allOffice[i].id).val()",$("#"+allOffice[i].id+"").val());
                                distanceTime.parkingTime = $("#"+allOffice[i].idmilliseconds+"").val();
                                console.log("info.time",info.time);
                                allDistanceTime.push(distanceTime);
                                console.log("allDistanceTime",allDistanceTime);
                                sumDistance += info.distance;
                                sumTime += info.time;
                                console.log("sumDistance:",sumDistance);
                                var timeFormat = secondsTimeSpanToHMS(sumTime);
                                var distanceFormat = sumDistance/1000;
                                $("#res").html(distanceFormat+" км");
                                $("#resTime").html(timeFormat+" Час:Мин:Сек");
                                //this data for save basedata
                                calcTrackTime.track = distanceFormat;
                                calcTrackTime.time = timeFormat;
                        });
                    },500);
                }(i))
        };



        //console.log("before sort allDistanceTime: ",allDistanceTime);
        //поэтому сортируем
        //allDistanceTime.sort(compareRoute);
        console.log("after sort allDistanceTime: ",allDistanceTime);
        $('.res-dist h2').show();
        $('.office-route').css({'color':'green','font-weight':'bold','font-size': '20px'});
        $('.route-add').show(1000);
    });

    $('#draw').click(function () {
         if(allOffice.length<2) return;
         drawRouteBetweenMarker(allOffice, callbackdrawroute);
    })

    $('#add-route').submit(function (e) {
        e.preventDefault();
        console.log("#add-route click","allOffice: ",allOffice,"calcTrackTime: ",calcTrackTime,"allDistanceTime: ",allDistanceTime);

        var indexMail = [];

        for(var i=0, j=allOffice.length; i<j; i++)
        {
            var index = {};
            index.indexmail = allOffice[i].indexmail;
            index.addressDesc = allOffice[i].addressDesc;
            indexMail.push(index);
        }

        console.log("indexMail: ",indexMail);

        var jsonIndexMail =  JSON.stringify(indexMail);
        console.log("before sort allDistanceTime: ",allDistanceTime);

        /*DistanceMatrixService аякс может вернуть массив не в порядке отправки
        поэтому сортируем*/
        allDistanceTime.sort(compareRoute);
        console.log("after sort allDistanceTime: ",allDistanceTime,"calcTrackTime.exitime:",calcTrackTime.exitime,"allDistanceTime:",allDistanceTime);
        addParametersrouteComingDeparture(calcTrackTime.exitime,allDistanceTime,allOffice);
        console.log("allDistanceTime:",allDistanceTime);
        var allDistanceTimeTemp =  JSON.stringify(allDistanceTime);
        console.log("JSON.stringify allDistanceTimeTemp: ",allDistanceTimeTemp,"jsonIndexMail: ",jsonIndexMail);

        calcTrackTime.routepost = jsonIndexMail;
        calcTrackTime.parametersroute = allDistanceTimeTemp;

        calcTrackTime.numberoute = $('#number').val();

        //calcTrackTime.exitime = $('#departure').val();

        console.log("calcTrackTime", calcTrackTime);

        var url = '?r=site/main';

        $.ajax({
            type: "POST",
            url: url,
            data: {calcTrackTime: calcTrackTime},
            success: function (data) {
        
                console.log("data ", data);
        
                if(data == false)
                    var message = 'Ошибка маршрут не добавлен !';
                else if(data == true)
                    var message = 'Маршрут добавлен !';
                else
                    var message = data;
        
                if(data==true)
                {
                    //http://bootboxjs.com/examples.html
                    //http://stackoverflow.com/questions/15246320/change-css-in-a-bootbox-window
                    var erModal = bootbox.alert({
                        message: message,
                        callback: function() {
                           // setTimeout(function () { location.reload(); },1000);
                        }
                    });
                    erModal.find('.modal-content').css({'background-color':'#dff0d8','color':'#3c763d'});
                    erModal.find('.btn-primary').removeClass("btn-primary").addClass("btn-success");
                }
                else
                {
                    var erModal = bootbox.alert({
                        message: message,
                        callback: function() {console.log("error bootbox.alert Callback");}
                    });
                    erModal.find('.modal-content').css({'background-color':'#f99'});
                    erModal.find('.btn-primary').removeClass("btn-primary").addClass("btn-danger");
                }
            }
        })
    });

    //////////////////////
    //// start click input
    //////////////////////
    function routeSelected() {
        this.routeInputId = [];
        this.checkItem = function (event) {
            this.event = event;
            console.log(this.event.target.id);
            console.log($(this.event.target).data('numberoute'));
            if(jQuery.inArray(this.event.target.id, this.routeInputId) == -1)
            {
                this.routeInputId.push(this.event.target.id);
            }
            console.log(this.routeInputId);
            //console.log(this.routeInputId);
        };
        this.getSelectedItems = function () {
            let checkInput = [];
            console.log("checkInput before check",checkInput,"#createXlsx click","routeInputId: ", this.routeInputId);
            for(let i = 0, j = this.routeInputId.length; i<j;i++)
            {
                if($("#"+this.routeInputId[i]+"").is(':checked'))
                {
                    checkInput.push(this.routeInputId[i]);
                }
            }
            console.log("checkInput after check",checkInput);
            return checkInput;
        };
    }

    var routeSel = new routeSelected();

    $("input.route-input ").click(function(event) {
        routeSel.checkItem(event);
    });
    //////////////////////
    //// end click input
    //////////////////////
    $('#createXlsx').click(function () {
        var checkInput = routeSel.getSelectedItems();
        if(checkChoice(checkInput))
        {
            return;
        }
        $('.content-list').hide(500);
        $('#loading-indicator').show(500);

        var url = '?r=route/ajax';
        $.ajax({
            type: "POST",
            url: url,
            //dataType: "json",
            data: {checkInput: checkInput},
            success: function (data) {
                //var office = JSON.parse(data);
                alert("Exsel файл сгенерирован")
                $('.content-list').show(500);
                $('#loading-indicator').hide(500);
            }
        });

    });
    $('#delroute').click(function () {
        console.log("delroute");
       
        var checkInput = routeSel.getSelectedItems();
        if(checkChoice(checkInput))
        {
            return;
        }
        console.log("checkInput:",  checkInput);
        checkInput = checkInput.sort(compareNumeric);
        console.log("checkInput sort:", checkInput);
        var message = "Вы действительно хотите удалить выбранный путь? <br>";
        for(let i=0, len = checkInput.length; i<len; i++)
        {
            let number = $('#'+checkInput[i]).attr('data-numberoute');
            console.log("Маршрут №: ",number)
            message+="Маршрут №: "+number+"<br />";
            console.log("message: ",message)
        }
        var erModal = bootbox.confirm({
            message: message,
            buttons: {
                'cancel': {
                    label: 'Отмена',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'Удалить',
                    className: 'btn-danger pull-right'
                }
            },
            callback: function(result) {
                if(result)
                {
                    console.log("ОК");
                    var url = '?r=route/ajax';

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: {checkRoute: checkInput},
                        success: function (data) {

                            if(data == true)
                            {
                                alert("Удаление из базы произошло успешно");
                                //location.reload();
                            }
                            else
                            {
                                alert("<strong>Ошибка ! </strong> При удалении маршрута произошла ошибка" );
                                //location.reload();
                            }

                        },
                        error: function () {
                            alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ")
                            //location.reload();
                        }
                    });
                }
                else
                {
                    console.log("Отмена");}
                }
        });
        erModal.find('.modal-content').css({'background-color':'#D69291','color':'#2B2323'});

    });
    var  t;
    $("#test").click(function () {

        // var  t = [
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск Остаря могила, 151",
        //         indexmail
        //             :
        //             "91004",
        //         lat
        //             :
        //             "48.526261",
        //         lng
        //             :
        //             "39.364185"},
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул.Артема, 183",
        //         indexmail
        //             :
        //             "91002",
        //         lat
        //             :
        //             "48.590532",
        //         lng
        //             :
        //             "39.306782"
        //     },
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Годуванцева, 6",
        //         indexmail
        //             :
        //             "91005",
        //         lat
        //             :
        //             "48.572829",
        //         lng
        //             :
        //             "39.338619"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул.Артема, 183",
        //         indexmail
        //             :
        //             "91002",
        //         lat
        //             :
        //             "48.590532",
        //         lng
        //             :
        //             "39.306782"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Годуванцева, 6",
        //         indexmail
        //             :
        //             "91005",
        //         lat
        //             :
        //             "48.572829",
        //         lng
        //             :
        //             "39.338619"},
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул. Героев Сталинграда, 9а",
        //         indexmail
        //             :
        //             "91006",
        //         lat
        //             :
        //             "48.541367",
        //         lng
        //             :
        //             "39.261759"
        //
        //     },
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул. Достаевского, 43",
        //         indexmail
        //             :
        //             "91007",
        //         lat
        //             :
        //             "48.546885",
        //         lng
        //             :
        //             "39.288017"
        //     },
        //     {addressDesc
        //         :
        //         "г. Луганск, ул.Артема, 183",
        //         indexmail
        //             :
        //             "91002",
        //         lat
        //             :
        //             "48.590532",
        //         lng
        //             :
        //             "39.306782"},
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск Остаря могила, 151",
        //         indexmail
        //             :
        //             "91004",
        //         lat
        //             :
        //             "48.526261",
        //         lng
        //             :
        //             "39.364185"
        //     },
        //     {
        //         addressDesc: "г. Луганск, ул. Годуванцева, 6",
        //         indexmail: "91005",
        //         lat: "48.572829",
        //         lng: "39.338619",
        //     },
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул. Героев Сталинграда, 9а",
        //         indexmail
        //             :
        //             "91006",
        //         lat
        //             :
        //             "48.541367",
        //         lng
        //             :
        //             "39.261759"
        //     },
        //     {addressDesc
        //         :
        //         "г. Луганск, ул.Артема, 183",
        //         indexmail
        //             :
        //             "91002",
        //         lat
        //             :
        //             "48.590532",
        //         lng
        //             :
        //             "39.306782"},
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул. Достаевского, 43",
        //         indexmail
        //             :
        //             "91007",
        //         lat
        //             :
        //             "48.546885",
        //         lng
        //             :
        //             "39.288017"
        //     },
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул. Годуванцева, 6",
        //         indexmail
        //             :
        //             "91005",
        //         lat
        //             :
        //             "48.572829",
        //         lng
        //             :
        //             "39.338619"
        //     },
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул.Артема, 183",
        //         indexmail
        //             :
        //             "91002",
        //         lat
        //             :
        //             "48.590532",
        //         lng
        //             :
        //             "39.306782"
        //     },
        //     {addressDesc
        //         :
        //         "г. Луганск Остаря могила, 151",
        //         indexmail
        //             :
        //             "91004",
        //         lat
        //             :
        //             "48.526261",
        //         lng
        //             :
        //             "39.364185"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Годуванцева, 6",
        //         indexmail
        //             :
        //             "91005",
        //         lat
        //             :
        //             "48.572829",
        //         lng
        //             :
        //             "39.338619"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Достаевского, 43",
        //         indexmail
        //             :
        //             "91007",
        //         lat
        //             :
        //             "48.546885",
        //         lng
        //             :
        //             "39.288017"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул.Артема, 183",
        //         indexmail
        //             :
        //             "91002",
        //         lat
        //             :
        //             "48.590532",
        //         lng
        //             :
        //             "39.306782"},
        //     {
        //         addressDesc: "г. Луганск Остаря могила, 151",
        //         indexmail: "91004",
        //         lat: "48.526261",
        //         lng: "39.364185"
        //     },
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Годуванцева, 6",
        //         indexmail
        //             :
        //             "91005",
        //         lat
        //             :
        //             "48.572829",
        //         lng
        //             :
        //             "39.338619"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Героев Сталинграда, 9а",
        //         indexmail
        //             :
        //             "91006",
        //         lat
        //             :
        //             "48.541367",
        //         lng
        //             :
        //             "39.261759"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Достаевского, 43",
        //         indexmail
        //             :
        //             "91007",
        //         lat
        //             :
        //             "48.546885",
        //         lng
        //             :
        //             "39.288017"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул.Артема, 183",
        //         indexmail
        //             :
        //             "91002",
        //         lat
        //             :
        //             "48.590532",
        //         lng
        //             :
        //             "39.306782"},
        //     {addressDesc
        //         :
        //         "г. Луганск Остаря могила, 151",
        //         indexmail
        //             :
        //             "91004",
        //         lat
        //             :
        //             "48.526261",
        //         lng
        //             :
        //             "39.364185"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Героев Сталинграда, 9а",
        //         indexmail
        //             :
        //             "91006",
        //         lat
        //             :
        //             "48.541367",
        //         lng
        //             :
        //             "39.261759"},
        //     {addressDesc
        //         :
        //         "г. Луганск, ул. Достаевского, 43",
        //         indexmail
        //             :
        //             "91007",
        //         lat
        //             :
        //             "48.546885",
        //         lng
        //             :
        //             "39.288017"},
        //     {
        //         addressDesc
        //             :
        //             "г. Луганск, ул. Годуванцева, 6",
        //         indexmail
        //             :
        //             "91005",
        //         lat
        //             :
        //             "48.572829",
        //         lng
        //             :
        //             "39.338619"
        //     }
        //
        // ];
        t = [
            {
                addressDesc
                    :
                    "г. Луганск Остаря могила, 151",
                indexmail
                    :
                    "91004",
                lat
                    :
                    "48.526261",
                lng
                    :
                    "39.364185"},
            {
                addressDesc
                    :
                    "г. Луганск, ул.Артема, 183",
                indexmail
                    :
                    "91002",
                lat
                    :
                    "48.590532",
                lng
                    :
                    "39.306782"
            },
            {addressDesc
                :
                "г. Луганск Остаря могила, 151",
                indexmail
                    :
                    "91004",
                lat
                    :
                    "48.526261",
                lng
                    :
                    "39.364185"},
            {addressDesc
                :
                "г. Луганск, ул. Годуванцева, 6",
                indexmail
                    :
                    "91005",
                lat
                    :
                    "48.572829",
                lng
                    :
                    "39.338619"},
            {addressDesc
                :
                "г. Луганск, ул.Артема, 183",
                indexmail
                    :
                    "91002",
                lat
                    :
                    "48.590532",
                lng
                    :
                    "39.306782"},
            {addressDesc
                :
                "г. Луганск, ул. Годуванцева, 6",
                indexmail
                    :
                    "91005",
                lat
                    :
                    "48.572829",
                lng
                    :
                    "39.338619"},
            {
                addressDesc
                    :
                    "г. Луганск, ул. Героев Сталинграда, 9а",
                indexmail
                    :
                    "91006",
                lat
                    :
                    "48.541367",
                lng
                    :
                    "39.261759"

            },
            {
                addressDesc
                    :
                    "г. Луганск, ул. Достаевского, 43",
                indexmail
                    :
                    "91007",
                lat
                    :
                    "48.546885",
                lng
                    :
                    "39.288017"
            },
            {addressDesc
                :
                "г. Луганск, ул.Артема, 183",
                indexmail
                    :
                    "91002",
                lat
                    :
                    "48.590532",
                lng
                    :
                    "39.306782"},
            {
                addressDesc
                    :
                    "г. Луганск Остаря могила, 151",
                indexmail
                    :
                    "91004",
                lat
                    :
                    "48.526261",
                lng
                    :
                    "39.364185"
            },
            {
                addressDesc: "г. Луганск, ул. Годуванцева, 6",
                indexmail: "91005",
                lat: "48.572829",
                lng: "39.338619",
            },
            {
                addressDesc
                    :
                    "г. Луганск, ул. Героев Сталинграда, 9а",
                indexmail
                    :
                    "91006",
                lat
                    :
                    "48.541367",
                lng
                    :
                    "39.261759"
            },
            {addressDesc
                :
                "г. Луганск, ул.Артема, 183",
                indexmail
                    :
                    "91002",
                lat
                    :
                    "48.590532",
                lng
                    :
                    "39.306782"},
            {
                addressDesc
                    :
                    "г. Луганск, ул. Достаевского, 43",
                indexmail
                    :
                    "91007",
                lat
                    :
                    "48.546885",
                lng
                    :
                    "39.288017"
            },
            {
                addressDesc
                    :
                    "г. Луганск, ул. Годуванцева, 6",
                indexmail
                    :
                    "91005",
                lat
                    :
                    "48.572829",
                lng
                    :
                    "39.338619"
            },
            {
                addressDesc
                    :
                    "г. Луганск, ул.Артема, 183",
                indexmail
                    :
                    "91002",
                lat
                    :
                    "48.590532",
                lng
                    :
                    "39.306782"
            },
            {addressDesc
                :
                "г. Луганск Остаря могила, 151",
                indexmail
                    :
                    "91004",
                lat
                    :
                    "48.526261",
                lng
                    :
                    "39.364185"},
            {addressDesc
                :
                "г. Луганск, ул. Годуванцева, 6",
                indexmail
                    :
                    "91005",
                lat
                    :
                    "48.572829",
                lng
                    :
                    "39.338619"},
            {addressDesc
                :
                "г. Луганск, ул. Достаевского, 43",
                indexmail
                    :
                    "91007",
                lat
                    :
                    "48.546885",
                lng
                    :
                    "39.288017"},
            {addressDesc
                :
                "г. Луганск, ул.Артема, 183",
                indexmail
                    :
                    "91002",
                lat
                    :
                    "48.590532",
                lng
                    :
                    "39.306782"},
            {
                addressDesc: "г. Луганск Остаря могила, 151",
                indexmail: "91004",
                lat: "48.526261",
                lng: "39.364185"
            },
            {addressDesc
                :
                "г. Луганск, ул. Годуванцева, 6",
                indexmail
                    :
                    "91005",
                lat
                    :
                    "48.572829",
                lng
                    :
                    "39.338619"},
            {addressDesc
                :
                "г. Луганск, ул. Героев Сталинграда, 9а",
                indexmail
                    :
                    "91006",
                lat
                    :
                    "48.541367",
                lng
                    :
                    "39.261759"},
            {addressDesc
                :
                "г. Луганск, ул. Достаевского, 43",
                indexmail
                    :
                    "91007",
                lat
                    :
                    "48.546885",
                lng
                    :
                    "39.288017"},
            {addressDesc
                :
                "г. Луганск, ул.Артема, 183",
                indexmail
                    :
                    "91002",
                lat
                    :
                    "48.590532",
                lng
                    :
                    "39.306782"},
            {addressDesc
                :
                "г. Луганск Остаря могила, 151",
                indexmail
                    :
                    "91004",
                lat
                    :
                    "48.526261",
                lng
                    :
                    "39.364185"},
            {addressDesc
                :
                "г. Луганск, ул. Героев Сталинграда, 9а",
                indexmail
                    :
                    "91006",
                lat
                    :
                    "48.541367",
                lng
                    :
                    "39.261759"},
            {addressDesc
                :
                "г. Луганск, ул. Достаевского, 43",
                indexmail
                    :
                    "91007",
                lat
                    :
                    "48.546885",
                lng
                    :
                    "39.288017"},
            {
                addressDesc
                    :
                    "г. Луганск, ул. Годуванцева, 6",
                indexmail
                    :
                    "91005",
                lat
                    :
                    "48.572829",
                lng
                    :
                    "39.338619"
            }

        ];
        allOffice = t;
        $(".office-route").show();
        $(".res-dist").show();
        $("#calc").show();

    });

});