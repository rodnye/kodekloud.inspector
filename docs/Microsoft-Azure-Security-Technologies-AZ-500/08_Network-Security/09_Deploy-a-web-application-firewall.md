# Deploy a web application firewall - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Deploy-a-web-application-firewall)

---

## Table of Contents

- Deploy a web application firewall
  - Overview
  - How Azure WAF Works
  - Configuring Azure WAF via the Azure Portal
  - Testing the WAF Configuration
  - Diagnostic Settings and Logging
  - Azure Front Door Load Balancer
  - Conclusion
  - Watch Video
    - Layered Defense
    - Built-in Security Policies
    - Custom Rule Sets
    - Threat Intelligence Integration
    - Logging and Monitoring
    - Global WAF Policy
    - Custom Access Control
    - Rate Limiting
    - OWASP Top 10 Protection
    - Creating Custom Rules

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Deploy a web application firewall

Secure your web applications with Azure Web Application Firewall (WAF). Azure WAF safeguards your applications by filtering HTTP/HTTPS traffic and blocking common web attacks. In this guide, we cover the key concepts, configuration steps, and testing procedures while maintaining the original diagram sequence.

## Overview

### Layered Defense

Azure WAF operates at the application layer (layer 7 of the OSI model), enabling deep inspection of HTTP/HTTPS traffic. By analyzing application-level messages, the WAF can effectively detect and block harmful requests, protecting your applications from vulnerabilities such as SQL injection, cross-site scripting (XSS), and more.

### Built-in Security Policies

Azure WAF includes pre-configured, industry-standard security policies that are regularly updated to mitigate emerging threats. These built-in policies ensure robust, out-of-the-box protection with minimal manual interventions.

### Custom Rule Sets

For added flexibility, Azure WAF allows you to create custom security rules tailored to your specific environment. Custom rules help fill any gaps in the default protection by targeting application-specific vulnerabilities.

### Threat Intelligence Integration

With integration to Microsoft Threat Intelligence, Azure WAF continuously monitors global threat data. This proactive approach enables the system to block malicious traffic even if the threat source seems benign at first glance.

### Logging and Monitoring

Comprehensive logging and monitoring capabilities ensure that all web application traffic, detected threats, and security events are tracked. This visibility supports effective incident response, security analysis, and compliance reporting.

Azure WAF shields your applications against a range of web-based attacks using OWASP core rule sets.

![The image outlines key features of deploying a Web Application Firewall, including layered defense, built-in security policies, custom rule sets, threat intelligence integration, and logging and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752882100/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/web-application-firewall-features.jpg)

## How Azure WAF Works

Azure WAF is deployed at the network edge, offering centralized protection for your web applications. The following sections detail its core functionalities:

### Global WAF Policy

A global WAF policy consists of a set of predefined and custom rules that you can apply across multiple applications. This centralized approach simplifies policy management and reduces configuration overhead.

### Custom Access Control

Azure WAF provides granular control over incoming requests. By configuring the rules based on factors like IP address, geolocation, or HTTP methods, you can ensure that your access policies meet both security and operational requirements.

### Rate Limiting

To defend against brute force and DDoS attacks, Azure WAF supports rate limiting. This feature sets a threshold on the number of allowed requests in a specified timeframe, preserving application performance and stability.

### OWASP Top 10 Protection

Azure WAF implements OWASP Top 10 rulesets to protect your applications against critical vulnerabilities. Enabling these rules automatically shields your web services from a range of known attack vectors.

Azure WAF is versatile enough to secure on-premises, Azure-hosted, and other cloud-based applications. While on-premises and third-party cloud applications usually connect via the public network, Azure services benefit from the secure Azure global network.

![The image is a diagram illustrating the deployment of a Web Application Firewall (WAF) within a network, showing connections between Azure regions, public networks, and on-premises systems, with features like global WAF policy and OWASP protection.](https://kodekloud.com/kk-media/image/upload/v1752882102/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/waf-deployment-diagram-azure-network.jpg)

> [!important]
> **Traffic Control Note**
>
> Traffic from bots, hackers, and mass downloaders can be blocked based on the rules configured within the WAF.

## Configuring Azure WAF via the Azure Portal

Navigate to the Azure portal to view and manage the Web Application Firewall in action. This example demonstrates using the Web Application Firewall V2 SKU attached to an Application Gateway. If you are already using a Standard V2 Application Gateway, note that upgrading from V1 to V2 requires a redeployment using a Microsoft-provided script.

![The image shows a Microsoft Azure portal interface focused on the "Application Gateway" under "Load Balancing Services," with details of a specific gateway named "color-appgw" displayed on the right.](https://kodekloud.com/kk-media/image/upload/v1752882103/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/azure-portal-application-gateway.jpg)

Within the WAF settings, you can view the applied policy. Initially set to detection mode, the policy logs suspicious requests without blocking them, allowing you to fine-tune rules before switching to prevention mode for active blocking.

![The image shows a Microsoft Azure portal interface for managing a Web Application Firewall (WAF) policy, with options for policy settings, managed rules, and associated application gateways.](https://kodekloud.com/kk-media/image/upload/v1752882104/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/azure-portal-waf-policy-interface.jpg)

Under the policy settings, you can inspect request bodies for additional vulnerability analysis.

![The image shows a Microsoft Azure portal page for configuring a Web Application Firewall (WAF) policy, with options to set request body size and file upload size limits.](https://kodekloud.com/kk-media/image/upload/v1752882105/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/azure-portal-waf-policy-configuration.jpg)

Microsoft-supplied managed rules, based on OWASP 3.2, include 185 predefined rules that automatically detect and mitigate diverse attack patterns.

![The image shows a Microsoft Azure portal interface displaying managed rules for a Web Application Firewall (WAF) policy. It lists various OWASP rules with their IDs, descriptions, actions, and statuses.](https://kodekloud.com/kk-media/image/upload/v1752882106/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/azure-portal-waf-managed-rules.jpg)

### Creating Custom Rules

To further secure your application, you can create custom rules. For instance, to block all traffic from the United States, follow these steps:

1.  Create a custom rule and name it (e.g., "BlockUS").
2.  Enable the rule and choose "Match" as the rule type.
3.  Set the rule priority (e.g., 1).
4.  Select "Geolocation" as the match type.
5.  Configure the match variable as "Remote Address" with the condition "in" for "United States".
6.  Set the action to "Deny" and save the rule.

![The image shows a Microsoft Azure portal interface for configuring a Web Application Firewall (WAF) policy with custom rules. A panel on the right is open for adding a custom rule, displaying a list of countries to select conditions for the rule.](https://kodekloud.com/kk-media/image/upload/v1752882107/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/azure-portal-waf-policy-custom-rules.jpg)

The new custom rule will then appear in your policy listing.

![The image shows a Microsoft Azure portal page for configuring custom rules in an Application Gateway WAF policy. It displays a rule named "BlockUS" with a priority of 1, which is enabled and set to block.](https://kodekloud.com/kk-media/image/upload/v1752882108/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/azure-portal-application-gateway-waf.jpg)

> [!important]
> **Detection Mode Warning**
>
> Remember: If the WAF remains in detection mode, custom rules will only log and alert without actively blocking traffic. To enforce blocking, switch the WAF to prevention mode.

## Testing the WAF Configuration

After switching to prevention mode, validate your configuration using a jump box deployed in East US. Below is an example session that demonstrates web server checks and the WAF's blocking behavior.

```
kodekloud@green01:~$ ll /var/www/
total 12
drwxrwxrwx 3 root root 4096 Oct  1 03:47 ./
drwxr-xr-x 2 root root 4096 Oct  1 03:47 html/
drwxrwxrwx 2 root root 4096 Oct  1 03:47 index.html*


kodekloud@green01:~$ curl localhost
<html>
<body style="background-color:green;">
<h1 style="color:white;">Hi from green-1</h1>
</body>
</html>


kodekloud@green01:~$ curl localhost/red/red.html
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head>
<title>404 Not Found</title>
</head>
<body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
<address>Apache/2.4.52 (Ubuntu) Server at localhost Port 80</address>
</body>
</html>


kodekloud@green01:~$ logout
Connection to 10.0.1.4 closed.
```

In this simulation, any request from the United States (as per our custom rule) is blocked by the WAF. When accessing the application gateway IP from a blocked source, you will receive a "403 Forbidden" response:

```
kodekloud@green01:~$ curl http://4.246.217.182
<head><title>403 Forbidden</title></head>
<body>
<center><h1>403 Forbidden</h1></center>
<hr><center>Microsoft-Azure-Application-Gateway/v2</center>
</body>
</html>
```

Conversely, accessing the website from another region returns the expected web page, showcasing the enforcement of custom rules.

## Diagnostic Settings and Logging

Enable diagnostic settings to send firewall logs to a Log Analytics workspace. These logs provide insights into blocked requests, potential vulnerabilities, and overall application security events.

![The image shows the Microsoft Azure portal with the "Diagnostic settings" page for an Application Gateway named "color-appgw." It displays options for configuring diagnostic settings, including logs and metrics.](https://kodekloud.com/kk-media/image/upload/v1752882109/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-a-web-application-firewall/azure-portal-diagnostic-settings-color-appgw.jpg)

## Azure Front Door Load Balancer

In addition to the Application Gateway, Azure Front Door offers global HTTP load balancing and application acceleration. Learn more about how Azure Front Door can be integrated with WAF to enhance your application's global performance and security.

## Conclusion

By leveraging layered defense, built-in policies, custom rules, and advanced monitoring, Azure Web Application Firewall offers a comprehensive security solution for your web applications. Secure your infrastructure today and protect against emerging threats with Azure WAF.

For more detailed guidance on Azure security solutions, please refer to the [Azure Documentation](https://docs.microsoft.com/azure/security/) and [OWASP guidelines](https://owasp.org).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/34ab8c54-9a0b-4b7e-bd38-7c7dc20d762d)**
>
> Watch video content
