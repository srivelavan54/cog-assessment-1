<!DOCTYPE html>
<html>
<head>
    <title>Local Community Event Portal</title>

    <style>
        body{
            font-family:Arial;
            margin:20px;
        }

        .card{
            border:1px solid black;
            padding:10px;
            margin:10px;
        }

        .error{
            color:red;
        }
    </style>
</head>

<body>

<h1>Community Event Portal</h1>

<input type="text" id="search" placeholder="Search Event">

<select id="categoryFilter">
    <option value="All">All</option>
    <option value="Music">Music</option>
    <option value="Sports">Sports</option>
</select>

<div id="events"></div>

<hr>

<h2>Registration Form</h2>

<form id="regForm">

    Name:
    <input type="text" name="name">
    <span id="nameError" class="error"></span>
    <br><br>

    Email:
    <input type="email" name="email">
    <span id="emailError" class="error"></span>
    <br><br>

    Event:
    <select name="event">
        <option>Music Fest</option>
        <option>Sports Meet</option>
    </select>

    <br><br>

    <button type="submit" id="registerBtn">
        Register
    </button>

</form>

<p id="result"></p>

<script>

// 1. Basics
console.log("Welcome to the Community Portal");

window.onload = () =>{
    alert("Page Loaded Successfully");
};

// 2. Data Types and Operators
const portalName = "Community Portal";
const eventDate = "10-06-2026";
let seats = 50;

console.log(`${portalName} Event Date: ${eventDate}`);

seats--;

// 5. Objects and Prototype
class Event{

    constructor(name,category,seats){
        this.name=name;
        this.category=category;
        this.seats=seats;
    }

}

Event.prototype.checkAvailability=function(){
    return this.seats>0;
};

// 6. Arrays
let eventsList=[

    new Event("Music Fest","Music",20),
    new Event("Sports Meet","Sports",0),
    new Event("Dance Show","Music",15)

];

eventsList.push(
    new Event("Food Festival","Food",25)
);

// Object.entries()
console.log(Object.entries(eventsList[0]));

// 4. Functions

function addEvent(event){
    eventsList.push(event);
}

function registerUser(eventObj){

    try{

        if(eventObj.seats<=0)
            throw "No Seats Available";

        eventObj.seats--;

        renderEvents();

    }

    catch(error){
        alert(error);
    }
}

function filterEventsByCategory(category){

    if(category==="All")
        return eventsList;

    return eventsList.filter(
        event=>event.category===category
    );
}

// Closure

function registrationCounter(){

    let count=0;

    return function(){
        count++;
        return count;
    };

}

const totalRegistrations=registrationCounter();

// 7. DOM Manipulation

const container=document.querySelector("#events");

function renderEvents(list=eventsList){

    container.innerHTML="";

    list.forEach(event=>{

        if(event.seats>0){

            const card=document.createElement("div");

            card.className="card";

            card.innerHTML=`
                <h3>${event.name}</h3>
                <p>Category: ${event.category}</p>
                <p>Seats: ${event.seats}</p>
                <button onclick="registerUser(eventsList.find(e=>e.name==='${event.name}'))">
                Register
                </button>
            `;

            container.appendChild(card);
        }

    });

}

renderEvents();

// 8. Event Handling

document.getElementById("categoryFilter")
.onchange=function(){

    renderEvents(
        filterEventsByCategory(this.value)
    );

};

document.getElementById("search")
.addEventListener("keydown",function(){

    let keyword=this.value.toLowerCase();

    let filtered=eventsList.filter(
        event=>event.name.toLowerCase().includes(keyword)
    );

    renderEvents(filtered);

});

// 9. Promises and Async/Await

function fetchEvents(){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            resolve(eventsList);

        },1000);

    });

}

fetchEvents()
.then(data=>console.log(data))
.catch(error=>console.log(error));

async function loadEvents(){

    try{

        console.log("Loading...");

        let data=await fetchEvents();

        console.log(data);

    }

    catch(error){

        console.log(error);

    }

}

loadEvents();

// 10. Modern JS Features

function displayEvent(
    {name,category} = {}
){

    console.log(name,category);

}

displayEvent(eventsList[0]);

let clonedEvents=[...eventsList];

// 11. Forms

document.getElementById("regForm")
.addEventListener("submit",function(event){

    event.preventDefault();

    let name=this.elements["name"].value;
    let email=this.elements["email"].value;
    let selectedEvent=this.elements["event"].value;

    document.getElementById("nameError").innerHTML="";
    document.getElementById("emailError").innerHTML="";

    let valid=true;

    if(name===""){
        document.getElementById("nameError")
        .innerHTML=" Name Required";
        valid=false;
    }

    if(email===""){
        document.getElementById("emailError")
        .innerHTML=" Email Required";
        valid=false;
    }

    if(valid){

        document.getElementById("result")
        .innerHTML=
        `Registered for ${selectedEvent}
        | Total Registrations:
        ${totalRegistrations()}`;

        sendData(name,email,selectedEvent);

    }

});

// 12. AJAX & Fetch API

function sendData(name,email,eventName){

    let userData={
        name,
        email,
        event:eventName
    };

    console.log("Sending:",userData);

    setTimeout(()=>{

        fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })

        .then(response=>response.json())

        .then(data=>{

            console.log(data);

            alert("Registration Success");

        })

        .catch(error=>{

            alert("Registration Failed");

        });

    },1000);

}

// 13. Debugging
console.log("Debugging Enabled");

// 14. jQuery Example
/*
$("#registerBtn").click(function(){
    $(".card").fadeOut();
    $(".card").fadeIn();
});
*/

// React/Vue Benefit:
// Reusable Components and Faster UI Updates

</script>

</body>
</html>