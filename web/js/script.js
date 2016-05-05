$(document).ready(function () {
    var map;

    var myLatlng = new google.maps.LatLng(48.578058, 39.302333);
    var title = "Почта ЛНР";

    var flagLoad = false;

    var coordinate = [];
    var allOffice = [];
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

    //add route on map
    function drawRouteBetweenMarker(officesCoord, callbackdrawroute) {
    //var officesCoord = officesCoord;

        console.log("function drawRouteBetweenMarker", "officesCoord",officesCoord);

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
            let drawRoute = function (i) {
                var j = i;
                setTimeout(function () {
                    //для задержки запросов
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
                                callbackdrawroute();
                            }

                            // directionsDisplay.setMap(map);
                        } else {
                            if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
                            {
                                //если превышен лимит запросов к google
                                //рекурсивно вызываем через 250 мсек
                                console.log("failed status: " + status, "j", j);
                                setTimeout(function () {
                                    drawRoute(j);
                                },250)
                            }
                            else {
                                console.log("failed status: " + status);
                            }
                            //console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6));
                        }
                    })
                    //By using setTimeout() and calling it recursively, you're ensuring that all previous
                    //operations inside the timeout are complete before the next iteration of the code begins.
                    },250);
            }
            //officesCoord.length-1 ==> интервал меньше на один чем отделений связи
            for(let i = 0, len = officesCoord.length-1; i<len; i++)
            {
                //directionsService.route использует аякс запросы поэтому - замыкание
                drawRoute(i);
            }
        }
    }
    //http://stackoverflow.com/questions/7691762/how-to-add-a-callback-to-a-function-in-javascript
    function callbackdrawroute(){
        //alert("dfdfd");
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
        e.preventDefault();
    });
    
    function addOfficeRoute(office) {
        console.log("office:",office);
        $( ".office-route" ).append( office.indexmail+" >> " );

        var addOffice = {};
        addOffice.lat = office.latlocation;
        addOffice.lng = office.lnglocation;
        addOffice.indexmail = office.indexmail;
        addOffice.addressDesc = office.addressDesc;
        allOffice.push(addOffice);

        addMarker(addOffice, office.indexmail);

        console.log("allOffice:",allOffice);
        $(".office-route").show();
        $(".res-dist").show();
    }
    
    //distance count google api
    function distanceCount(start, finish , call) {
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
                if(status != google.maps.DistanceMatrixStatus.OK)
                {
                    console.log('Error was: ' + status);
                }
                else
                {
                    //var origins = response.originAddresses; var destinations = response.destinationAddresses;
                    console.log("response:", response);
                    // console.log("response.rows[0].elements[0].distance.text:", response.rows[0].elements[0].distance.text);
                    var info = {};
                    info.distance = response.rows[0].elements[0].distance.value;
                    info.time = response.rows[0].elements[0].duration.value;
                    call(info);
                }
        }
    }

    $('#calc').click(function () {
        //временная заглушка
        if(allOffice.length<2) return;

        var sumDistance = 0,
            sumTime = 0;
        console.log("allOffice in distanceCount: ", allOffice);
        for(var i=0, j = allOffice.length - 1; i<j; i++)
        {
            //формируем данные для гугла - без этого ошибка
            var start = allOffice[i].lat+','+allOffice[i].lng;
            var end = allOffice[i+1].lat+','+allOffice[i+1].lng;
            console.log("start:",start, " end:", end);
            distanceCount(start, end, function (info) {
                console.log("distanceCount");
                console.log("info.distance:",info.distance);

                var distanceTime = {};
                distanceTime.distance = info.distance;
                distanceTime.parkingTime = "0:05";
                allDistanceTime.push(distanceTime);

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
        }

        $('.res-dist h2').show();
        $('.office-route').css({'color':'green','font-weight':'bold','font-size': '20px'});
        $('.route-add').show(1000);

    });
    $('#draw').click(function () {
        if(allOffice.length<2) return;
        drawRouteBetweenMarker(allOffice, callbackdrawroute);

    })

    $('#add-route').submit(function (e) {

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
        var allDistanceTimeTemp =  JSON.stringify(allDistanceTime);
        console.log("JSON.stringify allDistanceTimeTemp: ",allDistanceTimeTemp,"jsonIndexMail: ",jsonIndexMail);

        calcTrackTime.routepost = jsonIndexMail;
        calcTrackTime.parametersroute = allDistanceTimeTemp;

        calcTrackTime.numberoute = $('#number').val();

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

        e.preventDefault();

    });

    //////////////////////
    //// start click input
    //////////
    var routeInputId = [];
    $("input.route-input ").click(function(event) {
        //console.log(event.target.id);
        if(jQuery.inArray(event.target.id, routeInputId) == -1)
        {
            routeInputId.push(event.target.id);
        }
    });
    $('#createXlsx').click(function () {
        $('.content-list').hide(500);
        $('#loading-indicator').show(500);

        let checkInput = [];
        console.log("checkInput before check",checkInput,"#createXlsx click","routeInputId: ", routeInputId);
        for(let i = 0, j = routeInputId.length; i<j;i++)
        {
            if($("#"+routeInputId[i]+"").is(':checked'))
            {
                checkInput.push(routeInputId[i]);
            }
        }
        console.log("checkInput after check",checkInput);
        var url = '?r=route/gtroutes';
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
    //////////////////////
    //// end click input
    //////////
});