# Azure Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Azure-Policy)

---

## Table of Contents

- Azure Policy
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Azure Policy

Configuring Azure Policies.

Azure Policy is a governance tool

that helps you to set and enforce rules

across your Azure resources.

Policies can be used to define organizational standards

and identify non-compliant resources.

Just to give you an example,

if your organization requires all your resources

to be deployed in a certain region,

for example, in East US or within the United States,

then you can enforce a policy

and users will not be able to deploy it

in any other region,

for example, Southeast Asia or Western Europe.

This is where we primarily use policies for.

Now, when it comes to policy,

like RBAC, there are certain keywords

that you need to remember,

starting with definitions.

A policy definition, like RBAC definition,

outlines what the rule is

and what to do when a resource doesn't comply.

Example, a built-in policy could state

that all storage accounts must enforce HTTPS.

The JSON document would specify the conditions

for compliance and the actions to take

if the condition is not met.

So when we go to the portal,

I'll show you how the policy definition looks like.

So in a nutshell,

policy definition is a JSON document

used to define the policy and its effect.

Like RBAC, Azure has built-in policies

or you can write your own policies if required.

Second, scope.

Like RBAC, you must specify the scope

to enforce the policy.

Scope can be a management group,

subscription or a resource group.

Here we don't have the option

to enforce a policy to a resource.

The least we could do is a Resource Group.

So the scope is where your policy will be applied.

You can define it broadly,

like at the organizational level,

at the management group,

or narrowly, like to a very specific Resource Group.

So if you set the scope to a particular subscription,

the policy will only affect the resources

within that subscription.

So at this point,

we know what and where.

Next is the assignment.

In RBAC, we had VU as well.

Here it doesn't apply to VU.

This is an organizational standard.

So it's not specific to certain users or groups.

It is an organizational level policy that we are applying.

So definition, scope, and we have the assignment.

As the name implies,

assignment is the process of assigning a policy definition

to a scope.

Once you have created the policy,

you must assign it to a scope to be enforced.

Example, if you have a policy

that restricts the creation of public IP addresses,

once assigned to a Resource Group,

any attempt to create a public IP within that group

would be blocked or denied.

So once the assignment is done,

next is the compliance.

So after assigning the policy,

you can evaluate the compliance

to understand compliant and non-compliant resources.

So you might be wondering

if we are assigning the policy to block something,

how come we have noncompliant resources?

Policy cannot alter your existing resources.

For example, I don't want any resources

outside the United States,

but my users have already started deploying resources

in West Europe, Southeast Asia,

and other regions.

So when I apply this policy,

from that point onwards,

users will not be able to deploy the resources

outside the United States.

But whichever resources deployed before the assignment

will be marked as non-compliant resources

because they don't follow the organizational standards.

So this is why we have compliant

and non-compliant resources.

So if you have a policy enforcing

that all VMs must be tagged with an owner tag,

your compliance report will list all VMs

that either comply or fail to meet this requirement.

So if the VM is missing the tag,

that basically means that it's a non-compliant resource.

Administrators can use this compliance score

to understand how much they're aligned

to the organizational standards.

They can also create remediation policies

in certain Azure ADs, or it's called a remediation task.

They can run it and wherever the tag is missing,

they will be able to add the tags.

But keep in mind,

if you want to redeploy a resource

from one region to another to make it compliant,

that cannot be done using policy,

you have to do it manually.

But there are certain policies

where you will be able to create remediation tasks.

For example, something is missing

and you want to deploy it.

That can be achieved from the policy itself.

All right, I hope that's clear.

Now let's take a look at some of the use cases

so that you have a better understanding of policy.

So here I have a list of policies

that most organizations use.

Starting with required tags.

In Azure, we use tags for adding metadata to our resources.

This metadata can be used to organize our resources

and the tags that are applied at the resource level

can be used for billing purposes as well.

Now most of the time what users do is

they'll skip this tagging section

and they'll straight away deploy the resource.

And we want to avoid that.

So with the help of this required tags policy,

we will be able to enforce tags

that need to be added to the resources.

Another example is inherited tags.

By default, the tags that are applied on Resource Groups

or at the subscription level

will not get inherited to the underlying resources.

So unlike RBAC where you get inheritance everywhere,

policy, the tags don't get inherited.

So we need something to inherit those tags

from the subscription or Resource Group

to the underlying resources.

So with the help of this policy,

whenever you add a tag to the Resource Group,

the policy will automatically populate that tag

to the underlying resources.

Next is allowed location.

So many organizations have this data residency requirement

where they need to keep the data

within their region or the country,

like GDPR compliance.

So with the help of this policy,

they will be able to define the regions

where the users can deploy the resources.

And if a user tries to deploy outside the selected regions,

that will be blocked.

Allowed virtual machine SKUs.

This is mainly useful in development

and testing environments,

and also in certain environments

where budget is a constraint.

In Azure, we have a variety of virtual machines.

We have low-power machines

all the way to high-power machines.

So if you go with these high power machines,

obviously the cost is going to be high.

So let's say we don't want the users

to deploy certain expensive SKUs.

So what we can do is,

we can block those SKUs.

Consider these as VM sizes.

So we can block these sizes,

so the user will not be able to create

those virtual machines of that size.

Allowed resource group location.

The main difference between allowed locations

and allowed resource group location is,

allowed locations target resources.

Resource group can contain resources from multiple regions.

Resource group is where the metadata

of your resources gets stored.

If you want to enforce the location constraint

on your Resource Group,

you can apply this policy.

Allowed resource type.

In certain environments,

just like the allowed virtual machine SKUs,

administrators don't want users to deploy everything.

For example, if a user deploys ExpressRoute,

it's a very expensive service.

So in order to avoid these kinds of issues,

what we can do is,

let's say in this subscription,

we want to only deploy virtual machines,

app services and databases,

and virtual networks.

We don't want to deploy anything else.

So you can restrict that using this policy.

I hope that's clear.

Now we will go to Azure portal

and see how we can work with the policies.

So in Azure portal,

what I have to do is,

I have to search for Azure Policy,

and you'll see policy.

Here, you can go to definitions,

where you'll be able to see all the built-in policies

and also custom policies,

if you have created one.

Here you will see one more term,

which is called initiative.

So initiative is like chaining multiple policies.

Let's say you have 20 policies

that your organization requires,

and you don't want to assign this one by one.

This will be a management overhead,

and you will not be able to see the overall compliance.

In this case, what you can do is,

you can create an initiative,

where you can group multiple policies together

and assign it as a single unit to the scope.

So for this initiative,

you can see that there are seven policies inside that.

So once you open the initiative,

you'll see which are the seven policies

that are part of that initiative.

In short, policies are collected together

inside a module,

which we call an initiative,

so that we can assign it as a single unit

and calculate the compliance.

For certain regulatory standards,

such as PCI DSS, FedRAMP,

you will be able to find the initiative from here itself.

So PCI, you can see there is an initiative

with 277 policies.

So if I open this,

you'll be able to see the 277 policies,

and it will be easy for you to assign these,

rather than assigning these 277 policies one by one.

So this makes your work easier

if you have a set of policies

that you want to apply in a single shot,

you can go for initiative.

For now, let's just work on a single policy,

and I'll also show you how to set up an initiative.

Let's take the common example,

which is allowed locations.

So you can see the policy definition here.

It says,

of, as in all resources,

the field location is not in the parameters.

So parameter is something that we supply to the policy.

So let's say if I supply East US and West US,

if the location of all resources

is not in the selected resources,

or the field not equals global,

so if it's a global resource,

it will not have a region like Azure DNS,

Azure Front, or they don't have a region.

So either it should be in the allowed locations,

or it should be a global resource,

then only it will deploy.

Otherwise, what happens is,

it will take the effect of the policy.

We can see the effect of the policy right here,

which is denied.

Deny means that it will stop me from deploying it.

So what I'll do is I'll click on assign,

have to select the scope

where exactly I want to apply this policy.

I'll send it to POC2 subscription.

Optionally, I can choose a Resource Group

if I want a further granular scope.

Like I said earlier,

you will not be able to choose a resource

because the compliance maximum you can do is Resource Groups.

So I'll select that subscription.

Inside that subscription, if I want to exclude something,

I'll be able to add it here,

like a Resource Group,

I don't want to check compliance

or I don't want to enforce the policy for that.

I'll be able to add that exclusion here.

But in my case,

I want it to be everywhere inside the subscription.

I can give it a custom name.

For example, let me call it as a core cloud

allowed locations.

I can give a description,

list of allowed locations for deployment.

Whenever you apply a policy,

if you want to enforce it,

make sure that this is enabled.

Otherwise, it will be in an audit mode.

Whatever happens, it will be logged,

but it will not stop the user from doing anything.

So make sure it is enabled.

Assign by, you can give the name admin.

Click on Next.

Advance is not required for this particular policy.

There are certain policies

where you'll have resource selectors and overrides,

but in your case, it is not required.

Remember, we had a parameter in the policy definition,

which is called list of allowed locations.

This is what that parameter refers to.

So here, what I'll do is I will select East US

and also West US.

So for me, these are the allowed locations,

which are approved for deployment by my organization.

I'll click on review and create

because we don't require remediation.

Non-compliance message, you can always add it.

This will be the message that will be given to the users

if they try to deploy outside the list of allowed locations.

For example, I can give a message like,

you need to deploy in East US

or West US.

Review and create.

So once the policy is assigned,

it will take five to fifteen minutes to take effect.

We can go back to the policy definitions

and to assignments.

So both the scopes are selected here.

I'll just do a refresh

and you'll be able to see the assignment here.

The compliance has not started yet.

You will see it as not started or not registered.

Since we don't have any resources outside East US,

I think we only have one Virtual Network

in the subscription.

The evaluation was very quick.

And it says zero out of zero.

If I open this policy,

so I don't have any non-compliant resources

and compliant resources.

I think it is not completely evaluated as of now

because we still have a Virtual Network,

which is in our subscription.

So it is gonna take some time to complete the evaluation.

Meanwhile, we can always test this

by just going to a Resource Group

or try to create another Virtual Network.

Any resource.

I'll click on create.

This time I will give it as a demo vnet2

and I'll select somewhere else

like Central US, for example.

So during the validation,

the policy should ideally kick in.

If you see validation passed,

that means the policy is not in effect.

For us, it hasn't shown the message.

So we can try to create it

and see if we are able to initialize the deployment.

It says deploying,

that means the policy is still not in place.

Okay, it's not working as of now.

We can go back to the Virtual Networks,

try to add another.

Again, failed because somewhere it is stopping,

but the message is not clear anyways.

So I can give it another shot.

I'll put it to Central US.

So it's in the process of applying

that that's where you see the underlying API field.

It could be other reasons as well,

but for the time being,

we can assume that it's because the policy

is taking effect.

We can try to create again.

Ideally, we shouldn't reach this page,

but somehow the policy will take its own time

to apply like five to fifteen minutes

to take effect.

Okay, the deployment failed.

Now it says forbidden.

If I click on the error details,

it says resource demo VNet 2 was disallowed by policy.

If I take a look at the row error,

you can see that it is disallowed by policy reasons.

And you can see the non-compliance message,

which I passed to the policy assignment.

You need to deploy in East US or West US.

And if I scroll down,

I'll be able to see the name of the policy right here,

core cloud allowed locations.

And that's how policy works.

So it's still working,

but ideally we should get this message a little earlier.

Anyways, we can try with another resource,

say a Storage Account or something.

So let me try to look for Storage Accounts,

create a Storage Account.

I need to come up with a unique name.

So I'll just add some numbers to make it unique.

So here I'll select Central US.

There you go.

So immediately it said that policy enforcement value

does not meet requirements on resource.

The value Central US in this field was denied.

I can click on the policy details

and it will show me the policy.

You can see that the parameter name here,

list of allowed locations,

and the values are East US and West US.

This is how policy works.

In the next lesson,

we will see how we can work with Azure initiatives.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/d4ea929f-4a17-4446-a218-1fdab0b8627f)**
>
> Watch video content
