/**
 * Created by monica on 11/12/16.
 */



function reqListener(){
     var response = JSON.parse(this.responseText);
    console.log(response);

        document.getElementById("ghUserInfo").innerHTML = response["name"];
        document.getElementById("userloc").innerHTML = response["location"];

        getrepos(response["subscriptions_url"]);
 }



function  getFirstName() {
    var query = window.location.search.valueOf()
    alert(query);
    document.getElementById("userDR").style.display = 'block';
    var ghUserID = document.getElementById("ghUserID").value;
    var soUserID = document.getElementById("soUserID").value;

    var qrcode = "http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=http://cp-1.testnj.nosql-json-pg0.utah.cloudlab.us:1337/mainPageForDR.html?gh="+
        ghUserID+"%26so="+soUserID;
    alert(qrcode);
    getResponseFromGitHub(ghUserID);

    // Thinks you want to get from Stack

    getResponseFromStackExchange(soUserID);
    
    //getResponseFromGitHub(userID+"/subscriptions");


}


function find(){
    var query = window.location.search.substring(1);
    alert(query);
    if (query!=''){
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0]=="gh")
                var info1 = pair[1];
            if(pair[0]=="so")
                var info2 = pair[1];
        }

        alert(info1, info2);



        document.getElementById("userDR").style.display = 'block';
        document.getElementById("tellUsMore").style.display = 'none';


        getResponseFromGitHub(info1);
        getResponseFromStackExchange(info2);
    }
    else{
        getFirstName();
    }

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



function getrepos(reposURL) {
    var request = new XMLHttpRequest();
    // Initialize a request
    request.addEventListener("load", repoListener);
    request.open('get', reposURL, true);


    // Send it
    request.send();

}


function repoListener(){
    var response = JSON.parse(this.responseText);
    console.log(response);
    var string = "";
    for (i = 0; i < response.length; i++) {
        string = string +
            "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span> "
            + " <a href=\"" + response[i]["html_url"] + "\"> " + response[i]["name"] + "</a>"+ "</br>";
    }

    document.getElementById("repoInfo").innerHTML = string
}