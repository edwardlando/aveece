
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



		// variable to hold request
		var request;
		var image;
		var form_price;
		// bind to the submit event of our form
		$("#url_submit").click(function(){

				var url_text = $("#url_text").val();
		    // abort any pending request
		    if (request) {
		        request.abort();
		    }

		    // fire off the request to /form.php
		    var request = $.ajax({
		        url: "/create_item",
		        type: "get",
		        data: "url="+url_text
		    });

		    // callback handler that will be called on success
		    request.done(function (response, textStatus, jqXHR){

//		    	alert(response);
		    	obj = response;
		    	$("#img1").attr("src",obj[0]);

		  //  	$("#img2").attr("src",obj[1]);
		   // 	$("#img3").attr("src",obj[2]);
		 
		    	$("img").attr("visibility","visible");

		    	image = obj[0];

		    	$("#url_submit").click(function(){
		    	
		    		form_price = $("#price").val();
		        
		        request = $.ajax({
		        	url: '/create_item',
		        	type: 'get',
		        	data: 'url='+url_text+'&image='+image+'&price='+form_price
		        });

		        request.done(function(response,textStatus,jqXHR){
		     //   	alert("Great work. Item added! ;)");
		        });

		        request.fail(function(jqXHR,textStatus,errorThrown){
		        	alert("Uh-oh! Something went wrong, and we're looking into it :(");
		        });

		        request.always(function(){
		        	overlay();
		        	$("#img1").attr("src","");
		        });

		       });

		    });

		    // callback handler that will be called on failure
		    request.fail(function (jqXHR, textStatus, errorThrown){
		        // log the error to the console
		        alert("no, bitch. Either wrong url or fucking sign in already");
		    });

		    // callback handler that will be called regardless
		    // if the request failed or succeeded
		    request.always(function () {
		        // reenable the inputs
		//        overlay();
		    });

		    // prevent default posting of form
		    event.preventDefault();
		});


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


    // Item modal

    function fillModalPage() { // populates the page with the item info

    }
    
    var database_item;
    function getItemFromSrc(src) {
		var data = {
			"src": src
		};
		$.ajax({
			type: 'GET',
			url: "/items.json",
			data: data,
			dataType: "json",
			success: function(data) {
				database_item = data;
				//fillModalPage();
				alert(database_item.url);
			}
		});
	}


    var item; // keep track of the item clicked
    var item_src;
	var item_overlayed = false;
	function item_overlay() {
			item_overlayed = !item_overlayed;
	    if (item_overlayed == true) {
	    	$("#item_overlay").attr({"class": "active"}); 
            item_src = item.src;
            getItemFromSrc(item_src); // query to the database


	    	$("#item_overlay").show();
	    } else {
	    	$("#item_overlay").hide();
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
	    else if ($(target).is('.box')) {
	    	item = target;
	    	item_overlay();
	    }
		else if (($(target).is("#overlay"))) {
		//	if (!($(target).is("#add")))
				if (overlayed) 
					overlay();
		}
		else if (($(target).is("#item_overlay"))) {
		//	if (!($(target).is("#add")))
				if (item_overlayed) 
					item_overlay();
		}
	});


});