/**
 * Created by monica on 11/12/16.
 */
function  processRequest(e) {
    if (request.readyState ==4 && response.status == 200){
        var response = JSON.parse(request.responseText);

    }
}

function reqListener(){
    //console.log(this.responseText);
    var response = JSON.parse(this.responseText);
    console.log(response);
    document.getElementById("ghUserInfo").innerHTML = response["id"];
}

function  getFirstName() {
    var userID = document.getElementById("ghUserID").value;
    console.log(userID);
    var request = new XMLHttpRequest();
// Initialize a request
    var APIcall = "https://api.github.com/users/" + userID;
    request.addEventListener("load", reqListener);
    console.log(APIcall);
    request.open('get', APIcall, true);
// Send it
    request.send();
    //request.onreadystatechange = processRequest;


    document.getElementById("ghUserInfo").innerHTML = response;


}

