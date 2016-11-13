// StackExchangeLib.js
var SEKey = 'QZM9sJ9hrP4Fj1a3GF4FzQ(('
var SESite = 'stackoverflow'

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


