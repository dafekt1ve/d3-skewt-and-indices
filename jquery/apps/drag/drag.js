// DRAG AND DROP WIDGET - Revised 9/25/14
$(document).ready(function(){


  // Initialize the DRAG AND DROP Container
  $(".drag-container").each(function(){
	// Create: Initial Image
	var fileName = $(this).attr('title');
	// Create: Feedback Image from Initial
	var ext = fileName.slice(-4);
	var name = fileName.slice(0, -4);
	var feedback_filename = name + "_feedback" + ext;
	// Display: Placeholder for Initial Image
	$(this).children('.image_holder').append('<img src="' +fileName+ '" class="img-responsive center-block" />');
	$(this).children('.image_holder').append('<img src="' +feedback_filename+ '" class="img-responsive center-block hidden" />');
	
  });
  
  $(".done_drag").removeAttr("disabled");
  
  $("input").click(function() {
	  if ($(this).is(".done_drag")) {
		  // Disable the DONE button
		  $(this).closest(".question-wrap-drag").find(".answer").show();
		  $(this).attr("disabled","disabled");
		  $(this).siblings("input.clear").addClass("reset_drag").removeClass("clear").attr("value","Reset");
		  
		  // Create: Feedback Image again
		  var fileName = $(this).parents(".drag-container").attr('title');
		  var ext = fileName.slice(-4);
		  var name = fileName.slice(0, -4);
		  var feedback_filename = name + "_feedback" + ext;
		  
		  // Remove original image when Done
		  $(this).parents('.drag_controls_holder').siblings('.image_holder').children('img').remove();
		  $(this).parents('.drag_controls_holder').siblings('.image_holder').append('<img src="' +feedback_filename+ '" class="img-responsive center-block" />');
		  
	  // Reset Button
  	  } else if ($(this).is(".reset_drag")) {	
	  	  $(this).closest(".question-wrap-drag").find(".answer").hide();	  
		  $(this).siblings("input.done_drag").removeAttr("disabled");
	
		  if ($(this).parents(".drag_controls_holder").siblings(".image_holder")) {
			  $(this).parents(".drag_controls_holder").siblings(".image_holder").children(".draggable").remove();
		  }
		  // Create variable for the feedback image
		  var fileName = $(this).parents(".drag-container").attr('title');
		  // Remove feedback image on Reset
		  $(this).parents('.drag_controls_holder').siblings('.image_holder').children('img').remove();
		  // Restore original image on Reset
		  $(this).parents('.drag_controls_holder').siblings('.image_holder').append('<img src="' +fileName+ '" class="img-responsive center-block" />');
		  // Restore draggable items on Reset
		  $(this).parents(".drag_controls_holder").children(".drag_controls").children(".draggable").each(function () {
			  $(this).css({
				  "left":"0px",
				  "top":"0px"
			  });
		  });
  	  }
  });

 
  // DRAGGABLE JQUERY UI functions
  $(".draggable").each(function() {
	  $(this).draggable({
		containment: $(this).parent().parent().parent(),
		scroll: false, // No-Scroll for touch screen devices while dragging.
		helper: "original",
		stack: ".drag_controls div"
	  })
	  if ($(this).hasClass("replenish")) {
		  $(this).draggable({
			helper: "clone",
			stop: function ( event, ui ) {
			   if ($(this).hasClass("replenish")) {
				   $(ui.helper).clone().draggable({
						containment: $(this).parent().parent().parent(),
						scroll: false, // No-Scroll for touch screen devices while dragging.
						stack: ".drag_controls div"
				   }).css({
					   left: ui.position.left,
					   top: ui.position.top
				   }).appendTo($(this).closest(".drag_controls_holder").siblings(".image_holder"));
				   $(ui.helper).remove();
			   }
			}
		  });
	  }
  });


});