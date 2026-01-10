# DynamoDB Conditional writes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Conditional-writes)

---

## Table of Contents

- DynamoDB Conditional writes
  - Attribute Existence Check
  - Attribute Type Check
  - String Expressions: begins_with and contains
  - Size Expression
  - Watch Video
    - begins_with Expression
    - contains Expression

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Conditional writes

In this article, we explore how DynamoDB Conditional Writes help maintain data integrity by allowing write operations to be executed only when specified conditions are met. Conditional writes are particularly useful in scenarios where multiple users attempt to update the same item simultaneously. For instance, if User 1 tries to update item A to 1 and User 2 tries to update item A to 2 at the same time, the second operation might overwrite the first. With conditional writes, you can enforce a check—such as updating only if the current value is 0—thereby preventing unintended overwrites and ensuring consistency.

![The image illustrates the difference between concurrent and conditional writes in DynamoDB, showing how concurrent writes can overwrite each other, while conditional writes ensure only one update is accepted based on a condition.](https://kodekloud.com/kk-media/image/upload/v1752858726/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Conditional-writes/dynamodb-concurrent-conditional-writes.jpg)

DynamoDB Conditional Writes can be applied across several API calls, including PutItem, DeleteItem, UpdateItem, BatchWriteItem, and more. The database supports various conditional expressions, such as:

- attribute_exists
- attribute_not_exists
- attribute_type
- begins_with
- contains
- size

Below, we provide detailed examples and code snippets to help you understand and implement these conditional expressions.

---

> [!important]
> **Using Conditional Writes**
>
> Before using conditional writes, make sure to evaluate your application's concurrency needs to avoid conflicts when multiple writes occur at the same time.

## Attribute Existence Check

The `attribute_exists` condition verifies whether a particular attribute exists in an item. For example, to delete an item only if the attribute `ProductReviews.OneStar` exists, use the following command:

```
aws dynamodb delete-item \
  --table-name ProductCatalog \
  --key '{"id": {"N": "456"}}' \
  --condition-expression "attribute_exists(ProductReviews.OneStar)"
```

Conversely, you can use `attribute_not_exists` to ensure that an operation is executed only when a specified attribute does not exist. The following command deletes the item only if the `Price` attribute is absent:

```
aws dynamodb delete-item \
  --table-name ProductCatalog \
  --key '{"id": {"N": "456"}}' \
  --condition-expression "attribute_not_exists(Price)"
```

## Attribute Type Check

The `attribute_type` expression ensures that an attribute is of a specific type. For example, if you have an attribute named `Color` and want to ensure it is stored as a string, execute the following command:

```
aws dynamodb delete-item \
  --table-name ProductCatalog \
  --key '{"Id": {"N": "456"}}' \
  --condition-expression "attribute_type(Color, :v_sub)" \
  --expression-attribute-values file://expression-attribute-values.json
```

Create the accompanying JSON file named `expression-attribute-values.json` with the following content:

```
{
  ":v_sub": {"S": "SS"}
}
```

If the `Color` attribute is of type String, the condition evaluates to true, and the `delete-item` operation is executed.

## String Expressions: begins_with and contains

### begins_with Expression

The `begins_with` function checks if a string attribute starts with a specific substring. For example, to delete an item only when the attribute `Pictures.FrontView` begins with `"http://"`, use this command:

```
aws dynamodb delete-item \
  --table-name ProductCatalog \
  --key '{"Id": {"N": "456"}}' \
  --condition-expression "begins_with(Pictures.FrontView, :v_sub)" \
  --expression-attribute-values file://expression-attribute-values.json
```

Ensure your `expression-attribute-values.json` file contains:

```
{
  ":v_sub": {"S": "http://"}
}
```

### contains Expression

The `contains` function determines whether an attribute contains a specified value. For instance, to delete an item if the `Color` attribute contains `"Red"`, run the following command:

```
aws dynamodb delete-item \
  --table-name ProductCatalog \
  --key '{"Id": {"N": "456"}}' \
  --condition-expression "contains(Color, :v_sub)" \
  --expression-attribute-values file://expression-attribute-values.json
```

Your JSON file should include:

```
{
  ":v_sub": {"S": "Red"}
}
```

## Size Expression

The `size` function evaluates the length or size of an attribute. For example, if you want to delete an item only when the size of the `VideoClip` attribute is greater than 64,000, you can use this command:

```
aws dynamodb delete-item \
  --table-name ProductCatalog \
  --key '{"Id": {"N": "456"}}' \
  --condition-expression "size(VideoClip) > :v_sub" \
  --expression-attribute-values file://expression-attribute-values.json
```

This condition ensures that the deletion occurs only when the `VideoClip` attribute exceeds the specified size threshold.

---

> [!important]
> **Conclusion**
>
> DynamoDB Conditional Writes provide a robust mechanism to safeguard data integrity during concurrent data modifications. By using supported expressions such as `attribute_exists`, `attribute_not_exists`, `attribute_type`, `begins_with`, `contains`, and `size`, you can ensure write operations occur only when specific conditions are met, thereby preventing unintended data overwrites.

In summary, conditional writes are an essential feature for managing concurrent updates in DynamoDB, ensuring that your data remains consistent and reliable even in complex multi-user environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/687c7bcc-ddae-4c07-a8fc-9e0bd2fd55cb)**
>
> Watch video content
