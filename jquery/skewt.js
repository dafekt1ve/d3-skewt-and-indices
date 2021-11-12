//alert("SkewT")

var attempts = 0;

$(document).ready(function()
{
	 $("input").click(function() 
	 {
		if ($(this).is(".evalQ")) 
		{
			
			vars = new Array();
			prompts = new Array();
			
			$(this).siblings().each(function( index ) 
			{
				vars[$(this).prop("name")] = $(this).prop("value");
  			 	
			});
			
			$(this).siblings("[name^='prompt']").each(function( index ) 
			{
				if($(this).prop("value") != "")
				{
					prompts.push($(this).prop("value"));
				}
  			 	
			});
			
			$(this).siblings("[name^='msg']").each(function( index ) 
			{
				if($(this).prop("value") != "")
				{
					prompts.push($(this).prop("value"));
				}
  			 	
			});
			
			var questionNumber  = vars['questionNumber'] ;
			var guessName = "q" + questionNumber;
			var guess  = parseInt(vars[guessName] );
			var answer  = parseInt(vars['answer']);
			var range  = parseInt(vars['range']) ;
			
			if (guess >= answer-range && guess <= answer*1 + range*1 || (attempts >= prompts.length)) 
			{				
				
				selectorAnswer = "div[id=a" + questionNumber + "]";
				selectorFeedback = "div[id=f" + questionNumber + "]";
				
				$(this).parents("form").find(selectorAnswer).css('display','block');
				$(this).parents("form").find(selectorFeedback).css('display','none');
				
				
				img_src = vars['img_src'];
				if(img_src != '')
				{
					$(this).parents("form").find("img").attr("src", "media/graphics/" + img_src);
				}
				
				attempts = 0;
				
			}else
			{
				
				if (isNaN(guess))
				{
					msg="This is not a valid response. Please answer the question to continue. "; 
				}
				else if(guess < answer)
				{
					msg="Your answer ("+guess+") is too low. "; 
				}else
				{
					msg="Your answer ("+guess+") is too high. ";
				}
				
				selectorAnswer = "div[id=a" + questionNumber + "]";
				selectorFeedback = "div[id=f" + questionNumber + "]";
				
				feedbackKey = "promptq" + questionNumber + "1";
				$(this).parents("form").find(selectorFeedback).html( msg + prompts[attempts]);
				
				$(this).parents("form").find(selectorAnswer).css('display','none');
				$(this).parents("form").find(selectorFeedback).css('display','block');
				attempts++;
			}
			
			
		}
	 });
	 
	 
	 $('.selectorMachine').change(function() 
	 {
		vars = new Array();
		keys = new Array();
		
		$(this).siblings().each(function( index ) 
		{
			vars[$(this).attr("name")] = $(this).attr("value");
			keys.push($(this).attr("name"));
		});
		
		if($.inArray($(this).val(), keys) != -1)
		{
			$(this).parents("div:eq(0)").find(".feedback").html( vars[ ($(this).val()) ]);
			$(this).parents("div:eq(0)").find(".feedback").css("display", "block")
		}else
		{
			$(this).parents("div:eq(0)").find(".feedback").html("Incorrect");
			$(this).parents("div:eq(0)").find(".feedback").css("display", "block")
		}
		
	 });	 
	 
	 
	 //Show the div with the answer and replace the image with the one provided.
	 $('.showPageAnswer').change(function() 
	 {
		vars = new Array();
		
		$(this).siblings().each(function( index ) 
		{
			vars[$(this).attr("name")] = $(this).attr("value");
		});
		
		
			
		pageParent = $(this).closest('div[class="page"]');
		pageParent.find(".feedback").css("display", "none");
		
		
		pageParent.find("img").attr("src", vars["image"]);
		pageParent.find("div[id=" + vars['div'] + "]").css("display","block");
		
	 });	 
	 
	  //Show the div with the answer and replace the image with the one provided.
	 $('.showDivAnswer').change(function() 
	 {
		vars = new Array();
		
		$(this).siblings().each(function( index ) 
		{
			vars[$(this).attr("name")] = $(this).attr("value");
		});
		
		pageParent = $(this).closest('div[class="toggleWrapper"]');
		pageParent.find(".feedback").css("display", "none");
		
		pageParent.find("div[id=" + vars['div'] + "]").css("display","block");
		
	 });	 
	 
	 
	   //Show the div with the answer and replace the image with the one provided.
	 $('.showDivAnswer').click(function() 
	 {
		vars = new Array();
		
		$(this).siblings().each(function( index ) 
		{
			vars[$(this).attr("name")] = $(this).attr("value");
		});
			
		pageParent = $(this).closest('div[class="toggleWrapper"]');
		pageParent.find(".feedback").css("display", "none");
		
		pageParent.find("div[id=" + vars['div'] + "]").css("display","block");
		
	 });	 
	 
});



var global_temp = '';
	
	function openSkewT(datafile){
		 var the_url = "skewt.htm"
		 if(datafile)
		 	the_url += "?" + datafile;
		 var SkewT_win = window.open(the_url, 'SkewT_i_win', 'width=953,height=603,scrollbars,menubar,resizable,toolbar=no,status=no,location=no,left=100,top=100');
		 SkewT_win.focus();
	}
	function openMod(){
		 //var mod_win = window.open('intro.htm', 'new_mod', 'width=1000,height=750,scrollbars,menubar,resizable,toolbar=no,status=no,location=no,left=0,top=0');
		 var mod_win = window.open('intro.htm', 'new_mod', 'width=1000,height=750,scrollbars,menubar,resizable,toolbar,status,location=no,left=0,top=0');
		 mod_win.focus();
	}	
	function goHome(){
		location.href="index.htm";
	}
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages(img_name, img_file) {
	document.images[img_name].src = img_file;
}

var preloadFlag = false;
function preloadImages() {
	if (document.images) {
		mesoprim_over = newImage("media/interface/mesoprim-over.jpg");
		meted_over = newImage("media/interface/meted-over.jpg");
		comet_over = newImage("media/interface/comet-over.jpg");
		print_over = newImage("media/interface/print-over.jpg");
		download_over = newImage("media/interface/download-over.jpg");
		quiz_over = newImage("media/interface/quiz-over.jpg");
		survey_over = newImage("media/interface/survey-over.jpg");
		contrib_over = newImage("media/interface/contrib-over.jpg");
		technotes_over = newImage("media/interface/technotes-over.jpg");
		begin_over = newImage("media/interface/begin-over.jpg");
		preloadFlag = true;
	}
}

function evalQ(input_name, answer, range, div_num, img_src, msg)
	{	
		hideDiv('f'+div_num);
		temp = getValue(input_name);
		temp_a = eval("temp"+div_num);
		var num_tries = eval("num_tries"+div_num);
		
		// if correct answer or already tried twice before
		if ((temp >= answer-range && temp <= answer+range) || (num_tries > 2 && temp != temp_a)){
			if(div_num != ''){
				answer_id = 'a'+div_num;
				displayDiv(answer_id);
				//document.getElementById(answer_id).scrollIntoView(false);
				global_temp = answer_id;
				eval("num_tries"+div_num+"=3");
			}
			if(img_src != ''){document.images.q_img.src = "media/graphics/" + img_src;}
		}else{ //wrong answer 
			var feedback_id = 'f'+div_num;
			//temp_a = eval("temp"+div_num);
			if (isNaN(temp)){ //response is not a number
				msg="This is not a valid response.<br>Please answer the question to continue.";
			}else if (temp_a == temp){ //response the same as previous try (just clicked done button twice)
				msg="Your answer ("+temp+") is the same as your last attempt. Please try again."
			}else{ //valid tries
				//first some feedback
				if(temp < answer){
					msg="Your answer ("+temp+") is too low. " + msg; 
				}else{
					msg="Your answer ("+temp+") is too high. " + msg;
				}
				eval("msg += prompt" + input_name + num_tries); //append prompt to msg
				eval("num_tries"+div_num+"++"); // increment the number of attempts
				eval("temp"+div_num+"=temp"); //store the response
			}
			document.getElementById(feedback_id).innerHTML = msg; //populate text in the feedback
			displayDiv(feedback_id); //make the feedback visible
			//document.getElementById(feedback_id).scrollIntoView(false);//scroll the feedback into view if needed
			global_temp = feedback_id;//store the name of the feedback
		}
	}
	
	function evalQ2(input_name, answer, range, div_num, img_src, msg, img_id)
	{	
		hideDiv('f'+div_num);
		temp = getValue(input_name);
		temp_a = eval("temp"+div_num);
		var num_tries = eval("num_tries"+div_num);
		
		// if correct answer or already tried twice before
		if ((temp >= answer-range && temp <= answer+range) || (num_tries > 2 && temp != temp_a)){
			if(div_num != ''){
				answer_id = 'a'+div_num;
				displayDiv(answer_id);
				//document.getElementById(answer_id).scrollIntoView(false);
				global_temp = answer_id;
				eval("num_tries"+div_num+"=3");
			}
			if(img_src != ''){document.getElementById(img_id).src = "media/graphics/" + img_src;}
		}else{ //wrong answer 
			var feedback_id = 'f'+div_num;
			//temp_a = eval("temp"+div_num);
			if (isNaN(temp)){ //response is not a number
				msg="This is not a valid response.<br>Please answer the question to continue.";
			}else if (temp_a == temp){ //response the same as previous try (just clicked done button twice)
				msg="Your answer ("+temp+") is the same as your last attempt. Please try again."
			}else{ //valid tries
				//first some feedback
				if(temp < answer){
					msg="Your answer ("+temp+") is too low. " + msg; 
				}else{
					msg="Your answer ("+temp+") is too high. " + msg;
				}
				eval("msg += prompt" + input_name + num_tries); //append prompt to msg
				eval("num_tries"+div_num+"++"); // increment the number of attempts
				eval("temp"+div_num+"=temp"); //store the response
			}
			document.getElementById(feedback_id).innerHTML = msg; //populate text in the feedback
			displayDiv(feedback_id); //make the feedback visible
			//document.getElementById(feedback_id).scrollIntoView(false);//scroll the feedback into view if needed
			global_temp = feedback_id;//store the name of the feedback
		}
	}
	
	function evalRadio(div_id)
	{
		if(global_temp != '')
			hideDiv(global_temp);
		displayDiv(div_id);
		global_temp = div_id;
	}
	
	function evalRadio2(div_id, div_num, img_src)
	{
		if(global_temp != '' && (global_temp.charAt(1)==div_num || global_temp.charAt(0)=='f'))
			hideDiv(global_temp);
		displayDiv(div_id);
		global_temp = div_id;
		if(img_src != ''){
			swapImg('q_img',img_src);
		}
	}
	
	function evalRadioWithImage(div_id_show, div_num_hide, image_tag, img_src)
	{
		hideDiv(div_num_hide);
		displayDiv(div_id_show);
		
		if(img_src != '')
		{
			swapImg(image_tag,img_src);
		}
	}
	
	function evalRadioWithImage2(div_id_show, div_num_hide, div_num_hide2, image_tag, img_src)
	{
		hideDiv(div_num_hide);
		hideDiv(div_num_hide2);
		displayDiv(div_id_show);
		
		if(img_src != '')
		{
			swapImg(image_tag,img_src);
		}
	}
	
		
	function evalRadio3(div_name, img_src)
	{
		if(global_temp != '')
			hideDiv(global_temp);//hide any existing feedback
		displayDiv(div_name);
		document.getElementById(div_name);
		global_temp = div_name;
		if(img_src != ''){document.images.q_img.src = "media/graphics/" + img_src;}
	}
	
	function evalRadio4(div_name, img_id, img_src)
	{
		if(global_temp != '')
			hideDiv(global_temp);//hide any existing feedback
		displayDiv(div_name);
		document.getElementById(div_name);
		global_temp = div_name;
		if(img_src != ''){document.getElementById(img_id).src = "media/graphics/" + img_src;}
	}
	

	function showAnswer(q_num, this_ans, correct_ans)
	{
		if(this_ans==correct_ans){
			hideDiv("f"+q_num);
			displayDiv("a"+q_num);
			//document.getElementById("a"+q_num).scrollIntoView(false);
		}else{
			//msg = "Your answer, "+this_ans+", is incorrect. To determine turbulence review the table on page 2.";
			//document.getElementById("f"+q_num).innerHTML = msg;
			hideDiv("a"+q_num);
			displayDiv("f"+q_num);
			//document.getElementById("f"+q_num).scrollIntoView(false);
		}
	}

//used in airmass6 and severe12
function showNoEvalAnswer(input_name, div_name, img_src, no_answerprompt)
{
	temp = getText(input_name);
	if (temp != ''){
		if(div_name != ''){showDiv(div_name);}
		if(img_src != ''){document.images.q_img.src = "media/graphics/" + img_src;}
		hideDiv(no_answerprompt);
	}else{
		//alert("Please answer the question to continue");
		showDiv(no_answerprompt)
	}
}

function showDiv(div_name)
{
		if (document.getElementById) {
			document.getElementById(div_name).style.display="block";
			document.getElementById(div_name).style.visibility = "visible";
		} else if (document.all) {
			document.all[div_name].style.display="block";
		}else if (document.layers) {
			document.layers[div_name].visibility = "visible";
		}
}



function getValue(input_id)
{
	if (document.getElementById) {
		return parseFloat(document.getElementById(input_id).value);
	} else if (document.all) {
		return parseFloat(document.all[input_id].value);
	} else if (document.layers) {
		return parseFloat(document.forms[0].input_id.value);
	}
}
function getText(input_id)
{
	if (document.getElementById) {
		return document.getElementById(input_id).value;
	} else if (document.all) {
		return document.all[input_id].value;
	} else if (document.layers) {
		return document.forms[0].input_id.value;
	}
}
function setParam(){
	//first parse the filename
	var the_file = parent.document.location.href;
	the_file = the_file.substring(the_file.lastIndexOf('/')+1, the_file.indexOf('.htm'));
	the_id = unescape(the_file);
	if(the_id != 'parameters'){
		document.getElementById(the_id).className = "here";
		document.getElementById(the_id).scrollIntoView(false);
	}
}
//input name = id/name on input tag
//answer = integer answer to question
//range = numerical range (can be a float)
//div_name = feedback div id/name
//img_src = if there is an image swap with the image name 'q_img', this is the src file
function evalAnswer(input_name, answer, range, div_name, img_src, msg)
{
	temp = getValue(input_name);
	if (temp >= answer-range && temp <= answer+range){
		if(div_name != ''){
			showDiv(div_name);
			document.getElementById(div_name).scrollIntoView(false);
		}
		if(img_src != ''){document.images.q_img.src = "media/graphics/" + img_src;}
	}else{
		if (isNaN(temp))
			alert("This is not a valid response.\nPlease answer the question to continue.");
		else if(msg == '')
			alert("Your answer ("+temp+") is incorrect.");
		else
			alert("Your answer ("+temp+") is incorrect.\n" + msg);
	}
}

function selectStability(q_id, my_value)
{
//alert(q_id)
	var correct_ans = '';
	switch(q_id){
	  case 1: correct_ans = 'unstable';
	    break;
	  case 2: correct_ans = 'conditionally unstable';
	    break;
	  case 3: correct_ans = 'conditionally unstable';
	    break;
	  case 4: correct_ans = 'stable';
	    break;
	  case 5: correct_ans = 'neutral';
	    break;
	  case 6: correct_ans = 'stable';
	    break;
	  case 7: correct_ans = 'neutral';
	    break;
	  case 8: correct_ans = 'stable';
	    break;
	}
	//alert(correct_ans);
	if (my_value.toLowerCase() == correct_ans){
		if(global_temp != '')
			hideDiv(global_temp);
		answer_id = 'a'+q_id;
		displayDiv(answer_id);
		global_temp = answer_id;
		//document.div_id.scrollIntoView();
	}else{
		if(global_temp != '')
			hideDiv(global_temp);
		var select_id = 'q'+q_id;
		var feedback_id = 'f'+q_id;
		if(document.forms[0][select_id].selectedIndex == 0){
			document.getElementById(feedback_id).innerHTML = "Please make a selection.";
		}else{
			document.forms[0][select_id].selectedIndex = 0;
			document.getElementById(feedback_id).innerHTML = "Incorrect. The layer is not "+my_value.toLowerCase()+".";
		}
		displayDiv(feedback_id);
		global_temp = feedback_id;
	}
}


function evalSelect(select_id, my_value, correct)
{
	my_div = 'feedback' + select_id;
	if(my_value == correct){
		//showDiv(div_id);
		document.getElementById(my_div).innerHTML = "Yes, "+select_id+" is "+correct+".";
	}else{
		//alert("Your answer, "+my_value+", is incorrect.");
		document.forms[0][select_id].selectedIndex = 0;
		document.getElementById(my_div).innerHTML = "No, "+select_id+" = "+my_value+" is incorrect.";
	}
}

function swapImg(imgname,filename)
{
	document.images[imgname].src='media/graphics/'+filename;
}
function openWin(the_url){
	var link_win = window.open(the_url, 'new_win', 'width=450,height=320,scrollbars,resizable,menubar=no,toolbar=no,status=no,location=no,left=100,top=100');
	link_win.focus();
}
function openNewMod(the_url){
	var link_win = window.open(the_url, 'new_win', 'width=800,height=600,scrollbars,resizable,menubar=no,toolbar=no,status=no,location=no,left=100,top=100');
	link_win.focus();
}
function displayDiv(whichLayer)
{
	if (document.getElementById)
	{
		// for standards compliance browsers
		document.getElementById(whichLayer).style.display="block";
	}
	else if (document.all)
	{
		// for older IE
		document.all[whichLayer].style.display="block";
	}
}

function displayAndScrollDiv(whichLayer)
{
	if (document.getElementById)
	{
		// for standards compliance browsers
		document.getElementById(whichLayer).style.display="block";
		document.getElementById(whichLayer).scrollIntoView(false);
	}
	else if (document.all)
	{
		// for older IE
		document.all[whichLayer].style.display="block";
		document.getElementById(whichLayer).scrollIntoView(false);
	}
}
function hideDiv(whichLayer)
{
	if (document.getElementById)
	{
		// for standards compliance browsers
		document.getElementById(whichLayer).style.display="none";
	}
	else if (document.all)
	{
		// for older IE
		document.all[whichLayer].style.display="";
	}
}

function showSWF(swf_name,w,h){
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="'+w+'" height="'+h+'" align="right">');
	document.write('<param name=movie value="media/flash/'+swf_name+'.swf">');//cellgrow
	document.write('<param name=quality value=high>');
	document.write('<embed src="media/flash/'+swf_name+'.swf" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'" align="right">');//400, 320
	document.write('</embed></object>');
}
