
$(document).ready(function() {

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

    // Masonry for images
	var $container = $('#container');

	$container.imagesLoaded(function(){
	  $container.masonry({
	    itemSelector : '.box'
	  });
	});
   

    // Infinite scroll 
    var $container = $('#container');
	$container.infinitescroll({
	    // infinite scroll options...
	  },
	  // trigger Masonry as a callback
	  function( newElements ) {
	    var $newElems = $( newElements ); // need to get the new elements with a GET request
	    $container.masonry( 'appended', $newElems );
	  }
	);


	// Modals
	var overlayed = true;
	function overlay() {
		overlayed = !overlayed;
	    if (overlayed == false) {
	    	$("#overlay").attr({"class": "active"}); 
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