/* respnsible for all the research calls */


$(function() {
    
    
    console.log('search.js');
    
    $('#concept-search').submit(function() {
        console.log("you pressed submit");
        var search_term = $('#search-keyword').val();
        // run concept search
        $.ajax({
             url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' 
                    + search_term,
             type : 'GET',
             success: function(data){
                console.log(data);
                var page_id = Object.keys(data['query']['pages'])[0];
                var page = data['query']['pages'][page_id];
                var extract = page['extract'];
                var title = page['title'];
                var subject = "";
                showSearchResult(title, subject, extract);
             },
             error: function(){
               console.log('failure in getting wikipedia response');
             }
        });
        event.preventDefault();
    });
        
});


// placeholder: here before front-end is ready
function showSearchResult(title, subject, extract) {
    $('.search-result').html(extract);
}