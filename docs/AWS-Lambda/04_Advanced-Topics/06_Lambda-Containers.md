# Lambda Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Advanced-Topics/Lambda-Containers)

---

## Table of Contents

- Lambda Containers
  - Why Use AWS Lambda Container Images?
  - Building and Deploying Your Lambda Container
  - Conclusion
  - Links and References
  - Watch Video
    - Large Image Support

---

## Content

AWS Lambda

Advanced Topics

# Lambda Containers

AWS Lambda originally supported ZIP file deployments, and now you can also upload container images—combining the portability of Docker with Lambda’s serverless execution model. With container images, you package your application code, dependencies, and configuration into a single, portable image. AWS then runs that image in a fully managed, serverless environment without you needing to manage servers or clusters.

![The image is a diagram labeled "Lambda Containers" with a central icon representing a microchip, labeled "Containers" and "Programs."](https://kodekloud.com/kk-media/image/upload/v1752863081/notes-assets/images/AWS-Lambda-Lambda-Containers/lambda-containers-diagram-microchip.jpg)

## Why Use AWS Lambda Container Images?

Running containers on Lambda delivers the following advantages:

| Feature             | Description                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Serverless          | No servers or clusters to provision, manage, or scale—just push your image and AWS handles the rest.                                    |
| Automatic Scaling   | Lambda scales your container instantly to handle thousands of concurrent invocations, then scales down to zero when idle.               |
| Pay-per-Use Billing | You’re billed only for the compute time your container consumes, eliminating charges for idle capacity.                                 |
| Large Image Support | While ZIPs are capped at 250 MB, Lambda container images can be up to 10 GB—ideal for heavy workloads like AI/ML or big data analytics. |

![The image shows logos for Kubernetes, AWS Lambda, and ECS Autoscaling under the title "Lambda Containers."](https://kodekloud.com/kk-media/image/upload/v1752863082/notes-assets/images/AWS-Lambda-Lambda-Containers/lambda-containers-kubernetes-aws-ecs.jpg)

### Large Image Support

Lambda container images support sizes up to 10 GB, so you can bundle large frameworks, machine learning models, or data-processing libraries.

![The image shows the text "Lambda Containers" with an icon of a container and a chip, alongside "10 GB."](https://kodekloud.com/kk-media/image/upload/v1752863083/notes-assets/images/AWS-Lambda-Lambda-Containers/lambda-containers-icon-chip-10gb.jpg)

> [!important]
> **Note**
>
> Large image support opens the door to CPU- and memory-intensive workloads—everything from AI inference to ETL pipelines—without worrying about ZIP size limits.

## Building and Deploying Your Lambda Container

To deploy a container image on Lambda, your Docker image must include the Lambda Runtime Interface Client (RIC) or Runtime Interface Emulator for local testing.

> [!important]
> **Warning**
>
> All Lambda container images require the Lambda Runtime Interface Client (RIC). Failing to include the RIC will cause your function to fail at invocation time.

AWS provides several official base images:

| Runtime Type     | Base Image Reference                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| Managed Runtimes | `public.ecr.aws/lambda/<runtime>:<tag>`                                                            |
| Custom Runtimes  | Build via the [Lambda Runtime API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html) |
| Local Testing    | Use the Lambda Runtime Interface Emulator (LRE)                                                    |

Here’s a sample `Dockerfile` that uses the Python 3.9 managed runtime base image:

```
# Dockerfile example
FROM public.ecr.aws/lambda/python:3.9


# Copy application code
COPY app.py ${LAMBDA_TASK_ROOT}


# Set the command to run your handler
CMD ["app.handler"]
```

![The image illustrates the concept of Lambda Containers, showing components like base image, code, runtime interface emulator, and container app, alongside an AWS Lambda icon.](https://kodekloud.com/kk-media/image/upload/v1752863085/notes-assets/images/AWS-Lambda-Lambda-Containers/lambda-containers-architecture-diagram.jpg)

After building and pushing your image to Amazon ECR, simply create or update a Lambda function to point to that image:

```
aws lambda create-function \
  --function-name my-container-function \
  --package-type Image \
  --code ImageUri=123456789012.dkr.ecr.us-east-1.amazonaws.com/my-image:latest \
  --role arn:aws:iam::123456789012:role/lambda-execution-role
```

## Conclusion

By leveraging container images on AWS Lambda, you get the portability and tooling of Docker combined with a fully managed, auto-scaling, pay-per-use serverless environment. Whether you’re running microservices, data-processing jobs, or AI workloads, Lambda Containers offer flexibility and simplicity.

## Links and References

- [AWS Lambda Container Images](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)
- [Lambda Runtime Interface Client (RIC)](https://github.com/aws/aws-lambda-runtime-interface-client)
- [Lambda Runtime API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/71600a46-a390-4f40-884f-7588445b5976/lesson/2748a12f-ba53-40d3-83c9-ee90e980aa81)**
>
> Watch video content
