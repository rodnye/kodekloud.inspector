# Demo Setup Architecture and Deploy Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Introduction-to-Real-life-Application/Demo-Setup-Architecture-and-Deploy-Application)

---

## Table of Contents

- Demo Setup Architecture and Deploy Application
  - Accessing the Pet Site Application
  - Establishing a Steady State by Generating Load
  - Simulating Real User Behavior with k6 and Chromium
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Introduction to Real life Application

# Demo Setup Architecture and Deploy Application

The application deployment is now complete. To verify, open the AWS CloudFormation console and navigate to **Stacks**. You should see all related stacks—such as **C9FS workshop** and your service stacks—in the **CREATE_COMPLETE** state.

![The image shows an AWS CloudFormation console with a list of stacks, all marked as "CREATE_COMPLETE." The "Outputs" section displays a key-value pair for "PetSiteUrl" with a URL value.](https://kodekloud.com/kk-media/image/upload/v1752871943/notes-assets/images/Chaos-Engineering-Demo-Setup-Architecture-and-Deploy-Application/aws-cloudformation-stacks-create-complete.jpg)

> [!important]
> **Note**
>
> If any stack is still in progress, refresh the console after a few moments or check the [AWS CloudFormation Troubleshooting guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html).

## Accessing the Pet Site Application

In the **Outputs** tab of your services stack, locate the `PetSiteUrl` key. Click the URL to open the pet adoption site in your browser. This site lets you browse pets, select one to adopt, and complete the checkout flow.

## Establishing a Steady State by Generating Load

Before injecting faults, define your application’s steady state under normal traffic. We’ll scale up the existing ECS Fargate traffic-generator to simulate realistic load.

> [!important]
> **Warning**
>
> Scaling Fargate tasks may incur additional AWS charges. Monitor your [AWS Billing Dashboard](https://console.aws.amazon.com/billing) accordingly.

1.  Open your Cloud9 environment:

    ```
    cd ~/environment
    ```

2.  Retrieve the ECS cluster ARN that contains “PetLis”:

    ```
    PETLISTADOPTIONS_CLUSTER=$(aws ecs list-clusters \
      | jq -r '.clusterArns[] | select(contains("PetLis"))')
    ```

3.  Find the traffic-generator service ARN:

    ```
    TRAFFICGENERATOR_SERVICE=$(aws ecs list-services \
      --cluster "$PETLISTADOPTIONS_CLUSTER" \
      | jq -r '.serviceArns[] | select(contains("trafficgenerator"))')
    ```

4.  Scale the service to 5 tasks:

    ```
    aws ecs update-service \
      --cluster "$PETLISTADOPTIONS_CLUSTER" \
      --service "$TRAFFICGENERATOR_SERVICE" \
      --desired-count 5
    ```

Wait until the service stabilizes. You should see:

```
{
  "service": {
    "desiredCount": 5,
    "runningCount": 5,
    "pendingCount": 0,
    "status": "ACTIVE",
    "launchType": "FARGATE"
  }
}
```

## Simulating Real User Behavior with k6 and Chromium

We’ll use k6’s browser extension with Chromium in Docker to generate realistic user flows on the pet site.

1.  Create the k6 script (`k6petsite.js`):

    ```
    import { chromium } from 'k6/x/browser';

    export async function browserTest() {
      const browser = chromium.launch();
      const page = browser.newPage();
      try {
        await page.goto('http://URI/');
        const submitButton = page.locator('input[value="Search"]');
        await Promise.all([
          page.waitForNavigation(),
          submitButton.click()
        ]);
      } finally {
        await page.close();
        await browser.close();
      }
    }
    ```

2.  Inject your actual PetSite URL:

    ```
    sed -i 's|URI|'"$MYSITE"'|g' k6petsite.js
    ```

3.  Download the Docker seccomp profile and run the test:

    ```
    curl -o chrome.json \
      https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp.json
    ```

    After downloading, launch k6 in Docker (approximately 10 minutes):

    ```
    docker run --rm -i \
      -v "$PWD":/scripts \
      -v "$PWD"/chrome.json:/etc/docker/seccomp.json:ro \
      -e K6_BROWSER_HOST=0.0.0.0 \
      loadimpact/k6:latest run /scripts/k6petsite.js
    ```

> [!important]
> **Note**
>
> This browser-based load test runs for ~10 minutes and simulates real user searches on your pet adoption site.

## Next Steps

1.  Open the [AWS CloudWatch console](https://console.aws.amazon.com/cloudwatch).
2.  Navigate to **RUM (Real User Monitoring)**.
3.  Review the performance metrics to confirm your steady-state baseline before starting fault-injection experiments.

---

## Links and References

- [AWS CloudFormation Documentation](https://docs.aws.amazon.com/cloudformation/)
- [Amazon ECS Developer Guide](https://docs.aws.amazon.com/ecs/latest/developerguide/)
- [k6 Browser Extension](https://k6.io/docs/browser-bundling/)
- [AWS CloudWatch Real User Monitoring](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/a6b84b48-a401-48a4-8278-0be5a8bb0d38/lesson/601ecf5d-d4cc-47f1-bec4-3fface7ee24f)**
>
> Watch video content
