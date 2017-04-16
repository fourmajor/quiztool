var path = require("path");

let path_to_env_file = __dirname + '/../.env';
var configResult = require('dotenv').config({path: path_to_env_file});

// check for config info
if ('error' in configResult){
    console.log('Configuration not obtained. Where is \'.env\' file? Shutting down.');
    return;
}

let DB_NODE_PACKAGE = 'mongodb';
let DB_URL = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + 
            process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

console.log(DB_URL);

getWords();

/*
* Return a list of Users.
*/
function getWords(){

    var MongoClient = require(DB_NODE_PACKAGE).MongoClient;

    MongoClient.connect(DB_URL, function (err, db) {
        if (err) throw err

        db.collection('words').find().toArray(function (err, result) {
            //assert.equal(null, err);
            if (err) throw err

            for (var i=0; i<result.length; i++){
                console.log(result[i].name);
            }

            db.close();
        })
    });
}


