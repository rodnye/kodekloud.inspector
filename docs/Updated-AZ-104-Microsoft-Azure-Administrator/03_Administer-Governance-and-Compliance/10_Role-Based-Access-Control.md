# Role Based Access Control - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Role-Based-Access-Control)

---

## Table of Contents

- Role Based Access Control
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Role Based Access Control

If you're looking to manage permissions

and access within your Azure environment,

RBAC will be your friend.

So what exactly is Azure RBAC?

It is a system that helps you to manage

who has access to your Azure resources,

what they can do with those resources,

and what areas they have access to.

It provides a fine-grained access management

to better enforce your organization's security policies.

Let's talk about some key terms that you hear often.

So whenever we think about Azure RBAC,

the first thing that comes to your mind will be who.

So who refers to a security principal,

as in who will get the access.

So any identity which is requesting for access.

It could be a user, group, service principal,

or a managed identity.

Second is what.

What refers to what permissions you want to give

to the security principal.

So the what is defined using something called

role definition, which defines a set of operations

that a particular role can perform.

This is written in JSON format.

Lastly, where.

Where exactly do you want to give the role

for the user or the security principal.

That's what we call Azure scope.

This is a limit of access which defines a boundary,

for example, to a Resource Group,

to a virtual machine, to a database.

All this is considered as a scope.

So if we combine this together,

we will get something called a role assignment.

When we attach a role definition to a service principal

at a particular scope, then it becomes a role assignment.

Maximum you can have up to 2000 role assignments

in each subscription.

Always follow the principle of least privilege

whenever you're assigning the permissions.

Also, you can make use of privileged identity management

when you're working with Azure RBAC.

So we don't want to give permanent direct access

to our resources.

Instead, the access will be provided

through Privileged Identity Management.

In Azure Active Directory,

we studied about different security principles, right?

How a user works, how groups work,

service principal, et cetera.

And we already know what the scope is.

So that's why we learned about hierarchy.

You have management groups, subscriptions,

resource groups, resources.

Something that is missing is a role definition.

So let's just double click on that

and understand more about this.

So in Azure, you have built-in roles.

These are the roles that are supplied

with Azure out of the box,

like Owner, Reader, Contributor, et cetera.

And you also have very specific roles

limited to certain services

like Virtual Machine Contributor,

Storage Blob Contributor, et cetera.

Also, you can come up with custom roles.

It's not necessary that you have to go

with the built-in roles.

Let's say your organization requires

a very fine-tuned role for your users,

then you can create custom roles.

Basically, this is how a role definition will look like.

And this is the role definition for the Contributor role.

You can see that the name is Contributor.

There will be a unique Object ID that is assigned.

Is custom is set to false because it's not a custom role.

It's a built-in role from Azure.

And it has a description where it says

grants full access to manage all resources,

but does not allow assigning roles in Azure RBAC.

In actions, you can see that there is an asterisk

that means everything is allowed.

Not actions, you have certain things

like Microsoft.Authorization slash delete,

Microsoft.Authorization write,

elevate access, et cetera.

So basically, this is the contributor role definition

where the contributor will be able to do everything,

but the user will not be able to assign roles

in Azure RBAC.

That's why you see that authorization provider.

Also, there are some limitations on the blueprint.

And also, share image galleries.

That's why you have Microsoft.Compute

slash gallery slash share slash action there.

Data actions, no data actions usually come

into picture if you're dealing with the storage role

on what permissions the user should have on the data plane.

And finally, assignable scopes,

which all scopes you can assign.

The slash denotes root.

That means anything under the root can use this role.

So this is how the role definition looks like.

Now, let's just see what are the built-in roles

available in Azure.

Then we will go to Azure portal

and see how we can assign the roles.

So built-in roles are roles offered by Azure,

which we can assign to users,

groups, service principals, and managed identities.

Here are the fundamental roles that you need to be aware of.

First one is owner.

This has full access to all resources

and can delegate access to other users.

For example, if I am the owner of a resource,

say a virtual machine,

I will be able to make other people owners,

contributors, readers, or any other role that I want.

Basically, I will be able to delegate access to other users.

Next is Contributor.

We have already seen the definition of contributor

in the previous slide.

Contributor can create and manage all types of resources,

but cannot grant access to others.

If I'm a contributor,

I will not be able to make another person a contributor

or an owner.

If you need to get access to something,

you should get in touch with the owner.

Next is the Reader.

As the name implies,

Reader has read access to all resources,

no permission to make changes to the resources.

Also, the reader will not be able to see

sensitive information like connection strings,

account keys, API keys, etc.

That will be only visible to owner and contributor.

Last but not least, we have User Access Administrator.

This user has access to Azure resources.

To a certain level only.

That means the user can provide access to other users.

It's more like a delegation role.

If I'm a User Access Administrator,

I'll be able to give access to other permissions,

but I will not be able to manage the resources.

If I'm able to manage the resources,

that essentially becomes an owner.

So User Access Administrator is more like an owner

without the permission to manage the resources.

We already covered scope in understanding hierarchy,

but I want to bring this topic again

so that you understand this clearly

and you don't forget this.

So at the top, we have the management group,

then the subscription, resource group,

and finally resources.

So if you assign a role at the management group,

that will be inherited to the subscription,

resource group, and resources.

Similarly, if you assign a role at the subscription level,

that will be inherited to the Resource Group and resources.

Likewise, if you apply at the Resource Group level,

that will be inherited to the resources.

This is how the scope works.

So don't forget the scope

because this has a lot of importance in policies

as well as in RBAC.

I hope that's clear.

Now we will go to Azure portal

and see how we can assign these permissions

and how we can set up a custom role if required.

So we are in Azure portal.

Now what I will do is I'll simply go to this Resource Group.

Unfortunately, the subscription is disabled,

so we'll not be able to make any changes.

So what I'll do is I'll create a new resource group here.

I'll call it as AC Demo RBAC,

and I'll place it in East Europe.

I'm not gonna add any resources,

so I'll just simply use the name of the Resource Group.

Create this resource group.

So the resource group is created.

If I just refresh this,

or I can go to the resource group here.

On every scope where you can assign RBAC,

you will see this access control IAM blade.

All you have to do is just click on that

and you will be able to check access and view your access.

You will be able to check access for other users as well,

but you can go to role assignments.

This is where you'll be able to see all the roles.

For example, my account is an Owner,

but I don't have the Owner role

at this Resource Group level,

but I have a role at the Subscription level

and it is inherited.

So remember the hierarchy.

If you give the permission at the very top,

like at the management group,

that will get inherited to all the underlying resources,

including subscriptions, Resource Groups,

and your Azure resources.

So RBAC goes with inheritance.

Similarly, if I apply RBAC at the Resource Group level,

all the resources inside that Resource Group

will get that permission.

So if I want to add a role,

I'll click on Add Role Assignment.

I have to choose a role here.

You can see there are a lot of built-in roles available

specific to every resource.

For example, you can see there is an ACR delete,

ACR image signer.

This is for Azure Container Registry.

There are some roles for Attestation Contributor,

Attestation Reader.

This is for attestation purposes.

You have an automation job, automation contributor.

This is for automation account.

So for every resource,

there will be certain roles available

because we don't want to give owner

or contributor to everyone.

We follow the principle of least privilege.

So if someone just needs to create and manage jobs

in Azure Runbooks in the automation account,

this is the role I'll be giving

instead of giving a privileged role.

So this view gives you job function role,

which basically targets certain jobs,

but you have privileged roles as well,

like Owner, Contributor, et cetera.

So if I want to give a Reader role,

for example, I'll click on Reader,

click on Next.

This is where I'll select members,

the users that I want to give the role to.

So in the first place,

this is the role definition,

what exactly we need to give.

And in the next page,

this is where we set rules.

And we already decided where,

because where is a scope

and we know it is going to be the Resource Group.

So I'll just select users

that I want to give read access to

and I'll select Next,

Review and Assign.

And you can see that

these users have been added as a reader here.

And the scope is this resource.

Whenever you see this resource,

you have to look at here

to understand what this resource is.

Now let's say inside this Resource Group,

what I'll do is I'll create a Virtual Network.

For example,

so I'll choose that subscription

and the Resource Group.

I'll say demo VNet,

review and create.

I will not look in the address space

and all which is not required at this point.

So I'll just skip that

and I'll create this virtual network.

So I'll click on create

and the virtual network will be created right now.

The deployment is in progress.

Okay, the resource has been created.

If I click on go to resource

that will take me to the Virtual Network.

In the virtual network also,

you will see this access control IAM

because this resource or this level supports Azure RBAC.

So I'll click on that,

I'll take a look at the role assignments.

Obviously, my name will be there

because it is inherited from the subscription.

You can see other users,

which we added as readers

and you can see the scope.

This is coming from the Resource Group.

So this is not assigned directly to the resource.

It is assigned to the Resource Group

and got inherited.

Similarly, I can go to Management Groups as well.

For example, IT here,

I can go to access control IAM.

I'll be able to add a role assignment here.

So it says I'm the owner for this one.

and I have given this permission

at this resource level, I have the permission.

I can add more users, owners, readers,

whatever role I want here

and all subscriptions under IT

will get that permission inherited.

This is how RBAC works.

Let's say you want to come up with a custom role.

You're not happy with the built-in roles.

So you can click on add

and you'll see add custom role.

Earlier, a couple of years back,

we used to write JSON for this

and create this from PowerShell or CLI.

Now the portal supports creation of custom roles.

Now I can give a name.

I'll add CR just for me to understand

that it's a custom role.

I'll say this is VM App Operator,

something like that.

I can give a description.

If I need, it will be very helpful

for someone who wants to assign this role.

I can clone an existing role, a built-in role.

I can start from scratch or I can start from JSON.

I'll use start from scratch

because we get the option

to choose the permissions from here.

I can click on add permissions.

You'll see all services here.

For example, if I want to see

Virtual Machine related permissions,

you can see it right here.

Or in case you're not able to find it,

you can search for Microsoft Docs Compute.

Yeah, this is a virtual machine.

So you'll be able to see all the permissions

that are available with virtual machines.

For example, let me randomly pick some permissions.

For example, right here,

read latest patch assessment operation details,

get virtual machine log definitions,

get virtual machine run command,

delete virtual machine run command.

You can add these permissions.

So the custom role will only have these permissions

and the user will be able to only accomplish

these actions.

I'll click on next.

I'll click on create.

And this custom role will be created.

As you can see, it may take a few minutes

to display this role everywhere,

but we can give it a shot.

This time I'll go for add role assignment.

In job function, what you can do is

you can filter type to a custom role

and you can see your CRVM operator

custom role available here.

I can click on that, click on next,

select members.

I can add people here or groups here.

For example, we have an HR group.

That group also can be added here.

I'll click on select,

review and assign,

review and assign.

And you can see that CRM app operator

has been added here.

And all these users have permission

at the management group level.

That means they have access to everything

under the management group.

Now that you know what Azure RBAC is,

we also have Microsoft Entra ID roles.

And for beginners, this is quite confusing.

So let's understand the differences

between Azure RBAC and Microsoft Entra ID roles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/9e0ebfef-0121-402d-bc21-c0c2605ade1e)**
>
> Watch video content
