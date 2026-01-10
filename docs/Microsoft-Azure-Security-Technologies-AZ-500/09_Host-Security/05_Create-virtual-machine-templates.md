# Create virtual machine templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Host-Security/Create-virtual-machine-templates)

---

## Table of Contents

- Create virtual machine templates
  - Benefits of Using Virtual Machine Templates
  - Scenario: Creating a VM Template with Apache and Website Files
  - Creating a Virtual Machine Template from the Configured VM
  - Deploying a New VM from the Template
  - Conclusion
  - Watch Video
    - Step 1: Running a Remediation Script
    - Step 2: Installing Apache
    - Step 3: Downloading and Extracting Website Files
    - Step 4: Copying the Website to Apache's Web Directory
    - Step 5: Configuring the Azure Network Security Group (NSG)

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Host Security

# Create virtual machine templates

Virtual machine templates are essential for streamlining and standardizing the deployment of virtual environments within cloud infrastructures. These templates act as blueprints by encapsulating predefined configurations, applications, and operating system settings. Leveraging VM templates can significantly accelerate deployment processes, ensure consistency across multiple environments, and maintain compliance with organizational and regulatory standards.

![The image is a flowchart illustrating the creation of virtual machine templates, branching from a "Template" to "Development," "Production," and "Quality Assurance."](https://kodekloud.com/kk-media/image/upload/v1752881849/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/virtual-machine-template-flowchart.jpg)

For instance, you can take a base VM from Azure, apply necessary hardening rules, and then create a generalized image that serves as the standard for all future deployments. With this approach, you can craft different templates for development, production, and QA environments.

## Benefits of Using Virtual Machine Templates

1.  **Standardized Deployments:**  
    VM templates encapsulate all the necessary VM specifications such as the operating system, pre-installed applications, and configurations. This ensures that every new VM deployment meets stringent requirements like specific firewall settings, standardized file structures, and pre-installed software.
2.  **Customizable and Repeatable:**  
    Templates can be tailored to the distinct needs of various departments. For example, an engineering template may include different software compared to a sales template. Once defined, these templates ensure that each department receives the precise configuration they need.
3.  **Infrastructure as Code:**  
    By defining VM templates in Azure Resource Manager (ARM) and storing them in version control systems like Git, organizations can track changes, perform rollbacks, and collaborate more effectively. This integration not only boosts automation but also enforces consistency across deployments.
4.  **Rapid Scalability:**  
    VM templates enable quick instantiation of multiple VM instances. For example, during high-traffic periods such as sales events, additional VMs can be rapidly deployed to handle increased user demand, ensuring a smooth experience.
5.  **Consistent Configuration and Compliance:**  
    Templates guarantee that every deployed VM adheres to set configuration and compliance standards. For example, financial institutions can create templates that automatically align with regulatory requirements, thereby enhancing security and compliance.
6.  **Versioning and Updates:**  
    Versioned templates simplify management by ensuring that when new security patches or updates are released, they can be seamlessly integrated into subsequent deployments.

![The image outlines the benefits of creating virtual machine templates, including standardized deployments, customization, infrastructure as code, rapid scalability, consistent configuration, and versioning.](https://kodekloud.com/kk-media/image/upload/v1752881850/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/virtual-machine-templates-benefits.jpg)

## Scenario: Creating a VM Template with Apache and Website Files

In this scenario, we will build a VM that has Apache installed along with HTML files needed to run a company website. Once configured, this VM will be used as a template for future deployments across regions or for scaling purposes.

### Step 1: Running a Remediation Script

In our example, a GenBox VM is utilized for testing purposes. A remediation script named `CSBP_remediation.sh` is executed to assess the VM and apply hardening policies. When run, the script checks various configurations and outputs its progress in the terminal.

```
root@jump-vm:/home/kodekloud# ls
CSBP_remediation.sh
root@jump-vm:/home/kodekloud#
```

The output might include messages similar to the following:

```
CSBP_remediation.sh: 169: [[: not found
-e UnableToRemediate: Ensure LDAP server is not enabled
-e 2.2.8 Ensure DNS Server is not enabled
Failed to disable unit: Unit file bind9.service does not exist.
...
```

This indicates that several controls have failed (24 in this case). After applying the fixes, the script eventually displays a summary showing successful remediation for some controls while others may still have issues.

```
...
-e Remediation script for Azure Ubuntu 18.04 executed successfully!!
-e Summary:
-e Remediation Passed: 9
-e Remediation Failed: 24
root@jump-vm:/home/kodekloud#
```

> [!important]
> **Note**
>
> Ensure that you carefully review the remediation script's output and address any persistent issues before proceeding to the next steps.

### Step 2: Installing Apache

After remediation, Apache is installed on the VM. Additional website files are then downloaded from a bootstrap source. The installation process automatically handles the unpacking of requisite packages such as `libapr1`, `apache2-bin`, and `apache2-data`.

```
root@jump-vm:/home/kodekloud# apt
```

The terminal output confirms that Apache and its dependencies are properly installed.

### Step 3: Downloading and Extracting Website Files

The website files are delivered as a ZIP file (`files.zip`). Since the `unzip` package is not included by default, it is installed first. Following this, the ZIP file is extracted into a directory named `website`.

```
root@jump-vm:/home/kodekloud# unzip files.zip -d website
Archive:  files.zip
  inflating: website/startbootstrap-freelancer-gh-pages/
  inflating: website/startbootstrap-freelancer-gh-pages/assets/
  inflating: website/startbootstrap-freelancer-gh-pages/assets/favicon.ico
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/avataaars.svg
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/portfolio/
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/portfolio/cabin.png
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/portfolio/cake.png
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/portfolio/circus.png
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/portfolio/game.png
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/portfolio/safe.png
  inflating: website/startbootstrap-freelancer-gh-pages/assets/img/portfolio/submarine.png
  inflating: website/startbootstrap-freelancer-gh-pages/css/
  inflating: website/startbootstrap-freelancer-gh-pages/css/styles.css
  inflating: website/startbootstrap-freelancer-gh-pages/index.html
  inflating: website/startbootstrap-freelancer-gh-pages/js/
  inflating: website/startbootstrap-freelancer-gh-pages/js/scripts.js
root@jump-vm:/home/kodekloud# ls
CSBP_remediation.sh  files.zip  website
```

After extraction, navigate into the website directory to verify the presence of HTML files, assets, CSS, and JavaScript:

```
root@jump-vm:/home/kodekloud/website# cd startbootstrap-freelancer-gh-pages/
root@jump-vm:/home/kodekloud/website/startbootstrap-freelancer-gh-pages# ls
assets  css  index.html  js
```

### Step 4: Copying the Website to Apache's Web Directory

Copy the website files recursively with verbose output to Apache's default web directory (`/var/www/html/`):

```
root@jump-vm:/home/kodekloud/website/startbootstrap-freelancer-gh-pages# cp -Rv * /var/www/html/
```

Verify the successful copy and test the deployment by running:

```
curl localhost
```

This should display the website's content, confirming that Apache is serving the files correctly.

### Step 5: Configuring the Azure Network Security Group (NSG)

Before accessing the website externally, ensure that the NSG allows traffic on port 80 (HTTP). In the Azure portal, navigate to the virtual machine (e.g., "jump-vm") and review its networking settings.

![The image shows a Microsoft Azure portal interface displaying a list of virtual machines, including their names, types, statuses, and other details.](https://kodekloud.com/kk-media/image/upload/v1752881851/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-portal-virtual-machines-list.jpg)

If port 80 is not allowed, add a new inbound security rule for HTTP traffic:

![The image shows a Microsoft Azure portal interface where a user is configuring networking settings for a virtual machine named "jump-vm." The user is adding an inbound security rule, selecting a service from a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752881852/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-portal-networking-jump-vm.jpg)

After the update, refresh the website in your browser to confirm that the sample start bootstrap website is visible.

## Creating a Virtual Machine Template from the Configured VM

Once the web server with Apache and website files is set up, the next step is to capture this configuration as a VM template. Navigate to the virtual machine's overview in the Azure portal and select the "Capture" option.

When capturing the VM, you are presented with two options:

- **Generalized:**  
  This option is similar to executing a sysprep on a Windows machine. The VM image will not retain user-specific information, and initial configuration (like hostname and admin user) will be required upon first boot.
- **Specialized:**  
  This option creates an exact clone of your virtual machine, preserving all user accounts and settings.

For this scenario, a generalized image is recommended. Provide a resource group and required details. You will be prompted to create a new image definition (for example, "webOS") and assign a version number (e.g., 1.0.0).

![The image shows a Microsoft Azure interface for creating a virtual machine image, with options for setting gallery details, VM image definition, and version details.](https://kodekloud.com/kk-media/image/upload/v1752881853/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-virtual-machine-image-creation.jpg)

Review all details and initiate the image creation process. Note that once a VM is generalized, it will no longer be usable, but the captured template can then be used for deploying new VMs with identical configurations.

During this process, the VM will be stopped as an image is created:

![The image shows a Microsoft Azure portal screen for creating a virtual machine image, with details like subscription, resource group, and region. A notification indicates that a virtual machine is being stopped.](https://kodekloud.com/kk-media/image/upload/v1752881854/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-portal-virtual-machine-image.jpg)

After the image is created, you can verify the new VM image definition. From here, you also have the option of deploying a new VM or creating a VM scale set (VMSS) using this image.

## Deploying a New VM from the Template

To validate the template, deploy a new VM using the captured image:

1.  In the Azure portal, click on "Create VM."
2.  Select an appropriate VM size and name the machine (e.g., "VM-from-image").
3.  Configure the authentication method (password and/or SSH).> [!important]
    > **Note**
    >
    > License selection is not required as the image was created from an Ubuntu machine.
4.  Choose a standard SSD and review all configurations.

![The image shows a Microsoft Azure portal interface for creating a virtual machine, with options for setting a username, password, inbound port rules, and license type.](https://kodekloud.com/kk-media/image/upload/v1752881856/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-portal-virtual-machine-setup.jpg)

![The image shows a Microsoft Azure portal interface for creating a virtual machine, specifically focusing on the disk configuration options. Various storage types like Premium SSD and Standard HDD are listed for selection.](https://kodekloud.com/kk-media/image/upload/v1752881857/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-portal-virtual-machine-disk-config.jpg)

After final review, complete the deployment. Once the new VM is running, verify its accessibility by using its public IP address in a web browser.

![The image shows a Microsoft Azure portal page indicating that a deployment named "CreateVm-WebOS-20231002161148" is complete. It includes options to view deployment details and next steps, with a button to "Go to resource."](https://kodekloud.com/kk-media/image/upload/v1752881858/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-portal-deployment-complete-2.jpg)

Copy the public IP address and enter it into your browser. You should see the same website as configured earlier—demonstrating that the VM template successfully replicates all configurations and deployed files.

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "vm-from-image," including its status, location, operating system, and networking information.](https://kodekloud.com/kk-media/image/upload/v1752881859/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-virtual-machine-templates/azure-portal-virtual-machine-details.jpg)

## Conclusion

This guide demonstrates the significant benefits of using virtual machine templates:

- Consistent and standardized deployments across varied environments.
- Pre-configured security controls and website files embedded in the deployed VMs.
- Rapid scalability through quick replication of secure, standardized configurations.

By converting a web server configured with Apache and a bootstrap website into a VM template, organizations can ensure that subsequent VM deployments maintain the same configuration integrity and security hardening. In the next section, we will explore strategies for enabling and securing remote access management for virtual machines.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d8d70777-3d80-4e41-803e-0929352de5e7/lesson/a046d6a3-1c05-4c5a-bca1-f9d16dea539a)**
>
> Watch video content
