// jshint esversion: 6
// 64a7b6e7a6b09605da9887e6e47ac906-us20
// 8c3bb6ac42

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});


app.post('/', function (req, res) {

    var fName = req.body.inputFirstName;
    var lName = req.body.inputLastName;
    var email = req.body.inputEmail;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    var jasonData = JSON.stringify(data);

    // url 'https://usX.api.mailchimp.com/3.0/lists/205d96e6b4' 

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/8c3bb6ac42",
        method: "POST",
        headers: {
            "Authorization": "omar1 64a7b6e7a6b09605da9887e6e47ac906-us20"
        },
        body: jasonData
    };

    request(options, function (error, response, body) {
        if (error) {
            //res.send("Oops - there was an error - please try again :-(");
            res.sendFile(__dirname + "/failure.html");
            console.log(error);
        }
        else {
            if (response.statusCode === 200) {
                // res.write("<p> Success - you have added to the subcriber list!!!</p>");           
                // res.send();
                res.sendFile(__dirname + "/success.html");
            } else {
                // res.send("Oops - there was an error - please try again :-(");
                res.sendFile(__dirname + "/failure.html");
            }
            //console.log(response.statusCode);
        }
    });

});

app.post("/failure", function (req, res) {
    console.log("IN app.post('/failure', ...)");
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running  on port 3000 ...");
});


