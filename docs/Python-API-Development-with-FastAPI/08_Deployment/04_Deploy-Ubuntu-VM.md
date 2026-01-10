# Deploy Ubuntu VM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Deployment/Deploy-Ubuntu-VM)

---

## Table of Contents

- Deploy Ubuntu VM
  - 1. Creating a Droplet on DigitalOcean
  - 2. Connecting to Your Ubuntu VM
  - 3. Installing Python, pip, and Virtual Environment
  - 4. Installing and Configuring PostgreSQL
  - 5. Creating a Non-Root User and Setting Up the Application Environment
  - 6. Running the Application with Gunicorn and Creating a systemd Service
  - 7. Configuring Nginx as a Reverse Proxy
  - 8. Setting Up DNS and Domain Name
  - 9. Securing Your Site with HTTPS (SSL)
  - 10. Configuring the Firewall with UFW
  - 11. Deploying Code Changes
  - 12. Summary
  - Watch Video
    - Production with Gunicorn
    - Creating a systemd Service
    - Installing Nginx
    - Configuring the Reverse Proxy

---

## Content

Python API Development with FastAPI

Deployment

# Deploy Ubuntu VM

In this guide, you'll learn how to deploy a FastAPI application on an Ubuntu server. Although these steps remain the same regardless of the cloud provider (AWS, Azure, GCP, DigitalOcean, VirtualBox, or Raspberry Pi), we will use DigitalOcean for demonstration purposes due to its cost-effective fixed pricing.

Once your DigitalOcean account is created and you are logged in, follow the instructions below.

---

## 1\. Creating a Droplet on DigitalOcean

Start by selecting **Get Started with a Droplet** on the DigitalOcean dashboard. Choose the following options:

- **Image:** Ubuntu 20.04 (or a newer version if available; the commands remain the same).
- **CPU Options:** Regular Intel with SSD for optimum pricing.
- **Plan:** Select the $5/month option (0.007 per hour).
- **Data Center:** Pick the regional data center closest to you (e.g., East Coast).
- **Authentication:** Either set a strong password (ensuring you meet DigitalOcean’s password criteria) or use SSH keys if preferred.
- **Hostname:** Use a descriptive name for your droplet, such as `ubuntu-fastapi`.

DigitalOcean will create your Ubuntu VM and assign it a public IP address. This IP will be used to connect to your server.

![The image shows a DigitalOcean interface for creating a new droplet, where users can choose an operating system image and a pricing plan. Various options for distributions and plans are displayed, including Ubuntu and different CPU configurations.](https://kodekloud.com/kk-media/image/upload/v1752883402/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/digitalocean-droplet-creation-interface.jpg)

![The image shows a DigitalOcean interface for creating a new Droplet, with options to set a root password, hostname, and project assignment. The user is in the process of finalizing the creation of a Droplet named "ubuntu-fastapi."](https://kodekloud.com/kk-media/image/upload/v1752883403/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/digitalocean-create-droplet-ubuntu-fastapi.jpg)

---

## 2\. Connecting to Your Ubuntu VM

Once your droplet is ready, connect via SSH:

1.  Open your terminal (or Command Prompt/VS Code integrated terminal).
2.  Execute the SSH command:

    ```
    ssh root@<PUBLIC_IP_ADDRESS>
    ```

    For example:

    ```
    ssh root@134.122.25.116
    ```

3.  Type “yes” when prompted to accept the fingerprint and then enter your password.

After a successful login, you'll notice your home directory (which might include a `snap` folder). It is vital to update your Ubuntu system:

```
sudo apt update && sudo apt upgrade -y
```

> [!important]
> **Tip**
>
> Using the `-y` flag automatically confirms prompts during the upgrade process. You may be asked to confirm configuration changes for applications like `openssh-server`.

---

## 3\. Installing Python, pip, and Virtual Environment

First, verify that Python is installed:

```
python --version
```

If the command isn’t found, try:

```
python3 --version
```

A typical outcome might be:

```
Python 3.8.10
```

If pip is missing, you will receive a suggestion such as:

```
Command 'pip' not found, but can be installed with:
sudo apt install python3-pip
```

Install pip with:

```
sudo apt install python3-pip
```

Then, install the virtual environment tool:

```
sudo pip3 install virtualenv
```

This isolates your FastAPI application and its dependencies.

---

## 4\. Installing and Configuring PostgreSQL

Set up PostgreSQL and its additional libraries with:

```
sudo apt install postgresql postgresql-contrib -y
```

Start PostgreSQL if it’s not running already:

```
pg_ctlcluster 12 main start
```

Access PostgreSQL using the `psql` command. By default, a PostgreSQL user named `postgres` is created with peer authentication:

```
psql -U postgres
```

If you see an error like:

```
psql: error: FATAL:  Peer authentication failed for user "postgres"
```

Follow these steps:

1.  Switch to the `postgres` user:

    ```
    su - postgres
    ```

2.  Access psql:

    ```
    psql -U postgres
    ```

3.  Set a new password for the `postgres` user:

    ```
    \password postgres
    ```

4.  Exit psql:

    ```
    \q
    ```

Next, modify the PostgreSQL configuration files located in `/etc/postgresql/12/main`:

- In `pg_hba.conf`, change:

  ```
  local   all             postgres        peer
  ```

  to:

  ```
  local   all             postgres        md5
  ```

- To enable remote connections (if needed), edit `postgresql.conf` and set:

  ```
  listen_addresses = '*'
  ```

Now, restart PostgreSQL:

```
sudo systemctl restart postgresql
```

Test the connection:

```
psql -U postgres
```

You should now be prompted for the password.

---

## 5\. Creating a Non-Root User and Setting Up the Application Environment

For enhanced security, create a non-root user instead of running your application as root. For example, create a user named `sanjeev`:

```
adduser sanjeev
```

Follow the prompts to set a password and enter the user details. Next, add this user to the sudo group:

```
usermod -aG sudo sanjeev
```

Now, log in as the new user:

```
ssh sanjeev@<PUBLIC_IP_ADDRESS>
```

Prepare your application environment by creating an application directory:

```
mkdir app
cd app
```

Create and activate a virtual environment:

```
virtualenv venv
source venv/bin/activate
```

Within your application directory, create a folder (e.g., `src`) for your source code and clone your FastAPI project from GitHub:

```
cd src
git clone https://github.com/Sanjeev-Thiyagarajan/fastapi-course .
```

If files are nested within a repository folder and you wish to have them directly in `src`, clone them directly by appending a dot (.) at the end.

Install the necessary project dependencies:

```
pip install -r requirements.txt
```

If you encounter errors related to PostgreSQL or missing header files (like `libpq-fe.h`), install the development libraries:

```
sudo apt install libpq-dev
```

Then, rerun the pip install command.

Test your FastAPI application locally using Uvicorn:

```
uvicorn app.main:app --host 0.0.0.0
```

Your API should now be accessible on port 8000.

---

## 6\. Running the Application with Gunicorn and Creating a systemd Service

### Production with Gunicorn

For production environments, use Gunicorn with Uvicorn workers. Install Gunicorn (if not already included in your requirements):

```
pip install gunicorn
```

Test Gunicorn using Uvicorn workers:

```
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
```

You should see output confirming that Gunicorn has booted four worker processes.

### Creating a systemd Service

To ensure that your application runs in the background and starts automatically on reboot, create a systemd service file. Create a file named `api.service` in `/etc/systemd/system/` with the following contents (adjust the paths and usernames to match your environment):

```
[Unit]
Description=Demo FastAPI Application
After=network.target


[Service]
User=sanjeev
Group=sanjeev
WorkingDirectory=/home/sanjeev/app/src/
Environment="PATH=/home/sanjeev/app/venv/bin"
EnvironmentFile=/home/sanjeev/.env
ExecStart=/home/sanjeev/app/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000


[Install]
WantedBy=multi-user.target
```

> [!important]
> **Note**
>
> The `EnvironmentFile` directive loads additional environment variables from your `.env` file. Ensure this file contains all required credentials and settings.

Reload systemd to apply the new service configuration:

```
sudo systemctl daemon-reload
```

Start and verify the service status:

```
sudo systemctl start api.service
sudo systemctl status api.service
```

If you experience issues related to missing environment variables (e.g., `secret_key` or `access_token_expire_minutes`), ensure your `.env` file (located in your home directory) includes lines similar to:

```
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_PASSWORD=password123
DATABASE_NAME=fastapi
DATABASE_USERNAME=postgres
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=300
```

Then, restart the systemd service:

```
sudo systemctl restart api.service
```

Finally, enable the service to start on boot:

```
sudo systemctl enable api.service
```

---

## 7\. Configuring Nginx as a Reverse Proxy

### Installing Nginx

Install Nginx with:

```
sudo apt install nginx -y
```

Start (or restart) the Nginx service:

```
sudo systemctl start nginx
sudo systemctl restart nginx
```

Visiting your droplet’s IP in a browser should display the default Nginx page.

### Configuring the Reverse Proxy

Edit the default server block for Nginx by modifying the configuration file located at `/etc/nginx/sites-available/default`:

```
sudo vi /etc/nginx/sites-available/default
```

Replace the contents (or modify the location block) with the following configuration:

```
server {
    listen 80;
    listen [::]:80;

    server_name sanjeev.xyz www.sanjeev.xyz;  # Replace with your domain


    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_redirect off;
    }
}
```

Save the file and restart Nginx:

```
sudo systemctl restart nginx
```

Your domain should now forward requests to your FastAPI application running on port 8000.

---

## 8\. Setting Up DNS and Domain Name

If you have a custom domain (e.g., purchased from Namecheap), point its DNS to your DigitalOcean droplet:

1.  Log in to your domain registrar and update the name servers to:
    - ns1.digitalocean.com
    - ns2.digitalocean.com
    - ns3.digitalocean.com

2.  In the DigitalOcean dashboard, navigate to **Manage DNS** and add your domain (for example, `sanjeev.xyz`). Create:
    - An A record (with `@`) pointing to your droplet’s IP.
    - A CNAME record for `www` pointing to `@`.

Once DNS changes propagate (this may take a few minutes to an hour), visiting your domain should serve your application.

![The image shows a DigitalOcean project dashboard with options to manage resources like droplets, databases, and spaces. It includes navigation menus and various options for creating and managing cloud infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752883404/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/digitalocean-project-dashboard-management.jpg)

![The image shows a Namecheap domain management dashboard for the domain "sanjeev.xyz," displaying options for domain status, privacy, DNS settings, and other domain-related features.](https://kodekloud.com/kk-media/image/upload/v1752883405/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/namecheap-domain-management-sanjeev-xyz.jpg)

![The image shows a DigitalOcean control panel for managing DNS settings of the domain "sanjeev.xyz," including options to create new records and view existing DNS records.](https://kodekloud.com/kk-media/image/upload/v1752883406/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/digitalocean-dns-settings-sanjeev.jpg)

![The image shows a DigitalOcean control panel displaying DNS records for the domain "sanjeev.xyz," including CNAME and A records. It also provides options to create new DNS records.](https://kodekloud.com/kk-media/image/upload/v1752883406/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/digitalocean-dns-records-sanjeev.jpg)

---

## 9\. Securing Your Site with HTTPS (SSL)

Use Certbot from Let’s Encrypt to secure your site with HTTPS at no additional cost.

1.  Install Certbot via Snap:

    ```
    sudo snap install core; sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
    ```

2.  Run Certbot with the Nginx plugin:

    ```
    sudo certbot --nginx
    ```

3.  Follow the interactive prompts:
    - Enter your email address.
    - Agree to the Terms of Service.
    - Decide if you want to share your email with the EFF.
    - Provide the domain names (e.g., `sanjeev.xyz` and `www.sanjeev.xyz`) for the certificate.

Certbot will update your Nginx configuration to enable HTTPS and set up proper redirection from HTTP.

Once complete, you should see a secure padlock in your browser, indicating that HTTPS is active.

![The image shows a webpage from Certbot, providing instructions for setting up HTTPS on an Nginx server running on Ubuntu 20.04. It includes requirements and support information for using Certbot.](https://kodekloud.com/kk-media/image/upload/v1752883407/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/certbot-https-nginx-ubuntu-20-04.jpg)

---

## 10\. Configuring the Firewall with UFW

Configure UFW (Uncomplicated Firewall) to allow only essential traffic:

1.  Check the current UFW status:

    ```
    sudo ufw status
    ```

2.  Allow HTTP, HTTPS, and SSH traffic:

    ```
    sudo ufw allow http
    sudo ufw allow https
    sudo ufw allow ssh
    ```

3.  Optionally, if remote access to PostgreSQL is required, allow port 5432:

    ```
    sudo ufw allow 5432
    ```

4.  Enable UFW:

    ```
    sudo ufw enable
    ```

Verify the active firewall rules:

```
sudo ufw status
```

You should see allowed entries for ports 80, 443, 22, and optionally 5432.

---

## 11\. Deploying Code Changes

When updating your application, push the changes to your Git repository and then pull them on the server.

On your local machine, make changes and push them:

```
# Edit your code (e.g., app/main.py)
git add --all
git commit -m "Update Hello World message"
git push origin main
```

On your production server:

1.  Navigate to your application source directory:

    ```
    cd ~/app/src
    ```

2.  Pull the latest changes:

    ```
    git pull
    ```

3.  Restart the API service to apply the changes:

    ```
    sudo systemctl restart api.service
    ```

Reload your browser (or use an HTTP client) to verify that the updates are active.

---

## 12\. Summary

Your FastAPI deployment is now fully configured and running:

- Your Ubuntu server is updated and ready.
- Python, Virtualenv, and PostgreSQL are installed and configured.
- The FastAPI application runs on Gunicorn, managed by systemd for automatic restarts.
- Nginx functions as a reverse proxy and is secured with a Let’s Encrypt SSL certificate.
- UFW ensures only necessary ports (HTTP, HTTPS, SSH, etc.) are exposed.
- Code updates can be deployed using Git followed by a service restart.

This setup improves performance, enhances security, and provides a robust production environment for your FastAPI application.

![The image shows the pgAdmin interface with a "Create - Server" dialog open, where connection details for a PostgreSQL server are being configured.](https://kodekloud.com/kk-media/image/upload/v1752883408/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/pgadmin-create-server-dialog.jpg)

![The image shows a Swagger UI interface displaying various API endpoints for managing posts and users, including GET, POST, PUT, and DELETE methods. Each endpoint is color-coded and includes options for creating, retrieving, updating, and deleting posts and users.](https://kodekloud.com/kk-media/image/upload/v1752883409/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/swagger-ui-api-endpoints-posts-users.jpg)

![The image shows a FastAPI Swagger UI interface displaying various HTTP methods (GET, POST, PUT, DELETE) for managing posts. It includes options to get, create, update, and delete posts.](https://kodekloud.com/kk-media/image/upload/v1752883413/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/fastapi-swagger-http-methods-posts.jpg)

![The image shows a diagram explaining how NGINX acts as a high-performance web server and proxy, handling SSL termination and forwarding HTTP requests to Gunicorn workers.](https://kodekloud.com/kk-media/image/upload/v1752883418/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/nginx-web-server-proxy-diagram.jpg)

![The image shows a webpage with instructions on how to configure domain name servers using Namecheap and 1&1 registrars. It includes screenshots of the interface and step-by-step guidance.](https://kodekloud.com/kk-media/image/upload/v1752883421/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Ubuntu-VM/domain-name-server-configuration-guide.jpg)

---

By following these comprehensive steps, you have successfully deployed your FastAPI application using an Ubuntu VM, DigitalOcean Droplets, Gunicorn, Nginx, and Let's Encrypt SSL. In upcoming guides, we will explore how to automate code updates via a CI/CD pipeline to further streamline your deployment process.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1af49f64-16e1-4559-841f-4b684c6a8f15/lesson/ae4d8123-2665-4064-bee5-01835bec331a)**
>
> Watch video content
