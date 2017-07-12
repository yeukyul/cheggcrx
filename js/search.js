/* respnsible for all the research calls */


$(function() {
    
    $('.concept-definition').hide();
    $('.footer').hide();
    hideStudyQuestion();
    
    $('.search-bar').slideDown("slow");
    
    // obtain 
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        var selected_text = selection[0];
        if (selected_text) {
          getWikipediaExtract(selected_text);
        }
    });
    
    // allow arrow key to move down the list
    var $listItems = $('li');
    $('input').keydown(function(e) {
        var key = e.keyCode,
            $selected = $listItems.filter('.selected'),
            $current;
        if ( key != 40 && key != 38 ) return;
        $listItems.removeClass('selected');
        // down key
        if ( key == 40 ) {
            if ( ! $selected.length || $selected.is(':last-child') ) {
                $current = $listItems.eq(0);
            }
            else {
                $current = $selected.next();
            }
        }
        // Up key
        else if ( key == 38 ) {
            if ( ! $selected.length || $selected.is(':first-child') ) {
                $current = $listItems.last();
            }
            else {
                $current = $selected.prev();
            }
        }
        $current.addClass('selected');
    });
    
    $("li").click(function() {
        alert($(this).html()); // gets innerHTML of clicked li
        alert($(this).text()); // gets text contents of clicked li
    });
    
    // for wikipedia query submit
    $('#concept-search').submit(function() {
        var search_term = toTitleCase($('#search-keyword').val());
        getWikipediaExtract(search_term);
        event.preventDefault();
    });
    
    /* opensearch */
    $("#search-keyword").keyup(function() {
        var search_term = toTitleCase($('#search-keyword').val());
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&format=json&search=' + search_term,
            type: 'GET',
            dataType: "json",
            success: function(data) {
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
        var display_list = "<ul class='live-search-list'>";
        for (var i = 0; i < suggestion.length; i++) {
            display_list = display_list + "<li class='live-search-item'>" + suggestion[i] + "</li>";
        }
        display_list = display_list + "</ui>" 
                + "<div class='fixed-size container centered see-more'>" 
                + "<button class='btn-primary btn-lg'>"
                + "<a href='http://www.chegg.com/search/"
                + search_term
                + "'></a>SEE MORE AT CHEGG.COM</button></div>";
        $('.search-result').html(display_list);
        $('.link-to-chegg').hide();
        $('.concept-definition').html('');
        hideStudyQuestion();
        hideAvailableTutor();
        $('.footer').hide();
    }
    
}


function getWikipediaExtract(search_term) {
    // run concept search
    $.ajax({
         url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageterms&exintro=&explaintext=&titles=' 
                + search_term,
         type : 'GET',
         success: function(data){
            var page_id = Object.keys(data['query']['pages'])[0];
            var page = data['query']['pages'][page_id];
            var extract = page['extract'];
            var title = page['title'];
             console.log(page);
            var subject = page["terms"] ? page["terms"]["description"] : "";
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
        $('.link-to-chegg').hide();
        var explanation = "<div class='concept-title row'>"
        + "<div class='col-sm-8'>"
        + "<h1>" + toTitleCase(title) + "</h1>"
        + (subject? 
           ("<h5 class='concept-subtitle'> as " + subject + "</h5>") : "")
        + "</div>"
        + "<div class='col-sm-4'>"
        //+ "<i class='fa fa-plus fa-lg' aria-hidden='true'></i>"
        + "</div>"
        + "</div>";
        explanation = explanation + "<p>" + extract + "</p>";
        $('.search-result').html('');
        $('.concept-definition').html(explanation);
        $('.concept-definition').show();
        showStudyQuestion(title);
        showAvailableTutor(title);
        $('.footer').show();
    }
}

function showFailureResult(title) {
    $('.search-result').html("<div class='centered no-result'>Sorry, no extract relevant to <strong>" + title + "</strong> available. </div>");
}

function errorOccured() {
    $('.search-result').html("Sorry, an unknown error occured. Please try again.");
}

function toTitleCase(str) {
    return str;
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// event listener for search item click
$('.live-search-item').click(function(el) {
    var search_string = el.val();
    console.log(search_string);
})


function selectItem() {
    
}

function showStudyQuestion(search_term) {
    $('.study-question').show();
    $('.study-question').html(
        '<hr>'
        + '<div class="section-header">'
        + 'CHEGG STUDY QnA'
        + '</div>'
        +'<div class="question">' 
            + '<strong>Q: Why is '
            + search_term
            + ' useful?</strong>'
            + '<br>'
            + 'A: According to textbook, '
            + search_term 
            + ' is...'
            + '<a href="http://chegg.com">'
            + '<small>see more >></small>'
            + '</a>'
            + '</div>'
        +'<div class="question">' 
            + '<strong>Q: What are some application of '
            + search_term
            + '?</strong>'
            + '<br>'
            + 'A: '
            + search_term 
            + ' is a the fundamental...'
            + '<a href="http://chegg.com">'
            + '<small>see more >></small>'
            + '</a>'
            + '</div>');
}

function hideStudyQuestion() {
     $('.study-question').hide();
}

function showAvailableTutor(search_term) {
    $('.tutors').show();
    $('.tutors').html(
        '<hr>'
        + '<div class="section-header">'
        + 'AVAILBLE CHEGG TUTOR'
        + '</div>');
}
        
function hideAvailableTutor() {
    $('.tutors').hide();
}