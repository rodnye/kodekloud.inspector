# Apache Tomcat - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Web-Server/Apache-Tomcat)

---

## Table of Contents

- Apache Tomcat
  - Installing Apache Tomcat on CentOS
  - Exploring the Tomcat Directory Structure
  - Deploying a Web Application
  - Conclusion
  - Watch Video
  - Practice Lab
    - Key Directories
    - 1. Package Your Application
    - 2. Deploy the WAR File
    - 3. Verify the Deployment

---

## Content

DevOps Pre-Requisite Course

Web Server

# Apache Tomcat

In this article, we will explore Apache Tomcat, a popular web server and servlet container primarily used to host Java-based web applications. Before beginning, ensure that Java is installed on your system.

> [!important]
> **Prerequisite**
>
> Ensure that Java is installed on your system before proceeding with the Tomcat installation.

## Installing Apache Tomcat on CentOS

Follow these steps to install Apache Tomcat on a CentOS machine. In a production environment, it's recommended to create dedicated users for Tomcat and configure it as a service.

1.  Install Java:

    ```
    yum install java-1.8.0-openjdk-devel
    ```

2.  Download the Tomcat package:

    ```
    wget https://downloads.apache.org/tomcat/tomcat-8/v8.5.53/bin/apache-tomcat-8.5.53.tar.gz
    ```

3.  Extract the package:

    ```
    tar xvf apache-tomcat-8.5.53.tar.gz
    ```

4.  Start Tomcat using the startup script in the bin directory:

    ```
    ./apache-tomcat-8.5.53/bin/startup.sh
    ```

After the server starts, open your web browser and navigate to port 8080 on your host. You should see the default Apache Tomcat welcome page:

![The image shows a browser displaying the Apache Tomcat 8.5.53 welcome page, indicating successful installation on localhost:8080.](https://kodekloud.com/kk-media/image/upload/v1752873524/notes-assets/images/DevOps-Pre-Requisite-Course-Apache-Tomcat/frame_90.jpg)

---

## Exploring the Tomcat Directory Structure

After extracting the Tomcat package, examine its directory structure with the following command:

```
ls -l apache-tomcat-8.5.53
```

Example output:

```
-rw-r-----  1 19318 Mar 11 10:06 BUILDING.txt
-rw-r-----  1  5408 Mar 11 10:06 CONTRIBUTING.md
-rw-r-----  1 57011 Mar 11 10:06 LICENSE
-rw-r-----  1  1726 Mar 11 10:06 NOTICE
-rw-r-----  1  3255 Mar 11 10:06 README.md
-rw-r-----  1  7136 Mar 11 10:06 RELEASE-NOTES
-rw-r-----  1 16262 Mar 11 10:06 RUNNING.txt
drwxr-x---  2  4096 Mar 18 10:17 bin
drwxr-x---  2  4096 Mar 18 10:06 conf
drwxr-x---  2  4096 Mar 11 10:03 lib
drwxr-x---  7  4096 Mar 11 10:04 logs
drwxr-x---  2  4096 Mar 11 10:03 temp
drwxr-x---  2  4096 Mar 11 10:03 webapps
drwxr-x---  2  4096 Mar 11 10:03 work
```

### Key Directories

- **bin**: Contains scripts for starting and stopping Tomcat. Windows users should use the `.bat` files, while Unix/Linux users should use the `.sh` scripts.
- **conf**: Contains essential configuration files such as `server.xml` and `web.xml`. The `server.xml` file defines the "Connector" element that sets the port (default is 8080) on which Tomcat listens. Any changes require a restart of the service.
- **logs**: Stores server logs.
- **webapps**: The default deployment directory for web applications. Placing a WAR file here triggers automatic extraction and deployment.
- **lib**, **temp**, and **work**: Manage libraries, temporary files, and work data respectively.

Below is an excerpt from the `server.xml` file demonstrating how connectors are configured:

```
<!-- A "Connector" represents an endpoint for receiving requests and returning responses.
     For details on connectors, see the [Java HTTP Connector documentation](/docs/connectors/)
     and the [Java AJP Connector documentation](/docs/apr/).
-->
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />


<!-- A "Connector" using the shared executor -->
<Connector executor="tomcatThreadPool"
           port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```

---

## Deploying a Web Application

Deploying a web application on Tomcat is straightforward. Follow these steps:

### 1\. Package Your Application

First, package your application's source code into a WAR file. You can use the `jar` utility or build tools such as Maven or Gradle:

```
jar -cvf app.war *
mvn package
gradle build
```

### 2\. Deploy the WAR File

Copy the WAR file (e.g., `app.war`) to the **webapps** directory of your Tomcat server. If Tomcat is running, it will automatically detect the new file, extract it, and deploy the application into a folder corresponding to the WAR file name (for example, `/app`).

### 3\. Verify the Deployment

To confirm deployment, review the Tomcat logs located in the **logs** directory. Check the contents of `catalina.out` with:

```
cat ~/apache-tomcat-8.5.53/logs/catalina.out
```

Example log output:

```
18-Mar-2020 10:43:32.769 INFO [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/vagrant/apache-tomcat-8.5.53/webapps/ROOT] has finished in [13] ms
18-Mar-2020 10:43:32.783 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/vagrant/apache-tomcat-8.5.53/webapps/manager] has finished in [14] ms
18-Mar-2020 10:43:32.789 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
18-Mar-2020 10:43:32.789 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 407 ms
18-Mar-2020 11:21:23.560 INFO [localhost-startStop-2] org.apache.catalina.startup.HostConfig.deployWAR Deployment of web application archive [/home/vagrant/apache-tomcat-8.5.53/webapps/app.war] has finished in [57] ms
```

Once deployed, access your application by navigating to:

http://your-hostname:8080/app

For example, if your application displays a "Hello, World" message, its homepage will appear similar to the following:

![A browser displays a "Sample 'Hello, World' Application" webpage with links to a JSP page and a servlet, featuring a cat logo.](https://kodekloud.com/kk-media/image/upload/v1752873525/notes-assets/images/DevOps-Pre-Requisite-Course-Apache-Tomcat/frame_310.jpg)

---

## Conclusion

This guide provided an overview of installing Apache Tomcat, exploring its directory structure, and deploying a web application. Make sure to implement additional security measures, performance tuning, and service management configurations when deploying in production environments.

> [!important]
> **Further Considerations**
>
> In production, always review and apply best practices for security and performance optimization to ensure a robust deployment.

Happy deploying, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/2959e80a-c5a2-4a9b-8b39-695422114a97)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/5c1cab66-71da-4594-9e30-a976306525a0)**
>
> Practice lab
