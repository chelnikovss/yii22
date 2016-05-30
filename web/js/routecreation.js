$(document).ready(function () {
    var routeAll = [];
    var flagReturn = [];
    console.log("start script routecreation.js");
    /*
    * выбор почтовых отделений
    */
    function pochtaSelected() {
       let count = 0;
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

    var pochtaSel = new pochtaSelected();
    var idSelectCheckbox;

    $("input.pochta-input ").click(function(event) {
        pochtaSel.checkItem(event);
        idSelectCheckbox = pochtaSel.getSelectedItems(event);
    });


    $("#create-route").click(function (e) {
        console.log("#create-routes");
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
        addPochta.typestransport = $('input[name=typestransport]:checked').val();
        addPochta.arrPochta = [];

        //console.log("addPochta:", addPochta,"idSelectCheckbox:", idSelectCheckbox);
        for(let i = 0, len = idSelectCheckbox.length;i<len;i++)
        {
            var Pochta = {};
            $id = $('#'+idSelectCheckbox[i]);
            Pochta.idpochta = idSelectCheckbox[i];
            Pochta.serialnumber = $id.data('count');
            let name = $id.parent('label').text();
            name = $.trim(name);
            Pochta.name = name;
            Pochta.adress = $id.data('adress');
            (addPochta.arrPochta).push(Pochta);
        }

        addPochta.timeDeparture = $('#time-departure').val();
        addPochta.timeSharing = $('#time-sharing').val();
        addPochta.placeBreakIdPochta = $('#place-break').val();
        addPochta.timeDurationBreak = $('#duration-break').val();
        addPochta.routeName = $('#route-name').val();

        routeAll.push(addPochta);
        console.log("addPochta:",addPochta,"routeAll:",routeAll);
        //end get data from form
        $('#add-new-route').removeClass('btn-disable').animate({'opacity':'.5'},750,function () {
            $('#add-new-route').animate({'opacity':'1'},750);
        });
        $('#shape-schedule').removeClass('btn-disable').animate({'opacity':'.5'},750,function () {
            $('#shape-schedule').animate({'opacity':'1'},750);
        });
        
    })
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

});
