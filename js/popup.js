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
