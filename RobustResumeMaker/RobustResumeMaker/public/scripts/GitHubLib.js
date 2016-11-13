/**
 * Created by monica on 11/12/16.
 */
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

function getResponseFromStackExchange (info){
}