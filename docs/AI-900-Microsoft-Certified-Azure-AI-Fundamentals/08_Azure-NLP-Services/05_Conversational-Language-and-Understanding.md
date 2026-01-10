# Conversational Language and Understanding - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-NLP-Services/Conversational-Language-and-Understanding)

---

## Table of Contents

- Conversational Language and Understanding
  - Utterance
  - Intent
  - Entity
  - How Conversational AI Works
  - Working with LUIS in Language Studio
  - Watch Video
    - 1. Creating a New Project
    - 2. Project Setup
    - 3. Defining Intents
    - 4. Labeling the Data
    - 5. Additional Example – Cancel Reminder
    - 6. Testing Intents
    - 7. Training and Deployment
    - 8. Testing the Deployed Model

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure NLP Services

# Conversational Language and Understanding

In this article, we explore the fundamental components that empower conversational AI systems—such as [Azure's Language Understanding (LUIS)](https://learn.microsoft.com/en-us/azure/cognitive-services/luis/overview) and the [Azure Bot Service](https://learn.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0)—to interpret and respond to natural language inputs. This guide breaks down the process into three essential elements: Utterance, Intent, and Entity.

## Utterance

An utterance is the spoken or typed input provided by a user. For instance, when a user says "Set a timer for 10 minutes," this complete input is processed as an utterance. Conversational AI systems analyze such inputs to understand the user's requirements.

![The image illustrates a person sitting at a desk with a laptop, discussing "Conversational Language and Understanding" with a focus on "Utterance." It includes a text box saying "Set a timer for 10 minutes" and a note about user input.](https://kodekloud.com/kk-media/image/upload/v1752856907/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/conversational-language-utterance-discussion.jpg)

## Intent

The intent represents the underlying purpose or goal behind the user’s utterance. In the previous example, the intent is "set timer." The system identifies this intent to decide on the appropriate course of action.

![The image is about "Conversational Language and Understanding," focusing on "Intent," which is described as the action a user wants the system to perform. It includes an illustration of a person with a laptop and a computer screen, along with the example "Set a timer for 10 minutes."](https://kodekloud.com/kk-media/image/upload/v1752856908/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/conversational-language-intent-illustration.jpg)

## Entity

An entity provides specific details extracted from an utterance. In our timer example, the phrase "10 minutes" is an entity that specifies the duration. By extracting entities, the system can execute the user's request with greater precision.

![The image is a slide titled "Conversational Language and Understanding," focusing on the concept of "Entity" as a specific detail in an utterance that provides context, with an example of setting a timer for 10 minutes.](https://kodekloud.com/kk-media/image/upload/v1752856909/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/conversational-language-entity-timer.jpg)

## How Conversational AI Works

The methodology behind processing user input in conversational AI follows these steps:

1.  **Recognize the Utterance:** Capture the complete user input.
2.  **Classify the Intent:** Determine the user's goal (for instance, setting a timer).
3.  **Extract Entities:** Identify and extract particular pieces of information (e.g., "10 minutes").
4.  **Generate a Response:** Utilize the recognized intent and entities to perform an action or provide a suitable response, such as initiating the timer.

> [!important]
> **Note**
>
> Accurately identifying the intent and entities is crucial for the system to deliver precise actions.

## Working with LUIS in [Language Studio](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/)

Follow these steps to create, train, test, and deploy a conversational language understanding project using Azure Language Studio:

### 1\. Creating a New Project

- In Language Studio, click on **"Create New"** and choose **"Conversational Language Understanding."**

![The image shows the Azure Language Studio interface, featuring options for creating new projects and exploring capabilities like call transcription, summarization, and document translation.](https://kodekloud.com/kk-media/image/upload/v1752856910/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/azure-language-studio-interface.jpg)

### 2\. Project Setup

- Name your project (e.g., "LUIS AI 900").
- Click **"Next"** and then **"Create."** You will then be directed to the intents section.

### 3\. Defining Intents

- In the intents section, add a new intent by navigating to the Schema Definition.
- Create an intent called "Set Reminder."
- You can add additional intents such as "Cancel Reminder," "Set Alarm," "Modify Alarm," "Cancel Alarm," or "Set Recurring Alarm" as required.

![The image shows a screenshot of Azure Language Studio, specifically the "Schema definition" section, where a user is adding a new intent named "CancelRemind."](https://kodekloud.com/kk-media/image/upload/v1752856911/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/azure-language-studio-schema-cancelremind.jpg)

### 4\. Labeling the Data

Once the intents are defined, start labeling your training data. For example, for the "Set Reminder" intent, you might include an utterance like:

"Set a reminder for me to call mom at 6 p.m."

Define the extracted entities:

- Action: "call mom"
- Time: "6 p.m."

Enhance your model’s robustness with additional examples. For instance:

"Remind me to order the plants tomorrow morning."

For this utterance:

- Action: "order the plants" or "water the plants"
- Time: "morning"
- Date: (optional, e.g., "tomorrow")

![The image shows a screenshot of the Azure Language Studio interface, specifically the data labeling section for a conversational language understanding project. It includes options for setting intents and utterances, with a focus on creating a reminder-related task.](https://kodekloud.com/kk-media/image/upload/v1752856913/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/azure-language-studio-data-labeling.jpg)

![The image shows a screenshot of the Microsoft Azure Language Studio interface, specifically the data labeling section for a conversational language understanding project. It includes labeled utterances for intents like "SetReminder" with entities such as "Action," "Date," and "Time."](https://kodekloud.com/kk-media/image/upload/v1752856917/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/azure-language-studio-data-labeling-2.jpg)

### 5\. Additional Example – Cancel Reminder

- Define an utterance such as:

  "Cancel my reminder to call Dad tonight."

  Here, the intent is "Cancel Reminder" and the entity "Action" corresponds to "call Dad," while "tonight" serves as the time label.

### 6\. Testing Intents

- Create sample utterances for other intents such as "Set Alarm." For example:

  "Set an alarm for 9 a.m."

  In this case, label "set an alarm" as the action and "9 a.m." as the time.

- Click **"Save Changes"** after labeling to proceed with training.

### 7\. Training and Deployment

- Navigate to the training jobs section and start a new training job (e.g., name it "Louis01").
- Choose the free tier with the default settings.
- Once training is complete, deploy the model by adding a new deployment (naming it "Louis01" and selecting the trained model).

### 8\. Testing the Deployed Model

Test your deployed model using sample utterances:

- **Example 1:** "Set an alarm for 11 a.m."  
  The model should recognize the intent "Set Alarm" with a high confidence score and extract the time "11 a.m."

  ![The image shows a screenshot of the Azure Language Studio interface, specifically the "Testing deployments" section, where a text input "Set an alarm for 11:00 AM" is analyzed to identify the intent "SetAlarm" with a confidence of 98.90% and the entity "Time" with a confidence of 100%.](https://kodekloud.com/kk-media/image/upload/v1752856919/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/azure-language-studio-testing-deployments.jpg)

- **Example 2:** "Cancel all meetings for tomorrow."  
  The system should detect the "Cancel Reminder" intent, though it might not capture any entities if they are not precisely defined.
- **Example 3:** "Cancel my reminder to call the hospital."  
  Here, the extracted entity "Action" should be recognized as "call hospital," confirming the accuracy of the system’s understanding.

  ![The image shows a screenshot of the Azure Language Studio interface, specifically the "Testing deployments" section, where a text input "Cancel my reminder to call hospital" is being analyzed for intent and entities.](https://kodekloud.com/kk-media/image/upload/v1752856920/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Conversational-Language-and-Understanding/azure-language-studio-testing-deployments-2.jpg)

> [!important]
> **Tip**
>
> Regular testing of your model with varied examples ensures robust performance and accurate entity extraction.

These detailed steps demonstrate the process of creating, training, testing, and deploying a conversational AI understanding project using Language Studio. This workflow allows the system to accurately identify user intents and extract relevant entities from utterances, ensuring precise responses to natural language commands.

Up next, we will explore how speech integration enhances this conversational AI workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/c436dcc7-e534-4650-a968-ea64da5e3aee/lesson/405d9a19-a7dc-482e-8bd9-3fa4e77c0fee)**
>
> Watch video content
