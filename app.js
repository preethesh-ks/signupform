const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const nodemailer = require('nodemailer');


const app = express();

app.use(express.static("public")); ///required to get css and other sources into server //create a folder called public and store css and images there and specify the path leaving public
app.use(bodyparser.urlencoded({
    extended: true
})); //initilise body parser to actually work or to tell app yo use bodyparsr

//const mail1 = req.body.email;


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Signup.html")
});



app.post("/", function (req, res) {
    const firstName = req.body.first;
    const lastName = req.body.second;
    const mail = req.body.email;
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"ggg@gmail.com",
        pass:""
    },
    tls:{
        rejectUnauthorized: false,
    },
})
let mailOptions = {
    from:"crystalclearray@gmail.com",
    to: mail,
    subject:"SIGNED UP TO NEWS LETTER",
    text:"THANK YOU FOR JOINING OUR NEWSLETTER"
}
transporter.sendMail(mailOptions,function(err,sucess){
    if(err){
        console.log(error);
    }
    else{
        console.log("email sent sucessfully");
    }
})



    const data = {
        members: [{
            email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/e7a7d6b35d"
    const options = {
        method: "POST",
        auth: "darkness:APIKEYHERE-us20"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/sucess.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();



});

app.post("/failure", function (req, res) {
    res.redirect("/")
});



app.listen(process.env.PORT || 3000, function () {
    console.log("server working on port 3000");
});
console.log("hi how are");

//
//uid
//test id emmi
