/*
 * Collaborators:   Chandra Sahith, Andrew Inman, & Preet Patel
 * Name:    MEMOZ
 */

//-------------------------------------------------

// Global variables
const stickyTotal = 12
var stickyColor = 0
var numStickies = 5         // FIXME!!!

// Add event listeners to buttons
var homepageLoginButton = document.getElementById("homepage-login-button")
if (homepageLoginButton) {
    homepageLoginButton.addEventListener("click", login)
}

var registerButton = document.getElementById("register-button")
if (registerButton) {
    registerButton.addEventListener("click", register)
}

var settingsButton = document.getElementById("settings-button")
if (settingsButton) {
    settingsButton.addEventListener("click", displaySidebar)
}

var closeSideBarButton = document.getElementById("closenav")
if (closeSideBarButton) {
    closeSideBarButton.addEventListener("click", closeSidebar)
}

var addStickyButton = document.getElementById("add-sticky-button")
if (addStickyButton) {
    addStickyButton.addEventListener("click", addStickyButtonClicked)
}

var submitStickyButton = document.getElementById("submit_sticky_button")
if (submitStickyButton) {
    submitStickyButton.addEventListener("click", submitSticky)
}

var days = document.getElementsByClassName("days")[0]
if (days) {
    var calendarDays = days.getElementsByTagName("li")
}

var stickyNotes = document.getElementsByClassName("sticky-note")
if (stickyNotes) {
    for (var i = 0; i < stickyNotes.length; i++) {
        stickyNotes[i].addEventListener("mouseover", function (e) {
            if (e.currentTarget.dataset.date) {
                var dateToHighlight = parseInt(e.currentTarget.dataset.date.substring(8, 10))
                for (var j = 0; j < calendarDays.length; j++) {
                    if (parseInt(calendarDays[j].textContent) == dateToHighlight) {
                        calendarDays[j].style.backgroundColor = "green"
                        break
                    }
                }
            }
        })
        stickyNotes[i].addEventListener("mouseout", function () {
            for (var k = 0; k < calendarDays.length; k++) {
                calendarDays[k].style.backgroundColor = "transparent"
            }
        })
        stickyNotes[i].addEventListener("click", function (e) {
            openStickyModal()
            viewExistingSticky(e.currentTarget.dataset.memo, e.currentTarget.dataset.date, e.currentTarget.dataset.color)
        })
    }
}

/* Credit: https://stackoverflow.com/questions/36695438/detect-click-outside-div-using-javascript */
var modalBackdrop = document.getElementById("modal_backdrop")
if (modalBackdrop) {
    modalBackdrop.onclick = function (e) {
        if (e.target == document.getElementById("modal")) {
            closeStickyModal()
        }
    }
}

//-------------------------------------------------

// Handles the login process for homepage
function login() {
    // Check if all the inputs have value
    var flag = inputsFilled()
    if (flag) {
        // Check that the profile exists in the database
        confirmUser(goIfTrue)
    }

}

// Handles the account creation for register
function register() {
    // Check if all the inputs have value
    var flag1 = inputsFilled()
    if (flag1) {
        // Check if password and password confirm match
        var flag2 = passwordsMatch()
        if (flag2) {
            createAccount()
        }
    }
}

// This function checks if all the fields are filled or not.
function inputsFilled() {
    var check = true
    // Get access to the input elements
    var homepageInputs = document.getElementsByClassName("homepage-input")
    for (var i = 0; i < homepageInputs.length; i++) {
        // If any input element is empty set check to false
        if (!homepageInputs[i].value) {
            check = false
        }
    }
    // Throw an alert if check is false
    if (!check) {
        alert("Missing username or password!")
    }
    return check
}

// This function checks that the login is valid
function confirmUser(callback) {
    // Get the username and password entered in the text box
    var userName = document.getElementById("homepage-username").value.trim()
    var userPassword = document.getElementById("homepage-password").value.trim()

    // Send these to the server to compare against the data
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: userName,
            userPassword: userPassword
        })
    }).then(function (res) {
        // If we get a 200 response, that means the name and password are valid
        if (res.status === 200) {
            callback(true, userName)
        }
        else {
            alert("Invalid username or password!")
            callback(false, userName)
        }
    })
}

function goIfTrue(check, userName) {
    if (check == true) {
        goToMain(userName)
    }
    else {}
}

function createAccount() {
    // Get the new username and password
    var userName = document.getElementById("register-username").value
    var userPassword = document.getElementById("register-password").value

    // Send a post request to the server
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: userName,
            passWord: userPassword
        })
    }).then(function () {
        window.location.href = '/'
    })
}

// Credt: Hla Htun
function goToMain(userName) {
    window.location.href = `/main/${userName}`
}

// This function checks that the password and password confirm are the same
function passwordsMatch() {
    // Get access to both passwords
    var password1 = document.getElementById("register-password")
    var password2 = document.getElementById("register-confirm")

    // Check that the passwords are the same
    if (password1.value !== password2.value) {
        // If the passwords are not the same, alert and return false
        alert("Password and Confirm Password fields do not match!")
        return false
    }
    // Else return true
    return true
}

// This function handles when the 'add sticky' button is clicked
function addStickyButtonClicked() {
    closeSidebar()
    openStickyModal()
}

// This function handles when the 'checkmark' button is clicked
function submitSticky() {
    // Check that there is space on the bulletin board for the new sticky
    if (reachedMaxStickies() == true) {
        // Alert if the bulletin board is full
        alert("Cannot add new Memo: Max Memoz reached!")
    } else {
        // Get the memo the user typed
        var newMemo = document.getElementById("sticky_info_memo").value
        if (!newMemo) {
            // Alert if the user didn't type anything
            alert("Cannot add new Memo: Memo field empty!")
        }
        else {
            // Get the date and color
            var newDate = document.getElementById("sticky_info_date").value
            var newColor = document.getElementsByClassName("modal_sticky_note")[0].dataset.color

            // Calculate truncated memo
            var truncatedMemo = newMemo.substring(0, 20)

            // Insert the new sticky
            insertNewSticky(newMemo, truncatedMemo, newDate, newColor)
            numStickies++
        }
    }

    // Close the sticky modal
    closeStickyModal()
}

// This function checks to see if the program has the maximum number of memos
function reachedMaxStickies() {
    if (numStickies == stickyTotal) {
        return true
    } else {
        return false
    }
}

// This function displays the settings sidebar
function displaySidebar() {
    // Open the sidebar
    var sideBarContainer = document.getElementById("settings-nav-container")
    var sideBar = document.getElementById("settings-nav")
    sideBarContainer.classList.remove("hidden")
    sideBar.classList.remove("hidden")
}

// This function closes the settings sidebar
function closeSidebar() {
    // Close the sidebar
    var sideBarContainer = document.getElementById("settings-nav-container")
    var sideBar = document.getElementById("settings-nav")
    sideBarContainer.classList.add("hidden")
    sideBar.classList.add("hidden")
}

// This function opens the sticky modal
function openStickyModal() {
    // Open the modal
    var stickyModalBackground = document.getElementById("modal_backdrop")
    var stickyModal = document.getElementById("modal")
    var checkmarkButton = document.getElementById("submit_sticky_button")
    var sticky = document.getElementsByClassName("modal_sticky_note")[0]
    stickyModalBackground.classList.remove("hidden")
    stickyModal.classList.remove("hidden")
    checkmarkButton.classList.remove("hidden")
    if (stickyColor == 0) {
        sticky.dataset.color = "pink"
        stickyColor++
    }
    else if (stickyColor == 1) {
        sticky.dataset.color = "orange"
        stickyColor++
    }
    else {
        sticky.dataset.color = "blue"
        stickyColor = 0
    }
}

// This function closes the sticky modal
function closeStickyModal() {
    // Close the modal
    var stickyModalBackground = document.getElementById("modal_backdrop")
    var stickyModal = document.getElementById("modal")
    stickyModalBackground.classList.add("hidden")
    stickyModal.classList.add("hidden")
    clearModal()
}

// This function clears the sticky modal
function clearModal() {
    // Clear the modal
    var stickyModalText = document.getElementById("sticky_info_memo")
    var stickyModalDate = document.getElementById("sticky_info_date")
    stickyModalText.value = ""
    stickyModalDate.value = ""

}

function viewExistingSticky(memo, date, color) {
    // Hide the checkmark button
    var checkmarkButton = document.getElementById("submit_sticky_button")
    checkmarkButton.classList.add("hidden")

    // Set the Memo, date, and color fields
    var memoTextArea = document.getElementById("sticky_info_memo")
    memoTextArea.value = memo

    var memoDate = document.getElementById("sticky_info_date")
    memoDate.value = date

    var viewSticky = document.getElementsByClassName("modal_sticky_note")[0]
    viewSticky.dataset.color = color
}

// This function adds a new sticky to the bulletin board
function insertNewSticky(memo, truncatedMemo, memoDate, stickyColor) {
    /*
     * Create the new post element
     */
    var newStickyInfo = {
        memo: memo,
        truncatedMemo: truncatedMemo,
        memoDate: memoDate,
        stickyColor: stickyColor
    }

    var newSticky = Handlebars.templates.stickyTemplate(newStickyInfo)

    // Add the sticky note to the bulletin board
    var bulletinBoard = document.getElementsByClassName("bulleting-inside-container")[0]
    bulletinBoard.insertAdjacentHTML("beforeend", newSticky)

    // Add an event listener to the new sticky note
    stickyNotes = document.getElementsByClassName("sticky-note")
    if (stickyNotes) {
        for (var i = 0; i < stickyNotes.length; i++) {
            stickyNotes[i].addEventListener("mouseover", function (e) {
                if (e.currentTarget.dataset.date) {
                    var dateToHighlight = parseInt(e.currentTarget.dataset.date.substring(8, 10))
                    for (var j = 0; j < calendarDays.length; j++) {
                        if (parseInt(calendarDays[j].textContent) == dateToHighlight) {
                            calendarDays[j].style.backgroundColor = "green"
                            break
                        }
                    }
                }
            })
            stickyNotes[i].addEventListener("mouseout", function () {
                for (var k = 0; k < calendarDays.length; k++) {
                    calendarDays[k].style.backgroundColor = "transparent"
                }
            })
            stickyNotes[i].addEventListener("click", function (e) {
                openStickyModal()
                viewExistingSticky(e.currentTarget.dataset.memo, e.currentTarget.dataset.date, e.currentTarget.dataset.color)
            })
        }
    }

    // Get the name of the current user
    var currentURL = window.location.href
    var urlBits = currentURL.split("/")
    var userName = urlBits[urlBits.length - 1]

    // Append the new sticky note to the database
    fetch('/main', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: userName,
            stickyInfo: newStickyInfo
        })
    })
}