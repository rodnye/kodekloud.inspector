# MongoDB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Database-Basics/MongoDB)

---

## Table of Contents

- MongoDB
  - Installing MongoDB
  - Starting the MongoDB Service
  - MongoDB Configuration
  - Interacting with MongoDB Using the mongo Shell
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Database Basics

# MongoDB

In this guide, we introduce MongoDB, a high-performance, scalable NoSQL document database. You will learn what MongoDB is, how to install and configure a MongoDB server, and how to perform basic operations and troubleshooting. MongoDB stores data in JSON-like documents gathered into collections, and multiple collections form a database. A single MongoDB server can host multiple databases. There are two main editions available: the free Community Edition and the commercial Enterprise Edition.

Below are examples of JSON documents demonstrating how data can be structured in MongoDB:

```
{
  "name": "John Doe",
  "age": 45,
  "location": "New York",
  "salary": 5000
}
```

```
{
  "name": "Dave Smith",
  "age": 34,
  "location": "New York",
  "salary": 4000,
  "organization": "ACME"
}
```

```
{
  "name": "Aryan Kumar",
  "age": 10,
  "location": "New York",
  "Grade": "A"
}
```

```
{
  "name": "Lily Oliver",
  "age": 15,
  "location": "Bangalore",
  "Grade": "B"
}
```

```
{
  "name": "Lauren Rob",
  "age": 13,
  "location": "Bangalore",
  "Grade": "C"
}
```

MongoDB is available as a managed cloud service through [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and as an on-premises server. This article focuses on installing a local (on-premises) MongoDB server.

![The image is an informational slide about MongoDB, describing it as a scalable document database available in cloud and server versions.](https://kodekloud.com/kk-media/image/upload/v1752873425/notes-assets/images/DevOps-Pre-Requisite-Course-MongoDB/frame_70.jpg)

> [!important]
> **Edition Selection**
>
> The Community Edition is free and widely used for development and prototyping. The Enterprise Edition offers additional features and support for commercial deployments.

## Installing MongoDB

The first step is configuring your package management system with the MongoDB repository and installing the `mongodb-org` package. Although best practices for user creation and security are available in the official documentation, this guide uses a simplified approach.

For instance, on a system using yum, install MongoDB with:

```
yum install mongodb-org
```

Create a repository file (e.g., `/etc/yum.repos.d/mongodb-org-4.2.repo`) with the content below to configure the MongoDB repository:

```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

![The image shows a MongoDB installation interface, offering options to download the Community Server, select version, OS, and package, with additional resources like release notes.](https://kodekloud.com/kk-media/image/upload/v1752873426/notes-assets/images/DevOps-Pre-Requisite-Course-MongoDB/frame_90.jpg)

## Starting the MongoDB Service

After installation, start the MongoDB system service named `mongod` and verify its status. The main log file is located at `/var/log/mongodb/mongod.log`.

Start MongoDB using:

```
systemctl start mongod
```

Then check the service status:

```
systemctl status mongod
```

A sample output may appear as follows:

```
● mongod.service - MongoDB Database Server
   Loaded: loaded (/usr/lib/systemd/system/mongod.service; enabled; vendor preset: disabled)
   Active: active (running) since Sat 2020-03-21 18:43:53 UTC; 1min 46s ago
     Docs: https://docs.mongodb.org/manual
  Process: 4224 ExecStart=/usr/bin/mongod $OPTIONS (code=exited, status=0/SUCCESS)
  Process: 4222 ExecStartPre=/usr/bin/chmod 0755 /var/run/mongodb (code=exited, status=0/SUCCESS)
  Process: 4220 ExecStartPre=/usr/bin/chown mongodb:mongodb /var/run/mongodb (code=exited, status=0/SUCCESS)
  Process: 4219 ExecStartPre=/usr/bin/mkdir -p /var/run/mongodb (code=exited, status=0/SUCCESS)
 Main PID: 4227 (mongod)
   CGroup: /system.slice/mongod.service
           └─4227 /usr/bin/mongod -f /etc/mongod.conf
```

When MongoDB starts, the log file at `/var/log/mongodb/mongod.log` provides details about the server startup, including the MongoDB version, and indicates that it is listening on port 27017 of the loopback IP address (127.0.0.1). This default setting permits connections only from the local system—a secure default for development that should be adjusted for production environments.

A sample log snippet is shown below:

```
cat /var/log/mongodb/mongod.log
2020-03-21T18:43:52.820+0000 I CONTROL  [main] ***** SERVER RESTARTED *****
2020-03-21T18:43:52.823+0000 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2020-03-21T18:43:52.982+0000 I CONTROL  [initandlisten] MongoDB starting: pid=4227 port=27017
2020-03-21T18:43:52.982+0000 I CONTROL  [initandlisten] db version v4.2.3
2020-03-21T18:43:52.982+0000 I CONTROL  [initandlisten] git version: 6874650b362138d74be53d366bebfc321ea32d4
2020-03-21T18:43:52.982+0000 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.1e-fips 11 Feb 2013
2020-03-21T18:43:52.998+0000 I NETWORK  [listener] Listening on /tmp/mongodb-27017.sock
2020-03-21T18:43:53.521+0000 I NETWORK  [listener] Listening on 127.0.0.1
2020-03-21T18:43:53.521+0000 I NETWORK  [listener] waiting for connections on port 27017
```

## MongoDB Configuration

The MongoDB configuration file (`/etc/mongod.conf`) allows you to modify settings such as port number, storage location, and network bind addresses. Here’s an example configuration:

```
# Where logging data is written.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log


# Settings for data storage.
storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true


# Network interfaces and access settings.
net:
  port: 27017
  bindIp: 127.0.0.1
```

> [!important]
> **Security Reminder**
>
> By default, MongoDB's access control is not enabled. For production environments, ensure you enable authentication and implement proper security measures.

## Interacting with MongoDB Using the mongo Shell

To interact with your MongoDB server, use the mongo shell, which provides a JavaScript interface. Launch the shell with:

```
mongo
```

You should see output similar to this:

```
MongoDB shell version v4.2.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("414e0b56-5125-4389-a47a-7046e1af9a60") }
MongoDB server version: 4.2.3
Server has startup warnings:
2020-03-21T18:43:53.421000 I CONTROL  [initandlisten]
2020-03-21T18:43:53.421000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database,
2020-03-21T18:43:53.421000 I CONTROL  [initandlisten] ** Read and write access to data and configuration is unrestricted.
2020-03-21T18:43:53.421000 I CONTROL  [initandlisten]
mongo>
```

After connecting to the shell, you can explore and manage your databases:

- **List all databases:**

  ```
  mongo> show dbs
  ```

- **Create or switch to a database:**

  ```
  mongo> use school
  ```

- **Confirm the current database:**

  ```
  mongo> db
  school
  ```

- **Create a new collection:**

  ```
  mongo> db.createCollection("persons")
  { "ok" : 1 }
  ```

- **Insert a document into the collection:**

  ```
  mongo> db.persons.insert({ "name": "John Doe", "age": 45, "location": "New York", "salary": 5000 })
  ```

- **Retrieve data from the collection:**

  ```
  mongo> db.persons.find()
  {
      "_id": ObjectId("5e7669bdc314253510d62f5e"),
      "name": "John Doe",
      "age": 45,
      "location": "New York",
      "salary": 5000
  }
  ```

- **Filter documents using query parameters:**

  ```
  mongo> db.persons.find({"name": "John Doe"})
  {
      "_id": ObjectId("5e7669bdc314253510d62f5e"),
      "name": "John Doe",
      "age": 45,
      "location": "New York",
      "salary": 5000
  }
  ```

## Conclusion

This introduction to MongoDB covered the installation of a local MongoDB instance, basic configuration, and common database operations using the mongo shell. Practice these steps to build a solid foundation, then continue exploring advanced MongoDB features and capabilities. Happy coding!

For further information and in-depth tutorials, check out the [MongoDB Documentation](https://docs.mongodb.com/manual/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/5166a1fb-2506-4fa7-81d8-ad176fa067a2/lesson/b8428158-e416-4c30-b354-ac4b59718cad)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/5166a1fb-2506-4fa7-81d8-ad176fa067a2/lesson/de95df34-a059-4385-9d1e-099a68c117ba)**
>
> Practice lab
