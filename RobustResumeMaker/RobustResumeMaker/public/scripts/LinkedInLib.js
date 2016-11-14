    var dataJ

function onLinkedInLoad() {
IN.Event.on(IN, "auth", onLinkedInAuth);
}
function onLinkedInAuth() {
    document.getElementById("logedin").style.display = 'block';
IN.API.Profile("me")
.fields("firstName", "lastName", "industry", "location:(name)", "picture-url", "headline", "summary", "num-connections", "public-profile-url", "positions", "email-address", "educations")
.result(collectProfilesData)
}

function collectProfilesData(profiles) {
    member = profiles.values[0];
    dataJ=JSON.stringify(member);
    console.log(dataJ)
    document.getElementById("Name").innerHTML = member.firstName + " " + member.lastName
    document.getElementById("lblName").innerHTML = member.firstName + " " + member.lastName
    document.getElementById("lblLocation").innerHTML= member.location.name
    document.getElementById("lblPosition0").innerHTML= member["positions"]["values"][0]["company"]["name"]
    document.getElementById("lblPosition1").innerHTML= member["positions"]["values"][0]["title"]
    document.getElementById("lblSummary").innerHTML = member["positions"]["values"][0]["summary"];
    //console.log(member["positions"]["values"][0]["company"]["name"])
    document.getElementById("lblEmail").innerHTML = member.emailAddress;
    document.getElementById("lblProfile").innerHTML = member.publicProfileUrl;			
    document.getElementById("imageid").src=member.pictureUrl;			
    document.getElementById("lblHeadline").innerHTML= member.headline
    document.getElementById("lblProfile").innerHTML = " <u><a href=\"" + member.publicProfileUrl + "\"> Here</a></u>";
}