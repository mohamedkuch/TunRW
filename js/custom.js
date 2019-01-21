$(window).scroll(function() {
  if ($(this).scrollTop() > 500) {
    $("#upArrow").addClass("pageUpArrow ");
 
  } else {
      $("#upArrow").removeClass("pageUpArrow ");
 
  }
});
$(document).ready(function(){
  $('.carouselSlick').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    speed: 300,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});