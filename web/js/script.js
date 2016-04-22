$(document).ready(function () {
    var map;

    var myLatlng = new google.maps.LatLng(48.578058, 39.302333);
    var title = "Почта ЛНР";

    var flagLoad = false;

    var coordinate = [];
    var allOffice = [];
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
    function drawRouteBetweenMarker(officesCoord) {

        //Ограничение для google api 8 точек рисует, больше нет, только попарно ниже else
        if(officesCoord.length<1){
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
            for(var i=0; i<officesCoord.length-1; i++)
            {
                //directionsService.route использует аякс запросы поэтому - замыкание
                (function (i) {

                var directionsDisplay;
                var directionsService = new google.maps.DirectionsService();
                var mapRoute = {map: map};

                directionsDisplay = new google.maps.DirectionsRenderer(mapRoute);

                var start = officesCoord[i].lat+','+ officesCoord[i].lng;
                var end = officesCoord[i+1].lat+','+ officesCoord[i+1].lng;

                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            // directionsDisplay.setMap(map);
                        } else {
                            console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status)
                        }
                    })
                })(i);

            }
        }
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
    google.maps.event.addDomListener(window,'load',initialize);

    //TODO:: jquery-ajax-submit-form
    $("#offices").submit(function (e) {

        //var userId = '<?php $userid? >';
        //var url = '<?php echo \Yii::$app->getUrlManager()->createUrl(controllers/LuganskController'+') ?>';
        //var form = $(this);
        //var url = form.attr('Coord');
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
        $( ".office-route" ).append( office.indexmail+"<br>" );

        var addOffice = {};
        addOffice.lat = office.latlocation;
        addOffice.lng = office.lnglocation;
        addOffice.indexmail = office.indexmail;
        allOffice.push(addOffice);

        addMarker(addOffice, office.indexmail);

        console.log("allOffice:",allOffice)
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
        for(var i=0; i<allOffice.length - 1;i++)
        {
            //формируем данные для гугла - без этого ошибка
            var start = allOffice[i].lat+','+allOffice[i].lng;
            var end = allOffice[i+1].lat+','+allOffice[i+1].lng;
            console.log("start:",start, " end:", end);
            distanceCount(start, end, function (info) {
                console.log("distanceCount");
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
        drawRouteBetweenMarker(allOffice);
        $('.res-dist h2').show();
        $('.office-route').css({'color':'green','font-weight':'bold','font-size': '30px'});
    });

    $('#add-route').submit(function (e) {

        console.log("#add-route click","allOffice: ",allOffice,"calcTrackTime: ",calcTrackTime);

        var indexMail = [];

        for(var i=0, j=allOffice.length; i<j; i++)
        {
            var index = {};
            index.indexmail = allOffice[i].indexmail;
            indexMail.push(index);
        }
        console.log("indexMail: ",indexMail);

        var jsonIndexMail =  JSON.stringify(indexMail);

        console.log("jsonIndexMail: ",jsonIndexMail);

        calcTrackTime.routepost = jsonIndexMail;

        calcTrackTime.numberoute = $('#number').val();

        console.log("calcTrackTime", calcTrackTime);

        var url = '?r=site/main';

        $.ajax({
            type: "POST",
            url: url,
            data: {calcTrackTime: calcTrackTime},
            success: function (data) {
                console.log("data ", data);
                if(data==true){
                    alert("Маршрут добавлен ")
                }
                else{
                    alert("Ошибка ")
                }
            }
        })

        e.preventDefault();

    });

});