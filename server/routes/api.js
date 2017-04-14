var MongoClient = require('mongodb').MongoClient
var path = require('path')

const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';


let path_to_env_file = __dirname + '/../../.env'; // path to top-level root dir where .env file lives
var configResult = require('dotenv').config({path: path_to_env_file});

// check for config info
if ('error' in configResult){
    console.log('Error in file ' + __filename);
    console.log('Configuration not obtained. Where is \'.env\' file? Shutting down.');
    console.log(configResult);
    return;
}

let DB_URL = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

/* GET api listing. */
/* this should only get called if the '/api' URL is seen, so..... */
router.get('/', (req, res) => {
  res.send('api works');
});


// Get all posts (url is /api/posts)
router.get('/posts', (req, res) => {
    MongoClient.connect(DB_URL, function (err, db) {
        if (err) throw err
        db.collection('posts').find().toArray(function (err, result) {
            if (err) throw err
            res.send(result);
        });
        db.close();
    });
});


module.exports = router;

