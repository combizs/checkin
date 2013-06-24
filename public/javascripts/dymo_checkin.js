var printing_queue;
var ping_count=0;
var last_printed_label;

function Init()
{
	OnLoad();
	AfterLoad();
	PollServer();
}

function PrintLabel()
{
	Print();
	MarkGuestAsPrintedAndReload();
}

function MarkGuestAsPrintedAndReload()
{
	guest = printing_queue[0]['guest'];
	last_printed_label = guest;
	jQuery.ajax({
		url: "/guests/"+guest['id'],
    	data: {guest: {printed: true}},
    	type: 'PUT',
    	dataType: "xml",
    	success: function(data){ 
    		PollServer();
    	},
    	error: function(data){
    		alert("There was an error updating the record on the server.");
    	}
	});
}

function UndoLastPrint()
{
	if (last_printed_label != null)
	{
		jQuery.ajax({
			url: "/guests/"+guest['id'],
	    	data: {guest: {printed: false}},
	    	type: 'PUT',
	    	dataType: "xml",
	    	success: function(data){ 
	    		PollServer();
	    	},
	    	error: function(data){
	    		alert("There was an error updating the record on the server.");
	    	}
		});
	}
}

function PollServer() {
	jQuery.get(
    	"/printer/next/",
    	{num: 7},
    	function(data){ 
    		printing_queue = data
    		LoadPrintingQueue();
    	},
    	'json'
   	);
   	
    return true;
}
function LoadPrintingQueue()
{
	if (printing_queue != null && printing_queue.length > 0)
	{
		LoadGuestForPrinter(printing_queue[0]);
		RenderQueue();
		ping_count=0;
	}
	else
	{
		document.getElementById("now_printing").innerHTML="All labels have been printed for the moment!"
		Clear();
		if (ping_count < 5)
		{
			setTimeout("PollServer()", 5000);
			ping_count++;
		}
	}
}

function LoadGuestForPrinter(guest_object)
{
	guest = guest_object['guest']
	
	SetGuestAttribute('name', guest['name']);
	SetGuestAttribute('company', guest['company']);
	SetGuestAttribute('email', guest['email']);
	SetGuestAttribute('twitter', "@" + guest['twitter']);
	SetGuestAttribute('tag1', guest['tag1']);
	SetGuestAttribute('tag2', guest['tag2']);
	SetGuestAttribute('tag3', guest['tag3']);
	
    return true;
}

function RenderQueue()
{
	document.getElementById("now_printing").innerHTML="Now printing: " + printing_queue[0]['guest']['name']
	RenderQueuePosition(1);
	RenderQueuePosition(2);
	RenderQueuePosition(3);
	RenderQueuePosition(4);
	RenderQueuePosition(5);
	RenderQueuePosition(6);
}

function RenderQueuePosition(pos)
{
	if (printing_queue[pos] != null)
		document.getElementById("queue_pos_"+pos).innerHTML=printing_queue[pos]['guest']['name']
	else
		document.getElementById("queue_pos_"+pos).innerHTML=""
}

function SetGuestAttribute(name, data) {
    ObjectName.value = name;
    ObjectData.value = data;
    SetObjectData();
    GetLabelImage();
}

function Clear() {
	SetGuestAttribute('name', "");
	SetGuestAttribute('company', "");
	SetGuestAttribute('email', "");
	SetGuestAttribute('twitter', "");
	SetGuestAttribute('tag1', "");
	SetGuestAttribute('tag2', "");
	SetGuestAttribute('tag3', "");
}


function AfterLoad() {
    Open();
    Clear();
}



function Checkin() {

    SetGuestName();
    SetGuestCompany();
    SetGuestEmail();
    SetGuestTwitter();
    SetGuestTag1();
    SetGuestTag2();
    SetGuestTag3();

	$.get('ajax/test.html', function(data) {
	$('.result').html(data);
		alert('Load was performed.');
	});

    //alert('would be printing now!');
    Print();
    
    
    
    guest_tags.value = tag1.value + ", " + tag2.value + ", " + tag3.value;

    setTimeout("Clear()", 200);

    return true;
}


function Clear_Old() {
    guest_name.value = "";
    SetGuestName();
    guest_company.value = "";
    SetGuestCompany();
    guest_email.value = "";
    SetGuestEmail();
    guest_twitter.value = "";
    SetGuestTwitter();
    tag1.value = "";
    SetGuestTag1();
    tag2.value = "";
    SetGuestTag2();
    tag3.value = "";
    SetGuestTag3();

    guest_name.focus();
}



function SetGuestCompany() {
    ObjectName.value = "company";
    ObjectData.value = guest_company.value;;
    SetObjectData();
    GetLabelImage();
}

function SetGuestName() {
    ObjectName.value = "name";
    ObjectData.value = guest_name.value;
    SetObjectData();
    GetLabelImage();
}

function SetGuestEmail() {
    /* Not printing email on the label */
    /* Intentionally blank */
}

function SetGuestTwitter() {
    ObjectName.value = "twitter";
    var twitter = guest_twitter.value;
    if ((twitter == "") || (twitter.indexOf("@") == 0))  
    	ObjectData.value = guest_twitter.value;
    else
	ObjectData.value = "@" + guest_twitter.value;
    SetObjectData();
    GetLabelImage();
}

function SetGuestTag1() {
    ObjectName.value = "tag1";
    ObjectData.value = tag1.value;
    SetObjectData();
    GetLabelImage();
}

function SetGuestTag2() {
    ObjectName.value = "tag2";
    ObjectData.value = tag2.value;
    SetObjectData();
    GetLabelImage();
}

function SetGuestTag3() {
    ObjectName.value = "tag3";
    ObjectData.value = tag3.value;
    SetObjectData();
    GetLabelImage();
}


function AfterLoadOld() {
    Open();
    Clear_Old();
}
