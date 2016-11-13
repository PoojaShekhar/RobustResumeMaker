/**
 * Created by monica on 11/12/16.
 */

var SEKey = 'QZM9sJ9hrP4Fj1a3GF4FzQ(('
var SESite = 'stackoverflow'

var functionality = "";
function reqListener(){
     var response = JSON.parse(this.responseText);
    console.log(response);
    if (functionality=="post name"){

        document.getElementById("ghUserInfo").innerHTML = response["name"];
        document.getElementById("userloc").innerHTML = response["location"];
    }
    if (functionality=="social"){
        for (i = 0; i < response.length; i++) {
            document.getElementById("ghUserInfo").innerHTML = document.getElementById("ghUserInfo").innerHTML +response[i]["name"];
        }
    }

    //getresponse(response["subscriptions_url"]);
 }



function  getFirstName() {
    document.getElementById("userDR").style.display = 'block';
    var ghUserID = document.getElementById("ghUserID").value;
    var soUserID = document.getElementById("soUserID").value;

    functionality = "post name";
    getResponseFromGitHub(ghUserID);

    // Thinks you want to get from Stack

    getResponseFromStackExchange(soUserID);
    
    //getResponseFromGitHub(userID+"/subscriptions");


}

function getResponseFromGitHub (info){
    var request = new XMLHttpRequest();
    // Initialize a request
    var APIcall = "https://api.github.com/users/" + info;
    request.addEventListener("load", reqListener);
    request.open('get', APIcall, true);

    // Send it
    request.send();
}

function getResponseFromStackExchange (stackUserId){
    var request = new XMLHttpRequest();
    var RESTCall = 'users'
    var RESTVerification = '?site=' + SESite +'&key=' + SEKey

    // Initialize a request
    var APIcall = "https://api.stackexchange.com/2.2/" + 
        RESTCall + "/" + stackUserId + RESTVerification;

    request.addEventListener("load", seUserInfoCallback);
    request.open('get', APIcall, true);

    // Send it
    request.send();
}

function seUserInfoCallback(){
    var response = JSON.parse(this.responseText);

    var badges = response["items"][0]["badge_counts"]

    var seUserReputation = response["items"][0]["reputation"]
    var seUserBadgeBronze = badges["bronze"]
    var seUserBadgeSilver = badges["silver"]
    var seUserBadgeGold = badges["gold"]

    console.log(">>> USER INFO")
    console.log(">>> Rep: " + seUserReputation)
    console.log(">>> Gold: " + seUserBadgeGold)
    console.log(">>> Silver: " + seUserBadgeSilver)
    console.log(">>> Bronze: " + seUserBadgeBronze)

}

function seUserTopTagsCallback(){
    var response = JSON.parse(this.responseText);

    var badges = response["items"][0]["badge_counts"]

    var seUserReputation = response["items"][0]["reputation"]
    var seUserBadgeBronze = badges["bronze"]
    var seUserBadgeSilver = badges["silver"]
    var seUserBadgeGold = badges["gold"]

    console.log(">>> USER INFO")
    console.log(">>> Rep: " + seUserReputation)
    console.log(">>> Gold: " + seUserBadgeGold)
    console.log(">>> Silver: " + seUserBadgeSilver)
    console.log(">>> Bronze: " + seUserBadgeBronze)

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



