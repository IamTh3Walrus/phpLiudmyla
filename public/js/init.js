(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.carousel').carousel();
    $('.parallax').parallax();
    $('.materialboxed').materialbox();
  
// Moves the carousel
    $('.carousel').carousel();
      setInterval(function() {
        $('.carousel').carousel('next');
      }, 4000); // every 2 seconds
  }); // end of document ready
})(jQuery); // end of jQuery name space
