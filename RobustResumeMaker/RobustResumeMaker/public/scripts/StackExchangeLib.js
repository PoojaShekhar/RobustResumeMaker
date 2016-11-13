// StackExchangeLib.js
var SEKey = 'QZM9sJ9hrP4Fj1a3GF4FzQ((';
var SESite = 'stackoverflow';
var RESTVerification = '?site=' + SESite +'&key=' + SEKey;
var RESTHeader = "https://api.stackexchange.com/2.2/";

function getDataFromStack(){
	var stackUserId = document.getElementById('txtStackId').value;

	console.log(">>> USERID: " + stackUserId);

	var APICallUserInfo = RESTHeader + 'users/' + stackUserId + RESTVerification;
	var APICAllTopTags = RESTHeader + 'users/' + stackUserId + '/top-tags' + RESTVerification;
	var APICallTagInfo = RESTHeader + 'tags/$TAG/info?order=desc&sort=popular&site=stackoverflow';

	getResponseFromStackExchange(APICallUserInfo, seUserInfoCallback);
	getResponseFromStackExchange(APICAllTopTags, seUserTopTagsCallback)

}

function getResponseFromStackExchange (APICall, callback){
    var request = new XMLHttpRequest();
    
    request.addEventListener("load", callback);
    request.open('get', APICall, true);
    request.send();
}

function seUserInfoCallback(){
    var response = JSON.parse(this.responseText);

    var badges = response["items"][0]["badge_counts"]

    var seUserReputation = response["items"][0]["reputation"]
    var seUserBadgeBronze = badges["bronze"]
    var seUserBadgeSilver = badges["silver"]
    var seUserBadgeGold = badges["gold"]

    // Here you populate the components instead of writing to the console
    console.log(">>> USER INFO")
    console.log(">>> Rep: " + seUserReputation)
    console.log(">>> Gold: " + seUserBadgeGold)
    console.log(">>> Silver: " + seUserBadgeSilver)
    console.log(">>> Bronze: " + seUserBadgeBronze)

}

function seUserTopTagsCallback(){
    var response = JSON.parse(this.responseText);

    var jsonTags = "["
    var tags = response["items"]
    var i = 0
    for(i = 0; tags.length -1; i++){
    	jsonTags += "{'name':" + tags[i]["name"] + ",'count':" + tags[i]["count"] +"},"
    }
    jsonTags += "{'name':" + tags[i]["name"] + ",'count':" + tags[i]["count"] +"}]"

    var test = JSON.parse(jsonTags)
    for(tag in test){
    	console.log(">>> TAG: " + tag["name"] + " COUNT: " + tag["count"])
    }
}

 // function stackCallback(){
 //     var response = JSON.parse(this.responseText);
 //     console.log(">> Respionse from STACK")
 //     console.log(response);

 //     // Hasti's 4204212
 //     // USER-INFO
 //     CALL: https://api.stackexchange.com/2.2/users/4204212?site=stackoverflow&key=QZM9sJ9hrP4Fj1a3GF4FzQ((
 //     items[0]["reputation"]
 //     items[0]["badges_count"] => bronze, silver, gold

 //     // TOP-TAGS
 //     CALL: https://api.stackexchange.com/2.2/users/4204212/top-tags?site=stackoverflow
 //     items[i] => count, name

 //     // HOW RELEVANT A TAG IS
 //     CALL: https://api.stackexchange.com/2.2/tags/scala/info?order=desc&sort=popular&site=stackoverflow
 //     items[i] => name, count



 //     document.getElementById("ghUserInfo").innerHTML += '$' + response["name"];
 //     document.getElementById("userloc").innerHTML += '$' + response["location"];   
 //    //getresponse(response["subscriptions_url"]);
 // }


