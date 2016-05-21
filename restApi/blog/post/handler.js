'use strict';

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();

// Require Serverless ENV vars - this may or may not be needed I havent seen why it is
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Lambda Handler
module.exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('Context:', JSON.stringify(context, null, 2));

    var operation = event.operation;
    if (event.tableName) {
        event.payload.TableName = event.tableName;
    }

    switch (operation) {
        case 'create':
            console.log('debug', JSON.stringify(event.payload, null, 2));
            console.log('debug 2', JSON.stringify(event.payload.Item, null, 2));

            var validator = require('../../lib/validateCreateJson.js');
            if (!validator.isValidJson(event.payload.Item)) {
                context.fail(new Error('Invalid Json' + event.payload.Item));
            } else {
                console.log("valid JSON for create");
                var uuid = require('node-uuid');
                event.payload.Item.postId = uuid.v1();
                console.log(event.payload.Item.postId);
                console.log(event.payload);
                dynamo.put(event.payload, context.done);
            }
            break;
        case 'read':
            var firstName = event.payload.Key.firstName;
            console.log("searching for: ", firstName);
             
            var params = {
                "TableName": "blog-posts-dev",
                // global secondary index
                "IndexName": "fname-index",
                "KeyConditions": {
                    "fname": {
                        "AttributeValueList": [
                            firstName
                        ],
                        "ComparisonOperator": "EQ"
                    }
                } 
            };
          
            //   this works 
            // dynamo.query(params, function(err, resp) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(resp);
            //         // based on this record {"fname": "chris", "age": 12, "friends": {"best": "chuck", "worst": "berry"}}
            //         console.log(resp.Items[0].friends);
            //     }
            // });
            
            // havent tried this yet
            // var params = {
            //     "TableName": "blog-posts-dev",
            //     "IndexName": "fname-index",
            //     "KeyConditionExpression": "fname = :fname",
            //     "ExpressionAttributeValues": {":fname": "chris"},
            // };
            
            dynamo.query(params, context.done);
        
            break;
        case 'update':
            dynamo.updateItem(event.payload, context.done);
            break;
        case 'delete':
            dynamo.deleteItem(event.payload, context.done);
            break;
        case 'list':
            dynamo.scan(event.payload, context.done);
            break;
        default:
            context.fail(new Error('Unrecognized operation "' + operation + '"'));
    }

};