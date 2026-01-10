# Amazon Connect Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/Amazon-Connect-Demo)

---

## Table of Contents

- Amazon Connect Demo
  - Creating an Instance
  - Configuring Routing: Hours of Operation and Queues
  - Creating Routing and Security Profiles
  - Creating Users
  - Creating Contact Flows
  - Claiming a Phone Number
  - Testing the Configuration
  - Conclusion
  - Watch Video
    - Setting Up Hours of Operation
    - Creating Queues
    - Creating a Routing Profile
    - Reviewing Security Profiles
    - Transfer to Queue Flow
    - Main Contact Flow

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# Amazon Connect Demo

In this guide, we demonstrate how to set up a basic virtual contact center using Amazon Connect. Learn how to create an instance, configure telephony and routing settings, create users and security profiles, build contact flows, and claim a phone number. Although Amazon Connect supports advanced features like Lex chatbot integration, agent and supervisor dashboards, and machine learning analytics, this demo focuses on the essential components for establishing a functional contact center.

---

## Creating an Instance

1.  **Log in and Select Region:**  
    Start by logging in to the Amazon Connect console. In this example, we are working in the Northern Virginia region.
2.  **Add a New Instance:**  
    Begin by adding a new instance. In this setup, we are using Amazon Connect’s native user directory, without external directory or SAML-based integration.
    - Name the instance “KodeKloudConnect.myConnect.aws” and click **Next**.

    ![The image shows the "Set identity" page in Amazon Connect, where users can choose identity management options and set a custom access URL.](https://kodekloud.com/kk-media/image/upload/v1752862077/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_40.jpg)

3.  **Administrator Setup:**  
    Provide administrator credentials by entering the username “admin,” a memorable password, and an email address such as Michael@KodeKloud.com.

    ![The image shows an Amazon Connect interface for adding an administrator, with fields for name, username, password, and email.](https://kodekloud.com/kk-media/image/upload/v1752862079/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_70.jpg)

4.  **Telephony and Data Storage:**  
    Since this is a contact center instance, enable both incoming and outgoing calls. The default data storage configuration automatically creates an S3 bucket.
    - Select the “Amazon Connect bucket” option and click **Next**.

    ![The image shows an Amazon Connect data storage setup screen, detailing permissions, S3 bucket information, and options for enabling customer profiles and customizing data storage.](https://kodekloud.com/kk-media/image/upload/v1752862080/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_80.jpg)

5.  **Review Settings:**  
    Verify all the settings on the summary page—identity management, telephony options, flow logs, encryption keys, and administrator details—before clicking **Create Instance**.

    ![The image shows an Amazon Connect setup interface, detailing identity management, administrator details, telephony options, and data storage settings.](https://kodekloud.com/kk-media/image/upload/v1752862081/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_100.jpg)

6.  **Instance Activation:**  
    Once the instance status changes to **Active**, a unique URL will be provided. Click this URL (it will open in a new tab) and log in using the admin credentials. The initial dashboard allows configuration of queues, routing profiles, and agent settings.

    ![The image shows the Amazon Connect dashboard with a virtual contact center instance named "kodekloudconnect," which is active and supports inbound and outbound telephony.](https://kodekloud.com/kk-media/image/upload/v1752862082/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_190.jpg)

    ![The image shows the Amazon Connect dashboard with configuration steps for setting up communication channels, hours of operation, queues, prompts, flows, and routing profiles.](https://kodekloud.com/kk-media/image/upload/v1752862084/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_220.jpg)

> [!important]
> **Note**
>
> Ensure that the instance is fully active and accessible via the provided URL before proceeding to further configurations.

---

## Configuring Routing: Hours of Operation and Queues

Proper configuration of hours and queues is essential for efficient call routing.

### Setting Up Hours of Operation

1.  Navigate to **Routing** > **Hours of Operation** from the dashboard.
2.  Click **Add new hours**.
3.  Enter “IT helpdesk default hours” as the name and provide a description like “Default hours for the IT helpdesk.”
4.  Set the time zone to US Eastern, then define the working days (Monday through Friday) with operating hours from 8 AM to 5 PM.
5.  Click **Save**.

![The image shows an Amazon Connect interface for setting IT helpdesk hours, with a schedule from Monday to Friday, 8 AM to 5 PM, in the US/Eastern timezone.](https://kodekloud.com/kk-media/image/upload/v1752862085/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_320.jpg)

### Creating Queues

1.  Navigate to **Routing** > **Queues** and click **Add queue**.
2.  For the first queue, named "return to hardware," select “IT helpdesk default hours” as the operating hours. Optionally, specify the maximum contacts and quick connects before clicking **Save**.
3.  Repeat the process for the second queue, "IT helpdesk tech support," with similar settings and click **Save**.

![The image shows an Amazon Connect interface for adding a queue, including queue details, hours of operation, and outbound caller configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752862086/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_370.jpg)

---

## Creating Routing and Security Profiles

Routing and security profiles are crucial for directing contacts to the right agents with appropriate permissions.

### Creating a Routing Profile

1.  Navigate to **Users** > **Routing profiles**.
2.  Click **Add routing profile**.
3.  Name the profile “IT helpdesk_default” and add a description such as “Default user routing profile for IT helpdesk.”
4.  Under channel settings, select **Voice**. Add both the “return hardware” and “tech support” queues. Assign a priority value (e.g., 1 for high priority) and a delay (set to 0).
5.  Enable Chat and Task channels if needed.
6.  Click **Save**.

![The image shows an Amazon Connect interface for adding a routing profile, detailing channel settings and queue configurations for voice, chat, and task channels.](https://kodekloud.com/kk-media/image/upload/v1752862088/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_480.jpg)

After saving, verify that the new routing profile appears alongside the basic routing profile.

![The image shows an Amazon Connect interface for adding a routing profile, with options to assign queues, set priorities, and configure outbound queue settings.](https://kodekloud.com/kk-media/image/upload/v1752862089/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_530.jpg)

### Reviewing Security Profiles

Security profiles determine role-based permissions for agents and managers.

1.  Navigate to **Users** > **User security profiles**.
2.  Observe the available profiles such as Admin, Agent, Call Center Manager, and Quality Analyst.
3.  Click the **Agent** profile and examine the permissions under the **Contact Control Panel**. Confirm that contact lens data, Customer Profiles, Agent Applications, and Wisdom settings are properly enabled.
4.  Click **Save** after confirming the settings.

![The image shows an Amazon Connect interface displaying security profiles for roles like Agent, CallCenterManager, and QualityAnalyst, with associated permissions and analytics features listed.](https://kodekloud.com/kk-media/image/upload/v1752862090/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_580.jpg)

![The image shows an Amazon Connect interface for editing security profile permissions, including routing, user permissions, and contact control panel access settings.](https://kodekloud.com/kk-media/image/upload/v1752862092/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_600.jpg)

---

## Creating Users

Create a user to serve as an agent with the necessary profiles and settings.

1.  Navigate to **Users** > **User management** and click **Add user**.
2.  Enter the agent’s login details (for example, login: “agent” and email: “michaelplusagent@kodekloud.com”). Note that the plus-sign in the email is used for labeling only.
3.  If a phone number is not required, skip or remove it.
4.  Assign the “Agent” security profile and the IT helpdesk routing profile created earlier.
5.  Configure additional settings such as softphone usage and after-call work timeout (e.g., 5 seconds). Remember, setting the timeout to zero will keep the call active until manually closed.
6.  Click **Save**.

![The image shows an Amazon Connect interface for adding a user, with fields for login, email, and settings like security and routing profiles.](https://kodekloud.com/kk-media/image/upload/v1752862093/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_700.jpg)

Verify that the new agent appears alongside the admin user.

![The image shows an Amazon Connect user management interface with a list of users, their profiles, and settings.](https://kodekloud.com/kk-media/image/upload/v1752862095/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_770.jpg)

---

## Creating Contact Flows

Contact flows manage the handling of incoming calls. This example covers two flows: a “Transfer to Queue” flow and a main contact flow.

### Transfer to Queue Flow

1.  Navigate to **Routing** > **Flows** and click **Create flow**.
2.  Name the flow (e.g., “Transfer to Queue Workflow”) and add an optional description.
3.  In the flow designer, follow these steps:
    - **Check Hours of Operation:**  
      Place a **Check Hours of Operation** block, connecting it to the **Entry** block.
    - **Set Recording and Analytics:**  
      Add a **Set Recording and Analytics Behavior** block. Configure it to enable call recording for both the agent and customer, and enable Contact Lens conversational analysis, speech analytics, and chat analytics. Connect the "in-hours" branch from the previous block.

      ![The image shows an Amazon Connect contact flow diagram for an IT help desk, detailing steps like checking hours of operation and setting recording and analytics behavior.](https://kodekloud.com/kk-media/image/upload/v1752862096/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_860.jpg)

    - **Transfer to Queue:**  
      Add a **Transfer to Queue** block linked to the success branch of the recording block.
    - **Play Prompt:**  
      Include a **Play Prompt** block with text-to-speech configured with a message such as “If we are not able to take your call right now, please try again later.” Ensure error and capacity branches from the recording block also route to this prompt.
    - **Disconnect:**  
      Optionally, add a **Disconnect** block after handling the transfer.

      ![The image shows an Amazon Connect contact flow diagram for an IT help desk, detailing steps like checking hours, transferring to a queue, and playing prompts.](https://kodekloud.com/kk-media/image/upload/v1752862098/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_1160.jpg)

4.  Review all branch connections, then click **Save** and **Publish**.

### Main Contact Flow

1.  Navigate to **Routing** > **Flows** and click **Create flow**.
2.  Name the flow (e.g., “Help Desk Main Flow”) and add an optional description.
3.  In the flow designer, complete these steps:
    - **Set Logging Behavior:**  
      Place a **Set Logging Behavior** block in the **Analyze** section and connect it to the **Entry** block.
    - **Set Voice:**  
      Insert a **Set Voice** block and choose the default voice (for example, Joanna for US English).

      ![The image shows an Amazon Connect contact flow diagram for an IT help desk, detailing steps like setting voice, working queue, and transferring to flow.](https://kodekloud.com/kk-media/image/upload/v1752862099/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_1570.jpg)

    - **Play Welcome Prompt:**  
      Add a **Play Prompt** block with text-to-speech configured to deliver a welcome message (e.g., “Welcome to the Blunder Muffin IT Help Desk.”) and connect it to the **Set Voice** block.
    - **Set Working Queue and Transfer:**  
      Insert a **Set Working Queue** block and select the tech support queue. Then, add a **Transfer to Queue** block that uses this working queue. (If issues occur with the dropdown, ensure that the transfer flow is published.)

      ![The image shows an Amazon Connect contact flow diagram with various blocks for checking hours, transferring to queue, and playing prompts.](https://kodekloud.com/kk-media/image/upload/v1752862100/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_1680.jpg)

4.  Make sure the flow ends correctly with termination and disconnect, then click **Save** and **Publish**.

---

## Claiming a Phone Number

To receive inbound calls, you need to claim a phone number for your Amazon Connect instance.

1.  In the navigation menu, select **Channels** > **Claim a phone number**.
2.  Choose the **DID** (Direct Inward Dial) tab.
3.  Select the United States (or another country of your choice) and, in the **Flow IVR** field, select your main contact flow.
4.  Attempt to claim the number. If you encounter an error (for example, due to country prefix or business address requirements), try selecting another country (such as Mexico) if available.

![The image shows an Amazon Connect interface for claiming a phone number, with an error message indicating a failure to claim the selected number.](https://kodekloud.com/kk-media/image/upload/v1752862101/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_1800.jpg)

![The image shows an Amazon Connect interface for claiming a phone number, with a dropdown menu for selecting country codes. A message indicates a failed claim attempt.](https://kodekloud.com/kk-media/image/upload/v1752862102/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_1830.jpg)

Once successfully claimed, copy the provided phone number.

---

## Testing the Configuration

1.  Open a private browser window and navigate to your instance URL.
2.  Log in as an agent using the previously created credentials.
3.  Allow access to your microphone when prompted.
4.  Create a caller profile by clicking your profile button and entering details such as name, gender, and date of birth, then click **Save**.

![The image shows a customer profile creation form with fields for name, gender, party type, and date of birth, alongside a sidebar with agent options.](https://kodekloud.com/kk-media/image/upload/v1752862104/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Amazon-Connect-Demo/frame_1940.jpg)

5.  Use a cell phone to dial the claimed phone number (for example, 5255-9156-9300). If you call outside operating hours (after 5 PM), you should hear a message similar to:  
    “Welcome to the Flutter Midland IT Help Desk. The help desk is currently closed. Working hours are Monday to Friday from 8 AM…”  
    This confirms that your hours of operation settings and contact flows are working as configured.

> [!important]
> **Pro Tip**
>
> Test both in-hours and out-of-hours scenarios to ensure accurate routing and messaging are in place.

---

## Conclusion

This demo provided an in-depth overview of setting up a basic Amazon Connect virtual contact center. We covered:

- Instance creation and telephony configuration
- Establishing hours of operation and creating queues
- Configuring routing profiles and security permissions
- Building and publishing contact flows
- Claiming a phone number and testing the setup

By following these steps, you can connect callers efficiently and extend your contact center with Amazon Connect’s advanced features over time. For more information, visit the [Amazon Connect Documentation](https://aws.amazon.com/connect/).

Thank you for reading, and happy connecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/71829971-b634-449b-905f-5ea145fa5ada)**
>
> Watch video content
