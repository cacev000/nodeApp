const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var sns = new AWS.SNS();
var ddb = new AWS.DynamoDB();

var params = {
    TableName: "Client"
};

// Get all posts
router.get('/posts', (req, res) => {
    // Get posts from the mock api
    // This should ideally be replaced with a service that connects to MongoDB
    // axios.get(`${API}/posts`)
    //     .then(posts => {
    //         res.status(200).json(posts.data);
    //     })
    //     .catch(error => {
    //         res.status(500).send(error)
    //     });

    ddb.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the movies
            console.log("Scan succeeded.");
            console.log(data)
        }
    }
});

module.exports = router;