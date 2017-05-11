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
                           config=boto3.session.Config(signature_version='s3v4'),
                           endpoint_url="https://" + host,
                           aws_access_key_id=ak, 
                           aws_secret_access_key=sk,
                           verify=False
                           )    
buckets=None
try:           
    buckets = s3client.list_buckets()["Buckets"]
    for bucket in buckets:
        print bucket["Name"]
except ClientError as e:
    print (str(e))

def ls_bucket(Bucket = None, Prefix = None):
    s3client = s3init()
    result=None
    try:                                   
        result = s3client.list_objects(Bucket=Bucket, Prefix=Prefix)["Contents"]
    except ClientError as e:
        print (str(e))
    return result
        
