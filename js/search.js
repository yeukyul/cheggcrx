/* respnsible for all the research calls */


$(function() {
    
    // obtain 
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        var selected_text = selection[0];
        console.log(selected_text);
        if (selected_text) {
          getWikipediaExtract(selected_text);
        }
    });
    
    $('#concept-search').submit(function() {
        console.log("you pressed submit");
        var search_term = $('#search-keyword').val();
        getWikipediaExtract(search_term);
        event.preventDefault();
    });
    
    /* opensearch */
    $("#search-keyword").keyup(function() {
        var search_term = $('#search-keyword').val();
        console.log("keyup! ", search_term);
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&format=json&search=' + search_term,
            type: 'GET',
            dataType: "json",
            success: function(data) {
                console.log("got response", data[1]);
                displayLiveSearchResult(search_term, data[1]);
            },
            error: function(e) {
                console.log("doesn't work");
                console.log(e);
            }
        });
    });
        
});

function displayLiveSearchResult(search_term, suggestion) {
    
    if (!suggestion && !search_term) {
        $('.search-result').html('');
        $('.link-to-chegg').show();
    } else if (!suggestion) {
        showFailureResult(search_term);
    } else {
        var display_list = "<ul>";
        for (var i = 0; i < suggestion.length; i++) {
            display_list = display_list + "<li>" + suggestion[i] + "</li>";
        }
        display_list = display_list + "</ui>";
        console.log(display_list);
        $('.search-result').html(display_list);
        $('.link-to-chegg').hide();
    }
    
}


function getWikipediaExtract(search_term) {
    // run concept search
    $.ajax({
         url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' 
                + search_term,
         type : 'GET',
         success: function(data){
            var page_id = Object.keys(data['query']['pages'])[0];
            var page = data['query']['pages'][page_id];
            var extract = page['extract'];
            var title = page['title'];
            var subject = "";
            if (page_id === '-1') {
                showFailureResult(title);
            } else {
                showSearchResult(title, subject, extract);
            }
         },
         error: function(){
           showFailureResult(title);
         }
    });
}




// placeholder: here before front-end is ready
function showSearchResult(title, subject, extract) {
    if (!extract) {
        showFailureResult(title);
    } else {
        $('.search-result').html(extract);
    }
}

function showFailureResult(title) {
    $('.search-result').html("<div class='centered no-result'>Sorry, no extract relevant to " + title + " available. </div>");
}

function errorOccured() {
    $('.search-result').html("Sorry, an unknown error occured. Please try again.");
}
