var AWS = require('aws-sdk');

var accessKeyId = process.env.S3_ACCESS_KEY_ID; 
var secretAccessKey = process.env.S3_SECRET_ACCESS_KEY; 
var endpoint = process.env.S3_HOSTNAME; 

AWS.config = new AWS.Config({
  accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: 'eu-de'
});

var ep = new AWS.Endpoint(endpoint);
var s3 = new AWS.S3({endpoint: ep});  

// Bucket names must be unique across all S3 users

var myBucket = 'uploadtest';
var myKey = 'uploadtestobject.txt';

s3.createBucket({Bucket: myBucket}, function(err, data) {

if (err) {
   console.log(err);
   } else {
     params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};
     s3.putObject(params, function(err, data) {
         if (err) {
             console.log(err)
         } else {
             console.log("Successfully uploaded data to uploadtest/uploadtestobject.txt");
         }
      });
   }
});