# Ruby

## List buckets

```ruby
require "aws-sdk-s3"

s3 = Aws::S3::Resource.new(
  access_key_id: ENV["AWS_ACCESS_KEY_ID"],
  secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
  region: ENV["AWS_REGION"], # e.g. "eu-de"
  endpoint: ENV["AWS_URL"] # e.g. "https://obs.eu-de.otc.t-systems.com"
)

pp s3.list_buckets
```
