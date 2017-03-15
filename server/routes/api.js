const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api get works');
});

var AWS = require('aws-sdk');



if (process.env.NODE_ENV === 'prod') {
    AWS.config.update({
        region: "us-east-1"
    });
} else {
    AWS.config.loadFromPath('./config.json');
}

// var sns = new AWS.SNS();
var ddb = new AWS.DynamoDB();

var params = {
    TableName: "user"
};

// Get all posts
router.get('/posts', (req, res) => {

        ddb.scan(params, onScan);

        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Scan succeeded.");
                console.log(data);
                res.status(200).json(data.Items);
            }
        }

    })
    .post('/posts', (req, res) => {

        var params2 = {};

        params2 = {
            TableName: 'user',
            Item: {
                userId: {
                    S: req.body.userId
                },
                email: {
                    S: req.body.email
                },
                password: {
                    S: req.body.password
                },
                userName: {
                    S: req.body.userName
                }
            }
        };

        // code below inserts items in table from params2
        ddb.putItem(params2, insert);

        function insert(err, data) {
            if (err) {
                console.error("Unable to insert item to table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Insert succeeded.");
                // console.log(data);
                // res.status(200).json(data.Items);
            }
        }
    })
    .delete('/posts/', (req, res) => {

        var params4 = {};

        params4 = {
            TableName: 'user',
            Key: {
                userId: {
                    S: req.body.userId
                },
            }
        };

        // code below deletes items in table from params4
        ddb.deleteItem(params4, deleteUser);

        function deleteUser(err, data) {
            if (err) {
                console.error("Unable to delete item from table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Delete succeeded.");
                // console.log(data);
                // res.status(200).json(data.Items);
            }
        }
    }).put('/posts/', (req, res) => {

        var params3 = {};

        console.log(req.body.userId)

        params3 = {
            TableName: 'user',
            Key: {
                userId: {
                    S: req.body.userId
                },
            },
            UpdateExpression: "SET password = :pw",
            ExpressionAttributeValues: {
                ":pw": {
                    S: req.body.password
                }
            }
        };

        // code below updates items in table from params3
        ddb.updateItem(params3, update);

        function update(err, data) {
            if (err) {
                console.error("Unable to update the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Update succeeded.");
                // console.log(data);
                // res.status(200).json(data.Items);
            }
        }
    });



module.exports = router;