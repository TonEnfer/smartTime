var id = '';
var intervals = '';
$(function() {
    'use strict';
	//$.getScript({async:false,url:""});
	searchWatch();
	$(".param-but").attr('disabled',"disabled");
});

function searchWatch()
{
	$.ajax({
		url:"/cgi-bin/searchWatches_async.py",
		dataType:"json",
		async: true,
		success: function(data){
			 switch(data.result){
				 case 'Not found':
					 showMessage('danger',"Часы не найдены",2500);
					 break;
				 default:
					 showMessage('info',"Список часов обновлен",2500);
					 break;
				};
			 
		 }
	});
	showWatches();
}

function setId(_id)
{
	id = _id;
	console.log("id = "+id);
	getTZ(id);
	if(intervals != '')
		clearInterval(intervals);
	intervals = setInterval(getTime,10000,id);
	getTime(id);
	getTimerStatus(id);
	$(".param-but").removeAttr('disabled');
}

function showWatches()
{
	$("#Available_watches_list").html("<ul id ='watch_list'></ul>");
//	$("#watch_list").hide();
	$.ajax({
		url:"/cgi-bin/getWatchesList.py",
		dataType:"json",
		async: true,
		success: function(data){
			console.log(data);
			$.each(data.watches, function()
				  {
				var el = $('<li/>',
				 {
				  id:this.id,
				  });
				
				var link = $('<a/>',
							{
					href:'#',
					onclick:"setId("+'"'+this.id+'"'+")",
					text: this.name + ' ('+this.ip+')'
				});
				link.appendTo(el.hide().appendTo("#Available_watches_list").show(200));
				//$('<li></li>').hide().html(code).appendTo("#watch_list").show(200);
			});
			
			showMessage('success',"Список получен",2500);
		 }
	});
}

function getTimerStatus(_id)
{
	$.ajax({
	async: true,
	type: 'POST',
	url:'cgi-bin/getTimerStatus.py',
	data:"id="+_id,
	dataType:'json',
	success: function(data)
		{
			console.log(data.timer);
			if(data.timer == 'on')
				{
					$("#timer-enable").html("Включен");
					if($("#timer_sw").prop('checked') != true)
						$("#timer_sw").bootstrapToggle(data.timer);
				}
			else
				{
					if($("#timer_sw").prop('checked') != false)
						$("#timer_sw").bootstrapToggle(data.timer);
					$("#timer-enable").html("Выключен");
				}
			
		}
	});
}

function getTZ(_id)
{
	$.ajax({
		async: true,
        type: 'POST',
		url:'cgi-bin/getTZ.py',
		data:"id="+_id,
		dataType:'json',
		success: function(data)
		{
			console.log(data.tz);
			showTZ(data.tz);
		}
	});
}

function showTZ(tz)
{
	$('#TZ').html('');
	$('#TZ').html(tz);
}

function getTime(_id)
{
	$.ajax({
		async: true,
        type: 'POST',
		url:'cgi-bin/getTime.py',
		data:"id="+_id,
		dataType:'json',
		success: function(data)
		{
			console.log(data.time);
			showTime(data.time);
			
		}
	});
}

function showTime(time)
{
	//$('#time').html('');
	$('#time').html(time);
}
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