# IPs and Ports - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Web-Server/IPs-and-Ports)

---

## Table of Contents

- IPs and Ports
  - Network Interfaces and IP Addresses
  - Ports and Application Endpoints
  - The Loopback Interface and Local Testing
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Web Server

# IPs and Ports

In this lesson, we explore the fundamentals of IP addresses and ports from a web application perspective. Beginners frequently encounter connectivity issues, such as:

• Which IP addresses should be used and what do port numbers represent?  
• What distinguishes the localhost (127.0.0.1) from a server’s public IP address?  
• Why might a system fail to reach a web server running on another host?  
• When both a web server and a database server are deployed, why might communication between them fail?

This guide demystifies these concepts so you can troubleshoot and resolve network issues with confidence.

---

## Network Interfaces and IP Addresses

Every computer—whether it’s a laptop or a server—features one or more network interfaces (adapters). Examples include wired Ethernet and wireless (Wi-Fi) adapters. When your device connects to a network, each interface receives its own IP address. For instance, connecting your laptop to a network switch with an Ethernet cable might assign it an IP address like 10.0.2.15.

To view details about your network interfaces, run:

```
ip addr show
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qlen 1000
    state UP group default qlen 1000
    link/ether 02:00:0c:9a:00:f0 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global enp0s3
```

If you later attach a Wi-Fi adapter, it will obtain its own IP address. The output might then resemble:

```
ip addr show
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qlen 1000
    state UP group default qlen 1000
    link/ether 02:0e:0c:9a:00:f0 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global enp0s3
3: wlp0s2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qlen 1000
    state UP group default qlen 1000
    link/ether dc:fb:48:dd:4b:4f brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.16/24 brd 10.0.2.255 scope global wlp0s2
```

In this scenario, the laptop has two distinct IP addresses on the same network. Other systems can use either address to reach your device.

---

## Ports and Application Endpoints

Every network interface supports up to 65,535 ports. Think of ports as unique communication endpoints that allow services like web servers to operate concurrently. For example, a Python Flask web server listens on port 5000 by default.

You can change the port by specifying it during the application’s runtime. Consider the following simple Flask application:

```
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run()  # By default, Flask uses port 5000
```

To configure the application to run on port 8000, pass the port number as a parameter. With multiple IP addresses in your host, you must also decide which interface will serve the web application. For example, bind the server to IP address 10.0.2.15 on port 8000 with:

```
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(port=8000, host='10.0.2.15')
```

This setup ensures that only requests sent to 10.0.2.15 on port 8000 are processed. To allow connections via any interface, use 0.0.0.0:

```
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(port=8000, host='0.0.0.0')
```

This configuration instructs the server to listen on all network interfaces, enabling it to receive requests regardless of the specific IP used.

For development or testing scenarios where access should be limited to your machine, bind the server to the loopback interface (127.0.0.1):

```
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(port=8000, host='127.0.0.1')
```

> [!important]
> **Local Development Tip**
>
> Binding to 127.0.0.1 ensures that your application is secure and only accessible from your own machine during development.

---

## The Loopback Interface and Local Testing

Every host includes a built-in virtual interface known as the loopback interface, which always uses the IP address 127.0.0.1. When you access 127.0.0.1 (or “localhost”), you are communicating with your own system. Importantly, traffic sent to this address does not leave your computer.

To check the loopback interface details, run:

```
ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noop state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 02:0e:0c:9a:00:f0 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic enp0s3
       valid_lft 860sec preferred_lft 860sec
3: wlp0s2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether dc:fb:48:dd:4b:4f brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.16/24 brd 10.0.2.255 scope global dynamic wlp0s2
       valid_lft 860sec preferred_lft 860sec
```

During testing, you can simply use “localhost” in your browser rather than the loopback IP address. Keep in mind, however, that the loopback interface is only accessible from within the same host. Attempting to access a server bound to 127.0.0.1 from another device will result in a connection failure.

For example, running:

```
ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 02:0c:9a:00:f0 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic enp0s3
3: wlp0s2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether dc:fb:48:dd:4b:4f brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.16/24 brd 10.0.2.255 scope global dynamic wlp0s2
```

illustrates that a server running on localhost is only reachable from the same machine. Attempts to access it from other devices will not work.

![The image illustrates network ports and IP addresses, showing successful and unsuccessful connections to localhost on different devices.](https://kodekloud.com/kk-media/image/upload/v1752873527/notes-assets/images/DevOps-Pre-Requisite-Course-IPs-and-Ports/frame_410.jpg)

> [!important]
> **Important**
>
> Remember: The loopback interface (127.0.0.1) is strictly for local testing. Accessing it from a different host will lead to connection errors.

---

That concludes this lesson on IP addresses and ports. Practice using different network configurations to solidify your understanding, and explore related topics in subsequent lessons. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/763502df-84db-4e41-8d34-0f056a1bffde)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/9e8083d9-e5f2-4a3e-ad95-72d9f9e41668)**
>
> Practice lab
