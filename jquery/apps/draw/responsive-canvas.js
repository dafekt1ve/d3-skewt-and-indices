// CANVAS DRAWING TOOL - Resizeable Canvas
$(function(){
  		
  		//Get the canvas & context
  		var c = $('.responsive-canvas');
  		var ct = c.get(0).getContext('2d');
  		var container = $(c).parent();
  		
  		//Run function when browser  resize
	  	$(window).resize (respondCanvas);
	  	
	  	function respondCanvas(){
  			c.attr('width', $(container).width() ); //max width
  			c.attr('height', $(container).height() ); //max height
  			
  			//Redraw & reposition content
  			var x = c.width();
  			var y = c.height();
  			ct.font = "20px Calibri";
  			
  			ct.fillStyle = "#222"; // Canvas Background
  			ct.fillRect( 0, 0, x, y); // fill the canvas
  			
  			var resizeText = "Canvas Width: "+c.width()+"px";
  			ct.textAlign = "center";
  			ct.fillStyle = "#fff"; // Text Color
	  		ct.fillText(resizeText, (x/2), (y/2) );
		}
		
		// Initial call
		respondCanvas();
});