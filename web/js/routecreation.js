$(document).ready(function () {
    var routeAll = [];
    var flagReturn = [];
    var clickToogle = 0;
    var count = 0;
   // $('.alert-info').hide();
    var pochtaSel = new pochtaSelected();
    var idSelectCheckbox;
    console.log("start script routecreation.js");
    // $('input:checkbox').each(function (indx, element) {
    //     var checkLoadText = $(element).parent('label').text();
    //     checkLoadText = $.trim(checkLoadText);
    //     console.log(checkLoadText)
    //     if(checkLoadText == 'Луганск ЦОПП')
    //     {
    //         $(element).trigger('click');
    //         pochtaSel.checkItem(element);
    //         idSelectCheckbox = pochtaSel.getSelectedItems(element);
    //         return false;
    //     }
    //
    // });
        /*
    * выбор почтовых отделений
    */
    function pochtaSelected() {
        count = 0;
       this.routeInputId = [];
       this.checkItem = function (event) {

           this.event = event;
           let id = this.event.target.id;
           console.log("this.event.target.id:",this.event.target.id);
           let text = $('#'+id).parent('label').text();
           text = $.trim(text);

           if($('#'+id).prop("checked"))
           {
               count++;
               this.addPlaceBreak(this.event.target.id);
                   if(text == 'Луганск Центральная касса')
                   {
                       if($('#'+id).attr('data-count'))
                       {
                           let countOld  = $('#'+id).attr('data-count');
                           countOld += "|"+count;
                           $('#'+id).attr('data-count', countOld);
                       }
                       else
                       {
                           $('#'+id).attr('data-count', count);
                       }
                   }
                   else
                   {
                       $('#'+id).attr('data-count', count);
                   }
               if(count>1)
                   $('.amendment').removeClass('typestransport');
           }
           else
           {
               this.deletePlaceBreak(this.event.target.id);
                //выходим если снимаем отметку с Луганской центральной кассы
                if(text == 'Луганск Центральная касса')
                {
                    console.log("Ничего не делаем", "text:", text);
                    return;
                }

               let countStart = $('#'+id).attr('data-count');
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
                                    $('#choicepochta'+this.id).text(' __ № '+countOld)
                                    console.log("this.id",this.id);
                                    console.log("countOld",countOld);
                               }
                           }
                           else
                           {
                               let countOld = $('#'+this.id).attr('data-count');
                               let countOldArr  = new Array();
                               countOldArr = countOld.split("|");
                               for (i in countOldArr)
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
                               $('#choicepochta'+this.id).text(' __ № '+countNew)
                           }
                       }
                   }
               )
               count--;
               if(count<2)
                   $('.amendment').addClass('typestransport');
           }

           //console.log($(this.event.target).data('numberoute'));
           if(jQuery.inArray(this.event.target.id, this.routeInputId) == -1)
           {
               this.routeInputId.push(this.event.target.id);
           }
           console.log(this.routeInputId);
           //console.log(this.routeInputId);
           this.seeChoice(this.event.target.id);

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

       this.seeChoice = function (id) {
           let text = $('#'+id).parent('label').text();
           text = $.trim(text);
           console.log("seeChoice .text:", text);
           if($('#'+id).prop("checked"))
           {
               if(text == 'Луганск Центральная касса')
               {
                   console.log("== Луганск Центральная касса", text);
                   $('#choicepochta'+id).append(' __ № '+count).addClass("seeSelect");
               }
               else
               {
                   $('#choicepochta'+id).text(' __ № '+count).addClass("seeSelect");

               }
               $('#'+id).parent('label').addClass('chosen-status');
           }

           console.log("'choicepochta'+this.event.target.id",'choicepochta'+this.event.target.id)
       }
       this.addPlaceBreak = function (id) {
           let text = $('#'+id).parent('label').text();
           text = $.trim(text);
           console.log("this.text:", text);
           $('#place-break').append($('<option>', {
               value: id,
               text: ""+text+""
           }));
       }
        this.deletePlaceBreak = function (id) {
            $('#'+id).parent('label').removeClass('chosen-status');
            $("#place-break").find('[value='+id+']').remove();
        }
   }

    $("input.pochta-input").click(function(event) {
        console.log("event",event);
        pochtaSel.checkItem(event);
        idSelectCheckbox = pochtaSel.getSelectedItems(event);

    });


    $("#create-route").click(function (e) {
        console.log("#create-routes");
        if(clickToogle==1)
        {
            $('body').addClass('typestransport');
            alert("Вы должны нажать кнопку 'Добавить новый маршрут', после чего 'Создать маршрут' ");
            $('body').removeClass('typestransport');
            return;
        }

        flagReturn = [];
        if(!$('input[name="typestransport"]').is(":checked"))
        {
            $('.transport').addClass('typestransport');
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return;
        }
        else
        {
            $('.transport').removeClass('typestransport');
        }

        console.log("$('input[type=checkbox]:checked').length: ",$('input[type=checkbox]:checked').length);

        if($('input[type=checkbox]:checked').length < 2)
        {
            $('input[type=checkbox]').each(function () {
                if(!$(this).is(':checked'))
                {
                    $(this).parent().parent().addClass('typestransport');
                }

            });
            $("html, body").animate({ scrollTop: 0 }, "slow");
            flagReturn.push(1);
        }
        if($('input[type=checkbox]:checked').length > 1)
        {
            $('.amendment').removeClass('typestransport');
        }

        if($('#place-break').val() == -1)
        {
            $('#place-break').addClass('typestransport');
            flagReturn.push(1);
            $("html, body").animate({ scrollTop: $(window).scrollTop() - 100 }, "slow");
        }
        else
        {
            $('#place-break').removeClass('typestransport');
            $('.placebreak').removeClass('placebreak-hide');

        }

        console.log("#time-departure.length:", ($('#time-departure').val()).length);

        if(($('#time-departure').val()).length == 0)
        {
            $('#time-departure').addClass('typestransport');
            flagReturn.push(1);
        }
        if(($('#time-sharing').val()).length == 0)
        {
            $('#time-sharing').addClass('typestransport');
            flagReturn.push(1);
        }
        if(($('#duration-break').val()).length == 0)
        {
            $('#duration-break').addClass('typestransport');
            flagReturn.push(1);
        }
        console.log("flag:",flagReturn);
        
        if(flagReturn.length!=0)
        {
            return;
        }
        //start get data from form
        var addPochta = {};
        //get data radio button
        addPochta.typeStransport = $('input[name=typestransport]:checked').val();
        let typeStransportNameTemp =  $('input[name=typestransport]:checked').parent().text();
        typeStransportNameTemp = $.trim(typeStransportNameTemp);
        addPochta.typeStransportName = typeStransportNameTemp;
        addPochta.date = $('h2').attr('data-tdate');
        addPochta.arrPochta = [];
        //console.log("addPochta:", addPochta,"idSelectCheckbox:", idSelectCheckbox);
        for(let i = 0, len = idSelectCheckbox.length; i<len; i++)
        {
            let Pochta = {};
            $id = $('#'+idSelectCheckbox[i]);
            Pochta.idpochta = idSelectCheckbox[i];
            console.log("$id = ",$id,"id.data('count') = ",$id.data('count'),"id.attr('data-count') = ",$id.attr('data-count'));
            let name = $id.parent('label').text();
            name = $.trim(name);
            Pochta.name = name;
            Pochta.timeSharingLocal = $('#time-sharing'+idSelectCheckbox[i]).val();
            //номер для Луганской Центральной кассы
            var oldI = i;
            console.log("Pochta.timeSharingLocal = ", Pochta.timeSharingLocal);
            Pochta.idcenter = $('h2').attr('data-idcenter');
            Pochta.adress = $id.data('adress');
            Pochta.serialnumber = $id.attr('data-count');
            if(Pochta.serialnumber.indexOf('|') == -1)
            {
                (addPochta.arrPochta).push(Pochta);
            }
            else
            {
                //если несколько раз кликнули, разбираем -  по Луганску Центральнаю кассу
                var arrSeriarNumber = (Pochta.serialnumber).split('|');
                console.log("arrSeriarNumber: ",arrSeriarNumber);
                for(let i = 0, len = arrSeriarNumber.length; i<len; i++)
                {
                    //без этой переменной перекрываеться let Pochta = {};
                    let tempPochta = {};
                    tempPochta.idpochta = Pochta.idpochta;
                    tempPochta.name = Pochta.name;
                    tempPochta.idcenter = Pochta.idcenter;
                    tempPochta.adress = Pochta.adress;
                    tempPochta.serialnumber = arrSeriarNumber[i];
                    //время обмена одно для всех выбранных Луганских Центральных Касс
                    tempPochta.timeSharingLocal = $('#time-sharing'+idSelectCheckbox[oldI]).val();
                    tempPochta.i = i;

                    console.log("i:",i,"arrSeriarNumber[i]: ",arrSeriarNumber[i]);
                    console.log("Pochta: ",tempPochta, "addPochta.arrPochta: ",addPochta.arrPochta);

                    (addPochta.arrPochta).push(tempPochta);
                }
            }
        }
        addPochta.timeDeparture = $('#time-departure').val();
        //addPochta.timeSharing = $('#time-sharing').val();
        addPochta.placeBreakIdPochta = $('#place-break').val();
        addPochta.timeDurationBreak = $('#duration-break').val();
        routeAll.push(addPochta);
        console.log("addPochta:",addPochta,"routeAll:",routeAll);
        var nameRouteStart = $('#route-name').val();
        for(i in addPochta.arrPochta)
        {
            if(addPochta.arrPochta[i].serialnumber == 2)
            {
                let name  = nameRouteStart+"-"+addPochta.arrPochta[i].name;
                $('#route-name').val(name);
            }
        }
        addPochta.routeName = $('#route-name').val();
        //end get data from form

        $('#add-new-route').removeClass('btn-disable').animate({'opacity':'.5'},750,function () {
            $('#add-new-route').animate({'opacity':'1'},750);
        });
        $('#shape-schedule').removeClass('btn-disable').animate({'opacity':'.5'},750,function () {
            $('#shape-schedule').animate({'opacity':'1'},750);
            $('.alert-info').text("");
            for(var i=0, len = routeAll.length; i<len; i++)
            {
                if (i == 0)
                {
                    $('.alert-info').append("Маршрут № "+(i+1)+"<br />");
                }
                else
                {
                    $('.alert-info').append("<br /><br />"+"Маршрут № "+(i+1)+"<br />");
                }
                $('.alert-info').append("Название маршрута: "+routeAll[i].routeName+"<br />");

                $('.alert-info').append(routeAll[i].typeStransportName+" : "+routeAll[i].typeStransport+"<br />");
                routeAll[i].arrPochta.sort(function (a,b) {
                    return parseFloat(a.serialnumber) - parseFloat(b.serialnumber)
                });
                for(let j = 0, len2 = routeAll[i].arrPochta.length; j<len2; j++)
                {
                    let str = routeAll[i].arrPochta[j].serialnumber +") "+routeAll[i].arrPochta[j].name;
                    $('.alert-info').append(str+ ". ");
                }
                $('.alert-info').append("<br />"+"Время выезда из гаража: "+routeAll[i].timeDeparture);
                $('.alert-info').append("<br />"+"Время обмена: "+routeAll[i].timeSharing);
                $('.alert-info').append("<br />"+"Продолжительность перерыва: "+routeAll[i].timeDurationBreak);
            }
        });
        clickToogle++;
        $('#create-route').hide("slow");
        
    })
    /*
    * окраска селекта для юзера
    */
    $("#place-break").click(function () {
        console.log("#place-break click")
        if($('#place-break').val() == -1)
        {
            $('.placebreak').addClass('placebreak-hide');
            $('#place-break').addClass('typestransport');
        }
        else
        {
            $('.placebreak').removeClass('placebreak-hide');
            $('#place-break').removeClass('typestransport');
        }
    });

    /*
     * Удаляем данные с формы и обнуляем переменные
     */
    $("#add-new-route").click(function () {
        console.log("click function #add-new-route");
        clickToogle--;
        $("#mainform")[0].reset();
        count = 0;
        $('.checkbox>span').text("");
        idSelectCheckbox.length = 0;
        $(".pochta-input").attr("data-count" , '');
        $('option', '#place-break').not(':eq(0)').remove();
        $('.placebreak').addClass('placebreak-hide');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#create-route').show("slow");
    })

    /*
    *
    */
    $('#shape-schedule').click(function (e) {
        e.preventDefault();
        console.log("click #shape-schedule");
        $("html, body").animate({ scrollTop: 0 }, "slow",function () {
            $('#mainform').hide("slow", function () {
                $('.alert-info').hide("slow",function () {
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
                    //что возвращаем
                    console.log("data ", data);
                    alert("Exsel файл сгенерирован");
                    $('#loading-indicator').hide("slow",function () {
                        //location.reload();
                    });
                },2000)
            },
            error: function () {
                alert("Ошибка ! Попробуйте выполнить операцию еще раз или обратитесь к администратору. ")
                //location.reload();
            }
        })
    })
    /*
    *
     */
    $("input[name='typestransport']").change(function(){
        $('.row.transport').removeClass('typestransport');
    });


});
