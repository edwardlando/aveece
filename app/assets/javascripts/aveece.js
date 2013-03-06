
$(document).ready(function() {

    /*
    // Masonry
	var $container = $('#container');

	$container.imagesLoaded(function(){
	  $container.masonry({
	    itemSelector : '.box'
	  });
	});
    */

    // Stops Devise from signing out user when Ajax POST request is made
	$.ajaxSetup({
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader('X-CSRF-Token',
	        $('meta[name="csrf-token"]').attr('content'));
	    }
	});

	jQuery.ajaxSetup({ 
		'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")} 
	});

	// Modals
	var overlayed = true;
	function overlay() {
		overlayed = !overlayed;
	    if (overlayed == false) {
	    	$("#overlay").show();
	    } else {
	    	$("#overlay").hide();
	    };
	};

	$("#add").on("click", function(event) {
		overlay();
	});

	$("#closeOverlay").on("click", function(event) {
		overlay();
	});


});