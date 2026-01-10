# Solution Project ECommerce Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Project-E-Commerce-Application/Solution-Project-ECommerce-Application)

---

## Table of Contents

- Solution Project ECommerce Application
  - 1. Initial Command Overview
  - 2. Developing the Deployment Script
  - 3. Database Configuration
  - 4. Web Server Configuration
  - 5. Enhancing the Script with Checks and User-Friendly Messages
  - 6. Final Testing and Teardown
  - Watch Video
    - 3.1. Configuring the Database
    - 3.2. Loading Inventory Data
    - Explanation

---

## Content

Shell Scripts for Beginners

Project E Commerce Application

# Solution Project ECommerce Application

In this lesson, we demonstrate how to develop a shell script to deploy the ECommerce Application on a CentOS system. The deployment process includes installing and configuring Firewalld, MariaDB, Apache (httpd), PHP, and Git; setting up the database with inventory data; and verifying that the web server serves the application correctly.

Below is an enhanced walkthrough that maintains the original command order and details while improving readability, flow, and technical accuracy.

---

## 1\. Initial Command Overview

The following commands install and start Firewalld and MariaDB, update the firewall to allow traffic on port 3306, and launch the MySQL client:

```
sudo yum install -y firewalld
sudo service firewalld start
sudo systemctl enable firewalld


sudo yum install -y mariadb-server
sudo vi /etc/my.cnf
sudo service mariadb start
sudo systemctl enable mariadb


sudo firewall-cmd --permanent --zone=public --add-port=3306/tcp
sudo firewall-cmd --reload
mysql
```

> [!important]
> **Note**
>
> Although the instructions include manual editing of `/etc/my.cnf` using `vi`, you can automate configuration changes with tools like `sed` for a fully automated deployment.

---

## 2\. Developing the Deployment Script

Create the deployment script locally using your favorite IDE (e.g., PyCharm) and test it in your lab environment. Name the script file, for example, `deploy_ECommerce_Application.sh`. Start by copying the essential commands from your Git repository before gradually improving and testing the script.

An initial version might look like this:

```
sudo yum install -y firewalld
sudo service firewalld start
sudo systemctl enable firewalld


sudo yum install -y mariadb-server
sudo vi /etc/my.cnf
sudo service mariadb start
sudo systemctl enable mariadb


sudo firewall-cmd --permanent --zone=public --add-port=3306/tcp
sudo firewall-cmd --reload


mysql
```

Testing command blocks individually ensures that each part runs non-interactively (thanks to the `-y` option) and highlights any permission or manual input issues.

---

## 3\. Database Configuration

### 3.1. Configuring the Database

Create a SQL script to setup the database by creating a database, user, and assigning privileges:

```
cat > configure-db.sql <<EOF
CREATE DATABASE ecomdb;
CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompassword';
GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'localhost';
FLUSH PRIVILEGES;
EOF


sudo mysql < configure-db.sql
```

> [!important]
> **Tip**
>
> For automated configuration, consider replacing manual edits with command-line utilities such as `sed` to modify files like `/etc/my.cnf` programmatically.

### 3.2. Loading Inventory Data

Load sample inventory data by creating a SQL script that creates a table and populates it with product details:

```
cat > db-load-script.sql <<EOF
USE ecomdb;
CREATE TABLE products (
  id mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  Name varchar(255) DEFAULT NULL,
  Price decimal(10,2) DEFAULT NULL,
  ImageUrl varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);
INSERT INTO products (Name,Price,ImageUrl) VALUES
  ("Laptop", "100", "c-1.png"),
  ("Drone", "200", "c-2.png"),
  ("VR", "300", "c-3.png"),
  ("Tablet", "5", "c-5.png"),
  ("Watch", "90", "c-6.png"),
  ("Phone", "80", "c-8.png"),
  ("Laptop", "150", "c-4.png");
EOF


sudo mysql < db-load-script.sql
```

If you face access issues (e.g., "Access denied for user ... to database 'ecomdb'"), try running the command with `sudo`.

---

## 4\. Web Server Configuration

Install and configure Apache, PHP, and Git. Modify the server configuration to use `index.php` instead of `index.html` and clone the application repository.

```
sudo yum install -y httpd php php-mysql
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --reload
sudo sed -i 's/index.html/index.php/g' /etc/httpd/conf/httpd.conf


sudo service httpd start
sudo systemctl enable httpd
```

Clone the repository and update the configuration to replace the database IP with localhost:

```
sudo yum install -y git
sudo git clone https://github.com/kodekloudhub/learning-app-ecommerce.git /var/www/html/
sudo sed -i 's/172.20.1.101/localhost/g' /var/www/html/index.php
```

You can test the web application with:

```
curl http://localhost
```

---

## 5\. Enhancing the Script with Checks and User-Friendly Messages

For a production-grade script, it is ideal to include functions that provide colored status messages, verify service activity, and confirm that firewall rules and web content are as expected. Below is an example of an enhanced deployment script:

```
#!/bin/bash
# deploy_ECommerce_Application.sh
# This script deploys the ECommerce Application by installing and configuring
########################################
# Function: print_color
# Description: Print a message in a specified color.
# Usage: print_color "green" "Your message here"
########################################
function print_color(){
  NC='\033[0m'  # No Color
  case $1 in
    "green") COLOR='\033[0;32m' ;;
    "red")   COLOR='\033[0;31m' ;;
    *)       COLOR='\033[0m' ;;
  esac
  echo -e "${COLOR}$2${NC}"
}


########################################
# Function: check_service_status
# Description: Check if a service is active.
# Usage: check_service_status firewalld
########################################
function check_service_status(){
  service_name=$1
  is_active=$(systemctl is-active "$service_name")
  if [ "$is_active" = "active" ]; then
    print_color "green" "$service_name Service is active"
  else
    print_color "red" "$service_name Service is not active"
    exit 1
  fi
}


########################################
# Function: check_firewalld_port
# Description: Verify that a given port is configured in the public zone firewall.
# Usage: check_firewalld_port "3306"
########################################
function check_firewalld_port(){
  port=$1
  firewall_ports=$(sudo firewall-cmd --list-all --zone=public | grep ports)
  if [[ $firewall_ports == *"$port"* ]]; then
    print_color "green" "Port $port is configured in the firewall"
  else
    print_color "red" "Port $port is not configured in the firewall"
    exit 1
  fi
}


########################################
# Function: check_item
# Description: Check if a specific item appears in the web page content.
# Usage: check_item "$web_page_content" "Laptop"
########################################
function check_item(){
  web_page_content="$1"
  item="$2"
  if [[ "$web_page_content" == *"$item"* ]]; then
    print_color "green" "Item '$item' is present on the web page"
  else
    print_color "red" "Item '$item' is not present on the web page"
  fi
}


#############################
# Database and Service Setup
#############################


# Install and configure Firewalld
print_color "green" "Installing and starting firewalld..."
sudo yum install -y firewalld
sudo service firewalld start
sudo systemctl enable firewalld
check_service_status firewalld


# Install and configure MariaDB
print_color "green" "Installing and starting MariaDB..."
sudo yum install -y mariadb-server
sudo service mariadb start
sudo systemctl enable mariadb
check_service_status mariadb


# Configure firewall for MariaDB (port 3306)
print_color "green" "Adding firewall rule for MariaDB (port 3306)..."
sudo firewall-cmd --permanent --zone=public --add-port=3306/tcp
sudo firewall-cmd --reload
check_firewalld_port "3306"


# Configure the Database
print_color "green" "Configuring the database..."
cat > configure-db.sql <<EOF
CREATE DATABASE ecomdb;
CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompassword';
GRANT ALL PRIVILEGES ON *.* TO 'ecomuser'@'localhost';
FLUSH PRIVILEGES;
EOF
sudo mysql < configure-db.sql


# Load inventory data into the database
print_color "green" "Loading inventory data into the database..."
cat > db-load-script.sql <<EOF
USE ecomdb;
CREATE TABLE products (
  id mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  Name varchar(255) DEFAULT NULL,
  Price decimal(10,2) DEFAULT NULL,
  ImageUrl varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);
INSERT INTO products (Name,Price,ImageUrl) VALUES
  ("Laptop", "100", "c-1.png"),
  ("Drone", "200", "c-2.png"),
  ("VR", "300", "c-3.png"),
  ("Tablet", "5", "c-5.png"),
  ("Watch", "90", "c-6.png"),
  ("Phone", "80", "c-8.png"),
  ("Laptop", "150", "c-4.png");
EOF
sudo mysql < db-load-script.sql


#############################
# Web Server Configuration
#############################


print_color "green" "Installing Apache, PHP, and configuring the web server..."
sudo yum install -y httpd php php-mysql
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --reload
sudo sed -i 's/index.html/index.php/g' /etc/httpd/conf/httpd.conf


sudo service httpd start
sudo systemctl enable httpd
check_service_status httpd


print_color "green" "Cloning application repository..."
sudo yum install -y git
sudo git clone https://github.com/kodekloudhub/learning-app-ecommerce.git /var/www/html/
sudo sed -i 's/172.20.1.101/localhost/g' /var/www/html/index.php


#############################
# Testing the Deployment
#############################


print_color "green" "Testing the web application..."
web_page=$(curl http://localhost)
for item in "Laptop" "Drone" "VR" "Watch" "Phone"
do
  check_item "$web_page" "$item"
done


print_color "green" "Deployment complete. The ECommerce Application is up and running."
```

### Explanation

1.  **Functions for User-Friendly Output:**  
    The functions `print_color`, `check_service_status`, and `check_firewalld_port` offer colored output and validate that necessary services and firewall rules are active.
2.  **Database Setup:**  
    SQL scripts (`configure-db.sql` and `db-load-script.sql`) configure the database and load inventory data. Executing these with `sudo mysql` ensures proper permission handling.
3.  **Web Server Setup:**  
    Apache is installed and configured to use `index.php` via `sed`, and the application repository is cloned into `/var/www/html`. The script updates the IP address in `index.php` with `localhost`, standardizing the environment.
4.  **Final Testing:**  
    The script uses `curl` to fetch the web content and verifies the presence of key items such as "Laptop", "Drone", etc.

---

## 6\. Final Testing and Teardown

After executing the script, verify the deployment by visiting [http://localhost](http://localhost) in your browser to confirm that all products are listed. For further improvements, consider adding robust error checking and a teardown script to stop services, clean up changes, or restore your test VM to a clean snapshot.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/0e75480e-85f7-470c-9aa4-fac3fef0ede7/lesson/d099f0fa-e998-45c4-9ba4-431cf012e932)**
>
> Watch video content
