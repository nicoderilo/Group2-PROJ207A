const mysql = require("mysql");
const moment=require("moment");
const fs=require("fs");

var ways;
var ticketClass;
var departureAirport;
var arrivalAirport;
var departureDate;
var returnDate;
var adults;
var children;
var infants;
var flightNumber=new Array();
var airline=new Array();
var departureTime=new Array();
var arrivalTime=new Array();
var basePrice=new Array();
var agencyCommission=new Array();
var totalPrice=new Array();
var priceVary=1;

// const express = require("express");
// const app = express();
// app.use(express.urlencoded({ extended: true }));

const flightSearch=(req,res,next)=>{
    ways=req.body.ways;
    ticketClass=req.body.ticketClass;
    departureAirport=req.body.departureAirport;
    arrivalAirport=req.body.arrivalAirport;
    departureDate=req.body.departureDate;
    adults=parseInt(req.body.adults);
    children=parseInt(req.body.children);
    infants=parseInt(req.body.infants);
    
    if (ways=="roundTrip") {
        returnDate=req.body.returnDate;
    }
    if (ticketClass=="business") {
        priceVary=2.5;
    } else {
        priceVary=1.0;
    }
    
    
    const conn=mysql.createConnection({
        host: "localhost",
        user: "nico",
        password: "01Password",
        database: "travelexperts"
    });

    conn.connect((err)=>{
        if (err) throw err;
        var sql = "select * from flights";
        conn.query(sql, (err,result,fields)=>{
            if (err) throw err;
            
            // res.write('<main><div class="hidden"><h1>I need hidden this line</h1></div>');
            res.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>FlightBook</title><link rel="stylesheet" href="./flight.css"></head><body><main><form action="./flight-book" method="POST" id="flight-book"><h2 class="oneLine">On '+departureDate+'</h2><div class="radio-form">');

            var i = 0;
            for (flight of result) {
                if (departureAirport==flight.departureAirport && arrivalAirport==flight.arrivalAirport) {
                    console.log(i);
                    console.log(departureAirport);
                    console.log(flight.arrivalAirport);
                    flightNumber[i]=flight.flightNumber;
                    airline[i]=flight.airline;
                    departureTime[i]=flight.departureTime;
                    arrivalTime[i]=flight.arrivalTime;
                    basePrice[i]=flight.basePrice;
                    agencyCommission[i]=flight.agencyCommission;
                    totalPrice[i]=(basePrice[i]+agencyCommission[i])*priceVary+25;
                    i = i+1;
                }
            }
            
            for (j=0; j<i; j++){
                res.write('<div><input type="radio" required="required" id="'+flightNumber[j]+'" name="departureFlight" value="'+flightNumber[j]+'" ><label for="'+flightNumber[j]+'">'+airline[j]+': '+flightNumber[j]+'<span>Price: CA $'+totalPrice[j]+'</span><p>From '+departureAirport+' at '+departureTime[j]+'</p><p>To '+arrivalAirport+' at '+arrivalTime[j]+'</p></label></div>');
            }
            res.write('</div>');
            
            
            if (ways=="roundTrip") {
                res.write('</br><h2 class="oneLine">On '+returnDate+'</h2><div class="radio-form">');
                i = 0;
                for (flight of result) {
                    if (departureAirport==flight.arrivalAirport && arrivalAirport==flight.departureAirport) {
                        console.log(i);
                        console.log(departureAirport);
                        console.log(flight.arrivalAirport);
                        flightNumber[i]=flight.flightNumber;
                        airline[i]=flight.airline;
                        departureTime[i]=flight.departureTime;
                        arrivalTime[i]=flight.arrivalTime;
                        basePrice[i]=flight.basePrice;
                        agencyCommission[i]=flight.agencyCommission;
                        totalPrice[i]=(basePrice[i]+agencyCommission[i])*priceVary+25;
                        i = i+1;
                    }
                }
                
                for (j=0; j<i; j++){
                    res.write('<div><input type="radio" required="required" id="'+flightNumber[j]+'" name="returnFlight" value="'+flightNumber[j]+'" ><label for="'+flightNumber[j]+'">'+airline[j]+': '+flightNumber[j]+'<span>Price: CA $'+totalPrice[j]+'</span><p>From '+arrivalAirport+' at '+departureTime[j]+'</p><p>To '+departureAirport+' at '+arrivalTime[j]+'</p></label></div>');
                }
                res.write('</div>');

            };

            res.write('<div><button type="submit" id="book">Book it</button></div></form></div><div class="pageLinks" id="pageLinks"></div></main></body></html>');

            res.end();


        conn.end((err)=>{ if (err) throw err; });
    });
    next();
});
};
module.exports = flightSearch;