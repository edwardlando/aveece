
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



    // Infinite scroll 
    var $container = $('#container');
	  // trigger Masonry as a callback
/*	  function( newElements ) {
	    var $newElems = $( newElements ); // need to get the new elements with a GET request
	  //  $container.masonry({'appended', $newElems });
	    $container.imagesLoaded(function(){ 
	    $container.masonry({ itemSelector : '.box' });

	  });
	  }; */

	// Modals
	var overlayed = false;
	function overlay() {
			overlayed = !overlayed;
	    if (overlayed == true) {
	    	$("#overlay").attr({"class": "active"}); 
	    	$("#overlay").show();
	    } else {
	    	$("#overlay").hide();
	    };
	};

//	$("#add").on("click", function(event) {
	//	overlay();
	//});

	$(document).click(function(e){
		var target = (e.target);
		var id = e.target.id;
		if ($(target).is('#add'))
			overlay();
		else if (($(target).is("#overlay"))) {
		//	if (!($(target).is("#add")))
				if (overlayed) 
					overlay();
			}
	});


});