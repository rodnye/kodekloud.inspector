# Templates and Catalog - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Templates-and-Catalog)

---

## Table of Contents

- Templates and Catalog
  - Understanding Catalog Items
  - Creating a Template
  - Watch Video

---

## Content

OpenShift 4

Storage Templates and Catalog

# Templates and Catalog

Welcome to the lesson on OpenShift for Beginners. In this module, we'll dive into the concepts of templates and catalogs in OpenShift and explore how they help you deploy complete application stacks from a single configuration.

When you log in to the OpenShift web console, you'll notice a variety of deployment options presented in an interface called the catalog. Throughout this course, you have seen individual BuildConfig objects, deployments, and services created using catalog items. But what exactly are these catalog items?

## Understanding Catalog Items

Catalog items in OpenShift combine multiple objects into a single deployable unit. For instance, take the Django and PostgreSQL catalog item. This catalog item includes several critical components that work together to deliver a complete application stack:

- A BuildConfig to compile the application.
- An ImageStream to tag completed builds.
- A DeploymentConfig to deploy the application.
- An additional DeploymentConfig to deploy a PostgreSQL database.
- A Service to expose the PostgreSQL database on port 5432.
- A Secret object to securely store database credentials.
- Another Service to expose the application on port 8080.
- A Route to provide user access to the application.
- A section that defines user parameters (such as application name, namespace, and Git repository) through an input wizard.

All these components are packaged into a single template, enabling you to deploy an entire operational application stack with just one command. Moreover, you can create your own templates and add them as catalog items for reusable deployment configurations.

## Creating a Template

Templates in OpenShift can be created by uploading or downloading a YAML or JSON file. The following steps outline how to create a template using YAML:

1.  **Define the Template Metadata**

    Start by creating a YAML file where you declare the API version and kind. For example:

    ```
    apiVersion: v1
    kind: Template
    metadata:
      name: custom-app
    ```

2.  **Specify the Application Stack Objects**

    Under the `objects` section, list the various objects that make up your application stack. This can include Secrets, Services, Routes, BuildConfigs, DeploymentConfigs, and ImageStreams. Below is an abbreviated example:

    ```
    apiVersion: v1
    kind: Template
    metadata:
      name: custom-app
    objects:
    - apiVersion: v1
      kind: Secret
      # <!– code hidden –>
    - apiVersion: v1
      kind: Service
      # <!– code hidden –>
    - apiVersion: v1
      kind: Route
      # <!– code hidden –>
    - apiVersion: v1
      kind: BuildConfig
      # <!– code hidden –>
    - apiVersion: v1
      kind: DeploymentConfig
      # <!– code hidden –>
    - apiVersion: v1
      kind: Service
      # <!– code hidden –>
    - apiVersion: v1
      kind: ImageStream
      # <!– code hidden –>
    parameters:
      - displayName: "Namespace"
        name: "NAMESPACE"
    ```

3.  **Create and Deploy the Template**

    Save your file as `template-config.yaml` (or any other name you prefer), and then create the template by running the following command in your terminal:

    ```
    oc create -f template-config.yaml
    ```

    > [!important]
    > **Tip**
    >
    > If you're not sure how to construct the YAML for a particular service, you can export the existing configuration by running:
    >
    > ```
    > oc export service db
    > ```
    >
    > This command outputs the YAML configuration for the service, which you can modify and parameterize as needed.

That concludes this lesson on OpenShift templates and catalogs. In the next section, we will proceed to a demonstration to further illustrate these concepts in action.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/5054a838-a538-41d5-9d34-6c77ea9d5f9e)**
>
> Watch video content
