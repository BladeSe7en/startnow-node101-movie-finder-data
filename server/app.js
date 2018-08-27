var morgan = require('morgan');
var express = require('express');
var app = express();
app.use(morgan('dev'));
var path = require('path');
var axios = require('axios');

var cache = {};

app.get('/', (req, res) => {
    console.log(req)
    console.log('this is req', req);
    var movieId = req.query;

    if (movieId.i) {
        console.log('inside i');

        if (cache[movieId.i]) {
            //console.log('return from cache');
            return res.status(200).send(cache[movieId.i]);
        } else {

            axios.get("http://www.omdbapi.com/?i=" + encodeURIComponent(movieId.i) + "&apikey=8730e0e")
                .then((response) => {
                    console.log('after axios i get');
                    cache[movieId.i] = response.data;
                    return res.status(200).send(response.data);

                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        }
    }

    else if (movieId.t) {
        console.log('inside t');
        if (cache[movieId.t]) {
            return res.status(200).send(cache[movieId.t]);

        } else {
            axios.get("http://www.omdbapi.com/?t=" + encodeURIComponent(movieId.t) + "&apikey=8730e0e")
                .then((response) => {
                    console.log('after axios t get');
                    cache[movieId.t] = response.data;
                    return res.status(200).send(response.data);

                    // axios.get(url)
                    // .then((response) => {
                    //     cache[movieId] = response.data;
                    //     return res.status(200).send(response.data);
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        }
    }
    else {
        res.send('you did not make a request');
    }

});





//  axios.get('http://omdbapi.com/?i=' + movieId + '&apikey=8730e0e')
//  .then(response => {    
//   console.log(response)
//  },



//handle response variable
console.log(cache);

module.exports = app;

//encodeURIComponent()

