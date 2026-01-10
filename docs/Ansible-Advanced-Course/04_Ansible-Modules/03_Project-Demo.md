# Project Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Ansible-Modules/Project-Demo)

---

## Table of Contents

- Project Demo
  - 1. Deploying Prerequisites
  - 2. Deploying and Configuring the Database
  - 3. Deploying and Configuring the Web Application
  - Conclusion
  - Watch Video
  - Practice Lab
    - Installing and Configuring firewalld
    - Installing MariaDB Server
    - Adding the Firewall Rule for MariaDB
    - Configuring the Database
    - Loading Inventory Data
    - Installing HTTPD, PHP, and MySQL Extensions
    - Configuring HTTPD
    - Downloading the Application Code
    - Updating Database Connection Settings
    - Troubleshooting Default Page Issues

---

## Content

Ansible Advanced Course

Ansible Modules

# Project Demo

In this article, we demonstrate how to deploy the KodeKloud ecommerce application manually on a CentOS machine—without using automation tools like Ansible. You can use any available CentOS machine or quickly access a CentOS playground online.

The application's source code is hosted on GitHub in the **learning-app-ecommerce** repository maintained by the KodeKloud organization. The repository includes all necessary deployment files along with a detailed README file divided into three sections:

• Deploying prerequisites  
• Deploying and configuring the database  
• Deploying and configuring the web server

Follow the steps below sequentially to complete the manual deployment.

---

## 1\. Deploying Prerequisites

### Installing and Configuring firewalld

Begin by installing firewalld, then start and enable the service to run on system boot:

```
sudo yum install -y firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld
```

If you need to troubleshoot, verify the service status with:

```
sudo systemctl status firewalld
```

When adding firewall rules later in the process, you can list all active rules with:

```
sudo firewall-cmd --list-all
```

A sample troubleshooting session might resemble:

```
[root@eb29eab4499 ~]# sudo systemctl start firewalld
Redirecting to /bin/systemctl start firewalld.service
[root@eb29eab4499 ~]# sudo systemctl enable firewalld
Created symlink from /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service
    to /usr/lib/systemd/system/firewalld.service.
Created symlink from /etc/systemd/system/multi-user.target.wants/firewalld.service
    to /usr/lib/systemd/system/firewalld.service.
```

---

## 2\. Deploying and Configuring the Database

### Installing MariaDB Server

Install the MariaDB server package using the following command:

```
sudo yum install -y mariadb-server
```

After installation, you can review or modify default settings in the configuration file `/etc/my.cnf`. Below is an example configuration; unless you need to change the default port or other settings, the provided configuration remains suitable:

```
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid
#
# include all files from the config directory
#
!includedir /etc/my.cnf.d
```

Start and enable MariaDB:

```
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

A sample session to verify these steps:

```
[root@eb29eab44d99 ~]# vi /etc/my.cnf
[root@eb29eab44d99 ~]# sudo systemctl start mariadb
Redirecting to /bin/systemctl start mariadb.service
[root@eb29eab44d99 ~]# sudo systemctl enable mariadb
Created symlink from /etc/systemd/system/multi-user.target.wants/mariadb.service
    to /usr/lib/systemd/system/mariadb.service.
```

### Adding the Firewall Rule for MariaDB

Open port 3306 (the default MySQL port) by executing:

```
sudo firewall-cmd --permanent --zone=public --add-port=3306/tcp
sudo firewall-cmd --reload
```

Confirm that the new rule is active:

```
sudo firewall-cmd --list-all
```

### Configuring the Database

Access the MariaDB monitor to create the database, add a new user, and grant the necessary privileges.

:::note Database Setup In this example, we create a database named **ecomdb** and a user **ecomuser** with the password **ecompassword**. :::

1.  **Create the Database:**

    ```
    MariaDB [(none)]> CREATE DATABASE ecomdb;
    Query OK, 1 row affected (0.00 sec)
    ```

2.  **Verify the Database:**

    If a typo occurs, such as `show database;`, correct it using:

    ```
    MariaDB [(none)]> SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | ecomdb             |
    | mysql              |
    | performance_schema |
    | test               |
    +--------------------+
    5 rows in set (0.00 sec)
    ```

3.  **Create a Database User and Grant Privileges:**

    ```
    MariaDB [(none)]> CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompassword';
    Query OK, 0 rows affected (0.00 sec)


    MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'localhost';
    Query OK, 0 rows affected (0.00 sec)


    MariaDB [(none)]> FLUSH PRIVILEGES;
    ```

### Loading Inventory Data

The GitHub repository includes a SQL script (`DB-load-script.sql` in the assets directory) that creates a **products** table with sample data.

1.  **Create the SQL Script File:**

    Run the command below to create the file and paste the content:

    ```
    cat > db-load-script.sql
    ```

2.  **Sample Contents of db-load-script.sql:**

    ```
    USE ecomdb;
    CREATE TABLE products (
      id mediumint(8) unsigned NOT NULL auto_increment,
      Name varchar(255) DEFAULT NULL,
      Price varchar(255) DEFAULT NULL,
      ImageUrl varchar(255) DEFAULT NULL,
      PRIMARY KEY (id) AUTO_INCREMENT=1
    );


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

3.  **Load the Data:**

    Execute the script with:

    ```
    mysql < db-load-script.sql
    ```

4.  **Verification:**

    Log in to the MariaDB monitor and switch to the **ecomdb** database to confirm the data was loaded:

    ```
    mysql
    Welcome to the MariaDB monitor.  Commands end with ; or \g.
    Your MariaDB connection id is 4
    Server version: 5.5.64-MariaDB MariaDB Server


    MariaDB [(none)]> USE ecomdb;
    Database changed
    MariaDB [ecomdb]> SELECT * FROM products;
    +----+---------------+-------+----------+
    | id | Name          | Price | ImageUrl |
    +----+---------------+-------+----------+
    |  1 | Laptop        | 100   | c-1.png  |
    |  2 | Drone         | 20    | c-2.png  |
    |  3 | VR            | 300   | c-3.png  |
    |  4 | Tablet        | 50    | c-5.png  |
    |  5 | Watch         | 90    | c-6.png  |
    |  6 | Phone Covers  | 20    | c-7.png  |
    |  7 | Phone         | 80    | c-8.png  |
    |  8 | Laptop        | 150   | c-4.png  |
    +----+---------------+-------+----------+
    8 rows in set (0.00 sec)
    ```

At this point, the database is configured and pre-populated with sample data.

---

## 3\. Deploying and Configuring the Web Application

### Installing HTTPD, PHP, and MySQL Extensions

Install the required web server packages along with PHP and its MySQL extension:

```
sudo yum install -y httpd php php-mysql
```

Add the firewall rule for HTTP (port 80) and reload firewalld:

```
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --reload
```

### Configuring HTTPD

To configure Apache, open the configuration file and modify the DirectoryIndex if needed. For example, change the default file to **index.php** by editing the file:

```
sudo vi /etc/httpd/conf/httpd.conf
```

Locate and adjust the DirectoryIndex section from:

```
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
```

to:

```
<IfModule dir_module>
    DirectoryIndex index.php
</IfModule>
```

After saving the changes, restart HTTPD:

```
sudo systemctl start httpd
sudo systemctl enable httpd
sudo systemctl restart httpd
```

### Downloading the Application Code

Ensure Git is installed, then clone the ecommerce repository into the web server’s document root:

```
sudo yum install -y git
git clone https://github.com/kodekloudhub/learning-app-ecommerce.git /var/www/html/
```

Verify the files were cloned successfully:

```
ls /var/www/html/
# Expected output: assets  css  fonts  img  index.php  js  README.md  scss  vendors
```

### Updating Database Connection Settings

By default, the application’s **index.php** file is configured to connect to an IP address (e.g., 172.20.1.101). Since this is an all-in-one setup, update the database connection details to use **localhost**. Open **index.php** and locate the `mysqli_connect` call.

Change the connection parameters from:

```
$link = mysqli_connect('172.20.1.101', 'ecommerce', 'password', 'ecommerce');
```

to:

```
$link = mysqli_connect('localhost', 'ecomuser', 'ecompassword', 'ecomdb');
```

Save the file and refresh your web page. You can also test the server response with:

```
curl http://localhost
```

If the connection is correctly configured, you will see a list of products fetched from the database.

### Troubleshooting Default Page Issues

If an **index.html** file exists alongside **index.php**, Apache might serve **index.html** by default. Ensure that the DirectoryIndex configuration in `/etc/httpd/conf/httpd.conf` prioritizes **index.php**. If necessary, remove or rename the default **index.html**. For example, to create a temporary index file:

```
cat > index.html
Hello there! This is a sample index file.
^C
```

After adjusting the DirectoryIndex value, restart HTTPD:

```
sudo systemctl restart httpd
```

Now, accessing your site should display the ecommerce application (i.e., **index.php**) rather than the sample **index.html**.

---

## Conclusion

Following these steps, you have successfully deployed the KodeKloud ecommerce application manually on a CentOS machine. The process included:

• Installing and configuring **firewalld** and **MariaDB**  
• Setting up the database by creating the database, adding a user, and loading sample data  
• Installing and configuring **HTTPD**, PHP, and cloning the application code  
• Updating the database connection settings in **index.php**

This demonstration highlights how all components work together in a manual deployment scenario. Enjoy exploring the KodeKloud ecommerce application and refer to the [KodeKloud GitHub repository](https://github.com/kodekloudhub/learning-app-ecommerce) for further information and updates.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/c47e8f27-3b16-4603-966c-b440295e5b75/lesson/e393d63d-8bdb-4732-845c-4450529dfad6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/c47e8f27-3b16-4603-966c-b440295e5b75/lesson/97c6cfcd-3fc3-492d-b672-b62831a1d331)**
>
> Practice lab
