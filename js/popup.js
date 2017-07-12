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

$
// slide menu
var showing = false;

$(function() {
    $('.concept-collection').hide();
    var showingConcepts = false;
    
    $('.sliiider-toggle').click(function() {
        if (showing) {
            $("#menu").slideUp();
            $('#close').html('<i class="fa fa-chevron-down fg-lg" aria-hidden="true"></i>');
        } else {
            $("#menu").slideDown();
            $('#close').html('<i class="fa fa-chevron-up fg-lg" aria-hidden="true"></i>');
        }
        showing = !showing;
    });
    
    $('.folder-card').click(function() {
        if (showingConcepts) {
            $('.concept-collection').slideUp();
        } else {
            $('.concept-collection').slideDown();
        }
        showingConcepts = !showingConcepts;
    });
    
});