# GithubIssueTracker
Tracks open issues from a Github repo link.

* How to use:

Enter the repository link for which you would like to track the issues.
Eg: Shippable/support/issues

If the upper limit for the REST call attempts are reached for you, the generate the authentication token from your github account and enter in the authentication field.

Press track to see the issue count update in the table below.

If items 2,3,4 do not update in the first attempt, try again.

* Architecture:

This application is scaffolded using yoeman-webapp and uses jQuery, Bootstrap.

On insertion of the path, the app uses the github API to fetch the data about the open issues in the respective repository.

On finding the number of open issues, it fires separate AJAX calls to fetch these issues and then filters the data on the basis of their "created_at" tag.

On the basis of the created_at tag, the issues are separated out into 3 baskets:
	1. Opened in the last 24 hours.
	2. Opened in the last week.
	3. Opened before last week.

This data is further manipulated to get the information shown in the UI.

* Heroku Link:

[Github Issue tracker](https://issue-tracker-heroku.herokuapp.com/)
 Facing some deployment issue on Heroku.