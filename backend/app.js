/* Database */
const MongoDB=require("./MongoDB")//import database helpers

/**Login */
const log = require("./login");
const passport = require('passport');
const locStrat = require('passport-local').Strategy;

passport.use(new locStrat({ //TODO test
    usernameField: "email",
    passwordField: "password",
    passReqToCallback : true
},
function(req,user,pass,done){
    let cust = MongoDB.find('Customers',{email:user});
    if(!cust){
        return done(null, false, { message: 'Incorrect username.' });
    }
    if(!log.passIsHash(pass,cust.password)){
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, cust);
}));

/** Express Setup Begin*/
const https = require('https')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());

/** Express Setup End*/

/** Account Routes*/
app.post('/register', function (req, res) { 
    //TODO test, have one of these for customer and rest call log.hashPass(password) before adding to database
})

app.post('/login', 
    passport.authenticate('local',{ successRedirect: 'http::/localhost:3001/', failureRedirect: 'http::/localhost:3001/login'})
); //TODO test redirects with a frontend

app.post('/logout', function (req, res) { //TODO test
    req.logout();
    res.direct();
})
/** End Account Routes*/

/** API ROUTES*/

/**RESTAURAUNT*/
//GET
app.get('/api/v1/rest', function (req, res) { //get a restaurant by name?
    console.log(req.query); //query parameters
    MongoDB.find('Restaurants',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

/** GET restaurant info by quering a name */
app.get('/api/v1/rest/:restName', function (req, res) {
    let restName = req.params.restName;
    MongoDB.find('Restaurants',(
        {
            "restinfo.restName": restName
        }
    )).then(rests => res.send({ "results": rests }));
    
});

//POST
app.post('/api/v1/rest', function (req, res) { //Add a new restaurant into database
    console.log(req);
    console.log("/rest got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    MongoDB.add('Restaurants',req.body); //First parm is which namespace to use
    res.send({"message":'POST request to the homepage, restaurant ' + req.body.name+' added to database'});
})

//PUT
app.put('/api/v1/rest', function (req, res) { //Update given property of a restaurant with given value
    console.log(req);
    console.log("/rest got put req");
    console.log(req.body); // retreive rest name, fields to update and new values theen update in DB
    res.send({"message":'PUT request to the homepage, restaurant fields updatd'});
})

//DELETE
app.delete('/api/v1/rest', function (req, res) { //remove a restaurant from database by name
    console.log(req);
    console.log("/rest got delete req");
    console.log(req.body); //remove restaurant from database
    res.send({"message":'DELETE request to the homepage'});
})


/**CUSTOMER*/
//GET

app.get('/api/v1/cust', function (req, res) { //get a customer by name?
    console.log(req.query); //query parameters
    if (Object.keys(req.query).length==0){//return all customer
        console.log("All customers will be queried");
    }else{
        //cycle through req.query 
    }
    console.log("/cust got get req"); //query database for customer with matching name (req.params.name)
    res.send({"message":'GET request to the homepage'}); //send list of results
})
  
//POST
app.post('/api/v1/cust', jsonParser, function (req, res) { //Add a new customre into database
    /*console.log(req);*/
    console.log("/cust got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    MongoDB.add('Customers', req.body);
    res.send({"message":'POST request to the homepage, customer added to database'});
})

//PUT
app.put('/api/v1/cust', jsonParser, function (req, res) { //Update given property of a customer with given value
    console.log(req);
    console.log("/cust got put req");
    console.log(req.body); // retreive rest name, fields to update and new values theen update in DB
    res.send({"message":'PUT request to the homepage, customer fields updatd'});
})

//DELETE
app.delete('/api/v1/cust', jsonParser, function (req, res) { //remove a customer from database by name
    console.log(req);
    console.log("/cust got delete req");
    console.log(req.body); //remove customer from database
    res.send({"message":'DELETE request to the homepage'});

app.get('/api/v1/cust', function (req, res) {

})
  
//POST
app.post('/api/v1/cust', function (req, res) {

})

//PUT
app.put('/api/v1/cust', function (req, res) {
 
})

//DELETE
app.delete('/api/v1/cust', function (req, res) {


})


/**ORDER API ROUTES*/
//GET

app.get('/api/v1/order', function (req, res) { //get a order by name?
    console.log(req.query); //query parameters
    if (Object.keys(req.query).length==0){//return all order
        console.log("All rstaurants will be queried");
    }else{
        //cycle through req.query 
    }
    console.log("/rest got get req"); //query database for order with matching name (req.params.name)
    res.send({"message":'GET request to the homepage'}); //send list of results
})
  
//POST
app.post('/api/v1/order', jsonParser, function (req, res) { //Add a new order into database
    console.log(req);
    console.log("/rest got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    res.send({"message":'POST request to the homepage, order added to database'});
})

//PUT
app.put('/api/v1/order', jsonParser, function (req, res) { //Update given property of a order with given value
    console.log(req);
    console.log("/rest got put req");
    console.log(req.body); // retreive rest name, fields to update and new values theen update in DB
    res.send({"message":'PUT request to the homepage, restaurant fields updatd'});
})

//DELETE
app.delete('/api/v1/order', jsonParser, function (req, res) { //remove a order from database by name
    console.log(req);
    console.log("/rest got delete req");
    console.log(req.body); //remove order from database
    res.send({"message":'DELETE request to the homepage'});
})


https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/api/v1/order', function (req, res) { 
    
})
  
//POST
app.post('/api/v1/order', function (req, res) { 
    
})

//PUT
app.put('/api/v1/order', function (req, res) { 

})

//DELETE
app.delete('/api/v1/order', function (req, res) { 
    
})


//start server
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
},app).listen(port, () => console.log(`Example app listening on port ${port}!`));

