$( function() {
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });
  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };
  // bind filter button click
  $('.filters-button-group').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

});


$(function () {
	var $container = $('.grid');

	$('.grid-item').imagesLoaded(function () {
		$container.isotope({ });
	});
	$('#myModal').on('hidden.bs.modal',function(){
		$(this).removeData('bs.modal')
	});
});
   
  $is_login = false;
  function is_login() {
    $.ajax({
      type: "GET",
      url: "/api/login",
      dataType: "json",
      success: function(data) {
        $is_login = data[0].username;
      }
    });
  }

$(document).ready(function(){
  is_login()
  // like_count
  $(document).on("click", "a.like_count", function() {
    return false;
  });
  $(window).scroll(function(){
    var scrollHeight = $(window).scrollTop()+$(window).height();
    var documentHeight= $(document).height();
    if(scrollHeight == documentHeight){
      $("<h1>무한 스크롤</h1>").appendTo("body");
      //put in here
    }
  })
  // movie
  $(document).on("click","a.like", function() {
         //$(this).addClass('like');
      if($is_login){
        $obj =  $(".like_count");
        $.getJSON('/api/count', function(data) {
          $.each(data, function(entryIndex, entry) {
            $obj.text(entry.like_count);  
          });
        });
      }
      else{
        alert('로그인 필요');
      }
    return false;
  });
});


