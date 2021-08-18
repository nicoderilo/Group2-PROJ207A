/*
HOW TO RUN APP.js

1.Before running the app.js, add first the "flights" table into the database.
	2 WAYS OF ADDING FLIGHTS TABLE
	Run script travelexperts.sql in my phpadmin.
		OR
	Import flight.csv file and add table column names manually. (see flight table.png for reference) 

	table column names
	1. flightNumber
	2. airline
	3. departureAirport
	4. arrivalAirport
	5. departureTime
	6. arrivalTime
	7. basePrice
	8. agencyCommision

2. nodemon apps.js


NOTE: Public folder - contains images,css
      Views folder - html and ejs files
      Partials folder - ejs files(head.ejs,navbar.ejs,carousel.ejs,footer.ejs)
*/

//AUTHORS : Kathy Deng and Nico Derilo
//THREADED PROJECT PHASE 1
//JUNE 2021
//GROUP 2

const path = require("path"); //KATHY
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const router  = express.Router();
const flightSearch=require("./flightSearch.js"); //KATHY

//create connection
let db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password:'', 
    database: 'travelagency',
    debug: false
});

//EXPRESS APP
const app =  express();

//VIEW ENGINE FOR EJS FILES
app.set('view engine', 'ejs');


//LISTEN REQUEST
app.listen(8000, function(){
    console.log('server started on port 8000...');
});
//MIDDLEWARE AND STATIC FILES
app.use(express.urlencoded({ extended: true })); //KATHY



app.use(morgan('dev'));
//PUBLIC FOLDER IS THE LOCATION OF IMAGES AND EXTERNAL CSS
app.use(express.static('public'));
//VIEWS FOLDER IS THE LOCATION OF EJS FILES AND HTML
app.use(express.static('views'));


// H O M E - - - AUTHOR: NICO DERILO
app.get('/',(req,res)=> {    
    res.render('index',{title: 'HOME'});
});
// F L I G H T S  - - - AUTHOR: KATHY DENG
app.get('/flights',(req,res)=> {
    res.render('flights',{title: 'FLIGHTS'});
});
// VA C A T I O N - - - AUTHOR: IMERO OBOMAGBAEGHIAN
app.get('/vacation',(req,res)=> {
    res.render('vacation',{title: 'VACATION'});
});
// D E S T I N A T I O N S - - - AUTHOR: VINCE PAYNE
app.get('/destinations',(req,res)=> {
    res.render('destinations',{title: 'DESTINATIONS'});
});
// C O N T A C T S - - - DILLON PATTERSON
app.get('/contacts',(req,res)=> {    
    res.render('contacts',{title: 'CONTACTS'});
});

// F L I G H T S - S E A RC H  - - - AUTHOR: KATHY DENG
app.post("/flight-search", flightSearch, (req,res)=>{
    console.log("create-post is working");
    // res.redirect("/thanks");
});
app.post("/flight-book", (req,res)=>{
    console.log("create-post is working");
    res.redirect("/thanks");
});
// T H A N K - Y O U - P A G E - - - AUTHOR: VINCE PAYNE
app.get("/thanks",(req,res)=>{ 
    res.render('thanks',{title: 'THANKS'});
    
});
// 4 0 4 - P A G E - - - AUTHOR: NICO DERILO
app.use((req,res)=>{    
    res.status(404).render('404',{title: '404 ERROR'});
});


