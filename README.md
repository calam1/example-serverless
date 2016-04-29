###A working example of https://github.com/serverless/serverless-starter project.
Follow the instructions of the following section titled "Serverless Starter"  to install the node/npm and serverless framework if you do not already have these installed

###Serverless Framework Documentation
http://docs.serverless.com/

###Serverless Plugins
I have added the following plugins to the project so far, there are more listed on Serverless github page:
```
* https://github.com/serverless/serverless-meta-sync -  syncs the _meta stage vars(not common) in s3 for team sharing
* https://github.com/Nopik/serverless-lambda-prune-plugin - prunes old versions of functions for space considerations
```

####AWS API Gateway, AWS Lambda, AWS DynamoDB example
I have added a working example of this tutorial https://github.com/markusklems/serverless-node-dynamodb-example, converted to work on serverless v0.5.5; yes hard to believe that tutorial is already out of date, lots of good changes happening in the serverless framework

####Example of json validation using ajv 
In the example-serverless/restApi/blog/post/handler.js class is an example of json validation in the lambda, it is not idiomatic or even good :) Just an example using ajv for json validation.

####Example of adding a db write, scan, etc policy to the lambda role and the creation of a dynamoDB in CloudFormation
https://github.com/calam1/example-serverless/blob/master/s-resources-cf.json
Got the idea from here - https://github.com/SC5/aws-serverless-hackathon-backend/blob/master/s-resources-cf.json

####Gitter chatroom - great community
https://gitter.im/serverless/serverless

####Improvements I think that are needed, from my observations
The command "sls project remove" or really any remove command for functions, resources, etc, are flaky.  Especially in the API Gateway, this seems to be an issue due to the Promises being used.  It feels like there is a race condition, thus many times you see failures when you do a remove, especially in the API Gateway.  I will have to play with it more, and if I can substantiate my findings I will submit an issue in Github.

-----------------------------------

#####The following is the README page from - https://github.com/serverless/serverless-starter

#Serverless Starter

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

A bare bones Serverless Framework project with examples for common use cases.

##Install

Make sure you have the [Serverless Framework](http://www.serverless.com) installed and you're using Node.js v4.0+. 
```
npm install serverless -g
```

Install the project using Serverless:
```
serverless project install serverless-starter
```

Install project dependencies via npm:
```
npm install
```

Deploy your functions and endpoints:
```
serverless dash deploy
```

##Includes

This project contains the following:

* **Multi:** Multiple functions each containing a single endpoint
* **Single:** A single function that uses multiple endpoints.
* **Optimizer Plugin:**  Each function is automatically optimized via the [serverless-optimizer-plugin](https://www.github.com/serverless/serverless-optimizer-plugin)
* **Templates:** Templates are used to reduce configuraton syntax
* **REST API Parameters:** The Multi/Show function endpoint gives an example of how to accept a path parameter
