$(document).ready(function () {

    var
        allRouteMatrix = [],
        allPochtaOffice = [];

    $('.matrx-form').hide();
    $('.matrx-formDel').hide();

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
                    setTimeout(function(){location.reload();},500);

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

    $('#matrx-getkey').click(function ()
    {
        console.log("#matrx-getkey");
        var keyData = {};
        keyData.idCenter = $('#matrx-numberpochta').val();
        keyData.namePochta = $.trim($('#matrx-pochta').val());
        if(keyData.idCenter == -1 || keyData.namePochta.length<2)
        {
            alert("Вы не ввели номер центра или почтовое отделение");
            return false;
        }
        var url = '?r=formationroute/addpochta';

        $.ajax({
            type: "POST",
            url: url,
            data: {keyData: keyData},
            success: function (data) {
                var data = JSON.parse(data);
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
                    setTimeout(function(){location.reload();},500);

                }
                else
                {
                    alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                    setTimeout(function(){location.reload();},500);
                }
            },
            error: function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }
        });



    })

    $('#matrx-seefordel').click(function () {
        console.log("#matrix-seefordel");
        var dataForDel = {};
        dataForDel.number = $('#matrx-numberfordel').val();
        console.log("dataForDel before server",dataForDel);
        if(dataForDel.number == -1)
        {
            alert("Вы не ввели номер центра");
            return false;
        }

        $('#accordion').hide(500, function(){ $('#loading-indicator').show(); console.log("show loading-indicator");});
        var url = '?r=formationroute/addpochta';
        $.ajax({
            type: "POST",
            url: url,
            data: {dataForDel: dataForDel},
            success: handleData,
            error: function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }
            
        });
            
        function handleData(data){
            console.log("data from server");
            allPochtaOffice = JSON.parse(data);
            console.log('allPochtaOffice: ',allPochtaOffice);
            //setTimeout(function(){
            console.log("handleData");
                 $('#loading-indicator').hide(500, function(){ $('#accordion').show(); });
            //},1000);
            if(allPochtaOffice.length<1)
                return;

            $('.matrx-formDel').show();


            for(let i = 0, len = allPochtaOffice.length; i<len; i++)
            {
                $('#matrx-formDel').append('<tr><td><span class="badge">'+(i+1)+'</span></td><td>'+allPochtaOffice[i]['namecenter']+'</td><td>'+allPochtaOffice[i]['namepochta']+'</td><td><span id='+'delpochta'+allPochtaOffice[i]['idcenterspost']+' class="label btn-warning del-pochta" data-idcenter='+allPochtaOffice[i]['id_center']+' data-idcenterspost='+allPochtaOffice[i]['idcenterspost']+'>Удалить</span></td></tr>')

            }
            
            
        }

        
    })

    $(document).on('click','.del-pochta', function () {
        console.log(" del-pochta: ", this,this.id);
        var idData = {};
        idData.id_center = $(this).attr('data-idcenter');
        idData.idcenterspost = $(this).attr('data-idcenterspost');
        console.log("idData: ",idData);

        var url = '?r=formationroute/addpochta';
        $.ajax({
            type: "POST",
            url: url,
            data: {idData: idData},
            success: handleData,
            error: function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }

        });

        function handleData(data){
            if(data||data.length>0)
            {
                alert("Почтовое отделение успешно удаленно !");
                setTimeout(function(){location.reload();},500);
            }
            else
            {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                setTimeout(function(){location.reload();},500);
            }

        };

    })

});