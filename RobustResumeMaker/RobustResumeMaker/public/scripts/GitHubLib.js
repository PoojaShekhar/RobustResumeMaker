/**
 * Created by monica on 11/12/16.
 */
var functionality = "";
function reqListener(){
     var response = JSON.parse(this.responseText);
    console.log(response);
    if (functionality=="post name"){
        document.getElementById("ghUserInfo").innerHTML = response["name"];
    }
    if (functionality=="social"){
        for (i = 0; i < response.length; i++) {
            document.getElementById("ghUserInfo").innerHTML = document.getElementById("ghUserInfo").innerHTML +response[i]["name"];
        }
    }

    //getresponse(response["subscriptions_url"]);
 }

function  getFirstName() {
    var userID = document.getElementById("ghUserID").value;

    functionality = "post name";
    getResponse(userID);

    functionality = "social";
    getResponse(userID+"/subscriptions");


}

function getResponse (info){
    var request = new XMLHttpRequest();
    // Initialize a request
    var APIcall = "https://api.github.com/users/" + info;
    request.addEventListener("load", reqListener);
    request.open('get', APIcall, true);

    // Send it
    request.send();
}

