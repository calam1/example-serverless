####A working example of https://github.com/serverless/serverless-starter project.
Follow the instructions of the following section titled "Serverless Starter"  to install the node/npm and serverless framework if you do not already have these installed

####Serverless github source 
* https://github.com/serverless/serverless/

####Serverless Framework Documentation
* http://docs.serverless.com/

####Serverless Plugins
List of available plugins
https://www.npmjs.com/browse/keyword/serverless%20plugins

I have added the following plugins to the project so far, there are more listed on Serverless github page:
```
* https://github.com/serverless/serverless-meta-sync -  syncs the _meta stage vars(not common) in s3 for team sharing
* https://github.com/Nopik/serverless-lambda-prune-plugin - prunes old versions of functions for space considerations
* https://github.com/martinlindenberg/serverless-plugin-sns - provides subscription for sns topics
* https://github.com/martinlindenberg/serverless-plugin-alerting - configure alerting and subscription
```

####AWS API Gateway, AWS Lambda, AWS DynamoDB example
I have added a working example of this tutorial https://github.com/markusklems/serverless-node-dynamodb-example, converted to work on serverless v0.5.5; yes hard to believe that tutorial is already out of date, lots of good changes happening in the serverless framework

####Example of json validation using ajv 
In the example-serverless/restApi/blog/post/handler.js class is an example of json validation in the lambda, it is not idiomatic or even good :) Just an example using ajv for json validation.

####Example of adding a db write, scan, etc policy to the lambda role and the creation of a dynamoDB in CloudFormation
https://github.com/calam1/example-serverless/blob/master/s-resources-cf.json
* Got the idea from here - https://github.com/SC5/aws-serverless-hackathon-backend/blob/master/s-resources-cf.json

####Example of creating alarms on a function and pushes the events onto an SNS topic
* Installed this plugin: https://github.com/martinlindenberg/serverless-plugin-alerting
* look at restApi/blog/post/alerting.json - these are the alarms that I set, you can also do global alarms and filters look at the authors github repo

####Example of a lambda that listens to the alert topic discussed above and posts to slack
* http://ashiina.github.io/2015/06/cloudwatch-lambda-slack
* https://github.com/ashiina/aws-lambda-cloudwatch-slack
* look at restApi/blog/slack/s-function.json - look at the "event" node for how to set up the event source for the stack lambda
* deploy function before you deploy the event, otherwise you will have an error

####Gitter chatroom - great community
* https://gitter.im/serverless/serverless

####Improvements I think that are needed, from my observations
The command "sls project remove" or really any remove command for functions, resources, etc, are flaky.  Especially in the API Gateway, this seems to be an issue due to the Promises being used.  It feels like there is a race condition, thus many times you see failures when you do a remove, especially in the API Gateway.  I will have to play with it more, and if I can substantiate my findings I will submit an issue in Github.

####Python runtime lambda example
* https://serverlesscode.com/post/python-on-serverless-intro/

####AWS API Gateway and CORS example
* http://davidcai.github.io/blog/posts/serverless-and-cors/

####AWS API Gateway Error Handling Examples - Not as simple as it should be
* https://robertvojta.com/aws-lambda-api-gateway-error-handling-ede331178ee2#.1me0qb8n7
* http://kennbrodhagen.net/2016/03/09/how-to-return-a-custom-error-object-and-status-code-from-api-gateway-with-lambda/index.html
* https://www.jayway.com/2015/11/07/error-handling-in-api-gateway-and-aws-lambda/

####Serverless, AWS Lambda, AWS API Gateway reviews, quick starts, misc, etc links
* http://davidcai.github.io/blog/posts/why-serverless/
* https://blog.codeship.com/a-serverless-rest-api-in-minutes/
* https://alestic.com/2015/11/amazon-api-gateway-aws-cli-redirect/
* https://www.datawire.io/3-reasons-aws-lambda-not-ready-prime-time/
* https://nickmchardy.com/blog/2015/09/my-thoughts-about-aws-api-gateway-working-with-aws-lambda
* https://www.import.io/post/using-amazon-lambda-and-api-gateway/
* https://snowulf.com/2015/08/05/tutorial-aws-api-gateway-to-lambda-to-dynamodb/
* http://derekwyatt.org/2015/06/03/aws-lambda-is-insane/
* http://www.stelligent.com/automation/aws-lambda-functions-aws-codepipeline-cloudformation/
* https://www.reddit.com/r/devops/comments/46lq8n/aws_lambda_in_production_serverless/
* http://www.giantflyingsaucer.com/blog/?p=5730
* https://support.3scale.net/get-started/quickstarts/aws-lambda-amazon-api-gateway
* http://engineering.pivotal.io/post/running-tests-in-aws-lambda/
* http://tech.adroll.com/blog/dev/2015/11/16/count-things-with-aws-lambda-python-and-dynamodb.html
* http://kennbrodhagen.net/2015/12/06/how-to-create-a-request-object-for-your-lambda-event-from-api-gateway/index.html



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
