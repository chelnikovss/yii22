$(document).ready(function () {
    var
        routeAll = [],
        flagReturn = [],
        clickToogle = 0,
        count = 0,
        pochtaSel = new PochtaSelected(),
        idSelectCheckbox;
    console.log("start script routecreation.js");
    $('input:checkbox').each(function (indx, element) {
        var checkLoadText = $(element).parent('label').text();
        checkLoadText = $.trim(checkLoadText);
        console.log(checkLoadText);
        if (checkLoadText == 'Луганск ЦОПП') {
            console.log('element', element, 'elementId', element.id);
            $(element).prop({'checked': 'true', 'disabled': 'true'});
            pochtaSel.checkItem(element, 0);
            idSelectCheckbox = pochtaSel.getSelectedItems(element);
            return false;
        }
   });
    /*
     *
     * выбор почтовых отделений
     *
     */
    function PochtaSelected() {
        count = 0;
        this.routeInputId = [];
        this.checkItem = function (event, flag = 1) {
            var id;
            this.data = event;
            if (flag)
                id = this.data.target.id;
            else
                id = event.id;
            console.log("id:", id);
            var $id = $('#' + id);
            //let text = $id.parent('label').text();
            //text = $.trim(text);

            if ($id.prop("checked")) {
                count++;
                this.addPlaceBreak(id);
                //if(text == 'Луганск Центральная касса'){
                if ($id.attr('data-count')) {
                    let countOld = $id.attr('data-count');
                    countOld += "|" + count;
                    $id.attr('data-count', countOld);
                }
                else {
                    $id.attr('data-count', count);
                }
                // }else {$('#'+id).attr('data-count', count);}
                if (count > 1)
                    $('.amendment').removeClass('typestransport');
            }
            else {
                //на одном отделении можно ставить несколько галочек
                //первоначально только на Луганской центральной кассе
                this.deletePlaceBreak(id);
                console.log("Ничего не делаем - несколько галочек");
                return;
                //выходим если снимаем отметку с Луганской центральной кассы
                //if(text == 'Луганск Центральная касса')
                //{
                //console.log("Ничего не делаем", text);
                //return;
                //}

                /* let countStart = $('#'+id).attr('data-count');
                 $('#choicepochta'+id).text('');
                 $(':checkbox').each(
                 function () {
                 if($(this).prop("checked"))
                 {
                 console.log("this.id",this.id);
                 let str = $('#'+this.id).attr('data-count');
                 if(str.indexOf('|')==-1)
                 {
                 if($('#'+this.id).attr('data-count')>countStart)
                 {
                 let countOld = $('#'+this.id).attr('data-count');
                 console.log("countOld",countOld);
                 countOld -=1;
                 $('#'+this.id).attr('data-count',countOld);
                 $('#choicepochta'+this.id).text(' № '+countOld)
                 console.log("this.id",this.id,"countOld",countOld);
                 }
                 }
                 else
                 {
                 let countOld = $('#'+this.id).attr('data-count');
                 let countOldArr  = new Array();
                 countOldArr = countOld.split("|");
                 for (let i in countOldArr)
                 {
                 if(countOldArr[i]>countStart)
                 {
                 console.log("countOldArr[i]",countOldArr[i]);
                 countOldArr[i]-=1;
                 }
                 }
                 console.log("countOldArr",countOldArr);
                 let countNew = countOldArr.join("|");
                 $('#'+this.id).attr('data-count',countNew);
                 $('#choicepochta'+this.id).text(' № '+countNew);

                 }
                 }
                 }
                 )
                 count--;
                 if(count<2)
                 $('.amendment').addClass('typestransport');*/
            }
            //если в массиве нет id добавляем
            if (jQuery.inArray(id, this.routeInputId) == -1) {
                this.routeInputId.push(id);
            }
            console.log(this.routeInputId);
            this.seeChoice(id);
        };
        this.getSelectedItems = function () {
            let checkInput = [];
            console.log("checkInput before check", checkInput, "#createXlsx click", "routeInputId: ", this.routeInputId);
            for (let i = 0, j = this.routeInputId.length; i < j; i++) {
                if ($("#" + this.routeInputId[i] + "").is(':checked')) {
                    checkInput.push(this.routeInputId[i]);
                }
            }
            console.log("checkInput after check", checkInput);
            if (checkInput.length > 2) {
                console.log("checkInput.length", checkInput.length);
                $('.row .typestransport').removeClass('typestransport');
            }
            return checkInput;
        };
        this.seeChoice = function (id) {
            var $id = $('#' + id);
            let text = $id.parent('label').text();
            text = $.trim(text);
            console.log("seeChoice .text:", text);
            if ($id.prop("checked")) {
                /*if(text == 'Луганск Центральная касса')
                 {
                 console.log("== Луганск Центральная касса", text);
                 $('#choicepochta'+id).append(' <span class="glyphicon glyphicon-ok">№'+count+'</span>').addClass("seeSelect");
                 }
                 else
                 {
                 $('#choicepochta'+id).append('<span class="glyphicon glyphicon-ok">№'+count+'</span>').addClass("seeSelect");
                 }*/
                $('#choicepochta' + id).append('<span class="glyphicon glyphicon-ok">№' + count + '</span>').addClass("seeSelect");
                $('#' + id).parent('label').addClass('chosen-status');
            }
            console.log('choicepochta .id', 'choicepochta' + id)
        };
        this.addPlaceBreak = function (id) {
            let text = $('#' + id).parent('label').text();
            text = $.trim(text);
            console.log("this.text:", text);
            $('#place-break').append($('<option>', {
                value: id,
                text: "" + text + ""
            }));
            $('.place-settling').append($('<option>', {
                value: id,
                text: "" + text + ""
            }));
        };
        this.deletePlaceBreak = function (id) {
            $('#' + id).parent('label').removeClass('chosen-status');
            $("#place-break").find('[value=' + id + ']').remove();
        }
    }

    $("input.pochta-input").click(function (event) {
        console.log("click,input.pochta-input", "event", event);
        pochtaSel.checkItem(event);
        idSelectCheckbox = pochtaSel.getSelectedItems(event);

    });

    $("#create-route").click(function () {
        console.log("#create-routes");
        if (clickToogle == 1) {
            $('body').addClass('typestransport');
            alert("Вы должны нажать кнопку 'Добавить новый маршрут', после чего 'Создать маршрут' ");
            $('body').removeClass('typestransport');
            return;
        }

        flagReturn = [];
        if (!$('input[name="typestransport"]').is(":checked")) {
            $('.transport').addClass('typestransport');
            $("html, body").animate({scrollTop: 0}, "slow");
            return;
        }
        else {
            $('.transport').removeClass('typestransport');
        }
        var $inputChecked = $('input[type=checkbox]:checked');
        console.log("$('input[type=checkbox]:checked').length: ", $inputChecked.length);

        if ($inputChecked.length < 2) {
            $('input[type=checkbox]').each(function () {
                if (!$(this).is(':checked')) {
                    $(this).parent().parent().addClass('typestransport');
                }
            });
            $("html, body").animate({scrollTop: 0}, "slow");
            flagReturn.push(1);
        }
        if ($inputChecked.length > 1) {
            $('.amendment').removeClass('typestransport');
        }

        if ($('#place-break').val() == -1) {
            $('#place-break').addClass('typestransport');
            flagReturn.push(1);
            $("html, body").animate({scrollTop: $(window).scrollTop() - 100}, "slow");
        }
        else {
            $('#place-break').removeClass('typestransport');
            $('.placebreak').removeClass('placebreak-hide');

        }
        var $idTimeDeparture = $('#time-departure');
        console.log("#time-departure.length:", ($idTimeDeparture.val()).length);

        if (($idTimeDeparture.val()).length == 0) {
            $idTimeDeparture.addClass('typestransport');
            flagReturn.push(1);
        }
        /* if(($('#time-sharing').val()).length == 0)
         {
         $('#time-sharing').addClass('typestransport');
         flagReturn.push(1);
         }*/
        if (($idTimeDeparture.val()).length == 0) {
            $('#duration-break').addClass('typestransport');
            flagReturn.push(1);
        }
        console.log("flag:", flagReturn);

        if (flagReturn.length != 0)
            return;

        //start get data from form
        var addPochta = {};
        //get data radio button
        addPochta.typeStransport = $('input[name=typestransport]:checked').val();
        let typeStransportNameTemp = $('input[name=typestransport]:checked').parent().text();
        typeStransportNameTemp = $.trim(typeStransportNameTemp);
        addPochta.typeStransportName = typeStransportNameTemp;
        addPochta.date = $('h2').attr('data-tdate');
        addPochta.arrPochta = [];
        for (let i = 0, len = idSelectCheckbox.length; i < len; i++) {
            let Pochta = {};
            var $id = $('#' + idSelectCheckbox[i]);
            Pochta.idpochta = idSelectCheckbox[i];
            console.log("$id = ", $id, "id.data('count') = ", $id.data('count'), "id.attr('data-count') = ", $id.attr('data-count'));
            let name = $id.parent('label').text();
            name = $.trim(name);
            Pochta.name = name;
            Pochta.timeSharingLocal = $('#time-sharing' + idSelectCheckbox[i]).val();
            //номер для Луганской Центральной кассы
            var oldI = i;
            console.log("Pochta.timeSharingLocal = ", Pochta.timeSharingLocal);
            Pochta.idcenter = $('h2').attr('data-idcenter');
            Pochta.adress = $id.data('adress');
            Pochta.serialnumber = $id.attr('data-count');
            if (Pochta.serialnumber.indexOf('|') == -1) {
                (addPochta.arrPochta).push(Pochta);
            }
            else {
                //если несколько раз кликнули, разбираем -  по Луганску Центральнаю кассу
                var arrSeriarNumber = (Pochta.serialnumber).split('|');
                console.log("arrSeriarNumber: ", arrSeriarNumber);
                for (let i = 0, len = arrSeriarNumber.length; i < len; i++) {
                    //без этой переменной перекрываеться let Pochta = {};
                    let tempPochta = {};
                    tempPochta.idpochta = Pochta.idpochta;
                    tempPochta.name = Pochta.name;
                    tempPochta.idcenter = Pochta.idcenter;
                    tempPochta.adress = Pochta.adress;
                    tempPochta.serialnumber = arrSeriarNumber[i];
                    //время обмена одно для всех выбранных Луганских Центральных Касс
                    tempPochta.timeSharingLocal = $('#time-sharing' + idSelectCheckbox[oldI]).val();
                    tempPochta.i = i;
                    console.log("i:", i, "arrSeriarNumber[i]: ", arrSeriarNumber[i]);
                    console.log("Pochta: ", tempPochta, "addPochta.arrPochta: ", addPochta.arrPochta);
                    (addPochta.arrPochta).push(tempPochta);
                }
            }
        }
        addPochta.timeDeparture = $idTimeDeparture.val();
        addPochta.placeBreakIdPochta = $('#place-break').val();
        addPochta.timeDurationBreak = $('#duration-break').val();

        var $routeName = $('#route-name');
        var nameRouteStart = $routeName.val();
        for (let i in addPochta.arrPochta) {
            if (addPochta.arrPochta[i].serialnumber == 2) {
                let name = nameRouteStart + "-" + addPochta.arrPochta[i].name;
                $routeName.val(name);
            }
        }
        addPochta.routeName = $routeName.val();
        addPochta.settlingTime = [];

        $('.settling').each(function(index,element){
            console.log("settling");
            var time = $(element).children('.settling-time').val();
            if(time!='00:00'){
                console.log("time:",time);
                var place = $(element).children('.btn-group').children('.place-settling').find('option:selected').text();
                console.log("place:",place);
                if($(element).children('.btn-group').children('.place-settling').val()!=-1)
                addPochta.settlingTime.push(place+': '+time+'. ');
            }


        });

        routeAll.push(addPochta);
        console.log("addPochta:", addPochta, "routeAll:", routeAll);

        //end get data from form

        $('#add-new-route').removeClass('btn-disable').animate({'opacity': '.5'}, 400, function () {
            $(this).animate({'opacity': '1'}, 400).show('500', function () {
                $('#shape-schedule').removeClass('btn-disable').animate({'opacity': '.5'}, 400, function () {
                    $(this).animate({'opacity': '1'}, 400).show(400, function () {
                        var $alrtInfo = $('.alert-info');
                        $alrtInfo.text("");
                        for (var i = 0, len = routeAll.length; i < len; i++) {
                            if (i == 0) {
                                $alrtInfo.append("Маршрут № " + (i + 1) + "<br />");
                            }
                            else {
                                $alrtInfo.append("<br /><br />" + "Маршрут № " + (i + 1) + "<br />");
                            }
                            $alrtInfo.append("Название маршрута: " + routeAll[i].routeName + "<br />" + routeAll[i].typeStransportName + " : " + routeAll[i].typeStransport + "<br />");

                            routeAll[i].arrPochta.sort(function (a, b) {
                                return parseFloat(a.serialnumber) - parseFloat(b.serialnumber)
                            });
                            for (let j = 0, len2 = routeAll[i].arrPochta.length; j < len2; j++) {
                                let str = routeAll[i].arrPochta[j].serialnumber + ") " + routeAll[i].arrPochta[j].name;
                                $alrtInfo.append(str + ". ");
                            }
                            $alrtInfo.append("<br />" + "Время выезда из гаража: " + routeAll[i].timeDeparture + "<br />" + "Продолжительность перерыва: " + routeAll[i].timeDurationBreak);
                        }
                    });

                });
            });

        });
        clickToogle++;
        $('#create-route').hide("slow");
    });
    /*
     *
     * окраска селекта для юзера
     *
     */
    $("#place-break").click(function () {
        console.log("#place-break click");
        var $this = $(this);
        if ($this.val() == -1) {
            $('.placebreak').addClass('placebreak-hide');
            $this.addClass('typestransport');
        }
        else {
            $('.placebreak').removeClass('placebreak-hide');
            $this.removeClass('typestransport');
        }
    });

    /*
     *
     * Удаляем данные с формы и обнуляем переменные
     *
     */
    $('#mainform').on('click', "#add-new-route", function () {
        console.log("click function #add-new-route");
        clickToogle--;
        $("#mainform")[0].reset();
        count = 0;
        $('.seeSelect').text('').removeClass('seeSelect');
        idSelectCheckbox.length = 0;
        $(".pochta-input").attr("data-count", '');
        $('option', '#place-break').not(':eq(0)').remove();
        $('.placebreak').addClass('placebreak-hide');
        $('#create-route').show(500, function () {
            $("html, body").animate({scrollTop: 0}, "slow");
            $('#add-new-route').hide(500);
        });
        $('#shape-schedule').hide(500, function () {
            //включаем Луганск ЦОПП
            $('input:checkbox').each(function (indx, element) {
                console.log('включаем Луганск ЦОПП');
                var checkLoadText = $(element).parent('label').text();
                checkLoadText = $.trim(checkLoadText);
                console.log(checkLoadText);
                if (checkLoadText == 'Луганск ЦОПП') {
                    console.log('element', element, 'elementId', element.id);
                    $(element).prop({'checked': 'true', 'disabled': 'true'});
                    pochtaSel.checkItem(element, 0);
                    idSelectCheckbox = pochtaSel.getSelectedItems(element);
                    return false;
                }

            });
        });
    });
    /*
     *
     *Сформировать excel
     *
     */
    $('#shape-schedule').click(function (e) {
        e.preventDefault();
        console.log("click #shape-schedule");
        $("html, body").animate({scrollTop: 0}, "slow", function () {
            $('#mainform').hide("slow", function () {
                $('.alert-info').hide("slow", function () {
                    $('#loading-indicator').show("slow");
                });
            });
        });
        var url = '?r=formationroute/createxsel';
        $.ajax({
            type: "POST",
            url: url,
            data: {routeAll: routeAll},
            success: function (data) {
                setTimeout(function () {
                    //TODO
                    console.log("data ", data);
                    alert("Exsel файл сгенерирован");
                    $('#loading-indicator').hide("slow", function () {
                        var dataArr = $.parseJSON(data);
                        var j = 1;
                        for (let i of dataArr) {
                            if (j == 1)
                                $('#topic-route').append("<p class='pd-tp'><a class='btn btn-default excel-btn' download role='button'  href=" + i + "><img border='0' alt='image' src='./img/excel-icon.png' width='75'>Скачать файл <span><i>№" + j + "</i></span></a></p>");
                            else
                                $('#topic-route').append("<p><a class='btn btn-default excel-btn' download role='button'  href=" + i + "><img border='0' alt='image' src='./img/excel-icon.png' width='75'>Скачать файл <span><i>№" + j + "</i></span></a></p>");
                            j++;
                        }
                        //reloadPage(500);
                    });
                }, 2000)
            },
            error: function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ");
                //reloadPage(500);
            }
        })
    });
    $("input[name='typestransport']").change(function () {
        $('.row.transport').removeClass('typestransport');
    });
    $('#topic-route').on('click', '.excel-btn', function () {
        console.log('#topic-route click this', this);
        $(this).animate({'opacity': '.5'}, 500, function () {
            $(this).addClass('add-no-active-elem').parent().prop('title', 'Этой Excel Вы уже скачали с сервера!');
        })
    })
    $('#settling-btn').click(function () {
        console.log('settling-btn');
        var $parentRoot = $('.settling:first').parent();
        $('.settling:first').clone().appendTo($parentRoot);
    });

    //отменяем действие по enter, не отправляем форму
    $(document).keypress(function (e) {
        if(e.which == 13){
            e.preventDefault();
            console.log("Press enter");
        }
    })

});