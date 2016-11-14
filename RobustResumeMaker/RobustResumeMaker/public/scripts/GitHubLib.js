/**
 * Created by monica on 11/12/16.
 */

var GitUserLanguages = [];

var languages="";
function reqListener(){
     var response = JSON.parse(this.responseText);
    console.log(response);

        document.getElementById("ghUserInfo").innerHTML = response["name"];
        document.getElementById("ghName").innerHTML = " <a href=\"" + response["html_url"] + "\"> "+
            response["name"] + "'s Profile</a>";

        document.getElementById("userloc").innerHTML = response["location"];

        getrepos(response["subscriptions_url"]);
 }

function getFirstName() {
    document.getElementById("userDR").style.display = 'block';
    document.getElementById("tellUsMore").style.display = 'none';
    var ghUserID = document.getElementById("ghUserID").value;
    var soUserID = document.getElementById("soUserID").value;

    var qrcode = "http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl="+
        "http://cp-1.testnj.nosql-json-pg0.utah.cloudlab.us:8080/mainPageForDR.html?gh="+
        ghUserID+"%26so="+soUserID;

    showQRcode(qrcode);

    getResponseFromGitHub(ghUserID);

    GitUserLanguages.length = 0;
    getLanguagesFunc(ghUserID)

}

function showQRcode(url){
    document.getElementById("qr").innerHTML ="<img src=\"" + url +"\">";
}

function find(){
    var query = window.location.search.substring(1);
    if (query!=''){
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0]=="gh")
                var info1 = pair[1];
            if(pair[0]=="so")
                var info2 = pair[1];
        }


        document.getElementById("userDR").style.display = 'block';
        document.getElementById("tellUsMore").style.display = 'none';
        document.getElementById("qr").style.display = 'none';
        document.getElementById("shareqr").innerHTML = '{Thank} you for visiting my D.R.';


        getResponseFromGitHub(info1);
        getResponseFromStackExchange(info2);
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

function getLanguagesFunc(githubId){
    var repAPIcall = "https://api.github.com/users/" + githubId+"/repos";
    var repRequest = new XMLHttpRequest();

    repRequest.addEventListener("load", reqLangListener);
    repRequest.open("get", repAPIcall, true);

    //Send it
    repRequest.send();
}



function reqLangListener() {
    var responseLang = JSON.parse(this.responseText);

    for(var i = 0; i < responseLang.length; i++){
        var langURL = responseLang[i]["languages_url"];

        var newReq = new XMLHttpRequest();
        newReq.addEventListener( "load", getLanguages(printAllLanguages));
        newReq.open("get",responseLang[0]["languages_url"], true );
        newReq.send();
    }

}

function printAllLanguages(){
    for(var i = 0; i < GitUserLanguages.length; i++){
        console.log("::::> " + GitUserLanguages[i])
    }
}

function  getLanguages(cb) {
    var responseLang = JSON.parse(this.responseText);
    for (i=0;  i<Object.keys(responseLang).length; i++) {
        GitUserLanguages.push(Object.keys(responseLang)[i]);
    }
    cb();
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

    stringLang = 
    "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span> "+ " <a href=#>Java</a>"+ "</br>" +
    "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span> "+ " <a href=#>Javascript</a>"+ "</br>" +
    "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span> "+ " <a href=#>Scala</a>"+ "</br>" +
    "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span> "+ " <a href=#>Apache-Spark</a>"+ "</br>";

    document.getElementById("repoInfo").innerHTML = string
    document.getElementById("langInfo").innerHTML = stringLang
}