$(window).scroll(function() {
  if ($(this).scrollTop() > 500) {
    $("#upArrow").addClass("pageUpArrow ");
 
  } else {
      $("#upArrow").removeClass("pageUpArrow ");
 
  }
});
