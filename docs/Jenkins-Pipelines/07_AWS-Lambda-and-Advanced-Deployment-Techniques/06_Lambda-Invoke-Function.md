# Lambda Invoke Function - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/AWS-Lambda-and-Advanced-Deployment-Techniques/Lambda-Invoke-Function)

---

## Table of Contents

- Lambda Invoke Function
  - Example: Shell Output
  - Additional Deployment Steps
  - Watch Video

---

## Content

Jenkins Pipelines

AWS Lambda and Advanced Deployment Techniques

# Lambda Invoke Function

In this lesson, we demonstrate how to add a new Jenkins stage to test an AWS Lambda function. The objective is to dynamically retrieve the Lambda function's URL using the AWS CLI and then confirm that the endpoint responds correctly.

For testing purposes, it is essential to automatically obtain the function URL. Although you could manually retrieve this information from the Lambda configuration, automating the process saves time and reduces human error.

![The image shows an AWS Lambda console with details of a function named "solar-system-function," including its configuration and public URL. The function is set to have no authentication and is in the Ohio region.](https://kodekloud.com/kk-media/image/upload/v1752879583/notes-assets/images/Jenkins-Pipelines-Lambda-Invoke-Function/aws-lambda-solar-system-function.jpg)

To retrieve the URL programmatically, refer to the [AWS CLI documentation for Lambda](https://docs.aws.amazon.com/cli/latest/reference/lambda/index.html). Scroll down to view the available CLI commands related to AWS Lambda.

![The image shows a webpage from the AWS CLI Command Reference, listing available commands related to AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752879583/notes-assets/images/Jenkins-Pipelines-Lambda-Invoke-Function/aws-cli-lambda-commands-reference.jpg)

When you examine the relevant section, you'll notice that specifying the function name returns a comprehensive JSON output. This JSON contains the function URL, which can be filtered using tools such as jq before sending a test request with cURL.

![The image shows a webpage from the AWS CLI Command Reference, specifically detailing options for the `get-function-url-config` command related to AWS Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752879584/notes-assets/images/Jenkins-Pipelines-Lambda-Invoke-Function/aws-cli-get-function-url-config.jpg)

> [!important]
> **Pro Tip**
>
> Using tools like jq to filter JSON output simplifies the process of extracting the necessary values directly from the CLI commands.

Below is the Jenkinsfile stage that triggers the Lambda invoke function step. This stage is executed only on the main branch, utilizes AWS CLI commands, and securely accesses the required credentials to extract and test the Lambda function’s URL.

The script workflow is as follows:

- It pauses for 30 seconds to allow the Lambda function to update after uploading.
- It then retrieves the function URL configuration using the AWS CLI.
- The URL is extracted from the JSON response (any trailing slash is removed).
- A cURL command is executed with the `-I` option to display only the HTTP response headers.
- Finally, the response is filtered to verify that the HTTP status code is "200 OK," confirming that the function is operational.

```
stage('Lambda - Invoke Function') {
    when {
        branch 'main'
    }
    steps {
        withAWS(credentials: 'aws-s3-ec2-lambda-creds', region: 'us-east-2') {
            sh '''
                sleep 30s
                function_url_data=$(aws lambda get-function-url-config --function-name solar-system-function)
                function_url=$(echo $function_url_data | jq -r '.FunctionUrl | sub("/$"; "")')
                curl -Is $function_url/live | grep -i "200 OK"
            '''
        }
    }
}
```

> [!important]
> **Warning**
>
> If the HTTP status is not "200 OK," the deployment may have encountered an error. Investigate further to ensure your Lambda function is deployed correctly.

After these changes are committed, a new build is initiated, and the pipeline executes the Lambda invoke function stage. During deployment, you might encounter an error in the OWASP dependency check stage. Although this error is typically ignored in this context (since the "stop build" flag is set to false), it is advisable to address such issues in a production scenario.

Below is an excerpt from the Jenkins output illustrating part of the process:

```
shell
npm install --no-audit
```

Later in the log, you will notice messages similar to:

```
1  Collecting Dependency-Check artifact
2  Parsing file /var/lib/jenkins/workspace/a-Organization_solar-system_main/dependency-check-report.xml
```

Even if the OWASP dependency check stage shows an error, the Lambda S3 upload and deployment stages continue and complete successfully. After a 30-second pause, the Lambda invoke function stage runs the AWS CLI command to fetch the function URL and test it.

## Example: Shell Output

The following shell commands illustrate the execution process:

```
sleep 30s
aws lambda get-function-url-config --function-name solar-system-function
function_url_data=$(aws lambda get-function-url-config --function-name solar-system-function | jq -r '.FunctionUrl | sub("/$"; "")')
curl -ls $function_url_data
```

And a sample JSON response from AWS Lambda might appear as follows:

```
+ sleep 30s
+ aws lambda get-function-url-config --function-name solar-system-function
function_url_data={ "FunctionUrl": "https://k2g1znsy2qhpkl676tz5de9ojcm.lambda-url.us-east-2.on.aws/", "FunctionArn": "arn:aws:lambda:us-east-2:604513224291:function:solar-system-function", "AuthType": "NONE", "Cors": { "AllowOrigins": [ "*" ] }, "CreationTime": "2024-10-01T12:27:05.457348Z", "LastModifiedTime": "2024-10-01T12:27:05.457348Z", "InvokeMode": "BUFFERED" }
+ echo "FunctionUrl: \"https://k2g1znsy2qhpkl676tz5de9ojcm.lambda-url.us-east-2.on.aws/\""
+ jq -r '.FunctionUrl | sub("/$"; "")'
+ curl -ls $function_url
+ grep -i HTTP/1.1 | tee OK
```

The cURL command retrieves only the response headers and confirms that the "/live" endpoint returns the correct status code. For instance:

```
curl -Is https://xg1z2nysqa2qhkpl676t2p5e0jcm.lambda-url.us-east-2.on.aws/live
HTTP/1.1 200 OK
Date: Wed, 02 Oct 2024 08:37:51 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 0
Connection: keep-alive
x-amzn-RequestId: b136578b-839f-49a4-a0d4-032e77579233
access-control-allow-origin: *
etag: W/"11-0MaU/mMeIWbITYbJxDjcZGy8"
x-powered-by: Express
x-amzn-Trace-Id: Root=1-651db66f-19a5c7300da664c780;Parent=04f1e27712579323;Sampled=0;Lineage=1:ea66bb95:0
```

This output verifies that the Lambda function is live and correctly responding to requests.

## Additional Deployment Steps

Below are examples of how other deployment commands can be executed, including updating both the Lambda configuration and the function code. These commands are designed to update environment variables and deploy a new code package, respectively.

```
aws lambda update-function-configuration --function-name solar-system-function --environment '{"Variables":{"MONGO_USERNAME":"'"${MONGO_USERNAME}"'","MONGO_PASSWORD":"'"${MONGO_PASSWORD}"'"}}'
```

```
aws lambda update-function-code --function-name solar-system-function --s3-bucket solar-system-lambda-bucket --s3-key solar-system-lambda-$BUILD_ID.zip
```

This concludes the demonstration on invoking and validating a Lambda function within the Jenkins pipeline. For more detailed information, please refer to the [AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/reference/lambda/index.html). Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/78297356-097c-4793-b690-bc83f9aba3f0/lesson/50e9923c-112d-497b-bfe9-f262c447861e)**
>
> Watch video content
