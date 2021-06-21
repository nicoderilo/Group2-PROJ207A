//TUITORIAL - https://www.youtube.com/watch?v=Lr9WUkeYSA8&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=6

const express = require('express');

//express app
const app =  express();

//register view engine
//this will look for ejs files
app.set('view engine', 'ejs');

//listen for request
app.listen(8000, function(){
    console.log('server started on port 8000...');
});

// H O M E
app.get('/',(req,res)=> {
    res.sendFile('./views/index.html', {root: __dirname});
});
// F L I G H T S
app.get('/flights',(req,res)=> {
    res.sendFile('./views/flights.html', {root: __dirname});
});

app.get('/vacation',(req,res)=> {
    res.sendFile('./views/vacation.html', {root: __dirname});
});

app.get('/destinations',(req,res)=> {
    res.sendFile('./views/destinations.html', {root: __dirname});
});

app.get('/contacts',(req,res)=> {
    res.sendFile('./views/contacts.html', {root: __dirname});
});

/*redirects sample
app.get('/flights-test',(req,res)=>{
    res.redirect('/flights')
});*/

// 4 0 4
//app.use is middleware
//404 page usually bottom part
//we dont put url because this will run regardless of the url evry time we req and the code reaches this point.
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});
