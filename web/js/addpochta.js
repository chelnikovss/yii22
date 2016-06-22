$(document).ready(function () {

    var allRouteMatrix = [];

    $('.matrx-form').hide();

    $('#addpocthacenter').click(function (e) {
        e.preventDefault();
        var pochta = {};
        var error = [];
        pochta.addpochta = $('#namepochtaid').val();
        if(pochta.addpochta.length<3)
            error.push("Введите название почтового отделения");

        pochta.adresid = $('#adresid').val();
        if(pochta.adresid.length<3)
            error.push("Введите адрес почтового отделения");

        pochta.numberpochta = $('#numberpochta').val();
        if(pochta.numberpochta == -1)
            error.push("Введите номер центра");

        if(error.length>0)
        {
            var message ='';
            for (var key in error)
            {
               message+=error[key]+" <br />"
            }
            var erModal = bootbox.alert({
                message: message,
                //callback: function() {}
            });
            erModal.find('.modal-content').css({'background-color':'#D69291','color':'#2B2323'});
            return;
        }


     var url = '?r=formationroute/addpochta';
        
        $.ajax({
            type: "POST",
            url: url,
            data: {pochta: pochta},
            success: function (data) {
                console.log("data = ", data);
                if(data)
                {
                    alert("Данные успешно добавленны в базу");
                    setTimeout(function(){location.reload();},1000);

                }
                else
                {
                    alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                    //location.reload();
                }

            },
            error:  function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }
        });
    });

    $('#matrx-getkey').click(function (e) {

        console.log("#matrx-getkey");

        var keyData = {};
        keyData.idCenter = $('#matrx-numberpochta').val();
        keyData.namePochta = $.trim($('#matrx-pochta').val());

        var url = '?r=formationroute/addpochta';

        $.ajax({
            type: "POST",
            url: url,
            data: {keyData: keyData},
            success: function (data) {
                //console.log("data = ", data);
                var data = JSON.parse(data);
                console.log("JSON.parse = ", data,'data.allOldPochta.length:', data.allOldPochta.length);

                if(data && data.allOldPochta.length>0 && data.newPochta!=null)
                {
                    alert("Ключ получен");
                    $('.matrx-form').show();

                    var newPochta = data['newPochta'];
                    var allOldPochta = data['allOldPochta'];
                    for(let i=0, len = allOldPochta.length;i<len;i++)
                    {
                        if( newPochta['idcenterspost']!= allOldPochta[i]['idcenterspost'])
                        {
                            $('#matrx-form').append('<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group"><input data-number='+i+' id='+allOldPochta[i]["idcenterspost"]+' type="number" placeholder="Введите расстояние"/>'+' '+newPochta["namepochta"]+' <span class="glyphicon glyphicon-resize-horizontal"></span> '+allOldPochta[i]["namepochta"]+'</div></div>');

                            let route = {};
                            route.distance = 0;
                            route.start = newPochta["namepochta"];
                            route.finish = allOldPochta[i]["namepochta"];
                            route.idcenter = allOldPochta[i]["id_center"];
                            route.idstart = newPochta['idcenterspost'];
                            route.idfinish = allOldPochta[i]['idcenterspost'];
                            allRouteMatrix.push(route)
                        }
                    }
                    console.log("before add distance allRouteMatrix:",allRouteMatrix);
                    //location.reload();
                }
                else
                {
                    if(data.allOldPochta.length>0 && data.newPochta == null)
                    {
                        alert("Введенного вами почтового отделения нет в базе");
                        return;
                    }
                    alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                    //location.reload();
                }
            },
            error:  function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }
        });
    });
    
    
    $('#matrx-addroute').click(function () {
        console.log("#matrx-addroute");
        $('input[type=number]').each(function (index, element) {
            if($(this).val() == undefined || $(this).val()<0 || $(this).val() == null || $(this).val().length < 1)
            {
                alert("Вы ввели не все расстояния")
                return false;
            }

            if(index == $(this).attr('data-number'))
            {
                allRouteMatrix[index].distance = $(this).val();
                console.log("$(this).val(): ",$(this).val());
            }
            
        });
        console.log("after add distance allRouteMatrix:",allRouteMatrix);

        var url = '?r=formationroute/addpochta';

        $.ajax({
            type: "POST",
            url: url,
            data: {allRouteMatrix:allRouteMatrix},
            success: function (data) {
                console.log("data = ", data);
                if(data)
                {
                    alert("Данные успешно добавленны в базу");
                    //setTimeout(function(){location.reload();},1000);

                }
                else
                {
                    alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                    //location.reload();
                }
            },
            error: function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }
        });



    })

});