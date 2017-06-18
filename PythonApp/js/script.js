var id = '';

$(function() {
    'use strict';
   // $("#params-row").hide();
});


function showParamPage(data) {
    'use strict';
    $("#params-row").slideDown(500);
    $("#params-row").html(data);
}

function getPage(name) {
    'use strict';
    $("#params-row").slideUp(500);
    $.ajax({
		async: true,
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

function showMessage(msgType,text,time)
{
	var cls = 'alert-success';
	switch(msgType){

		case 'info':
			cls = 'alert-info';
			break;
		case 'warning':
			cls = 'alert-warning';
			break;
		case 'danger':
			cls = 'alert-danger';
			break;
		case 'succsess':
		default: break;
	}
	var id = Math.floor(Math.random()*100000);
	var cont = '<div class="alert alert-dismissible" role="alert" id='+id+'></div>';
	$("#message").append(cont);
	$("#"+id).addClass(cls);
	$("#"+id).hide();
	var mess = `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>`+text;
						$("#"+id).html(mess);	
						$("#"+id).show(500);
						setTimeout(function(){$("#"+id).hide(400);},time);
						
						setTimeout(function(){$("#"+id).remove();},time+500);
}