# Demo Slack Attachments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Slack-Attachments)

---

## Table of Contents

- Demo Slack Attachments
  - Quick Slack Notifications Example
  - Slack API: Rich Message Layouts
  - Constructing an Attachment Payload
  - Jenkins Slack Notification Plugin
  - Shared Library: sendNotifications.groovy
  - Custom Emojis in Slack
  - Integrating in Jenkinsfile
  - Resulting Slack Message
  - Watch Video
    - Block Kit Builder
      - Basic Section Block
      - Interactive Message with Button and Image

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Slack Attachments

In this lesson, you’ll learn how to send rich, interactive Slack notifications from Jenkins pipelines using attachments and Block Kit. We will:

- Explore Slack’s Block Kit Builder and message layouts
- Build JSON payloads with attachments and blocks
- Integrate payloads in Jenkins via a shared library
- Customize messages with emojis, images, and buttons

---

## Quick Slack Notifications Example

Out of the box, Jenkins’ Slack plugin can send basic build statuses:

```
jenkins  APP  20:46
ABORTED: devsecops-numeric-application #72: http://…/job/devsecops-numeric-application/72/


jenkins  APP  21:00
SUCCESS: devsecops-numeric-application #73: http://…/job/devsecops-numeric-application/73/
```

These simple messages work, but to stand out you can leverage Slack’s rich layouts.

---

## Slack API: Rich Message Layouts

Slack’s [Messaging Layouts](https://api.slack.com/messaging/composing/layouts) guide shows how to assemble messages with attachments and blocks:

![The image shows a webpage from the Slack API documentation, specifically about creating rich message layouts. It includes navigation links on the left and content about adding blocks to messages.](https://kodekloud.com/kk-media/image/upload/v1752873785/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Attachments/slack-api-rich-message-layouts.jpg)

> [!important]
> **Note**
>
> Use the Slack API documentation to discover block types like `section`, `divider`, and interactive elements such as buttons and overflow menus.

### Block Kit Builder

Prototype your message in Slack’s [Block Kit Builder](https://api.slack.com/tools/block-kit-builder) before coding.

#### Basic Section Block

```
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "New Paid Time Off request from <https://example.com|Fred Enriquez>\n\n<https://example.com|View request>"
      }
    }
  ]
}
```

#### Interactive Message with Button and Image

```
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Hello, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the investors to dinner.\n*Please select a restaurant:*"
      }
    },
    { "type": "divider" },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Farmhouse Thai Cuisine*\n⭐️⭐️⭐️⭐️ 1528 reviews\nThey do have some vegan options…"
      },
      "accessory": {
        "type": "image",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7e05s9lC12mA3arueZ7A/o.jpg",
        "alt_text": "Thai restaurant"
      }
    }
  ]
}
```

---

## Constructing an Attachment Payload

Wrap blocks in an `attachments` array to add colors, fallbacks, or pretext:

```
{
  "attachments": [
    {
      "color": "#2fc744",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Hi devsecops!*"
          }
        },
        { "type": "divider" },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Farmhouse Thai Cuisine*\n⭐️⭐️⭐️⭐️⭐️…"
          },
          "accessory": {
            "type": "image",
            "image_url": "https://s3-media1.fl.yelpcdn.com/photo/c7e0s5m9lC2mA3aruue7A/o.jpg",
            "alt_text": "Restaurant image"
          }
        }
      ]
    }
  ]
}
```

> [!important]
> **Warning**
>
> Always validate your JSON. Slack expects arrays `[]` around lists and objects `{}` for key/value pairs.

---

## Jenkins Slack Notification Plugin

Jenkins uses the [Slack Notification Plugin](https://plugins.jenkins.io/slack/) to send JSON payloads. You can pass your attachment payload directly:

```
slackSend(color: color, attachments: attachments)
```

Table: Build Status Mapping

| Build Status | Color   | Emoji     |
| ------------ | ------- | --------- |
| SUCCESS      | #47e05e | :tada:    |
| UNSTABLE     | #d9d26d | :warning: |
| FAILURE      | #ec2805 | :hulk:    |

---

## Shared Library: sendNotifications.groovy

Use a shared library to assemble attachments dynamically:

```
def call(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESS'


    // Map status to color and emoji
    def (color, emoji) = buildStatus == 'SUCCESS' ? ['#47e05e', ':tada:']
                          : buildStatus == 'UNSTABLE'? ['#d9d26d', ':warning:']
                          : ['#ec2805', ':hulk:']


    def attachments = [
        [
            "color": color,
            "blocks": [
                [
                    "type": "header",
                    "text": [
                        "type": "plain_text",
                        "text": "K8S Deployment - ${env.JOB_NAME} ${emoji}",
                        "emoji": true
                    ]
                ],
                [
                    "type": "section",
                    "fields": [
                        ["type": "mrkdwn", "text": "*Job Name:*\n${env.JOB_NAME}"],
                        ["type": "mrkdwn", "text": "*Build Number:*\n${env.BUILD_NUMBER}"]
                    ],
                    "accessory": [
                        "type": "image",
                        "image_url": "https://raw.githubusercontent.com/sidd-harth/numeric/main/images/jenkins-slack.png",
                        "alt_text": "Slack Icon"
                    ]
                ],
                ["type": "divider"]
            ]
        ]
    ]


    slackSend(color: color, attachments: attachments)
}
```

---

## Custom Emojis in Slack

Add custom emojis under **Customize Slack** → **Add Emoji**. For example, upload `deadpool.png` as `:deadpool:`:

![The image shows a Slack interface with a pop-up window for adding a custom emoji, where an image named "deadpool.png" is being uploaded.](https://kodekloud.com/kk-media/image/upload/v1752873786/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Attachments/slack-custom-emoji-upload-deadpool.jpg)

Ensure your team has emojis like `:tada:`, `:warning:`, and `:hulk:` available.

---

## Integrating in Jenkinsfile

Call `sendNotifications` in your pipeline’s `post` section:

```
pipeline {
    agent any
    stages {
        stage('Integration Tests - PROD') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'bash integration-test-PROD.sh'
                }
            }
        }
        stage('Testing Slack') {
            steps {
                sh 'exit 0'
            }
        }
    }
    post {
        always { /* Optional reports */ }
        success {
            script {
                env.emoji = ':white_check_mark:'
                sendNotifications(currentBuild.result)
            }
        }
        failure {
            script {
                env.emoji = ':hulk:'
                sendNotifications(currentBuild.result)
            }
        }
    }
}
```

---

## Resulting Slack Message

A successful pipeline produces a detailed Slack notification:

![The image shows a Slack interface with a message from the Jenkins Slack App detailing a successful Kubernetes deployment pipeline. It includes information such as job name, build number, Kubernetes deployment details, and Git commit references.](https://kodekloud.com/kk-media/image/upload/v1752873788/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Attachments/slack-jenkins-kubernetes-deployment-message.jpg)

This message includes:

- A header with deployment name and emoji
- Job name and build number fields
- Custom icons and images
- Optional action buttons or links to Jenkins, Kubernetes, or GitHub

Use this approach to highlight failed stages or add actionable buttons directly in Slack.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/28e760d8-8273-4d35-9d07-aae29333f401)**
>
> Watch video content
