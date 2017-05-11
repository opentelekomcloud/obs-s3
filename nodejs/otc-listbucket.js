var AWS = require('aws-sdk');

var accessKeyId = process.env.S3_ACCESS_KEY_ID; 
var secretAccessKey = process.env.S3_SECRET_ACCESS_KEY; 
var endpoint = process.env.S3_HOSTNAME; 

AWS.config = new AWS.Config({
  accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: 'eu-de'
});

var ep = new AWS.Endpoint(endpoint);
var s3 = new AWS.S3({endpoint: ep});  


s3.listBuckets({}, function (err, data) {
            var buckets = data.Buckets;
            var owners = data.Owner;
            for (var i = 0; i < buckets.length; i += 1) {
                var bucket = buckets[i];
                console.log(bucket.Name + " created on " + bucket.CreationDate);
            }
            for (var i = 0; i < owners.length; i += 1) {
                console.log(owners[i].ID + " " + owners[i].DisplayName);
            }
        });