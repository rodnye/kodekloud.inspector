# Demo KodeKloud e commerce application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Project-E-Commerce-Application/Demo-KodeKloud-e-commerce-application)

---

## Table of Contents

- Demo KodeKloud e commerce application
  - 1. Deploying Prerequisites
  - 2. Configuring the Database
  - 3. Deploying and Configuring the Web Server
  - 4. Optional: Handling index.html vs. index.php
  - Watch Video
  - Practice Lab
    - a. Installing and Configuring Firewalld
    - b. Installing and Configuring MariaDB
    - a. Creating the Database and User
    - b. Loading Inventory Data
    - a. Installing Apache, PHP, and PHP-MySQL
    - b. Downloading the Application Code
    - c. Verifying the Application
    - d. Updating the Database Connection in index.php

---

## Content

Shell Scripts for Beginners

Project E Commerce Application

# Demo KodeKloud e commerce application

In this guide, we will walk you through deploying the KodeKloud ECommerce Application on a CentOS machine. The application code is hosted on GitHub in the "learning-app-ecommerce" repository at KodeKloud Hub. The repository contains all the required files plus a README that explains how to deploy prerequisites, configure the database, and set up the web server.

Below is a detailed, step‑by‑step walkthrough.

---

## 1\. Deploying Prerequisites

### a. Installing and Configuring Firewalld

Begin by installing the firewalld package, starting the service, and enabling it to automatically run on system reboot:

```
sudo yum install firewalld
sudo service firewalld start
sudo systemctl enable firewalld
```

Verify that firewalld is running by checking its status:

```
sudo service firewalld status
```

A sample output might appear as follows:

```
[root@eb29eab4d499 ~]# service firewalld status
Redirecting to /bin/systemctl status firewalld.service
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2019-10-11 10:53:21 UTC; 19s ago
     Docs: man:firewalld(1)
 Main PID: 1540 (firewalld)
   CGroup: /system.slice/firewalld.service
           └─1540 /usr/bin/python2 -Es /usr/sbin/firewalld --nofork --nopid


Oct 11 10:53:21 eb29eab4d499 systemd[1]: Starting firewalld - dynamic firewall....
Oct 11 10:53:21 eb29eab4d499 systemd[1]: Started firewalld - dynamic firewall.
Hint: Some lines were ellipsized, use -l to show in full.
[root@eb29eab4d499 ~]#
[root@eb29eab4d499 ~]# clear
```

### b. Installing and Configuring MariaDB

Install the MariaDB server and, if necessary, modify its configuration file. Then start and enable the MariaDB service:

```
sudo yum install mariadb-server
sudo vi /etc/my.cnf
sudo service mariadb start
sudo systemctl enable mariadb
```

Next, update the firewall to allow connections on port 3306 (MySQL's default port):

```
sudo firewall-cmd --permanent --zone=public --add-port=3306/tcp
sudo firewall-cmd --reload
```

To verify that MariaDB is running correctly, check its status:

```
sudo service mariadb status
```

Sample output:

```
[root@eb29eab4d499 ~]# sudo service mariadb status
Redirecting to /bin/systemctl status mariadb.service
● mariadb.service - MariaDB database server
   Loaded: loaded (/usr/lib/systemd/system/mariadb.service; enabled; vendor preset: disabled)
   Active: active (running) since Fri 2019-10-11 10:55:08 UTC; 13s ago
 Main PID: 1842 (mysqld_safe)
   CGroup: /system.slice/mariadb.service
           └─1842 /bin/sh /usr/bin/mysqld_safe --basedir=/usr
             └─2004 /usr/libexec/mysqld --basedir=/usr --datadir=/var/lib/mysql --...
```

The MariaDB configuration file (`/etc/my.cnf`) may have settings similar to:

```
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0


[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid
```

> [!important]
> **Note**
>
> Leave these settings as default unless you require any custom changes, such as modifying the port.

---

## 2\. Configuring the Database

### a. Creating the Database and User

Start by entering the MariaDB prompt:

```
mysql
```

At the MariaDB monitor, execute the following SQL commands to create the database, user, and grant necessary privileges. In this example, the database is "ecomdb", the user is "ecomuser", and the password is "ecompassword":

```
CREATE DATABASE ecomdb;
SHOW DATABASES;


CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompassword';
GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'localhost';
FLUSH PRIVILEGES;
```

Successful execution of these commands should display no errors, and `SHOW DATABASES;` will list "ecomdb".

### b. Loading Inventory Data

The repository provides a SQL script (usually in the assets directory named `db-load-script.sql`) that creates a "products" table and inserts sample data.

1.  Create the SQL script file:

    ```
    cat > db-load-script.sql
    ```

2.  Open the file in your favorite text editor and insert the following:

    ```
    USE ecomdb;


    CREATE TABLE products (
      id mediumint(8) unsigned NOT NULL auto_increment,
      Name varchar(255) DEFAULT NULL,
      Price varchar(255) DEFAULT NULL,
      ImageUrl varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    ) AUTO_INCREMENT=1;


    INSERT INTO products (Name, Price, ImageUrl) VALUES
      ("Laptop", "100", "c-1.png"),
      ("Drone", "20", "c-2.png"),
      ("VR", "300", "c-3.png"),
      ("Tablet", "50", "c-5.png"),
      ("Watch", "90", "c-6.png"),
      ("Phone Covers", "20", "c-7.png"),
      ("Phone", "80", "c-8.png"),
      ("Laptop", "150", "c-4.png");
    ```

3.  Save the file and load it into MySQL:

    ```
    mysql < db-load-script.sql
    ```

4.  Finally, verify the data load by logging back into MariaDB and executing:

    ```
    USE ecomdb;
    SELECT * FROM products;
    ```

You should see a list of products with their details.

---

## 3\. Deploying and Configuring the Web Server

### a. Installing Apache, PHP, and PHP-MySQL

Install the necessary packages to run a web server with PHP support:

```
sudo yum install -y httpd php php-mysql
```

Allow HTTP traffic by adding a firewall rule for port 80:

```
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --reload
```

Edit Apache’s configuration file if required. For example, ensure the DirectoryIndex directive prioritizes `index.php`:

```
# DirectoryIndex: sets the file that Apache will serve if a directory is requested.
DirectoryIndex index.php
```

Start and enable the Apache HTTP server:

```
sudo service httpd start
sudo systemctl enable httpd
```

### b. Downloading the Application Code

Ensure Git is installed:

```
sudo yum install -y git
```

Then, clone the e-commerce application repository:

```
git clone https://github.com/kodekloudhub/learning-app-ecommerce.git
```

This repository includes all the required web files, including `index.php`.

### c. Verifying the Application

Before making adjustments, verify that the application is accessible by using a web browser or curl:

```
curl http://localhost
```

At this stage, you might see a default page that does not display the configured e-commerce application. This may be due to an old database connection configuration.

### d. Updating the Database Connection in index.php

Open the `index.php` file from the cloned repository and update the database connection details. Replace any external IP address (e.g., 172.20.1.101) with `localhost` and ensure the username, password, and database name match your configuration:

```
<?php
$link = mysqli_connect('localhost', 'ecomuser', 'ecompassword', 'ecomdb');
if ($link) {
    $res = mysqli_query($link, "SELECT * FROM products");
    while ($row = mysqli_fetch_assoc($res)) {
        // Display product information
        ?>
        <div class="col-md-3 col-sm-6 business_content">
            <?php echo '<img src="' . $row['ImageUrl'] . '" alt="Product Image">'; ?>
            <div class="media">
                <div class="media-left"></div>
                <div class="media-body">
                    <a href="#"><?php echo $row['Name']; ?></a>
                    <span>Purchase <?php echo $row['Price']; ?>$</span>
                </div>
            </div>
        </div>
    <?php
    }
}
?>
```

Save the changes and refresh your web page (or run curl again):

```
curl http://localhost
```

You should now see the updated list of products from your database.

---

## 4\. Optional: Handling index.html vs. index.php

If an `index.html` file exists in the document root of your web server, Apache might serve that file by default over `index.php`. To ensure that Apache serves the e-commerce application:

- Either remove/rename the `index.html` file, or
- Update the `DirectoryIndex` directive in `/etc/httpd/conf/httpd.conf` as shown below:

  ```
  DirectoryIndex index.php
  ```

Restart Apache to apply the changes:

```
sudo service httpd restart
```

Then, confirm by visiting:

```
curl http://localhost
```

Your e-commerce application should now display the products loaded from the database.

---

Thank you for following this guide on deploying the KodeKloud ECommerce Application. With both the web server and the application correctly configured along with its database, your e-commerce site should now be fully operational.

For further reading on web server deployment and database configuration concepts, consider checking out these resources:

- [Apache HTTP Server Documentation](https://httpd.apache.org/docs/)
- [MariaDB Knowledge Base](https://mariadb.com/kb/en/)
- [PHP Manual](https://www.php.net/manual/en/)

> [!important]
> **Additional Tip**
>
> Regularly back up your configuration files and database to prevent data loss and ease recovery in case of system failures.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/0e75480e-85f7-470c-9aa4-fac3fef0ede7/lesson/1da45f7e-0de3-4563-9e0f-a0221f54a376)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/0e75480e-85f7-470c-9aa4-fac3fef0ede7/lesson/2f9d4198-72ca-4408-b1b8-5fac4ec299f5)**
>
> Practice lab
