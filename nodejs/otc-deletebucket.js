var AWS = require('aws-sdk');

var accessKeyId = process.env.S3_ACCESS_KEY_ID; 
var secretAccessKey = process.env.S3_SECRET_ACCESS_KEY; 
var endpoint = process.env.S3_HOSTNAME; 

AWS.config = new AWS.Config({
  accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: 'eu-de'
});

var ep = new AWS.Endpoint(endpoint);
var s3 = new AWS.S3({endpoint: ep});  

var myBucket = 'uploadtest';

s3.listObjects({Bucket: myBucket}, function (err, data) {
	if (err) {
		console.log("error listing bucket objects "+err);
		return;
	}
	var items = data.Contents;
	for (var i = 0; i < items.length; i += 1) {
		var deleteParams = {Bucket: myBucket, Key: items[i].Key};
		s3.deleteObject(deleteParams, function (err, data) {
			if (err) {
				console.log("delete err " + deleteParams.Key);
			} else {
				console.log("deleted " + deleteParams.Key);
			}			
		});
	}
});


s3.deleteBucket({Bucket: myBucket}, function (err, data) {	
	if (err) {
		console.log("error deleting bucket " + err);
	} else {
		console.log("delete the bucket " + data);
	}
});