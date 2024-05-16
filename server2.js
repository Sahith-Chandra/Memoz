/*
 * Collaborators:   Chandra Sahith, Andrew Inman, & Preet Patel
 * Name:    MEMOZ
 */

var fs = require("fs")
var express = require('express')
var exphbs = require('express-handlebars')

var app = express()
var port = process.env.PORT || 7300

var userData = require("./userData.json")

app.engine('handlebars', exphbs.engine({ defaultLayout: "layout" }))
app.set('view engine', 'handlebars')

app.use(express.json())

// Use .css, .js, and .png files
app.use(express.static('static'))


// Render homepage
app.get('/', function (req, res) {
    res.status(200).render("homepage")
})

// Handle username/password checks
app.post('/', function (req, res) {
    // Get access to the username passed by post
    var userName = req.body.userName

    // Compare against the usernames in the .json file
    if (userData[userName]) {
        // If it is in the database, check the password
        var userPassword = req.body.userPassword

        // Compare against the username's password in the .json file
        if (userData[userName]["password"] === userPassword) {
            // The username and password check out, so we send a good response
            res.status(200).send("Valid credentials.")
            res.end()
        }
        else {
            // The username is not in the database, so we render a bad response
            res.status(401).send("Invalid credentials.")
            res.end()
        }
    }
    else {
        // The username is not in the database, so we render a bad response
        res.status(401).send("Invalid credentials.")
        res.end()
    }
})

// Render register page
app.get('/register', function (req, res) {
    res.status(200).render("register")
})

// Handle regestration of new users
app.post('/register', function (req, res) {
    // Get access to the new username and password
    var newUsername = req.body.userName
    var newPassword = req.body.passWord

    // Create the new user data object
    userData[newUsername] = {
        "password": newPassword,
        "stickies": []
    }

    // Write to userData.json
    fs.writeFile(
        "./userData.json",
        JSON.stringify(userData, null, 2),
        function (err) {
            if (err) {
                res.status(500).send("Error writing new user to DB")
                res.end()
            } else {
                res.status(200).send("New user successfully added to DB")
                res.end()
            }
        }
    )
})

// Renders main page
app.get('/main/:username', function (req, res) {
    var userName = req.params.username
    res.status(200).render('main', {
        username: userName,
        userStickyNotes: userData[userName].stickies
    })
})

// Adds new stickynote to database
app.post('/main', function (req, res) {
    // Add the sticky note to the local representation of the database
    userData[req.body.userName].stickies.push(req.body.stickyInfo)

    // Rewrite the database
    fs.writeFile(
        "./userData.json",
        JSON.stringify(userData, null, 2),
        function (err) {
            if (err) {
                res.status(500).send("Error writing sticky to DB")
                res.end()
            } else {
                res.status(200).send("Sticky successfully added to DB")
                res.end()
            }
        }
    )

    
})

// Render 404 page
app.get('*', function (req, res) {
    res.status(404).render('404')
})

// Get the server listening
app.listen(port, function () {
    console.log("Server is listening on port: ", port)
})
