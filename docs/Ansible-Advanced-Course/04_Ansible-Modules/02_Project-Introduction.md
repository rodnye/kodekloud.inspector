# Project Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Ansible-Modules/Project-Introduction)

---

## Table of Contents

- Project Introduction
  - Step 1: Setting Up the Firewall
  - Step 2: Configuring the MariaDB Database
  - Step 3: Configuring the Web Server
  - Step 4: Deploying the Application Code
  - Step 5: Reviewing the PHP Connection in the Application
  - Demo and Next Steps
  - Watch Video

---

## Content

Ansible Advanced Course

Ansible Modules

# Project Introduction

In this article, we introduce the project that you will work on throughout this course. You will develop Ansible playbooks to deploy the KodeKloud ecommerce website—a fictional online store selling electronic devices. This project is divided into stages, starting with setting up a lab environment and creating simple playbooks, and then progressing to advanced best practices using includes and roles.

The KodeKloud ecommerce website uses a LAMP stack architecture:

- **Linux** as the operating system
- **Apache HTTP Server** for web services
- **MariaDB** as the database (a community fork of MySQL)
- **PHP** for server-side scripting

> [!important]
> **Note**
>
> The focus of this project is on automating the deployment process with Ansible, rather than making changes to the application code itself.

Before you automate the deployment, it is important to be familiar with the manual configuration steps for setting up each component. This lesson reviews these essential tasks so you understand how each piece fits into the overall process.

The tasks include:

1.  Choosing the deployment system (we use a CentOS Linux machine).
2.  Installing and configuring the Apache HTTP server, then enabling and starting the service.
3.  Installing and configuring the MariaDB database, then enabling and starting the service.
4.  Installing and configuring PHP.
5.  Downloading and setting up the application code such that it correctly connects to Apache and PHP.
6.  Configuring the system further by setting up the firewall and creating the necessary rules.

For better logical flow, the guide begins by setting up and configuring the database before moving on to Apache and PHP.

---

## Step 1: Setting Up the Firewall

First, install firewalld on your CentOS system. Run the following commands to install, start, and enable the firewall service:

```
sudo yum install firewalld
sudo service firewalld start
sudo systemctl enable firewalld
```

---

## Step 2: Configuring the MariaDB Database

Begin by installing the MariaDB server. Next, update the `/etc/my.cnf` file to change port settings if needed (remember that although the file is named `my.cnf`, it is also used by MariaDB). Then, start and enable the MariaDB service.

```
sudo yum install mariadb-server
sudo vi /etc/my.cnf  # Adjust port settings as required
sudo service mariadb start
sudo systemctl enable mariadb
```

After starting the database service, add the necessary firewall rules to allow external access on port 3306:

```
sudo firewall-cmd --permanent --zone=public --add-port=3306/tcp
sudo firewall-cmd --reload
```

Next, access the database with the MySQL client to create the database, user, and assign privileges. Use the following SQL commands:

```
MariaDB > CREATE DATABASE ecomdb;
MariaDB > CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompassword';
MariaDB > GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'localhost';
MariaDB > FLUSH PRIVILEGES;
```

Finally, load the inventory data for the products with the provided database load script.

> [!important]
> **Reminder**
>
> Make sure the database credentials and port settings in your configuration match those specified in your Ansible playbooks.

---

## Step 3: Configuring the Web Server

This step involves installing Apache, PHP, and PHP-MySQL to enable database connectivity. Then, update the firewall rules to allow HTTP traffic and modify Apache’s configuration to use `index.php` as the default file.

Install the necessary packages:

```
sudo yum install -y httpd php php-mysql
```

Configure the firewall for HTTP traffic:

```
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --reload
```

Edit the Apache configuration file to prioritize `index.php`:

```
sudo vi /etc/httpd/conf/httpd.conf  # Set DirectoryIndex to use index.php instead of index.html
```

After saving the changes, start and enable the Apache service:

```
sudo service httpd start
sudo systemctl enable httpd
```

---

## Step 4: Deploying the Application Code

Clone the repository containing the KodeKloud ecommerce application code. If Git isn't installed, install it first:

```
sudo yum install -y git
git clone https://github.com/<application>.git /var/www/html/
```

Before testing, update the `index.php` file with the correct database details (address, name, user ID, and password). Finally, verify the deployment with a simple test:

```
curl http://localhost
```

This setup demonstrates how to deploy the LAMP stack on a single node where the database, Apache, and PHP all reside on the same system.

In a multi-node configuration, the components are distributed on separate systems. Although the steps remain similar, connectivity details must be adjusted:

- Update `index.php` on the web server with the database server's IP address.
- In the database server, specify the web server's IP address when configuring user access. This ensures that only the authorized web server can connect.

For example, on the database server, use the following configuration:

```
MariaDB > CREATE DATABASE ecomdb;
MariaDB > CREATE USER 'ecomuser'@'172.20.1.102' IDENTIFIED BY 'ecompassword';
MariaDB > GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'172.20.1.102';
MariaDB > FLUSH PRIVILEGES;
```

And, update the PHP connection code on the web server accordingly:

```
$link = mysqli_connect('172.20.1.101', 'ecomuser', 'ecompassword');
if ($link) {
    $res = mysqli_query($link, "SELECT * FROM products;");
    while ($row = mysqli_fetch_assoc($res)) {
        // Process each row
    }
}
```

> [!important]
> **Security Warning**
>
> Always ensure that your database user permissions and firewall settings are secured in both single and multi-node setups to prevent unauthorized access.

---

## Step 5: Reviewing the PHP Connection in the Application

The primary file to focus on within the application is `index.php`, which contains the database connection details. The critical line in the file is:

```
$link = mysqli_connect('172.20.1.101', 'ecomuser', 'ecompassword', 'ecomdb');
```

This line specifies the IP address of the database server, the database name, the user ID, and the password. You will modify this connection string as needed throughout the project.

---

## Demo and Next Steps

After reviewing this demo:

- Set up your project environment.
- Create Ansible playbooks to automate the deployment.
- Practice deploying the KodeKloud ecommerce application following the steps provided.

For further reading on Kubernetes concepts and container orchestration (if relevant to your deployment automation), visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/c47e8f27-3b16-4603-966c-b440295e5b75/lesson/d4153d2d-a162-4aa3-9590-1ebaa5ff4fab)**
>
> Watch video content
