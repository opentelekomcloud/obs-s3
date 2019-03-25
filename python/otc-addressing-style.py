#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This file is part of OTC S3 Example  released under MIT license.
# Copyright (C) 2016 T-systems Zsolt Nagy

import boto3
from botocore.exceptions import ClientError
import os

ak = os.getenv("S3_ACCESS_KEY_ID", None)
sk = os.getenv("S3_SECRET_ACCESS_KEY", None)
host = os.getenv("S3_HOSTNAME", None)
region = "eu-de"

otcsession = boto3.session.Session()
s3client = otcsession.client('s3', region,
                           config=boto3.session.Config(signature_version='s3v4',s3={'addressing_style': 'path'}),
                           endpoint_url="https://" + host,
                           aws_access_key_id=ak,
                           aws_secret_access_key=sk,
                           verify=False
                           )
myBucket = 'yourbucketname'
try:
        results = s3client.list_objects(Bucket=myBucket)["Contents"]
        for result in results:
                print (result["Key"])
except ClientError as e:
    print (str(e))
except ClientError as e:
        print (str(e))
