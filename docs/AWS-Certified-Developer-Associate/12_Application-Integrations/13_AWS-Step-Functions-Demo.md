# AWS Step Functions Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/AWS-Step-Functions-Demo)

---

## Table of Contents

- AWS Step Functions Demo
  - Creating a State Machine
  - Building the Workflow
  - Creating and Testing the State Machine
  - Conclusion
  - Watch Video
    - Step 1: Configuring the "Detect Threat" Lambda
    - Step 2: Adding a Choice State

---

## Content

AWS Certified Developer - Associate

Application Integrations

# AWS Step Functions Demo

In this lesson, we demonstrate how to work with AWS Step Functions by building a simple workflow that simulates threat detection from a camera event.

Begin by searching for "Step Functions" in the AWS Console. This search leads you to the page where you can create your first state machine—a central component where you design your workflow logic by combining the necessary steps and actions to process events.

## Creating a State Machine

Select **"Create state machine"** to start. AWS offers several templates to help you begin quickly without building the entire workflow from scratch. Although you can explore these templates, this demonstration uses a blank template so you can build the workflow step by step.

![The image shows a selection screen for choosing a template in the AWS Step Functions console, with various options for different use cases like data processing and microservice APIs. Each template is represented with icons and brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752858356/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-template-selection.jpg)

After selecting the blank template, the authoring window will appear. At the center is your workflow canvas with a "Start" point at the top and an "End" state at the bottom. You will drag and drop various actions between these endpoints to build your logic.

![The image shows the AWS Step Functions interface, where a state machine is being designed. It includes a start and end state with a placeholder to drag the first state, and a sidebar with various AWS services.](https://kodekloud.com/kk-media/image/upload/v1752858358/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-state-machine-design.jpg)

On the left sidebar, you find a list of actions and integrations with many AWS services. Under the "Most Popular" section, common actions such as invoking a Lambda function, publishing to SNS, or running an ECS task are readily available. Scrolling down reveals even more integrations, giving you the versatility to build varied workflows.

In the “Flow” section, you can add logic—such as if-then-else (Choice state) or parallel execution—to handle different branches. The right-hand panel offers configuration settings for each state; for example, when you add a Lambda function, you will need to specify which function to invoke and configure its options.

## Building the Workflow

For this demo application, imagine a smart doorbell that records activity. When motion is detected, an event is sent to the state machine. The workflow then determines whether the motion represents a threat and takes appropriate actions.

### Step 1: Configuring the "Detect Threat" Lambda

Begin by switching to the AWS Lambda console to locate your Lambda functions. In this example, the function named **"detect_threat"** analyzes the event data and randomly returns either a threat or no threat, simulating a 50/50 chance.

Drag this Lambda function onto your state machine canvas. Although an “X” may appear initially, this indicates that the configuration is incomplete. To complete it:

1.  Rename the state to **"detect threat"** for clarity.
2.  Select the AWS SDK optimized integration.
3.  From the dropdown, choose the **"detect_threat"** Lambda function.
4.  Configure the state payload to pass the state input (e.g., video clip or event metadata) to the Lambda function.

![The image shows an AWS Step Functions interface where a state machine named "MyStateMachine-bd6inz729" is being designed. It includes a Lambda function called "Detect Threat" with configuration details on the right.](https://kodekloud.com/kk-media/image/upload/v1752858359/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-mystate-machine-lambda.jpg)

By default, the entire input object is passed. In advanced use cases, you may filter the input to include only the necessary fields.

Below is a sample snippet of the Lambda function:

```
export const handler = async (event) => {
  // Determine if a threat is present
  const result = Math.random() < 0.5 ? "THREAT" : "NO_THREAT";
  return { result };
};
```

> [!important]
> **Note**
>
> This Lambda function simply returns an object with a "result" property, with a value of either "THREAT" or "NO_THREAT."

Under the state configuration, you can enable wait-for-callback functionality for human intervention when necessary (such as order approval scenarios). For this demo, we keep it disabled. Finally, set the state to transition to the "End" state (or later, branch into a Choice state).

![The image shows an AWS Step Functions interface with a state machine named "MyStateMachine-bd6inz729" in design mode. It includes a flow diagram with a "Detect Threat" Lambda function and configuration options on the right.](https://kodekloud.com/kk-media/image/upload/v1752858360/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-mystate-machine-diagram.jpg)

The configuration also supports error handling with retry policies and catch statements. For instance, if the Lambda function encounters an error, you can configure retries. In our demo, basic error handling is enabled by default.

### Step 2: Adding a Choice State

After threat detection, the workflow must branch based on the output. To implement this if-then-else logic, add a **Choice state** to the canvas. This state evaluates the output of the "detect threat" function and directs the workflow accordingly.

Configure the first rule with the following condition:

- **Variable:** $.result
- **Comparator:** Equals
- **Value:** "THREAT"

If this condition is met, drag a new Lambda function state for the **"threat found"** action onto the canvas. In its configuration, select the associated Lambda function named **"threat_found"** and set its next state to **"End."**

Next, add a second rule to handle the alternative outcome:

- **Variable:** $.result
- **Comparator:** Equals
- **Value:** "NO_THREAT"

For this condition, drag another Lambda state onto the canvas, name it **"no threat"**, and assign the Lambda function **"false_positive."** Again, set the next state to **"End."** Ensure that any default rules are removed so the workflow strictly follows your conditions.

![The image shows an AWS Step Functions interface where a state machine is being designed. It includes a flowchart with a "Detect Threat" Lambda function and a "Choice" state, along with options for adding different actions and configurations.](https://kodekloud.com/kk-media/image/upload/v1752858362/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-state-machine-diagram-2.jpg)

![The image shows an AWS Step Functions interface with a workflow diagram on the right, including states like "Detect Threat" and "Threat Found." The left panel lists popular AWS services such as Lambda and SNS.](https://kodekloud.com/kk-media/image/upload/v1752858363/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-workflow-diagram.jpg)

Finally, connect the outputs from the Choice state to their respective Lambda function states. The **"threat found"** branch will handle confirmed threats (such as triggering alerts or sending notifications), while the **"no threat"** branch logs the event for false positives.

![The image shows an AWS Step Functions interface with a workflow diagram for detecting threats. It includes Lambda functions and a choice state for decision-making based on threat detection results.](https://kodekloud.com/kk-media/image/upload/v1752858364/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-threat-detection.jpg)

Additional integrations—like integrating with SES for email or SMS notifications—can be added. For this demonstration, we conclude the workflow after linking the branches.

![The image shows an AWS Step Functions interface with a workflow diagram for detecting threats, including Lambda functions and choice states.](https://kodekloud.com/kk-media/image/upload/v1752858365/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-threat-detection-diagram.jpg)

## Creating and Testing the State Machine

With the workflow configured, click **"Create"** to build your state machine. AWS automatically creates and assigns an IAM role, allowing the state machine to invoke the specified Lambda functions and, if enabled, AWS X-Ray for tracing.

> [!important]
> **Warning**
>
> Ensure all configurations are set correctly—especially error handling settings—before creating the state machine.

Once created, initiate an execution by clicking **"Start Execution."** You will be prompted to provide input data representing the event. For instance, a typical input for a camera event might resemble:

```
{
  "camera_id": "ssldfjiskd-234-sdfs",
  "object_id": "video1.mp4"
}
```

After starting the execution, AWS Step Functions displays the progress in a graphical view. The workflow begins at **"detect threat,"** passes through the Choice state, and follows the corresponding branch based on the result ("Threat Found" or "No Threat").

![The image shows an AWS Step Functions interface with a state machine design. It includes a "Lambda Invoke" state, and there is an error notification indicating that the workflow is not created.](https://kodekloud.com/kk-media/image/upload/v1752858366/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-state-machine-error.jpg)

You can click on individual steps to review input and output details, which provide insights into:

- The event data received (e.g., camera ID, object ID)
- The result from the "detect threat" function
- The decisions evaluated at the Choice state and the subsequent actions taken

![The image shows an AWS Step Functions interface with a flowchart depicting a process that starts with "Detect Threat," followed by a "Choice" node leading to either "Threat Found" or "No Threat," and ending the process.](https://kodekloud.com/kk-media/image/upload/v1752858368/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-threat-detection-flowchart.jpg)

Running multiple executions may result in varied branches being taken, confirming that the Choice state functions as expected.

Finally, return to the main state machine overview to review execution statistics—such as total runs, successes, and failures. The interface allows you to switch between graphical and table views to analyze execution history in detail.

![The image shows an AWS Step Functions console with a list of events related to a state machine execution, including steps like "Detect Threat" and "No Threat," with timestamps and statuses.](https://kodekloud.com/kk-media/image/upload/v1752858369/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Step-Functions-Demo/aws-step-functions-state-machine-events.jpg)

## Conclusion

In this lesson, we built a simple state machine for threat detection by integrating AWS Step Functions with Lambda functions. The workflow simulates a real-world scenario where a camera event triggers analysis, leading to different actions based on the threat detection outcome.

We covered:

- Creating a new state machine using a blank template
- Configuring a Lambda function to simulate threat detection
- Incorporating a Choice state to branch the workflow based on the threat detection result
- Testing the state machine with sample input and reviewing execution details

This demonstration highlights AWS Step Functions' flexibility in orchestrating complex workflows with integrated error handling and branch logic.

Happy building, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/6e610ab6-a27c-409f-9768-2638b8bc5f2e)**
>
> Watch video content
