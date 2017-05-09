Otcclient OBS - S3 Usage
==========

[![PyPI version](https://badge.fury.io/py/python-otcclient.png)](https://badge.fury.io/py/python-otcclient)

Open Telecom Cloud API tool 
-----------------------------------------------

**#OTC #cloud #devops #IAAS #PAAS #DBAAS #BDAAS #container-services**

Purposes of the OTC Tool to manage OTC cloud environment via command line similar way like AWS cli. OTC Cli provides common interface to operation and DEVOPS teams to manage their cloud services. 
On top of that, the language implementations (Python at the moment) are secure and relatively fast.

More at [OTC site](https://console.otc.t-systems.com/console/#/home)



Documentation
-------------

[Otcclient Reference](https://docs.otc.t-systems.com/?locale=en-us)

Command line usage
-----

`````sh
$ sudo pip install python-otcclient
`````
or
`````sh
$ git clone https://github.com/OpenTelekomCloud/python-otcclient.git
`````

Usage
----------------

`````sh
S3 Commands:
otc s3 ls                                                            List Buckets
otc s3 ls mybucket                                                   List Bucket files
otc s3 mb mybucket                                                   Create New Bucket
otc s3 cp s3://bucketname/filename.txt /localdir/filename.txt        Download from bucket to local
otc s3 cp /localdir/filename.txt s3://bucketname/filename.txt        Upload file / directory to bucket
