# Design for management groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Design-for-management-groups)

---

## Table of Contents

- Design for management groups
  - Best Practices
  - Conclusion
  - Watch Video
    - 1. Use a Flat Hierarchy with Governance in Mind
    - 2. Organize by Department
    - 3. Separate Production and Development Environments
    - 4. Consider Geographic Structure
    - 5. Isolate Sandbox and Sensitive Data Environments

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Design for management groups

In this guide, we explain how to design Azure Management Groups to efficiently group subscriptions, assign roles and policies, and manage compliance across your organization.

Previously, we explored a hierarchy with a root management group at the top, underneath which resided the IT and Finance management groups. In that example, the IT group was subdivided into two management groups that hosted subscriptions A and B, while the Finance group managed subscription C.

Below are best practices and design recommendations for working with Management Groups.

## Best Practices

### 1\. Use a Flat Hierarchy with Governance in Mind

A flat hierarchy simplifies management. While a management group can support up to six levels (excluding the root), it is recommended to limit the hierarchy to no more than four levels. Consider the following points:

- The root management group is automatically provisioned when you start using management groups.
- You cannot delete or move the root management group; you can only rename it (for example, to "Vendata Corp") for a more user-friendly appearance.
- Implement organizational-level policies at the root to ensure they are inherited by all lower levels.

### 2\. Organize by Department

For organizations with distinct departments, such as IT and Finance, it is advisable to create separate management groups for each. This method allows you to:

- Group subscriptions based on each department’s specific needs and cost centers.
- Apply tailored policies and compliance measures that are suited to each department.

### 3\. Separate Production and Development Environments

Within departments like IT, managing both production and development environments under the same umbrella might lead to policy inconsistencies. For improved governance:

- Create separate management groups for Production and Development environments.
- Apply strict policies in the Production management group to ensure compliance, while allowing more flexibility in Development for testing purposes.
- This separation minimizes the risk of misconfigurations and ensures production policies are strictly enforced.

> [!important]
> **Note**
>
> While some organizations combine production and development subscriptions within a single management group, separating them typically results in enhanced governance and easier policy management.

### 4\. Consider Geographic Structure

For organizations with global operations, structuring management groups based on geographic regions can be highly beneficial. For instance:

- Create distinct management groups for regions such as US, EMEA, and APAC.
- This structure allows for the enforcement of regional policies including data residency requirements (e.g., US subscriptions deployed only in East US and West US; EMEA in West Europe and North Europe; APAC in designated Asian regions).

Separating production environments within these geographic groups further streamlines policy enforcement.

### 5\. Isolate Sandbox and Sensitive Data Environments

For improved security and compliance, consider establishing:

- A sandbox management group dedicated to testing and development.
- A separate management group for subscriptions handling sensitive or confidential data.

Implementing this isolation allows for stronger security measures, such as Privileged Identity Management and strict access policies, which help protect confidential information.

## Conclusion

When designing Management Groups in Azure, keep governance at the forefront of your strategy. Adopting a flat hierarchy, organizing by department, and considering both environmental and geographic factors are key to ensuring robust policy enforcement and compliance.

In the next article, we will discuss designing for subscriptions.

Happy managing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/932a317b-382e-48e9-a271-6ffcbfeb55bf)**
>
> Watch video content
