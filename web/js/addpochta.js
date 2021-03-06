$(document).ready(function () {

    var
        allRouteMatrix = [],
        allPochtaOffice = [],
        allRouteMatrixChange = [];

    $('.matrx-form').hide();
    $('.matrx-formDel').hide();
    $('.matrx-formChange').hide();

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
                    reloadPage(500);

                }
                else
                {
                    alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                    reloadPage(500);
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
                    location.reload();
                }
            },
            error:  function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }
        });
    });

    $('#matrx-addroute').click(function () {
        console.log("#matrx-addroute");
        var flag = false;
        $('input[type=number]').each(function (index, element) {
            if($(this).val() == undefined || $(this).val()<0 || $(this).val() == null || $(this).val().length < 1)
            {
                alert("Вы ввели не все расстояния");
                flag = true;
                return false;
            }

            if(index == $(this).attr('data-number'))
            {
                allRouteMatrix[index].distance = $(this).val();
                console.log("$(this).val(): ",$(this).val());
            }
            
        });
        if(flag)
            return;

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
                    reloadPage(500);
                }
                else
                {
                    alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                    reloadPage(500);
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
        if(dataForDel.number == -1)
        {
            alert("Вы не ввели номер центра");
            return false;
        }
        $('#accordion').hide(500, function(){ $('#loading-indicator').show();});
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
            //console.log("data from server");
            allPochtaOffice = JSON.parse(data);
            //console.log('allPochtaOffice: ',allPochtaOffice);
            setTimeout(function(){
            console.log("handleData");
                 $('#loading-indicator').hide(500, function(){ $('#accordion').show(); });
            },1000);
            if(allPochtaOffice.length<1)
                return;

            $('.matrx-formDel').show();

            for(let i = 0, len = allPochtaOffice.length; i<len; i++)
            {
                $('#matrx-formDel').append('<tr><td><span class="badge">'+(i+1)+'</span></td><td>'+allPochtaOffice[i]['namecenter']+'</td><td>'+allPochtaOffice[i]['namepochta']+'</td><td><span id='+'delpochta'+allPochtaOffice[i]['idcenterspost']+' class="label btn-warning del-pochta" data-idcenter='+allPochtaOffice[i]['id_center']+' data-idcenterspost='+allPochtaOffice[i]['idcenterspost']+' data-namepochta='+allPochtaOffice[i]['namepochta']+' data-namecenter='+allPochtaOffice[i]['namecenter']+'>Удалить</span></td></tr>')
            }
        }
    })

    $(document).on('click','.del-pochta', function () {
        console.log(" del-pochta: ", this,this.id);
        var self = this;
        var idData = {};
        idData.id_center = $(this).attr('data-idcenter');
        idData.idcenterspost = $(this).attr('data-idcenterspost');
        var nameData = {};
        nameData.namepochta = $(this).attr('data-namepochta');
        nameData.namecenter = $(this).attr('data-namecenter');
        console.log("idData: ",idData);

        let message = '<h4>Вы действительно хотите удалить почтовое отделение?</h4>';
        message+='<strong>Почтовый центр:</strong> '+nameData.namecenter+'<br />'+'<strong>Название почтового отделения:</strong> '+nameData.namepochta;
        let erModal = bootbox.confirm({
            message: message,
            buttons:{
                'cancel': {
                    label: 'Отмена',
                    className: 'btn-default pull-left'
                },
                'confirm':{
                    label: 'Удалить',
                    className: 'btn-danger pull-right'
                }
            },
            callback: function(result) {
                if(!result)
                {
                    return;
                }
                else
                {
                    var url = '?r=formationroute/addpochta';
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: {idData: idData},
                        success: handleDataChange,
                        error: function () {
                            alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                        }
                    });
                }
            }
        });
        erModal.find('.modal-content').css({'background-color':'#D69291','color':'#2B2323'});
        function handleData(data){
            if(data||data.length>0)
            {
                alert("Почтовое отделение успешно удаленно !");
                reloadPage(500);
            }
            else
            {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                reloadPage(500);
            }

        };
        function handleDataChange(data){
            if(data||data.length>0)
            {
                alert("Почтовое отделение успешно удаленно !");
                $(self).css({'pointer-events':'none'});
                $(self).parent().parent().css({'opacity':'.25'}).attr({'data-toggle':'tooltip','data-placement':'top','title':'Почтовое отделение удалено !'});
            }
            else
            {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                reloadPage(500);
            }
        };
    })

    $('#matrx-seeforChange').click(function () {
        console.log("matrx-seeforChange");
        var dataForChange = {};
        dataForChange.number = $('#matrx-forChange').val();
        if(dataForChange.number == -1)
        {
            alert("Вы не ввели номер центра");
            return false;
        }
        $('#accordion').hide(500, function(){ $('#loading-indicator').show();});
        var url = '?r=formationroute/addpochta';
        $.ajax({
            type: "POST",
            url: url,
            data: {dataForChange:dataForChange},
            success: handleSeeMatrix,
            error: function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
            }
        });

        function handleSeeMatrix(data) {
            console.log("data from server");
            allPochtaOffice = JSON.parse(data);
            console.log('allPochtaOffice: ',allPochtaOffice);
            setTimeout(function(){
                console.log("handleData");
                $('#loading-indicator').hide(500, function(){ $('#accordion').show(); });
            },1000);

            $('.matrx-formChange').show();
            for(var i = 0 , len = allPochtaOffice.length; i<len; i++)
            {
                let  dataForChange = JSON.stringify(allPochtaOffice[i]);
                allRouteMatrixChange[allPochtaOffice[i].idistancesmatrix] = allPochtaOffice[i];
                $('#matrx-seeChange').append('<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="row row-eq-height "><div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"><span class="label label-warning pd-rg">'+(i+1)+'</span>'+allPochtaOffice[i].start+'<span class="glyphicon glyphicon-arrow-right pd-lf"></span></div><div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><button type="button" data-idmatrx='+allPochtaOffice[i].idistancesmatrix+' data-forchange='+dataForChange+' class="btn btn-link btnChanges">'+allPochtaOffice[i].distance+'</button></div><div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"><span class="glyphicon glyphicon-arrow-left pd-rg"></span>'+allPochtaOffice[i].finish+'</div></div></div>')
            }
        }
    });

    $(document).on('click','.btnChanges', function (e) {
        var $e = e.target;
        var id = $($e).data('idmatrx');
        var dataAll = allRouteMatrixChange[id];
        console.log("1 dataAll:",dataAll);

        var message ="<p><strong>Введите новое расстояние для матрицы между почтовыми отделениями </strong></p>";
        message+=dataAll.start+' и '+dataAll.finish+'<i> ( прежние растояние : '+dataAll.distance+' )</i>';
        var erModal = bootbox.prompt({
            title: message,
            value: dataAll.distance,
            buttons: {
                'cancel': {
                    label: 'Отмена',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'ОК',
                    className: 'btn-danger pull-right'
                }
            },
            callback: function(result)
            {
                if(result === null)
                {
                    console.log("Новое расстояние не введено !");
                }
                else
                {
                    console.log("result: ",result,"typeof:" ,typeof result);
                    result = Number($.trim(result));
                    if(!Number.isInteger(result))
                    {
                        alert("Ошибка при вводе расстояния! '"+result+"' Попробуйте еще раз или обратитесь к администратору.");
                        erModal.error();
                        return;
                    }
                    dataAll.distance = result;

                    var url = '?r=formationroute/addpochta';

                     $.ajax({
                     type: "POST",
                     url: url,
                     data: {dataDistChange: dataAll},
                     success: function (data) {

                     if(data > 0)
                     {
                         allRouteMatrixChange[id].distance = result;
                         console.log("Количестово затронутых строк:",data)
                         alert("Изменение расстояния произошло успешно");
                         $($e).parent().parent().css({'background-color':'rgba(148,222,149,.5)'});
                         $($e).html(result)
                     location.reload();
                     }
                     else
                     {
                        alert("Ошибка ! При изменении расстояния  произошла ошибка !" );
                        reloadPage(500);
                     }

                     },
                     error: function () {
                        alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ")
                        reloadPage(500);
                     }
                     });
                };
            }
        });
        erModal.find('.modal-content').css({'background-color':'#D69291','color':'#2B2323'});
    })

});