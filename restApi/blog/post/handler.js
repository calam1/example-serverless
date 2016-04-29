'use strict';

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

// all the ajv stuff is for json validation, this is not idiomatic or good, but just an example
var Ajv = require('ajv');
var ajv = Ajv({
    allErrors: true
});

var schema = {
    "required": [ "name", "age" ],
    "properties": {
        "name": {
            "type": "string"
        },
        "age": {
            "type": "number",
            "maximum": 3
        }
    }
};

var validate = ajv.compile(schema);

function isValidJson(data) {
    return validate(data);
}

// Require Serverless ENV vars - this may or may not be needed I havent seen why it is
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');

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
            console.log('debug 2', JSON.stringify(event.payload.Item.content, null, 2));

            if (!isValidJson(event.payload.Item.content)) {
                context.fail(new Error('Invalid Json' + event.payload.Item.content));
            }

            var uuid = require('node-uuid');
            event.payload.Item.postId = uuid.v1();
            dynamo.putItem(event.payload, context.done)
            // the following does not insert data
            // dynamo.putItem(event.payload, context.succeed({
            //     "postId": event.payload.Item.postId
            // }));
            break;
        case 'read':
            dynamo.getItem(event.payload, context.done);
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