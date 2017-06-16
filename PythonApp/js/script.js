$(function() {
    'use strict';
    $("#params-row").hide();
});


function showParamPage(data) {
    'use strict';
    //console.log(data);
    $("#params-row").hide(300);
    $("#params-row").html(data);
    //if($("#params-row").is(':hidden')){
        //console.log("#params-row is hidden")
        $("#params-row").show(1000,'swing');
    //}
}

function getPage(name) {
    //var data = 
    $.ajax({
        cache: false,
        type: 'POST',
        dataType:'html',
        url:'/cgi-bin/getPage.py',
        data:"name="+name,
        success: function(data){showParamPage(data);}
    });
}

function getTimesParamPage() {
    'use strict';
    console.log("Get time parameters page");
    getPage("timeParam");
}

function getTimerParamPage() {
    'use strict';
    console.log("Get timer parameters page");
    getPage("timerParam");
}

function getTempParamPage() {
    'use strict';
    console.log("Get temperature parameters page");
    getPage("tempParam");
}

function getPressParamPage() {
    'use strict';
    console.log("Get pressure parameters page");
    getPage("pressParam");
}

function getHumParamPage() {
    'use strict';
    console.log("Get humidity parameters page");
    getPage("humParam");
}

function getSetParamPage() {
    'use strict';
    console.log("Get settings parameters page");
    getPage("setParam");
}