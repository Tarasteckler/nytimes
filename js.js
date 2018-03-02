$(document).ready(function(){
    $("#keywordButton").on("click", function(){
        var query = document.getElementById("query").value;
        apiCall1 (query);
    });
    $("#criticButton").on("click", function(){
       var reviewer = document.getElementById("reviewer").value;
       apiCall2(reviewer);
    });


    function apiCall1(query) {
        var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
        url += '?' + $.param({
            'api-key': "194df81489684dcba00e052c6f81f2a6",
            'query' : query
        });
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (result) {
            console.log(result);
            getInfo(result);
        }).fail(function (err) {
            throw err;
        });
    }

    function apiCall2(reviewer) {
        var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
        url += '?' + $.param({
            'api-key': "194df81489684dcba00e052c6f81f2a6",
            'reviewer': reviewer
        });
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (result) {
            console.log(result);
            getInfo(result);
        }).fail(function (err) {
            throw err;
        });
    }

    function getInfo(result){
        console.log(pic);
        for (i = 0; i < result.results.length; i++){
            var pic = result.results[i].multimedia.src;
            console.log(pic);
            document.getElementById("reviewInfo").innerHTML += "<tr><td>" + result.results[i].display_title +
                "</td><td>" + result.results[i].byline + "</td><td><img src=" + pic + "></td><td>" + result.results[i].summary_short + "</td><td>review here</td>";
        }
    }

});