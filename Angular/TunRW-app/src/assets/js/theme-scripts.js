// hide #back-top first
$("#back-top").hide();

$(window).scroll(function() {
    if ($(document).scrollTop() > 80) {
        $('.navbar').addClass('navbar-shrink');
        $('#back-top').fadeIn();
        $('#back-top').removeClass('hideButton');


        $('.navbar-brand').addClass('darkLogo');
        $('.navbar-brand').removeClass('lightLogo');

        
    }
    else {
        $('.navbar').removeClass('navbar-shrink');
        $('#back-top').fadeOut();
        $('#back-top').addClass('hideButton');


        $('.navbar-brand').addClass('lightLogo');
        $('.navbar-brand').removeClass('darkLogo');

    }
});


  // fade in #back-top

  $(window).scroll(function () {


    if ($(this).scrollTop() > 80) {
      $('.counter').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');
        $({ countNum: $this.text()}).animate({
          countNum: countTo
        },
        {
          duration: 2000,
          easing:'linear',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }
        });
      });
    }

  });

  // scroll body to 0px on click
  $('#back-top a').on("click", function(){
  	$('body,html').animate({
  		scrollTop: 0
  	}, 800);
  	return false;
  });

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

