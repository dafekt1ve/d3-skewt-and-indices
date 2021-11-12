$(document).ready(function(){
  var forms = document.getElementsByTagName("form");
  for (var i=0; i<forms.length; i++) {
    forms[i].reset();
  }
  
 $(".show_after").hide();
   
  // MULTIPLE CHOICE RADIO BUTTON
  $(".radio .submit_button").click(function(){
	var my_boolean=false;
	for (i=1; i< this.form.length-1; i++){
		if (this.form[i].checked==true){
			my_boolean = true;
		}
	}//end for loop
	

		if (my_boolean){
			//alert(i);
		  $(this).parent().parent().parent().children(".answer")
		  .css("display", "block");
		  $(this).parent().parent().parent().children(".message")
		  .css("display", "none");
		  $(this).siblings(".correct")
		  .addClass("correct_answer");
		  $(this).closest(".question_wrap").next(".show_after").show();
		}else{
			$(this).parent().parent().parent().children(".answer")
		  .css("display", "none");
			$(this).parent().parent().parent().children(".message")
		  .css("display", "block");
		   $(this).siblings(".correct")
		  .removeClass("correct_answer");
		  $(this).closest(".question_wrap").next(".show_after").show();
		}//end if else

  });
  
  // CHECKBOXES
  $(".checkboxes .submit_button").click(function(){
	var my_boolean=false;
	for (i=1; i< this.form.length-1; i++){
		if (this.form[i].checked==true){
			my_boolean = true;
		}
	}//end for loop
	

		if (my_boolean){
			//alert(i);
		  $(this).parent().parent().parent().children(".answer")
		  .css("display", "block");
		  $(this).parent().parent().parent().children(".message")
		  .css("display", "none");
		  $(this).siblings(".correct")
		  .addClass("correct_answer");
		  $(this).closest(".question_wrap").next(".show_after").show();
		}else{
			$(this).parent().parent().parent().children(".answer")
		  .css("display", "none");
			$(this).parent().parent().parent().children(".message")
		  .css("display", "block");
		   $(this).siblings(".correct")
		  .removeClass("correct_answer");
		  $(this).closest(".question_wrap").next(".show_after").show();
		}//end if else
		
		

  });
  
  // INLINE DROPDOWNS
  $(".dropdown .submit_button").click(function(){
	$(this).parent().children(".dropdown_correct")
	.css("display","block");
	$(this).parent().parent().parent().children(".answer")
      .css("display","block");
	  $(this).siblings(".correct")
      .addClass("correct_answer");
	  $(this).closest(".question_wrap").next(".show_after").show();
  });
  
	
  $(function() {
		$( ".sortIt" ).sortable();
		$( ".sortIt" ).disableSelection();
	});
	
	
	
	
	// CANVAS DRAWING TOOL and drag and drap image holder
  $(".container").each(function(){
	var fileName = $(this).attr('title');
	$(this).removeAttr('title');
	$(this).children('canvas, .drag').css('background-image','url(' + fileName + ')');
	$(this).children('.controls').children(".color_controls").children('div').each(function() {
			var clr = $(this).css("background-color");
			if (clr.indexOf("(") != -1) {
				var rgb = clr.split("(")[0];
				//alert(rgb);
				var tones = clr.split("(")[1];
				//alert(tones);
				tones = tones.split(")")[0];
				//alert(tones);
				tones = tones.split(",");
				//alert(tones);
			}

			if (rgb === "rgb") {
				clrrgb = clr;
			} else if (rgb === "rgba") {
				clrrgb = "rgb(" + tones + ")"
			} else {
				clrrgb = clr;
			}

			$(this).css({
				"background-color" : "" + clrrgb + ""
			});
	});
  });
  
  $(".done").removeAttr("disabled");
  
//  $(".done").click(function() {
  $("input").click(function() {
	  if ($(this).is(".done")) {
		  $(this).attr("disabled","disabled");
		  $(this).siblings("input.clear").addClass("reset").removeClass("clear").attr("value","Reset");
		  var image = $(this).parents('.controls').siblings('.can, .drag').css('background-image');
		  if (image.indexOf('_feedback') >= 0) {
			  fileName = image.replace(/_feedback/ig,"");
			  $(this).parents('.controls').siblings('.can, .drag').css('background-image','' + fileName + '');
		  } else {  
			  if ($.browser.msie) {
				  image = image.split('"');
				  image = image[1].split("/");
				  image = image.slice(-1)[0];
				  name = image.split(".");
				  ext = name.slice(-3);
				  name = name.slice(0,-4);
			  } else if ($.browser.mozilla) {
				  image = image.split('"');
				  image = image[1].split("/");
				  image = image.slice(-1)[0];
				  name = image.split("\.");
				  ext = name[1];
				  name = name[0];
			  } else if ($.browser.webkit) {
				  image = image.split(/\//);
				  image = image.slice(-1)[0];
				  image = image.replace(/\)/g, '');
				  ext = image.slice(-3);
				  name = image.slice(0,-4);
			  }
			  fileName = name + "_feedback." + ext;
			  $(this).parents('.controls').siblings('.can, .drag').css('background-image','url(' + fileName + ')');
		  }
  	  } else if ($(this).is(".reset")) {		  
		  $(this).siblings("input.done").removeAttr("disabled");
		  if ($(this).parents(".controls").siblings(":first").is(".can")) {
			  $(this).addClass("clear").removeClass("reset").attr("value","Clear");
		  }
		  var image = $(this).parents('.controls').siblings('.can, .drag').css('background-image');
		  fileName = image.replace(/_feedback/ig,"");
		  $(this).parents(".controls").siblings(".can, .drag").css("background-image","" + fileName + "");
		  $(this).parents(".controls").children(".drag_controls").children(".draggable").each(function () {
			  $(this).css({
				  "left":"0px",
				  "top":"0px"
			  });
		  });
  	  }
  });
  
  

});


function toggleLayer(whichLayer)
{
	if (document.getElementById)
	{
		// for standards compliance browsers
		var styleOnOff = document.getElementById(whichLayer).style;
		styleOnOff.display = styleOnOff.display = "block";

	}
	else if (document.all)
	{
		// for older IE
		var styleOnOff = document.all[whichLayer].style;
		styleOnOff.display = styleOnOff.display = "block";

	}
}
