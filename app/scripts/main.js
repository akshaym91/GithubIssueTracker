/**
 * [Function called when the Track button is clicked on the UI]
 * @param  {[type]} ) 
 * @return {[type]}   [description]
 */
$("#trackButton").click(function() {
    findTotalOpenIssues();
    makeAllAjaxRequests(parseInt($("#totalOpenIssues")[0].innerHTML));
});

function findTotalOpenIssues() {
    /**
     * [location Reads the url to parse and modify]
     * @type {[type]}
     */
    var location = $("#url")[0].value;
    var myUrl;
    if ($("#auth-token")[0].value != "") {
        myUrl = 'https://api.github.com/repos/' + location.substring(0, location.lastIndexOf('/')) + '?access_token=' + $("#auth-token")[0].value;
    } else {
        myUrl = 'https://api.github.com/repos/' + location.substring(0, location.lastIndexOf('/'));
    }
    $.ajax({
        type: "GET",
        url: myUrl,
        dataType: "json",
        success: function(json) {
            $("#totalOpenIssues")[0].innerHTML = json.open_issues;
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });
}
/**
 * [makeAllAjaxRequests Takes the totalNumber of issues and fires multiple ajax request to get the paginated response.]
 * @param  {[type]} totalIssues [Takes the total number of open issues as parameter]
 * @return {[type]}             [none]
 */
function makeAllAjaxRequests(totalIssues) {
    $("#last24hours")[0].innerHTML = 0;
    $("#last7days")[0].innerHTML = 0;
    $("#earlierThanThat")[0].innerHTML = 0;
    /**
     * [location Reads the url to parse and modify]
     * @type {[type]}
     */
    var location = $("#url")[0].value;
    var myUrl;
    /**
     * [dateTodayISO ISO formatted current date]
     * @type {String}
     */
    var dateTodayISO = (new Date(new Date().getTime())).toISOString();
    /**
     * [dateYesterdayISO ISO formatted date 24 hours before current date]
     * @type {String}
     */
    var dateYesterdayISO = (new Date(new Date().getTime() - 60 * 60 * 24 * 1000)).toISOString();
    /**
     * [dateAWeekBeforeISO ISO formatted date 1 week before current date]
     * @type {String}
     */
    var dateAWeekBeforeISO = (new Date(new Date().getTime() - 60 * 60 * 24 * 1000 * 7)).toISOString();
    /**
     * [noOfPagesToGet Total number of paged responses]
     * @type {integer}
     */
    var noOfPagesToGet = Math.floor(totalIssues / 30);
    for (var i = 0; i < noOfPagesToGet; i++) {
        if ($("#auth-token")[0].value != ""){
            myUrl = 'https://api.github.com/repos/' + location + '?page=' + (i + 1) + '&access_token=' + $("#auth-token")[0].value;
        } else {
            myUrl = 'https://api.github.com/repos/' + location + '?page=' + (i + 1);
        }
        $.ajax({
            type: "GET",
            url: myUrl,
            dataType: "json",
            success: function(json) {
                $.grep(json, function(element, index) {
                    if (element.created_at >= dateYesterdayISO) {
                        $("#last24hours")[0].innerHTML = parseInt($("#last24hours")[0].innerHTML) + 1;
                    }
                    if (element.created_at < dateYesterdayISO && element.created_at >= dateAWeekBeforeISO) {
                        $("#last7days")[0].innerHTML = parseInt($("#last7days")[0].innerHTML) + 1;
                    }
                    if (element.created_at < dateAWeekBeforeISO) {
                        $("#earlierThanThat")[0].innerHTML = parseInt($("#earlierThanThat")[0].innerHTML) + 1;
                    }

                });
            },
            error: function(xhr) {
                alert(xhr.responseText);
            }
        });
    }
}