// StackExchangeLib.js
var SEKey = 'QZM9sJ9hrP4Fj1a3GF4FzQ((';
var SESite = 'stackoverflow';
var RESTVerification = '?site=' + SESite +'&key=' + SEKey;
var RESTHeader = "https://api.stackexchange.com/2.2/";
var SEUserTags = []
var SETagsPopular = [];



function generateTagsString(){
    var tagsString = "";
    var i = 0;
    for(i = 0; i < SEUserTags.length - 1; i++) {
        tagsString = tagsString + SEUserTags[i]["name"] + ";";
    }
    tagsString = tagsString + SEUserTags[i]["name"];

    return tagsString;
}

function seUserTopTagsCallback(){
    var response = JSON.parse(this.responseText);

    var tags = response["items"];

    // Save everything in a JSON Array
    var i = 0;
    var jsonTags = '[';
    for(i = 0; i < tags.length -1; i++){
        jsonTags = jsonTags + '{"name":"' + tags[i]["name"] + '","count":"' + tags[i]["count"] +'"},';
    }
    jsonTags = jsonTags + '{"name":"' + tags[i]["name"] + '","count":"' + tags[i]["count"] +'"}]';

    // Parse the JSON Array String to Objects
    SEUserTags.length = 0;
    SEUserTags = JSON.parse(jsonTags)

    var strings = generateTagsString()
    var string = ""
    for(var i = 0; i < 4; i++){
        string = string +
            "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span> "
            + SEUserTags[i]["name"] + "  <span class=\"badge\">" + SEUserTags[i]["count"] + "</span></br>";
    }
    //use id = involve
    document.getElementById("involve").innerHTML = string
    var APICALL = APICallTagInfo.replace("$TAG", strings)

    console.log("XX> " + APICALL)
}

// Since this call does not requiere the user ID, we can put it here
var APICallTagInfo = RESTHeader + 'tags/$TAG/info?order=desc&sort=popular&site=stackoverflow';

function getDataFromStack(stackUserIdM){
    var stackUserId = ""

    if(stackUserIdM == ""){
        stackUserId = document.getElementById('soUserID').value;
    }
    else{
        stackUserId = stackUserIdM;
    }

    if (stackUserId!=""){
        document.getElementById("soName").innerHTML = " <a href=\"http://stackoverflow.com/u/"
            + stackUserId + "\"> My StackExchange Profile</a>";

        var APICallUserInfo = RESTHeader + 'users/' + stackUserId + RESTVerification;
        var APICAllTopTags = RESTHeader + 'users/' + stackUserId + '/tags' + RESTVerification + '&order=desc&sort=popular';

        getResponseFromStackExchange(APICallUserInfo, seUserInfoCallback);
        getResponseFromStackExchange(APICAllTopTags, seUserTopTagsCallback);
    }

    
}

function getResponseFromStackExchange (APICall, callback){
    var request = new XMLHttpRequest();
    
    request.addEventListener("load", callback);
    request.open('get', APICall, true);
    request.send();
}

function seUserInfoCallback(){
    var response = JSON.parse(this.responseText);

    var badges = response["items"][0]["badge_counts"];

    var seUserReputation = response["items"][0]["reputation"];
    var seUserBadgeBronze = badges["bronze"];
    var seUserBadgeSilver = badges["silver"];
    var seUserBadgeGold = badges["gold"];

    // Here you populate the components instead of writing to the console
    //use this id="badgeInfo"
    document.getElementById("repu").innerHTML = seUserReputation+" Reputation";
    document.getElementById("gold").innerHTML = "Gold <span class=\"badge\">"+seUserBadgeGold+"</span>";
    document.getElementById("silver").innerHTML = "Silver <span class=\"badge\">"+seUserBadgeSilver+"</span>";
    document.getElementById("bronze").innerHTML = "Bronze <span class=\"badge\">"+seUserBadgeBronze+"</span>";

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


