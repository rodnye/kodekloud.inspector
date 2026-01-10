# Explore the authentication decision tree - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Explore-the-authentication-decision-tree)

---

## Table of Contents

- Explore the authentication decision tree
  - 1. Start with Cloud-Based Sign-In
  - 2. Enforce User-Level Azure AD Security Policies
  - 3. Consider Integration with an Existing Federation Provider
  - 4. Evaluate Disaster Recovery and Leaked Credential Reporting Needs
  - 5. Decide on PTA and Seamless SSO with PHS
  - 6. Opt for a Pure Federation Approach When Required
  - Summary
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Explore the authentication decision tree

This comprehensive guide explains a logical sequence of decision points designed to help you choose the optimal authentication method for your environment. You’ll learn how to decide between Password Hash Synchronization (PHS), Pass-Through Authentication (PTA), and Active Directory Federation Services (ADFS)—with or without Seamless Single Sign-On (SSO)—while ensuring your authentication approach meets your disaster recovery and security requirements.

---

## 1\. Start with Cloud-Based Sign-In

Begin by asking yourself:  
— Do you want Azure AD to handle sign-in completely in the cloud?

If you answer **Yes**, continue to the next decision point. If not, you’ll later explore federation environments.

---

## 2\. Enforce User-Level Azure AD Security Policies

Next, determine whether you require enforcement of user-level security policies during sign-in:  
— Do you want to enforce user-level Azure AD security policies?

This helps you balance the benefits of cloud-based authentication against the control provided by your own infrastructure.

---

## 3\. Consider Integration with an Existing Federation Provider

At this point, evaluate the need to integrate with an existing federation provider. This step is essential if your customer already maintains a federation infrastructure. Choose between integrating with the current setup or opting for a greenfield deployment that might exclude ADFS entirely.

- For the branch that selects integration with a federation provider, two additional considerations emerge:
  1.  Do you have sign-in requirements that are not natively supported by Azure AD?
  2.  If on the other branch you answer **No**, ask again: is there any requirement that Azure AD doesn’t natively support?

Modern Azure AD supports various authentication protocols. However, if your application relies on legacy methods like LDAP, then native support might not be available.

---

## 4\. Evaluate Disaster Recovery and Leaked Credential Reporting Needs

If integrating with an existing federation provider, the next step is to assess your need for sign-in disaster recovery or leaked credential reports:  
— Do you require sign-in disaster recovery or access to leaked credential reports?

> [!important]
> **Note**
>
> For scenarios involving ADFS and PTA, on-premises authentication may become unavailable in events such as network failures. Azure AD Identity Protection can provide valuable leaked credential reports—especially if user passwords have been exposed on the dark web.

Even when Azure AD does not natively support a particular authentication requirement, the decision regarding disaster recovery or leaked credential reports remains critical. If you don’t need these capabilities—and if you prefer cloud-based authentication with user-level policies disabled—PHS combined with Seamless SSO is the preferred solution.

---

## 5\. Decide on PTA and Seamless SSO with PHS

If you prefer not to integrate with an existing federation environment yet require sign-in disaster recovery and credentials leakage reports, consider using PTA plus Seamless SSO along with PHS. In this setup:

- Your on-premises infrastructure handles authentication.
- If on-premises authentication fails, Azure AD’s disaster recovery plan automatically transitions to PHS since passwords are synchronized to the cloud.

This configuration ensures uninterrupted authentication services.

> [!important]
> **Note**
>
> If disaster recovery is not required, you may choose to rely solely on PTA with Seamless SSO.

---

## 6\. Opt for a Pure Federation Approach When Required

When you decide that the authentication should not be managed solely in the cloud and that you want to use your existing federation environment, evaluate whether you need disaster recovery and leaked credential reports. If required, consider implementing federation with Privileged Identity Management (PIM) as part of your disaster recovery strategy. If not, a pure federation approach may suffice.

---

## Summary

This guide helps you determine the correct authentication method based on several key questions about cloud sign-in, user-level policies, federation integration, legacy protocol support, and disaster recovery requirements. In the following sections, we will demonstrate how to set up disaster recovery when using PTA alongside PHS, and we’ll also explore a useful feature called password write-back.

Let’s now move on to the demonstration of password write-back.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/74dfe63f-002e-4a53-aed6-caf94d020a62)**
>
> Watch video content
