var http = require('http');
var port = process.env.port || 1337;
var express = require('express');
var app = express();
global.mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var https = require('https');
var url = require('url');

//////////////////////////////////////////////////////////////
// Change your API keys received from developer.linkedin.com below
var APIKey = "788mmi3lsbxzk2";
var APIKeySecret = "Xs7PLi0gQ9vvSJs3";

var port1 = process.env.PORT || 8080; // set our port

// #HOSTING, this was host in cloudlab, please change it
var host = "cp-1.njstest.nosql-json-pg0.utah.cloudlab.us"
console.log(">>> Hosting application in: " + host);

var callbackURL = "http://" + host + ":" + port1 + "/auth/linkedin";
var APIVersion = "v1";

// These are all of the scope variables. Remove them based on your needs
var APIScope = 'r_basicprofile r_emailaddress'

var router = express.Router;

// configuration ===========================================

// config files
 
var db = require('./config/db');

// connect to our mongoDB database (commented out after you enter in your own credentials)
global.connectionsubject = mongoose.createConnection(db.urlSubjectViews);


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//routes ==================================================
require('./app/route')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 				    		// expose app

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(8080);

//////////////////////////////////////////////////////////////
// Create your API server
http.createServer(function (req, response) {

    // Make sure the browser isn't requesting a /favicon.ico
    if (req.url != '/favicon.ico') {

        // Check to see if authorization for end user has already been made and skip Oauth dance
        var cookies = {};
        req.headers.cookie && req.headers.cookie.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            cookies[ parts[ 0 ].trim() ] = (parts[ 1 ] || '').trim();
        });

        // If we have the access_token in the cookie skip the Oauth Dance and go straight to Step 3
        if (cookies['LIAccess_token']) {
            // STEP 3 - Get LinkedIn API Data
            // console.log("we have the cookie value" + cookies['LIAccess_token']);
            OauthStep3(req, response, cookies['LIAccess_token'], APICalls['peopleSearchWithKeywords']);

        } else {
            var queryObject = url.parse(req.url, true).query;

            if (!queryObject.code) {
                // STEP 1 - If this is the first run send them to LinkedIn for Auth
                OauthStep1(req, response);
            } else {
                // STEP 2 - If they have given consent and are at the callback do the final token request
                OauthStep2(req, response, queryObject.code);
            }
        }
    }

// Ensure your server's listening port matches your callbackURL port on Line 11 above
}).listen(port1);
console.log('Visit http://127.0.0.1:1337/ in your browser to test the LinkedIn Oauth2 API Authentication');

var RandomState = function (howLong) {

    howLong = parseInt(howLong);

    if (!howLong || howLong <= 0) {
        howLong = 18;
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (var i = 0; i < howLong; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

//////////////////////////////////////////////////////////////
// Oauth Step 1 - Redirect end-user for authorization
var OauthStep1 = function (req, response) {

    console.log("Step1");

    response.writeHead(302, {
        'Location': 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + APIKey + '&scope=' + APIScope + '&state=RNDM_' + RandomState(18) + '&redirect_uri=' + callbackURL
    });
    response.end();
};

//////////////////////////////////////////////////////////////
// Oauth Step 2 - The callback post authorization
var OauthStep2 = function (request, response, code) {

    console.log("Step2");

    var options = {
        host: 'api.linkedin.com',
        port: 443,
        path: "/uas/oauth2/accessToken?grant_type=authorization_code&code=" + code + "&redirect_uri=" + callbackURL + "&client_id=" + APIKey + "&client_secret=" + APIKeySecret
    };

    var req = https.request(options, function (res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function (d) {
            // STEP 3 - Get LinkedIn API Data
            // We have successfully completed Oauth and have received our access_token.  Congrats!
            // Now let's make a real API call (Example API call referencing APICalls['peopleSearchWithKeywords'] below)
            // See more example API Calls at the end of this file

            access_token = JSON.parse(d).access_token;

            var ExpiresIn29days = new Date();
            var in30days = new Date();
            ExpiresIn29days.setDate(in30days.getDate() + 29);
            response.writeHead(200, {
                'Set-Cookie': 'LIAccess_token=' + access_token + '; Expires=' + ExpiresIn29days
            });

            OauthStep3(request, response, access_token, APICalls['myProfile'], APICalls['myConnections']);
        });
    });

    req.on('error', function (e) {
        console.error("There was an error with our Oauth Call in Step 2: " + e);
        response.end("There was an error with our Oauth Call in Step 2");
    });
    req.end();
};
//////////////////////////////////////////////////////////////
// Oauth Step 3 - Now you can make a real API call
// Get some real LinkedIn data below
var OauthStep3 = function (request, response, access_token, APICall, callback) {

    console.log("Step3");

    if (APICall.indexOf("?") >= 0) {
        var JSONformat = "&format=json";
    } else {
        var JSONformat = "?format=json";
    }

    var options = {
        host: 'api.linkedin.com',
        port: 443,
        path: '/' + APIVersion + '/' + APICall + JSONformat + "&oauth2_access_token=" + access_token
    };

    var req = https.request(options, function (res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function (d) {
            // We have LinkedIn data!  Process it and continue with your application here
            // apiResponse =JSON.parse(d)
            response.end(d);
            console.log(d);
				// YOUR NEXT STEP HERE
        });
    });

    req.on('error', function (e) {
        console.error("There was an error with our LinkedIn API Call in Step 3: " + e);
        response.end("There was an error with our LinkedIn API Call in Step 3");
    });
    req.end();
};
//////////////////////////////////////////////////////////////
// Some Example API Calls - Change in Step 3 accordingly
// More information can be found here: http://developer.linkedin.com/rest
var APICalls = [];

// My Profile and My Data APIS
APICalls['myProfile'] = 'people/~:(first-name,last-name,headline,picture-url)';
APICalls['myConnections'] = 'people/~/connections';
APICalls['myNetworkShares'] = 'people/~/shares';
APICalls['myNetworksUpdates'] = 'people/~/network/updates';
APICalls['myNetworkUpdates'] = 'people/~/network/updates?scope=self';

// PEOPLE SEARCH APIS
// Be sure to change the keywords or facets accordingly
APICalls['peopleSearchWithKeywords'] = 'people-search:(people:(id,first-name,last-name,picture-url,headline),num-results,facets)?keywords=Hacker+in+Residence';
APICalls['peopleSearchWithFacets'] = 'people-search:(people,facets)?facet=location,us:84';

// GROUPS APIS
// Be sure to change the GroupId accordingly
APICalls['myGroups'] = 'people/~/group-memberships?membership-state=member';
APICalls['groupSuggestions'] = 'people/~/suggestions/groups';
APICalls['groupPosts'] = 'groups/12345/posts:(title,summary,creator)?order=recency';
APICalls['groupDetails'] = 'groups/12345:(id,name,short-description,description,posts)';

// COMPANY APIS
// Be sure to change the CompanyId or facets accordingly
APICalls['myFollowingCompanies'] = 'people/~/following/companies';
APICalls['myFollowCompanySuggestions'] = 'people/~/suggestions/to-follow/companies';
APICalls['companyDetails'] = 'companies/1337:(id,name,description,industry,logo-url)';
APICalls['companySearch'] = 'company-search:(companies,facets)?facet=location,us:84';

// JOBS APIS
// Be sure to change the JobId or facets accordingly
APICalls['myJobSuggestions'] = 'people/~/suggestions/job-suggestions';
APICalls['myJobBookmarks'] = 'people/~/job-bookmarks';
APICalls['jobDetails'] = 'jobs/1452577:(id,company:(name),position:(title))';
APICalls['jobSearch'] = 'job-search:(jobs,facets)?facet=location,us:84';
