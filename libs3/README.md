Installation

Fedora: 
yum install libs3

Ubuntu: 
apt-get install libs3

Usage: 
Usage: s3 [options] COMMAND [parameters]

Environment:
 S3_ACCESS_KEY_ID - must be set to S3 Access Key ID
 S3_SECRET_ACCESS_KEY - must be set to S3 Secret Access Key
 S3_COMMAND - may be set to s3 command to use, examples:
              "s3 -h" (for aws s3)

			  
Commands: 
# Create the test bucket
s3 create $TEST_BUCKET


# List bucket 
echo "s3 list | grep $TEST_BUCKET"
s3 list | grep $TEST_BUCKET


# Test it
s3 test $TEST_BUCKET


# List to ensure that it is empty
s3 list $TEST_BUCKET


# Put some data
rm -f seqdata
seq 1 10000 > seqdata
echo "s3 put $TEST_BUCKET/testkey filename=seqdata noStatus=1"
s3 put $TEST_BUCKET/testkey filename=seqdata noStatus=1


# Get the data 
echo "s3 get $TEST_BUCKET/testkey filename=testkey"
s3 get $TEST_BUCKET/testkey filename=testkey

# Delete the file
echo "s3 delete $TEST_BUCKET/testkey"
s3 delete $TEST_BUCKET/testkey

# Remove the test bucket
echo "s3 delete $TEST_BUCKET"
s3 delete $TEST_BUCKET

#  copy a file to other bucket 
s3 copy $TEST_BUCKET/key $COPY_BUCKET/copykey

# Now create a new zero-length file
echo "s3 put $TEST_BUCKET/aclkey < /dev/null"
s3 put $TEST_BUCKET/aclkey < /dev/null


# Get the bucket acl
rm -f acl
echo "s3 getacl $TEST_BUCKET filename=acl"
s3 getacl $TEST_BUCKET filename=acl


# Add READ for all AWS users, and READ_ACP for everyone
cat <<EOF >> acl
Group   Authenticated AWS Users                                                                     READ        
EOF
cat <<EOF >> acl
Group   All Users                                                                                   READ_ACP    
EOF
echo "s3 setacl $TEST_BUCKET filename=acl"
s3 setacl $TEST_BUCKET filename=acl


# Test to make sure that it worked
rm -f acl_new
echo "s3 getacl $TEST_BUCKET filename=acl_new"
s3 getacl $TEST_BUCKET filename=acl_new

diff -B acl acl_new

rm -f acl acl_new

# Get the key acl
rm -f acl
echo "s3 getacl $TEST_BUCKET/aclkey filename=acl"
s3 getacl $TEST_BUCKET/aclkey filename=acl


# Add READ for all AWS users, and READ_ACP for everyone
cat <<EOF >> acl
Group   Authenticated AWS Users                                                                     READ        
EOF
cat <<EOF >> acl
Group   All Users                                                                                   READ_ACP    
EOF
echo "s3 setacl $TEST_BUCKET/aclkey filename=acl"
s3 setacl $TEST_BUCKET/aclkey filename=acl


# Test to make sure that it worked
rm -f acl_new
echo "s3 getacl $TEST_BUCKET/aclkey filename=acl_new"
s3 getacl $TEST_BUCKET/aclkey filename=acl_new

diff -B acl acl_new

rm -f acl acl_new

# Check multipart file upload (>15MB)
dd if=/dev/zero of=mpfile bs=1024k count=30
echo "s3 put $TEST_BUCKET/mpfile filename=mpfile"
s3 put $TEST_BUCKET/mpfile filename=mpfile


https://github.com/bji/libs3

