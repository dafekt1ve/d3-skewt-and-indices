// DRAW TOOL 3.0 - 08/02/2016
$(document).ready(function () {
	$('.drawing-question').each(function() {
	   // Default Parameters
       var drw3Image = $(this).data('image');
	   var drw3Path = 'media/graphics/';
	   //var drw3Width = 640;
	   //var drw3Height = 480;
	   var drw3BrushSize = '4, 6, 8';	   		
	   var drw3Colors = '#f00, blue';
	   var drw3Labels = '';
	   
	   // Check if parameters are present, else use default
	   // Path
	   if ( $(this).data('path') ) {
		   drw3Path = $(this).data('path');
	   } else {}
	   
	   // Width & Height
	   //if ( $(this).data('width') ) { drw3Width = $(this).data('width'); } else{}
	   //if ( $(this).data('height') ) { drw3Height = $(this).data('height'); } else{}
	
	   // Brush Colors
	   var allBrushColors = '';
	   var h;
	   if ( $(this).data('colors') )
	   {
		   drw3Colors = $(this).data('colors');
		   		var colorData = drw3Colors.split(', ');
		   for (h = 0; h < colorData.length; h++){
		   		allBrushColors += '<div class="drawtool-swatch" style="background-color:' + colorData[h] + ';"></div>';
		   }
	   } else {
		   		var defaultColors = drw3Colors.split(', ');
		   for (h = 0; h < defaultColors.length; h++){
		   		allBrushColors += '<div class="drawtool-swatch" style="background-color:' + defaultColors[h] + ';"></div>';
		   }
		   //console.log('no data-colors present in div.drawing-question, default values assigned');
	   }
	   
	   // Brush Sizes
	   var allBrushSizes = drw3BrushSize;
	   var i;
	   if ( $(this).data('sizes') )
	   {
		   drw3BrushSize = $(this).data('sizes');
		   var sizeData = drw3BrushSize.split(', ');
		   for (i = 0; i < sizeData.length; i++){
		   		allBrushSizes += '<option value="' + sizeData[i] + '">' + sizeData[i] + '</option>';
		   }
		   
	   } else {
		   var defaultSizes = drw3BrushSize.split(', ');
		   for (i = 0; i < defaultSizes.length; i++){
		   		allBrushSizes += '<option value="' + defaultSizes[i] + '">' + defaultSizes[i] + '</option>';
		   }
		   //console.log('no data-sizes present in div.drawing-question, default values assigned');		     
	   }
	   $(this).find('option:first').attr('selected');
	   
	   
	   // Brush Labels
	   var labelsArray = [];	
	   var j;
	   if ( $(this).data('labels') )
	   {
		   drw3Labels = $(this).data('labels');
		   		var labelsData = drw3Labels.split(', ');
		   
		   for (j = 0; j < labelsData.length; j++){
			   labelsArray.push(labelsData[j]);		   
		   }
	   } else {}
	   	   
	   
	   // Construct Object
	   $(this).addClass('question-wrap-draw panel panel-default');
	   $(this).append('<div class="drawing-container center-block" title="' + drw3Path + drw3Image + '" ></div>');
			$(this).children('.drawing-container').append('<div class="canvas-wrap"></div>');
				$(this).children('.drawing-container').children('.canvas-wrap').append('<canvas class="drawing-canvas center-block" ></canvas>');
			$(this).children('.drawing-container').append('<div class="drawtool-controls row"></div>');
				//$(this).children('.drawing-container').children('.drawtool-controls').append('<div class="col-xs-12"></div>');
				$(this).children('.drawing-container').children('.drawtool-controls').append('<div class="drawtool-buttons col-xs-4"><input class="done btn btn-primary" type="button" value="Done"> <input class="reset btn btn-default" type="button" value="Reset"></div>');
	   			$(this).children('.drawing-container').children('.drawtool-controls').append('<div class="drawtool-toolset col-xs-8"><table class="table table-bordered"><thead><tr><th>Tool:</th><th>Tool Size:</th><th>Color:</th></tr></thead><tbody><tr><td class="drawtool-brushes"><div class="radio"><form class="brush-select"><label><input class="draw-pen" type="radio" name="draw-brush" checked="true" value="Pen"><span class="pen-icon"></span>Pen </label><label><input class="draw-eraser" type="radio" name="draw-brush" value="Eraser"><span class="eraser-icon"></span>Eraser </label></form></div></td><td class="drawtool-drawsize"><select class="drawsize form-control">' + allBrushSizes + '</select></td><td class="drawtool-palette">' + allBrushColors + '</td></tr></tbody></table></div>');
				
		// Push labels to brush colors [if colors and labels present]
		if ( $(this).data('colors') && $(this).data('labels') ) {
			for (h = 0; h < labelsArray.length; h++) {
				$(this).find('.drawtool-swatch').eq(h).attr('title', '' + labelsArray[h] + '');
			}
		} else {}
		
		// Move feedback after the drawing interaction
		$(this).children('.answer').appendTo(this);

    });
});


// Run start function
// ONLY after all content has been created and loaded.
$(window).on('load', function(){
	start();
});

// For IE
window.onload=start;


// DRAW TOOL 3.0 - Revised 11/28/17
// Last change log: Fixed for LC3 - Gary
function start(){
	// This array will store the restoration points of the canvas
	var restorePoints = [];
	var a=false;
	var b,c="";
	
	$(".drawing-canvas").each(function() {
		var i=$(this).index(".drawing-canvas");
		var d=$(".drawing-canvas")[i];
		var e=d.getContext("2d");	
		
		// Pick Initial Color and Initial Size
		e.strokeStyle=$(this).parent(".canvas-wrap").parent(".drawing-container").find(".drawtool-palette div:eq(0)").css("background-color");
		e.lineWidth=$(this).parent(".canvas-wrap").parent(".drawing-container").find(".drawsize").val();
		e.lineCap="round";

		
//		var w=$(this).parents(".canvas-wrap").width();
//		var h=$(this).parents(".canvas-wrap").height();
		
		$(window).resize( saveResizeAndRedisplay );
		
		function saveResizeAndRedisplay(){
			// save the canvas content as imageURL
			var data=d.toDataURL();
		
			// resize the canvas
			$(d).css("margin-top",-parseInt($(d).siblings("img").innerHeight(), 10));
			var w = parseInt($(d).siblings("img").innerWidth(), 10);
			var h = parseInt($(d).siblings("img").innerHeight(), 10);
			d.width = w;
			d.height = h;
			
			//d.width = $(this).parents(".canvas-wrap").width();
			//d.height = $(this).parents(".canvas-wrap").height();
			//alert($(container).width());
		
			// scale and redraw the canvas content
			var img = new Image();
				img.onload=function(){
					e.drawImage(img,0,0,w,h);
				};
			
				img.src=data;
			
			e.strokeStyle=$(d).parents(".drawing-container").find(".drawtool-palette").children("div:eq(0)").css("background-color");
			e.lineWidth=$(d).parents(".drawing-container").find(".drawtool-drawsize").children("select:first").val();
			e.lineCap="round";			
		}
		
		saveResizeAndRedisplay();	
		
		//if IE8 or older
		//var ver = parseInt($.browser.version);
		if (window.attachEvent){
			$(this).mousedown(function(d){
				console.log('HELLO!');
				a=true;
				e.save();
				b=d.pageX-$(this).offset().left;
				c=d.pageY-$(this).offset().top;
			});
			$(this).mouseout(function(){
				a=false;
			});
			$(document).mouseup(function(){
				a=false;
			});
			$(document).click(function(){
				a=false
			});			
			$(this).mousemove(function(d){
				if (a==true) {
					e.beginPath();
					e.moveTo(d.pageX-$(this).offset().left,d.pageY-$(this).offset().top);
					e.lineTo(b,c);
					e.stroke();
					e.closePath();
					b=d.pageX-$(this).offset().left;
					c=d.pageY-$(this).offset().top
				}
			});
				
		//else use this
		} else {
			
		var drawer = {
			isDrawing: false,
			touchstart: function(coors){
				e.beginPath();
				e.moveTo(coors.x, coors.y);
				this.isDrawing = true;
			},
			touchmove: function(coors){
				if (this.isDrawing) {
			        e.lineTo(coors.x, coors.y);
			        e.stroke();
				}
			},
			touchend: function(coors){
				if (this.isDrawing) {
			        this.touchmove(coors);
			        this.isDrawing = false;
				}
			},		
			mousedown: function(coors){
				e.beginPath();
				e.moveTo(coors.x, coors.y);
				this.isDrawing = true;
			},
			mousemove: function(coors){
				if (this.isDrawing) {
			        e.lineTo(coors.x, coors.y);
			        e.stroke();
				}
			},
			mouseup: function(coors){
				if (this.isDrawing) {
			        this.mousemove(coors);
			        this.isDrawing = false;
				}
			},
			mouseout: function(coors){
				if (this.isDrawing) {
			        this.mousemove(coors);
			        this.isDrawing = false;
				}
			}
		};
		// create a function to pass touch events and coordinates to drawer
		function drawTouch(event){
			// get the touch coordinates
			var coors = {
				x: event.targetTouches[0].pageX-$(this).offset().left,
				y: event.targetTouches[0].pageY-$(this).offset().top
			};
			// pass the coordinates to the appropriate handler
			drawer[event.type](coors);
		}
		
		function drawMouse(event){
			// get the mouse coordinates
			var coors = {
				x: event.pageX-$(this).offset().left,
				y: event.pageY-$(this).offset().top
			};
			// pass the coordinates to the appropriate handler
			drawer[event.type](coors);
		}
		
		// attach the touchstart, touchmove, touchend event listeners.
	    this.addEventListener('touchstart',drawTouch, false);
	    this.addEventListener('touchmove',drawTouch, false);
	    this.addEventListener('touchend',drawTouch, false);

		// attach the mousedown, mousemove, mouseup event listeners.
	    this.addEventListener('mousedown',drawMouse, false);
	    this.addEventListener('mousemove',drawMouse, false);
	    this.addEventListener('mouseup',drawMouse, false);
	    this.addEventListener('mouseout',drawMouse, false);
		
		// prevent elastic scrolling
		this.addEventListener('touchmove',function(event){
			event.preventDefault();
		},false);
		
		
		}//end IE8 or less else/if statement
		
		
		// DRAW 2.0 || Pen/Eraser Switch
		$(".drawtool-swatch").click(function() {
			$(this).parents(".drawtool-palette").siblings(".drawtool-brushes").find(".draw-pen").click();
		});
		
		// DRAW 2.0 || Brush Size
		$(".drawsize").change(function(a){
			var i=$(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".drawing-canvas").index(".drawing-canvas");
			var d=$(".drawing-canvas")[i];
			var e=d.getContext("2d");
			e.lineWidth=this.value;
		});
		
		// DRAW 2.0 || Color Palette
		$(".drawtool-palette").change(function(a){
			var i=$(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".drawing-canvas").index(".drawing-canvas");
			var d=$(".drawing-canvas")[i];
			var e=d.getContext("2d");
			e.strokeStyle=this.value
		});
		
		// DRAW 2.0 || Color Swatch Pick
		$(".drawtool-swatch").click(function(){
			var i=$(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".drawing-canvas").index(".drawing-canvas");
			var d=$(".drawing-canvas")[i];
			var e=d.getContext("2d");
			e.globalCompositeOperation = "source-over";
			e.strokeStyle=$(this).css("background-color");
			// Return to Pen Selected
			$(this).parents(".drawtool-palette").siblings(".drawtool-brushes").children(".draw-pen").prop("checked", true);
		});
		
		// DRAW 2.0 || Tooltip on Color Swatch hover
		$(".drawtool-swatch").tooltip();
		
		// DRAW 2.0 || Brush/Pen Selector
		$(".draw-pen").click(function() {
			var i=$(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".drawing-canvas").index(".drawing-canvas");
			var d=$(".drawing-canvas")[i];
			var e=d.getContext("2d");
			e.globalCompositeOperation = "source-over";
			e.strokeStyle=$(this).parents(".drawing-container").find(".drawtool-palette").children("div:eq(0)").css("background-color");
		});
		
		// DRAW 2.0 || Eraser Selector
		$(".draw-eraser").click(function() {
			var i=$(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".drawing-canvas").index(".drawing-canvas");
			var d=$(".drawing-canvas")[i];
			var e=d.getContext("2d");
			e.globalCompositeOperation = "destination-out";  
			e.strokeStyle = ("rgba(0,0,0,1.0)");
		});
		
		// DRAW 2.0 || Reset button
		$(".reset").click(function(){
			var i=$(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".drawing-canvas").index(".drawing-canvas");
			var d=$(".drawing-canvas")[i];
			var e=d.getContext("2d");
			e.globalCompositeOperation = "source-over";
			e.strokeStyle=$(this).parents(".drawing-container").find(".drawtool-palette").children("div:eq(0)").css("background-color");
			$(this).parents(".drawing-container").find(".drawtool-drawsize").find("select:first option").prop("selected","").closest("select").find("option:first").prop("selected","selected");
			e.lineWidth=$(this).parents(".drawing-container").find(".drawtool-drawsize").children("select:first").val();
			e.lineCap="round";
			e.clearRect(0,0,d.width,d.height);
		});
		
	
	});
}


// DRAW 2.0 || Brush Selector
$(function(){
	
  // DRAW 2.0 || Canvas Background
  $(".drawing-container").each(function() {
		var fileName = $(this).attr('title');
	    var ext = fileName.slice(-4);
	    var name = fileName.slice(0, -4);
	    var feedback_filename = name + "_feedback" + ext;
		var $this = $(this);
		$(this).find('.canvas-wrap').prepend('<img class="background img-responsive center-block" src="'+fileName+'" alt="background image" style="position: relative;"><img class="feedback img-responsive center-block" src="'+feedback_filename+'" alt="background image" style="position: relative; display: none;">');
/*		$(window).on("resize", function () {
			var width = parseInt($this.find('.canvas-wrap img').innerWidth(), 10);
			var height = parseInt($this.find('.canvas-wrap img').innerHeight(), 10);
			canv.prop("width",width);
			canv.prop("height",height);
			var negHeight = -height;
			canv.css("margin-top",negHeight);
		});*/
		var canv = $(this).find("canvas");
		$(this).find('.canvas-wrap img:first').on("load", function () {
			var width = parseInt($(this).innerWidth(), 10);
//			canv.width = width;  
			canv.prop("width",width);
		});
		$(this).find('.canvas-wrap img:first').on("load", function () {
			var height = parseInt($(this).innerHeight(), 10);
//			canv.height = height;
			var negHeight = -height;
			canv.css("margin-top",negHeight);
			canv.prop("height",height);
		});
		
		canv.css("position","relative");
		
//		$(this).find("canvas").prop("width", width).prop("height", height);

		$(this).children('.controls').children(".color_controls").children('div').each(function() {
			var clr = $(this).css("background-color");
			$(this).css({
				"background-color" : "" + clr + ""
			});
		});

  });
  
  
  
  
  // DRAW 2.0 || Buttons
  $("input").click(function() {	  
	  if ($(this).is(".done")) {
		  $(this).attr("disabled","disabled").addClass("btn-default").removeClass("btn-primary");
		  $(this).siblings("input.clear").addClass("reset").removeClass("clear").attr("value","Reset");

		  var fileName = $(this).parents(".drawing-container").attr('title');
		  var ext = fileName.slice(-4);
		  var name = fileName.slice(0, -4);
		  var feedback_filename = name + "_feedback" + ext;
		  $(this).parents('.drawtool-controls').siblings('.canvas-wrap').children('.feedback').show();
		  $(this).parents('.drawtool-controls').siblings('.canvas-wrap').children('.background').hide();
		  
  	  } else if ($(this).is(".reset")) {	
		  $(this).siblings("input.done").removeAttr("disabled").removeClass("btn-default").addClass("btn-primary");
		   var fileName = $(this).parents(".drawing-container").attr('title');
		  $(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".background").show();
		  $(this).parents(".drawtool-controls").siblings(".canvas-wrap").children(".feedback").hide();
		  $(this).parents('.drawtool-controls').find(".brush-select input:first").prop('checked', true);
  	  }
  });
  
  // Restore Done Button
  $(".done").removeAttr("disabled");
});