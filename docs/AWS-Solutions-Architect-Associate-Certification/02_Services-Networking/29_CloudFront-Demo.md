# CloudFront Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/CloudFront-Demo)

---

## Table of Contents

- CloudFront Demo
  - Setting Up the Origin (S3 Bucket)
  - Configuring CloudFront
  - Demonstrating Cache Behavior with Invalidation
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# CloudFront Demo

In this lesson, you'll learn how to use CloudFront to cache static content for faster delivery. We'll configure an Amazon S3 bucket as the origin to store an image and then set up a CloudFront distribution to cache that image at edge locations. This approach ensures that users receive content from a nearby location rather than directly from the S3 bucket (for example, hosted in Northern Virginia).

## Setting Up the Origin (S3 Bucket)

Before configuring CloudFront, we need an origin to store our files. Although any web server, load balancer, or API endpoint can be used as an origin, this demo uses an Amazon S3 bucket for simplicity.

1.  **Create a New S3 Bucket**  
    Open the [Amazon S3 console](https://aws.amazon.com/s3/) and create a new bucket. For this demonstration, name the bucket `kodeklouddemo123` and leave the default region settings. Ensure that the bucket is configured to allow internet access.

    ![The image shows the AWS S3 Management Console with the "Create bucket" page open, where users can configure settings like bucket name, AWS region, and object ownership.](https://kodekloud.com/kk-media/image/upload/v1752865474/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-s3-create-bucket-console.jpg)

2.  **Upload an Image File**  
    Open the created bucket and upload the file `car.jpg` (a blue car image) by dragging and dropping it into the bucket.
3.  **Verify Object Access**  
    After uploading, click on the file to view the object URL. If you encounter an "Access Denied" error as shown below, it indicates that the bucket policy hasn’t been configured for public access.

    ```
    <Error>
        <Code>AccessDenied</Code>
        <Message>Access Denied</Message>
        <RequestId>LEGJQIT1HU0Z8N1X2P1F6X1H15/Requests15</RequestId>
        <HostId>86u4cayk5wB7dEFlCkNFnKf2dC5D1E7UY2c0/38Vnty6toGvYwXlP8iM8WnDZe</HostId>
    </Error>
    ```

    > [!important]
    > **Note**
    >
    > The error occurs because the S3 bucket policy restricts public access by default.

4.  **Configure the Bucket Policy**  
    To allow public access, navigate to the bucket's permissions and add the following JSON policy. (Remember to update the bucket name if needed.)

    ```
    {
      "version": "2012-10-17",
      "statement": [
        {
          "sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": [
            "s3:GetObject"
          ],
          "Resource": [
            "arn:aws:s3:::kodeklouddemo123/*"
          ]
        }
      ]
    }
    ```

5.  **Confirm Public Accessibility**  
    After applying the policy, clicking the object URL should display the image successfully.

    ![The image shows an Amazon S3 bucket interface with a file named "car.jpg" listed, including details like type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752865475/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/amazon-s3-bucket-interface-car.jpg)

## Configuring CloudFront

With the origin set up, the next step is to configure CloudFront to cache the image at edge locations for enhanced performance.

1.  **Create a CloudFront Distribution**  
    In the CloudFront console, create a new distribution. Under "Origin Domain," select your S3 bucket (`kodeklouddemo123`). If you wanted to cache a specific folder (for example, `/images`), you could enter that in "Origin Path." For this demo, leave the origin path blank to cache all objects.

    ![The image shows an AWS CloudFront interface for creating a distribution, with fields for setting the origin domain, origin path, and origin access options.](https://kodekloud.com/kk-media/image/upload/v1752865477/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-cloudfront-distribution-interface.jpg)

2.  **Adjust Distribution Settings**  
    Update the following settings as needed:
    - **Origin Access:**  
      Set to public if you want users to access the S3 URL directly, or configure origin access control for enhanced security by limiting access exclusively through CloudFront.
    - **Compress Objects Automatically:**  
      Set this option to Yes for performance improvements.
    - **Allowed Protocols:**  
      Enable both HTTP and HTTPS. For a production environment, it's recommended to enforce HTTPS only.
    - **Allowed HTTP Methods:**  
      For static content, GET is sufficient. Additional methods (PUT, POST, PATCH) can be enabled if required.
    - **Edge Locations:**  
      CloudFront uses all edge locations by default; you can modify this to restrict caching to specific regions if necessary.

    Other settings like AWS Certificate Manager for certificates and IPv6 support can remain at their default values for this demonstration.

    ![The image shows a CloudFront distribution creation page on AWS, where the user is configuring the origin settings, including the origin domain and path.](https://kodekloud.com/kk-media/image/upload/v1752865478/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/cloudfront-distribution-origin-settings.jpg)

3.  **Deploy the Distribution**  
    Once configured, create the distribution. Deployment may take a few minutes. When it’s complete, the distribution shows as enabled and displays a domain name you can use to access the cached files.

    ![The image shows an AWS CloudFront distribution management page, indicating a new distribution has been successfully created and is currently deploying.](https://kodekloud.com/kk-media/image/upload/v1752865480/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-cloudfront-distribution-deployment.jpg)

4.  **Access the Cached Image**  
    To test the configuration, enter your distribution's domain name in the browser followed by `/car.jpg`. Note that accessing the domain root will not work since the S3 bucket is configured for static objects without an index.

    ![The image shows an Amazon S3 bucket interface with the bucket name "kodeklouddemo123," displaying two objects: a file named "car.jpg" and a folder named "images/".](https://kodekloud.com/kk-media/image/upload/v1752865481/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/amazon-s3-bucket-kodeklouddemo123.jpg)

At this stage, your S3-hosted image should load via CloudFront’s edge locations, delivering faster content to users.

## Demonstrating Cache Behavior with Invalidation

After verifying that CloudFront is serving the cached blue car image, we will update the object in the S3 bucket to demonstrate CloudFront's caching behavior and invalidation process.

1.  **Update the Image in S3**
    - Delete the existing `car.jpg` from the S3 bucket.
    - Upload a new image (a red car) with the same file name (`car.jpg`). When accessing the direct S3 URL, you should now see the red car image.

    ![The image shows an AWS S3 Management Console upload interface with a file named "car.jpg" ready to be uploaded. The file is 2.7 MB in size and is set to be uploaded to the "kodeklouddemo123" bucket.](https://kodekloud.com/kk-media/image/upload/v1752865482/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-s3-upload-interface-carjpg.jpg)

2.  **Observe Cache Persistence**  
    Refresh the CloudFront distribution URL for `/car.jpg`. You may still see the blue car image because it is cached with a default TTL (Time to Live) of 86,400 seconds (24 hours).

    > [!important]
    > **Caching Behavior**
    >
    > The cached content persists until the TTL expires. If immediate updates are required, you must invalidate the cache.

3.  **Invalidate the Cache**  
    To force CloudFront to fetch the updated image before the TTL elapses, create an invalidation request:
    - In the CloudFront console, select your distribution and go to the "Invalidations" tab.
    - Create a new invalidation. To invalidate a specific file, enter `/car.jpg`. Alternatively, to invalidate all objects, use `/*`. You can also invalidate a folder using a pattern like `/images/*`.

    ![The image shows an AWS CloudFront interface where a user is creating an invalidation by adding object paths to remove from the cache.](https://kodekloud.com/kk-media/image/upload/v1752865483/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-cloudfront-invalidation-creation.jpg)

4.  **Verify the Invalidation**  
    Once the invalidation process is complete, refresh the CloudFront URL for `/car.jpg`. The red car image should now appear as CloudFront fetches the updated object from the S3 bucket.

    ![The image shows an AWS CloudFront console screen with a completed invalidation request, displaying details such as the date created and object paths.](https://kodekloud.com/kk-media/image/upload/v1752865485/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-cloudfront-invalidation-request.jpg)

5.  **Review TTL and Caching Policy**  
    For further insights, check the TTL and caching policy by navigating to the "Behaviors" tab in your CloudFront distribution settings and clicking "Edit" on the appropriate behavior.

    ![The image shows an AWS CloudFront distribution settings page, displaying details such as the distribution domain name, ARN, and various settings like logging and HTTP versions.](https://kodekloud.com/kk-media/image/upload/v1752865486/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-cloudfront-distribution-settings.jpg)

    ![The image shows an AWS CloudFront console screen displaying a managed caching policy with details about TTL settings and compression support.](https://kodekloud.com/kk-media/image/upload/v1752865488/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudFront-Demo/aws-cloudfront-caching-policy-ttl.jpg)

## Conclusion

In this lesson, we demonstrated how to set up an Amazon S3 bucket as the origin for static content and configure an AWS CloudFront distribution to cache that content at edge locations. We also covered how to perform cache invalidation to ensure that updates propagate before the default TTL expires. This flexible setup is also ideal for hosting static websites, ensuring quick and reliable content delivery.

Happy caching, and enjoy building faster web experiences!

For more information on AWS CloudFront and S3, visit the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/77031cb9-3a7e-4bf2-9f49-0a814de02f29)**
>
> Watch video content
