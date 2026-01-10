# NodeJS Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Applications-Basics/NodeJS-Introduction)

---

## Table of Contents

- NodeJS Introduction
  - Related Links
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Applications Basics

# NodeJS Introduction

This article provides an introduction to Node.js, explains its role in modern full-stack development, and briefly reviews the evolution of JavaScript. Initially, web pages were simple—mainly consisting of text links, basic HTML code, and a few images with minimal CSS-based styling.

![The image shows an old Amazon.com webpage from 1999, featuring categories like books, music, and electronics, with a simple layout and navigation menu.](https://kodekloud.com/kk-media/image/upload/v1752873414/notes-assets/images/DevOps-Pre-Requisite-Course-NodeJS-Introduction/frame_20.jpg)

JavaScript transformed web development by enabling interactive and dynamic web pages. With JavaScript, developers built features like calculators, animations, games, and dynamic graphs directly in the browser. This innovation led to the emergence of popular client-side frameworks such as jQuery, AngularJS, ReactJS, VueJS, EmberJS, and BackboneJS. These frameworks run on the client side—executing code on the users’ systems—while the back-end was traditionally handled by languages like Java, Python, or Ruby.

Node.js revolutionized this landscape by allowing JavaScript to run on the server side. This means developers can now build full-stack applications using JavaScript alone, unifying client-side and server-side development. Node.js is a server-side JavaScript environment that efficiently handles a large number of concurrent connections through its non-blocking I/O model. Moreover, it is open-source, free, and compatible with multiple platforms, including Windows, Linux, Unix, and macOS.

![The image is about NodeJS, highlighting its features as free, open-source, and cross-platform compatible, with a list of its versions from 13.x to 0.10.x.](https://kodekloud.com/kk-media/image/upload/v1752873415/notes-assets/images/DevOps-Pre-Requisite-Course-NodeJS-Introduction/frame_120.jpg)

> [!important]
> **Further Reading**
>
> For detailed installation instructions and comprehensive documentation, visit the [official Node.js documentation](https://nodejs.org/en/docs/).

As of this recording, the latest Node.js version is 13. For Linux users, the [NodeSource repository](https://github.com/nodesource/distributions) offers binary distributions for a variety of flavors. Below is an example of how to install Node.js on CentOS.

First, add the repository for Node.js and then execute the following command to complete the installation:

![The image shows instructions for installing NodeJS using NodeSource binary distributions, compatible with Debian, Ubuntu, Red Hat, CentOS, and Fedora operating systems.](https://kodekloud.com/kk-media/image/upload/v1752873416/notes-assets/images/DevOps-Pre-Requisite-Course-NodeJS-Introduction/frame_170.jpg)

Once Node.js is installed, verify the installation using the command-line utility:

```
node -v
```

The command should output something similar to:

```
V13.10.1
```

Next, run a simple Node.js application to see it in action:

```
node add.js
```

Expected output:

```
Addition : 15
```

Below is the content of the sample "add.js" file:

```
// Returns the addition of two numbers
let add = function(a, b) {
    return a + b;
};


const a = 10, b = 5;


console.log("Addition : " + add(a, b));
```

This article focuses on deploying a Node.js application using pre-existing code. For further practice, try installing Node.js and running a simple application on your local machine.

> [!important]
> **Next Steps**
>
> In the next article, we will explore additional Node.js features and dive deeper into package management. Stay tuned for more advanced topics and best practices.

## Related Links

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [NodeSource Distributions](https://github.com/nodesource/distributions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/39692bf1-044a-44a2-a5de-f39acb9337e1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/f84d369f-f130-4bb9-945e-af80970a40e0)**
>
> Practice lab
