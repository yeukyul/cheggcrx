/*
 * author: yeukyulee
 * date: Jul 11, 2017
 * popup.js - manage window activity
 */

console.log('hello');

$('#close').hover(function() {
    $('#close').html('<i class="fa fa-folder" aria-hidden="true"></i>');
}, function() {
    $('#close').html('<i class="fa fa-folder-o" aria-hidden="true"></i>');
});


// slide menu
/* not working now, ignore */
/*
var settings = {
      		toggle: ".sliiider-toggle", 
      		exit_selector: ".slider-exit", 
      		animation_duration: "0.5s", 
     		place: "right", 
      		animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)",
      		body_slide: true, 
     		no_scroll: false, 
            auto_close: false
};

var menu = $('#menu').sliiide(settings);

*/