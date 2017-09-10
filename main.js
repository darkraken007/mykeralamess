var http = require('http');
var express = require('express');
var Session = require('express-session');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var path = require('path');
const ClientId = "303439398728-3pb3fc30vveotv1b8glfihmplptg9pp0.apps.googleusercontent.com";
const ClientSecret = "vIyBNFvlBJ2rzJw6YuvS7l1b";
const RedirectionUrl = "http://www.mykeralamess.com/thankyou";

//starting the express app
var app = express();

//using session in express
app.use(Session({
    secret: 'kraygasm2017#007',
    resave: true,
    saveUninitialized: true
}));


var port = 8080;
var server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
    console.log(`listening to ${port}`);
});


function getOAuthClient () {
    return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}

function getAuthUrl () {
    var oauth2Client = getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = [
      'https://www.googleapis.com/auth/plus.me'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes // If you only need one scope you can pass it as string
    });

    return url;
}


app.use("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'))
});