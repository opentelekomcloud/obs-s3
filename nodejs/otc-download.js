var AWS = require('aws-sdk');
var fs = require('fs');

var accessKeyId = process.env.S3_ACCESS_KEY_ID; 
var secretAccessKey = process.env.S3_SECRET_ACCESS_KEY; 
var endpoint = process.env.S3_HOSTNAME; 

AWS.config = new AWS.Config({
  accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: 'eu-de'
});

var ep = new AWS.Endpoint(endpoint);
var s3 = new AWS.S3({endpoint: ep});  

var options = {
	Bucket    : 'uploadtest',
	Key    : 'uploadtestobject.txt',
};

var fileStream = s3.getObject(options).createReadStream();
var outfile = fs.createWriteStream(options.Key)
fileStream.pipe(outfile,function(err, data) {
         if (err) {
             console.log(err)
         } else {
             console.log("Successfully downloaded data to uploadtest/uploadtestobject.txt");
         }
      });
