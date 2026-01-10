# DynamoDB Streams Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Streams-Demo)

---

## Table of Contents

- DynamoDB Streams Demo
  - Step 1: Enable DynamoDB Streams on the Products Table
  - Step 2: Create a Lambda Trigger for the Stream
  - Step 3: Link the DynamoDB Table to the Lambda Function
  - Step 4: Update IAM Permissions If Needed
  - Step 5: Test the Stream with Table Operations
  - Conclusion
  - Watch Video
    - Review the Example Code
    - Example Log Entries

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Streams Demo

This guide provides a step-by-step walkthrough to set up DynamoDB Streams for a table using the Products table as an example. Follow along to configure the stream, integrate it with a Lambda function, and validate stream events via CloudWatch Logs.

## Step 1: Enable DynamoDB Streams on the Products Table

First, open the Products table in your AWS DynamoDB console. Navigate to the **Exports and Streams** section and scroll down to review the DynamoDB Streams details.

![The image shows the AWS DynamoDB console with a focus on the "products" table, displaying its general information and status. The table is active, with no items currently present.](https://kodekloud.com/kk-media/image/upload/v1752858797/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams-Demo/aws-dynamodb-products-table-status.jpg)

Here, you’ll notice that DynamoDB Streams is set to **Off**. Click **Turn On** and select the desired streaming option:

- **Key Attributes Only** - Streams only the key attributes of the modified item.
- **New Image** - Streams the entire item as it exists after the change.
- **New and Old Images** - Captures both the previous and new images of the item.

For the richest dataset, choose **New and Old Images** and enable the stream.

## Step 2: Create a Lambda Trigger for the Stream

Since there is no trigger configured yet, create one by associating a Lambda function to process the stream events.

![The image shows an AWS console screen for turning on a DynamoDB stream, with options to select the view type for capturing changes in a table. There are buttons to cancel or turn on the stream.](https://kodekloud.com/kk-media/image/upload/v1752858799/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams-Demo/aws-dynamodb-stream-console-settings.jpg)

If you haven’t already created a Lambda function, follow these steps:

1.  In the AWS Lambda console, choose to create a new function.
2.  Use the provided DynamoDB Streams template. When prompted, select the blueprint named “process updates made to a DynamoDB table” and choose the Node.js version.
3.  Name your function (e.g., "DynamoDBStreamExample") and create a new role with basic Lambda permissions. Note that you may need to add additional permissions later.

![The image shows the AWS Lambda console where a user is creating a function using a blueprint. The interface includes options for naming the function, selecting runtime, and setting execution roles.](https://kodekloud.com/kk-media/image/upload/v1752858800/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams-Demo/aws-lambda-function-creation-blueprint.jpg)

### Review the Example Code

The template provides sample Node.js code which iterates over the records from DynamoDB and logs the event details. Below is the sample code used to process the stream events:

```
console.log('Loading function');


export const handler = async (event) => {
    for (const record of event.Records) {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
    }
    return `Successfully processed ${event.Records.length} records.`;
};
```

## Step 3: Link the DynamoDB Table to the Lambda Function

Configure the trigger by specifying that the Products table should stream data to the new Lambda function. You can adjust the batch size (e.g., 10 records per invocation) and choose "LATEST" for the starting position. Once configured, create the trigger.

![The image shows an AWS Lambda console screen where a DynamoDB trigger is being configured. It includes options for selecting a DynamoDB table, activating the trigger, setting batch size, and choosing the starting position.](https://kodekloud.com/kk-media/image/upload/v1752858801/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams-Demo/aws-lambda-dynamodb-trigger-setup.jpg)

## Step 4: Update IAM Permissions If Needed

After creating the Lambda function, you might see an error indicating that the function lacks permissions to access DynamoDB Streams. To resolve this:

1.  Navigate to the Lambda function's **Configuration -> Permissions** tab.
2.  Click the role associated with the Lambda function.
3.  Attach the policy **AWS Lambda DynamoDB Execution Role** to grant the necessary permissions.

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying details of a role named "dynamodb-stream-example-role-i8cg6o30," including its creation date and permissions policies.](https://kodekloud.com/kk-media/image/upload/v1752858802/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams-Demo/aws-iam-console-dynamodb-role.jpg)

> [!important]
> **Note**
>
> After updating the IAM policies, refresh the Lambda console and the DynamoDB Streams configuration. You should now see that the Lambda function is properly attached as a trigger.

![The image shows an AWS DynamoDB console with details about data streams and triggers. It includes options to manage Amazon Kinesis data streams and DynamoDB stream details, with a trigger section for AWS Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752858803/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams-Demo/aws-dynamodb-console-data-streams.jpg)

## Step 5: Test the Stream with Table Operations

To confirm that your setup is working, perform some of the following operations on your DynamoDB table:

- **Create an Item**: Add a new product (e.g., a computer) with attributes like price ($2000) and category (electronics).
- **Modify an Item**: Update an existing item (for example, change the price of a shampoo item from $10 to $5).
- **Delete an Item**: Remove an item (such as a TV).

These table operations will trigger the stream events, which the Lambda function processes. Then, check CloudWatch logs to verify that the events are captured correctly.

![The image shows an AWS CloudWatch Logs dashboard displaying log entries with timestamps and messages. The interface includes options for filtering and navigating through log data.](https://kodekloud.com/kk-media/image/upload/v1752858804/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams-Demo/aws-cloudwatch-logs-dashboard.jpg)

### Example Log Entries

In one of the CloudWatch log streams, you might see an entry for an insert event similar to:

```
{
  "ApproximateCreationDateTime": 1712886031,
  "Keys": {
    "name": {
      "S": "computer"
    }
  },
  "NewImage": {
    "price": {
      "N": "2000"
    },
    "name": {
      "S": "computer"
    },
    "category": {
      "S": "electronics"
    }
  },
  "SequenceNumber": "750000000034589963794",
  "SizeBytes": 50,
  "StreamViewType": "NEW_AND_OLD_IMAGES"
}
```

This confirms that a new product item with a price of 2000 and category electronics has been successfully created.

A log entry for a modification event will capture both the old and new values. For example, when modifying the "shampoo" item:

```
{
  "ApproximateCreationDateTime": 1712886045,
  "Keys": {
    "name": {
      "S": "shampoo"
    }
  },
  "NewImage": {
    "price": {
      "N": "5"
    },
    "name": {
      "S": "shampoo"
    },
    "category": {
      "S": "essentials"
    }
  },
  "OldImage": {
    "price": {
      "N": "10"
    },
    "name": {
      "S": "shampoo"
    },
    "category": {
      "S": "essentials"
    }
  },
  "SequenceNumber": "760000000034589984308",
  "SizeBytes": 83,
  "StreamViewType": "NEW_AND_OLD_IMAGES"
}
```

Here, you can observe that the shampoo price was adjusted from 10 to 5.

For a delete operation, the log might show:

```
{
  "NewImage": {
    "price": {
      "N": "5"
    },
    "name": {
      "S": "shampoo"
    },
    "category": {
      "S": "essentials"
    }
  },
  "OldImage": {
    "price": {
      "N": "100"
    },
    "name": {
      "S": "tv"
    },
    "category": {
      "S": "electronics"
    }
  },
  "SequenceNumber": "7600000000345890984308",
  "SizeBytes": 83,
  "StreamViewType": "NEW_AND_OLD_IMAGES"
}
```

In addition, the Lambda function's CloudWatch logs might include runtime reports like the following:

```
2024-04-10T21:27:25.790-06:00 END RequestId: 6d13e369-520c-41dc-8aab-faf3b80b1daa
2024-04-10T21:27:25.796-06:00 REPORT RequestId: 6d13e369-520c-41dc-8aab-faf3b80b1daa Duration: 153.31 ms Billed Duration: 154 ms Memory Size: 128 MB Max Memory Used: 68 MB
2024-04-10T21:27:35.936-06:00 START RequestId: 01c50a50-96cf-4a7d-9efd-0b322f201a Version: $LATEST
2024-04-10T21:27:35.936: 01c50a50-96cf-4a7d-9efd-0b322f201a INFO REMOVE
2024-04-10T21:27:35.951-06:00 END RequestId: 01c50a50-96cf-4a7d-9efd-0b322f201a
2024-04-10T21:27:35.951-06:00 REPORT RequestId: 01c50a50-96cf-4a7d-9efd-0b322f201a Duration: 100.89 ms Billed Duration: 101 ms Memory Size: 128 MB Max Memory Used: 68 MB
```

These logs confirm that the delete operation was successfully processed.

## Conclusion

You have now set up and integrated DynamoDB Streams with a Lambda trigger, enabling real-time processing of changes to your DynamoDB table. With the steps outlined above, you can confidently process stream events and monitor them via CloudWatch. Happy coding, and see you in the next article!

For more details, check out the [AWS Lambda Documentation](https://aws.amazon.com/lambda/) and [DynamoDB Streams Overview](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/ed4dab4b-3589-4e00-9a65-a1c96b31af81)**
>
> Watch video content
