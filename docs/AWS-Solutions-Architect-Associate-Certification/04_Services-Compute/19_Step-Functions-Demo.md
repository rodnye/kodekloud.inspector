# Step Functions Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/Step-Functions-Demo)

---

## Table of Contents

- Step Functions Demo
  - Creating a New State Machine
  - Overview of the State Machine Authoring Window
  - Demo Application Scenario
  - Adding Decision Logic with a Choice State
  - Lambda Function Logic for Post-Detection
  - Testing the State Machine
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# Step Functions Demo

In this article, we demonstrate how to work with AWS Step Functions by creating a simple state machine that processes events from a camera service. Imagine a scenario where a smart doorbell captures video upon detecting motion. The recorded event is sent to our state machine, which then evaluates whether the motion indicates a threat or is merely a false alarm. Depending on the outcome, different Lambda functions are triggered to handle each case.

---

## Creating a New State Machine

Begin by searching for "Step Functions" in the AWS Console. This will take you to the page where you can create your first state machine. Click on **Create state machine**.

A state machine is the location where you build your workflow logic by combining individual steps that process your tasks.

![The image shows an AWS Step Functions console with a list of state machines, displaying their names, types, creation dates, and statuses. There are options to view details, edit, copy, delete, or create a new state machine.](https://kodekloud.com/kk-media/image/upload/v1752864993/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-state-machines.jpg)

AWS offers a variety of templates to help you get started quickly. For this demo, we will select the blank template to build our workflow from scratch.

![The image shows an AWS console interface for selecting a template, with various options for different use cases like data processing and IT automation. Each template is represented with icons and brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752864994/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-console-template-selection-icons.jpg)

After choosing the blank template, you are directed to the authoring window for your state machine.

---

## Overview of the State Machine Authoring Window

At the core of the authoring window, you will see the graphical depiction of your state machine workflow. The flow begins from the **Start** node and progresses to the **End** node as all steps are executed.

![The image shows the AWS Step Functions console with a state machine design interface. It includes a workflow area with "Start" and "End" nodes and a sidebar listing AWS services like Lambda and SNS.](https://kodekloud.com/kk-media/image/upload/v1752864996/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-state-machine-design.jpg)

On the left side, you'll find various actions and integrations with other AWS services. Popular integrations include invoking AWS Lambda functions, publishing to SNS, or executing ECS tasks. Scrolling down reveals many additional options for customizing your workflow.

The **Flow** section enables you to incorporate advanced logic into your state machine, such as if-then-else conditions with a choice state, parallel execution of steps, or wait states to introduce delays. The right panel displays specific configuration options for each state—allowing you to set parameters like function selection and error handling.

---

## Demo Application Scenario

In our demo scenario, a camera records an event and sends the data (such as an image or video clip) to the state machine. The first step in the workflow is to invoke a Lambda function named **detect_threat**, which analyzes the input to determine if the event represents a threat.

![The image shows an AWS Lambda console with a list of functions, including "detect_threat" and "event_summary," all using Node.js 18.x runtime.](https://kodekloud.com/kk-media/image/upload/v1752864997/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-lambda-console-functions-nodejs.jpg)

The **detect_threat** Lambda function uses simple logic to simulate threat detection by randomly returning either "THREAT" or "NO_THREAT":

```
export const handler = async (event) => {
    // Determine if there's a threat
    const result = Math.random() < 0.5 ? "THREAT" : "NO_THREAT";
    return { result };
};
```

After dragging the Lambda function into the workflow, rename the state to **Detect Threat**. Select the **optimized** integration type and choose the appropriate Lambda function (in this case, **detect_threat**) from the dropdown menu.

Next, configure the payload so that the state input is forwarded to the Lambda function. This ensures that the event data triggering the state machine is available for analysis. You can also adjust error handling by defining retry intervals, maximum attempts, and backoff rates. For this demo, the wait-for-callback feature is disabled, and the state transitions to **End** after execution.

---

## Adding Decision Logic with a Choice State

Based on the output from **detect_threat**, the state machine must decide which branch to follow. This is accomplished by adding a choice state to the workflow.

Configure the choice state with two conditions:

1.  **If Result Equals "THREAT":**
    - Set the condition by specifying the variable `$.result`, choosing "is equal to" as the comparator, and entering `THREAT` as the string value.
    - Drag a new Lambda state into the workflow and name it **Threat Found**.
    - Select the corresponding Lambda function (e.g., **threatfound**) from the dropdown.
    - Configure the branch to end the workflow after execution.

2.  **If Result Equals "NO_THREAT":**
    - Add another rule where the result is equal to `NO_THREAT`.
    - Drag in the Lambda state for handling false positives, name it **No Threat**, and select its associated Lambda function (e.g., **falsepositive**).
    - Set the transition for this branch to lead to the End state.

![The image shows an AWS Step Functions interface with a state machine workflow design. It includes a flowchart with a "Detect Threat" Lambda function and a "Choice" state, along with configuration options on the right.](https://kodekloud.com/kk-media/image/upload/v1752864998/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-workflow-diagram.jpg)

Once the rules are configured, the diagram visually illustrates the conditional branches.

![The image shows an AWS Step Functions interface with a state machine named "MyStateMachine-bd6inz729" in design mode. It includes a workflow diagram with a "Detect Threat" Lambda function and configuration options on the right.](https://kodekloud.com/kk-media/image/upload/v1752865000/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-my-state-machine-diagram.jpg)

You can also remove any default conditions if they are not required. The final configuration should clearly display two branches: one for `THREAT` and another for `NO_THREAT`.

![The image shows an AWS Step Functions interface with a workflow diagram, including a "Detect Threat" Lambda function and a choice state for decision-making. The left panel lists popular AWS services, and the right panel displays choice rules for the workflow.](https://kodekloud.com/kk-media/image/upload/v1752865001/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-workflow-diagram-2.jpg)

---

## Lambda Function Logic for Post-Detection

After the **detect_threat** function returns its result, the state machine executes one of two Lambda functions:

- **Threat Found Function:**  
  This function runs when a threat is detected. It may handle actions such as sending alerts and notifications.
- **False Positive Function:**  
  This function addresses situations where the detected event is a false alarm. Here is a simple implementation:

  ```
  export const handler = async (event) => {
      // Logic for a false positive detection
      return "threat found";
  };
  ```

In a real-world application, these functions might include more advanced logic like sending emails via Amazon SES, logging events to a database, or performing additional verification steps.

> [!important]
> **Note**
>
> For production environments, ensure that each Lambda function is thoroughly tested and secured according to AWS best practices.

---

## Testing the State Machine

After configuring all states and decision logic, click **Create**. AWS automatically provisions the necessary IAM role with permissions that allow the state machine to invoke the configured Lambda functions and access other services like AWS X-Ray.

If you encounter errors related to error handling (such as an extraneous error catcher on the **Detect Threat** state), simply remove or adjust the configuration.

Once the state machine is created, test it by initiating an execution. Provide sample input data simulating a camera event. For example, you may supply a simple JSON payload like:

```
{
  "comment": "Insert your JSON here"
}
```

Or to mimic a realistic event:

```
{
  "camera_id": "ssldfjsikd-234-sdfs",
  "object_id": "video1.mp4"
}
```

After you start the execution, the console displays a graphical representation of the execution path. Colors within the diagram indicate which branches were followed—for example, starting at **Detect Threat**, moving to the **Choice** state, then progressing along either the threat or false positive branch, and finally reaching the **End** state.

![The image shows an AWS Step Functions interface with a state machine design, featuring a "Lambda Invoke" action between start and end states. Configuration options for the Lambda function are visible on the right panel.](https://kodekloud.com/kk-media/image/upload/v1752865002/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-state-machine-diagram.jpg)

Click on any state in the execution graph to inspect detailed information such as input, output, configuration parameters, and an event log. This is instrumental in troubleshooting and understanding your workflow.

For instance, one execution might show that the **detect_threat** function returned `"NO_THREAT"`, triggering the false positive function. A different execution might reveal the threat branch being taken.

![The image shows an AWS Step Functions console with a flowchart for a process that detects threats, including steps for "Detect Threat," "Choice," "Threat Found," and "No Threat." On the right, there is a JSON response with metadata and status codes, and below is an events log detailing execution steps.](https://kodekloud.com/kk-media/image/upload/v1752865003/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-threat-detection-2.jpg)

After multiple executions, review the summary in the state machine main window. This summary provides a breakdown of successful, failed, timed out, or aborted runs. You can examine these details in either a graphical view or table format.

![The image shows an AWS Step Functions console displaying the details of a successful execution of a state machine. It includes execution status, start and end times, and a graph view of the workflow.](https://kodekloud.com/kk-media/image/upload/v1752865004/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Step-Functions-Demo/aws-step-functions-execution-details.jpg)

---

## Conclusion

This demo has guided you through building a simple AWS Step Functions state machine that processes an event from a simulated camera service. We implemented conditional logic based on Lambda function outputs to handle distinct branches for threat and false positive scenarios. This example serves as a foundation for developing more complex workflows by integrating multiple AWS services and advanced custom logic.

> [!important]
> **Explore Further**
>
> Consider expanding this demo by integrating additional services like Amazon SES for notifications or more advanced error handling strategies. For more information, explore the [AWS Step Functions Documentation](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/7154ef92-2e72-475e-a385-8718a7ba3732)**
>
> Watch video content
