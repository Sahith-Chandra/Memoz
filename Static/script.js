/*
 * Collaborators:       Sahith Chandra, Andrew Inman, Preet Patel
 * Name:        MEMOZ
 */

// CALENDAR JS----------------------------------------------------------------------------------------------------------
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

if (daysTag && currentDate && prevNextIcon) {

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

}

// ------------------------------------------------------------------------------------ TOGGLE LIGHT/DARK MODE --------------------------------------------------------------------------
body = document.querySelector("body")
header = document.querySelector("header")
footer = document.querySelector("footer")
titleName = document.getElementsByClassName("title-name-container")[0]
gearButton = document.getElementById("settings-button")
gear = document.getElementsByClassName("fa fa-gear")[0]
container = document.getElementsByClassName("main-content-container")[0]
insideBulliten = document.getElementsByClassName("bulleting-inside-container")[0]
outsideBulliten = document.getElementsByClassName("bulleting-outside-container")[0]
calendar = document.getElementsByClassName("main-calender-container")[0]
dateHeader = document.getElementsByClassName("current-date")[0]
weeks = document.getElementsByClassName("weeks")[0]
days = document.getElementsByClassName("days")[0]

var checkDarkMode = false;

var setDark = document.getElementById("dark-mode-checkbox") // dark mode
if (setDark) {
    setDark.addEventListener("click", function () {
        if (checkDarkMode == false) {
            header.style.background = '#222629';
            titleName.style.color = 'white';
            gearButton.style.background = '#222629';
            gear.style.color = 'white'
            container.style.background = "#474B4F";

            outsideBulliten.style.background = "rgb(161, 132, 99)";
            insideBulliten.style.background = "rgb(99, 80, 59)";

            calendar.style.background = "rgb(46, 46, 46)";
            calendar.style.border = "8px solid black";
            dateHeader.style.color = "white";
            weeks.style.color = "white";
            days.style.color = "white"

            footer.style.background = '#222629';
            console.log("dark mode was checked");
            checkDarkMode = true;
        }
    })
}

var setLight = document.getElementById("light-mode-checkbox") // light mode
if (setLight) {
    setLight.addEventListener("click", function () {
        if (checkDarkMode == true) {
            header.style.background = '#336154';
            titleName.style.color = 'black';
            gearButton.style.background = '#336154';
            gear.style.color = 'black';
            container.style.background = " rgb(202, 196, 160)";

            outsideBulliten.style.background = "rgb(99, 80, 59)";
            insideBulliten.style.background = "rgb(161, 132, 99)";

            calendar.style.background = "rgb(224, 224, 224)";
            calendar.style.border = "8px solid rgb(46, 46, 46)";
            dateHeader.style.color = "black";
            weeks.style.color = "black";
            days.style.color = "black";

            footer.style.background = '#336154';
            console.log("light mode was checked");
            checkDarkMode = false
        }
    })
}