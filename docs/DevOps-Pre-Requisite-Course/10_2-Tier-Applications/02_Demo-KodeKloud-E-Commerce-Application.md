# Demo KodeKloud E Commerce Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/2-Tier-Applications/Demo-KodeKloud-E-Commerce-Application)

---

## Table of Contents

- Demo KodeKloud E Commerce Application
  - 1. Deploying Prerequisites
  - 2. Installing and Configuring the Database
  - 3. Deploying and Configuring the Web Application
  - Watch Video
  - Practice Lab
    - Install and Start Firewalld
    - Installing MariaDB
    - Adding a Firewall Rule for MariaDB
    - Configuring the Database
    - Loading Inventory Data
    - Installing Required Packages
    - Configuring Apache
    - Downloading the Application Code
    - Verifying the Application’s Database Connection

---

## Content

DevOps Pre-Requisite Course

2 Tier Applications

# Demo KodeKloud E Commerce Application

In this guide, you'll learn how to deploy the KodeKloud e-commerce application on a CentOS machine. The application code is hosted on GitHub under the repository “learning-app-ecommerce” at the KodeKloud hub. The repository includes all the necessary files along with a detailed README for further instructions.

Below is a step-by-step guide covering prerequisites installation, database and firewall configuration, and finally, the deployment of the web application.

---

## 1\. Deploying Prerequisites

First, install and configure the firewall (firewalld) so that it automatically starts on system boot. This ensures that your system rules are applied correctly, aiding in troubleshooting any future issues.

### Install and Start Firewalld

Execute the following commands to install firewalld, start the service, enable it to run on reboot, and confirm its status:

```
sudo yum install -y firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld
sudo systemctl status firewalld
```

To verify the current firewall rules, run:

```
sudo firewall-cmd --list-all
```

> [!important]
> **Note**
>
> Ensure that all expected firewall rules are active, confirming firewalld is running as intended.

---

## 2\. Installing and Configuring the Database

The application uses MariaDB as its database server. The steps below demonstrate how to install, configure, and secure MariaDB.

### Installing MariaDB

Install MariaDB using the package manager and review the configuration file:

```
sudo yum install -y mariadb-server
sudo vi /etc/my.cnf
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

The default configuration file (`/etc/my.cnf`) appears as follows:

```
# This group is read both by the client and the server
[client-server]
# include all files from the config directory
!includedir /etc/my.cnf.d
```

> [!important]
> **Note**
>
> If you need to change settings like the MySQL port or adjust other configurations, update this file as required. For this demo, default settings are maintained.

### Adding a Firewall Rule for MariaDB

Since MariaDB uses the default MySQL port (3306), add this port to firewalld permanently and then reload the service:

```
sudo firewall-cmd --permanent --zone=public --add-port=3306/tcp
sudo firewall-cmd --reload
```

To confirm that the rule has been added, list the current firewall settings:

```
sudo firewall-cmd --list-all
```

### Configuring the Database

Follow these steps to configure MariaDB for the e-commerce application:

1.  Create the database.
2.  Create a new user with appropriate privileges.
3.  Load sample inventory data.

Log in to the MariaDB console:

```
sudo mysql
```

Create the database and verify its creation:

```
CREATE DATABASE ecomdb;
SHOW DATABASES;
```

You should see “ecomdb” listed alongside default databases like information_schema, mysql, and performance_schema.

Now, create a new user and grant it privileges:

```
CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompassword';
GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'localhost';
FLUSH PRIVILEGES;
```

### Loading Inventory Data

To populate the `ecomdb` database with sample data, create a SQL script (for example, named `db-load-script.sql`). You can either copy the script from the GitHub repository's assets or create it manually:

```
cat > db-load-script.sql <<-EOF
USE ecomdb;
CREATE TABLE products (
    id mediumint(8) unsigned NOT NULL auto_increment,
    Name varchar(255) DEFAULT NULL,
    Price varchar(255) DEFAULT NULL,
    ImageUrl varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT=1;


INSERT INTO products (Name, Price, ImageUrl)
VALUES ("Laptop","100","c-1.png"),("Drone","200","c-2.png"),("VR","300","c-3.png"),("Tablet","50","c-5.png"),("Watch","90","c-6.png"),("Phone Covers","20","c-7.png"),("Phone","80","c-8.png");
EOF
```

Load the SQL script into MySQL with:

```
mysql < db-load-script.sql
```

Verify that the inventory data has been imported by executing the following commands in the MariaDB console:

```
USE ecomdb;
SELECT * FROM products;
```

---

## 3\. Deploying and Configuring the Web Application

Now that your database is set up and configured, let's deploy the web application using Apache, PHP, and the required MySQL driver.

### Installing Required Packages

First, install Apache (httpd), PHP, and the PHP MySQL driver. Then add a firewall rule for HTTP (port 80):

```
sudo yum install -y httpd php php-mysqlnd
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --reload
```

### Configuring Apache

Modify Apache’s configuration to prioritize `index.php` over `index.html`. Use the following command to update the configuration:

```
sudo sed -i 's/index.html/index.php/g' /etc/httpd/conf/httpd.conf
```

Start and enable the Apache service:

```
sudo systemctl start httpd
sudo systemctl enable httpd
```

Verify that Apache is running:

```
sudo systemctl status httpd
```

### Downloading the Application Code

Ensure Git is installed on your machine:

```
yum install -y git
```

Clone the repository into the Apache document root:

```
git clone https://github.com/kodekloudhub/learning-app-ecommerce.git /var/www/html
```

Since the sample code might have a hard-coded IP address for the MySQL database connection, update the `index.php` file to use `localhost`:

```
sudo sed -i 's/172.20.1.101/localhost/g' /var/www/html/index.php
```

To verify the web application, open your browser and navigate to [http://localhost:80](http://localhost:80) or use curl:

```
curl http://localhost
```

You should see the e-commerce application’s web page displaying the inventory data retrieved from the database.

### Verifying the Application’s Database Connection

Review the `index.php` file to ensure the MySQL credentials and host settings are correct. The relevant PHP section should resemble:

```
<?php
$link = mysqli_connect('localhost', 'ecomuser', 'ecompassword', 'ecomdb');


if ($link) {
    $res = mysqli_query($link, "SELECT * FROM products;");
    while ($row = mysqli_fetch_assoc($res)) {
        ?>
        <div class="col-md-3 col-sm-6 business_content">
            <?php echo '<img src="'.$row["ImageUrl"] . '" alt="">' ?>
            <div class="media">
            </div>
            <div class="media-body">
                <a href="#"><?php echo $row['Name'] ?> at the lowest price <span><?php echo $row['Price'] ?></span></a>
            </div>
        </div>
        <?php
    }
}
?>
```

After saving any changes, refresh your browser to see the updated product listing.

> [!important]
> **Final Note**
>
> By following these steps, you have successfully deployed and configured the KodeKloud e-commerce application on a CentOS machine. Both the database and web server are now running and properly connected.

Enjoy your fully functional e-commerce demo!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/2608518c-d8a5-4ee7-8089-e53c93b30abc/lesson/df1329d7-5a2c-4085-ae66-a288160622d3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/2608518c-d8a5-4ee7-8089-e53c93b30abc/lesson/11138573-95c5-456d-83ea-3877277c801a)**
>
> Practice lab
