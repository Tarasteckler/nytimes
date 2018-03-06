$(document).ready(function(){

    $("#reviewInfo").hide();
    document.getElementById("error").innerHTML = "";

    $("#keywordButton").on("click", function(){

        console.log(document.getElementById("query").value);
        if(document.getElementById("query").value === ""){
            $("#reviewInfo").hide();
            document.getElementById("error").innerHTML = "Please enter a valid movie title.";
        }else{
            document.getElementById("error").innerHTML = "";
            var query = document.getElementById("query").value;
            apiCall1 (query);
            document.getElementById("query").value = "";
            document.getElementById("reviewInfo").innerHTML = "<tr><td>Title</td><td>Critic</td><td>Picture</td><td>Summary</td><td>Review</td>"
        }
    });

    $("#criticButton").on("click", function(){

        if(document.getElementById("critics").value === "null"){
            $("#reviewInfo").hide();
            document.getElementById("error").innerHTML = "Please select a critic.";
        }else{
            document.getElementById("error").innerHTML = "";
            var reviewer = document.getElementById("critics").value;
            console.log(reviewer);
            console.log(document.getElementById("critics").value);
            apiCall2(reviewer);
            document.getElementById("reviewInfo").innerHTML = "<tr><td>Title</td><td>Critic</td><td>Picture</td><td>Summary</td><td>Review</td>";
        }
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
        $("#reviewInfo").show();
        if(result.results.length === 0){
            $("#reviewInfo").hide();
            document.getElementById("error").innerHTML = "There were no results. Please try again.";
        }else{
            for (i = 0; i < result.results.length; i++){
                var url = result.results[i].link.suggested_link_text;
                var link = url.link(result.results[i].link.url);
                if (result.results[i].multimedia === null){
                    document.getElementById("reviewInfo").innerHTML += "<tr><td>" + result.results[i].display_title +
                        "</td><td>" + result.results[i].byline + "</td><td> No image :( </td><td>" + result.results[i].summary_short +
                        "</td><td>" + link + "</td>";
                }else{
                    var pic = result.results[i].multimedia.src;
                    document.getElementById("reviewInfo").innerHTML += "<tr><td>" + result.results[i].display_title +
                        "</td><td>" + result.results[i].byline + "</td><td><img src=" + pic + "></td><td>" + result.results[i].summary_short +
                        "</td><td>" + link + "</td>";
                }
            }
        }
    }
});