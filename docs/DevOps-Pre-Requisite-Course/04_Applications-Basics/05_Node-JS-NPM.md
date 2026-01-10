# Node JS NPM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Applications-Basics/Node-JS-NPM)

---

## Table of Contents

- Node JS NPM
  - Introduction to Packages and Dependencies
  - Local vs. Global Package Installation
  - Built-in vs. External Modules
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Applications Basics

# Node JS NPM

In this article, we explore the fundamentals of Node.js package management. Understanding how to work with libraries, dependencies, and the npm (Node Package Manager) tool is essential for a smooth development experience. Efficient package management helps prevent deployment issues such as dependency errors, missing libraries, or version mismatches.

## Introduction to Packages and Dependencies

Node.js offers a diverse ecosystem of modules maintained by both the core team and the global community. These packages cover a wide array of functionalities—from file operations and web servers to database interactions and security measures—and are hosted on [npmjs.com](https://www.npmjs.com). The npm tool, automatically installed with Node.js, empowers developers to create, share, and install these packages seamlessly.

To verify the version of your npm CLI utility, run:

```
npm -v
```

The output may look similar to:

```
6.13.7
```

You can search for packages using the `npm search` command. For instance, searching for a package related to file operations might yield:

```
npm search file
NAME        | DESCRIPTION            | AUTHOR          | DATE
file        | Higher level path…     | =aconbere       | 2014-02-21
File        | HTML5 FileAPI…         | =coolaj86 =narf | 2014-10-24
dotenv      | Loads environment…     | =jcbwl…        | 2019-10-16
fs-extra    | fs-extra contains…     | =jprichardson…  | 2019-06-28
file-loader | A file loader…         | =d3viant0ne…   | 2020-02-19
```

Once you identify the desired package, install it using:

```
npm install file
```

This command creates a directory named `node_modules` in your current working directory, where the package files (including the license, README, and module code typically in a subdirectory like `lib`) are stored. Each package also comes with a `package.json` file that contains valuable metadata such as the package name, version, author details, and repository URL. This metadata can be instrumental in troubleshooting and managing dependencies.

Below is an example of a typical `package.json` file:

```
{
  "author": {
    "name": "Anders Conbere",
    "email": "aconbere@gmail.com"
  },
  "bundleDependencies": false,
  "devDependencies": {
    "mocha": "1.9.x"
  },
  "directories": {
    "lib": "lib"
  },
  "homepage": "https://github.com/aconbere/node-file-utils#readme",
  "license": "MIT",
  "main": "./lib/file",
  "name": "file",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/aconbere/node-file-utils.git"
  },
  "tags": [
    "file",
    "file",
    "path",
    "fs",
    "walk"
  ],
  "version": "0.2.2"
}
```

> [!important]
> **Note**
>
> Always review the `package.json` file of external packages to ensure compatibility and to understand their dependency requirements.

## Local vs. Global Package Installation

Packages can be installed either locally within your application directory or globally across your system.

- **Local Installation:** Running `npm install` without additional options installs the package locally. For example, if your main application file is `app.js`, you can import and use the package as follows:

  ```
  var file = require("file");
  file.mkdirs("/tmp/dir1");
  ```

  When Node.js executes the code, it first looks for the module in the local `node_modules` directory. If it isn’t present, it then checks the global modules path.

- **Global Installation:** To install a package globally (making it available system-wide), use the `-g` option:

  ```
  npm install -g <package-name>
  ```

> [!important]
> **Tip**
>
> Use global installations for command-line tools that you wish to run from any directory, not for libraries that are part of your application.

To inspect the list of module paths Node.js checks during the import process, you can examine the `module.paths` configuration.

## Built-in vs. External Modules

Node.js includes several built-in modules that are automatically installed with the runtime. These include modules for file system operations, HTTP server creation, and operating system utilities. Typically, these built-in modules are located in `/usr/lib/node_modules` on Linux systems.

For example, to list the built-in npm modules, you might run:

```
ls /usr/lib/node_modules/npm/node_modules/
```

In contrast, external modules (like Express for web frameworks, React for building UIs, and Debug for logging) need to be installed via npm. These modules, along with their dependencies, are documented in your application's `package.json` file. Below is an example illustrating such a dependency list:

```
{
  "name": "example-contentful-theExampleApp-js",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "body-parser": "^1.18.2",
    "contentful": "^6.0.0",
    "cookie-parser": "~1.4.3",
    "dotenv": "^5.0.0",
    "execa": "^0.9.0",
    "express": "^16.2",
    "helmet": "^3.11.0",
    "lodash": "^4.17.5",
    "marked": "^0.3.16",
    "morgan": "^1.9.1",
    "pug": "~2.0.0-beta6"
  }
}
```

Maintaining accurate version information in the `package.json` file is crucial for ensuring consistent application behavior across different environments.

## Conclusion

This guide provided an in-depth look at managing packages and dependencies in Node.js using npm. We have discussed:

- How to search for and install packages locally and globally.
- The role and structure of the `package.json` file.
- The key differences between built-in and external modules.

With these insights, you're now better equipped to manage dependencies in your Node.js projects confidently and efficiently.

For more detailed information, consider visiting the [Node.js Documentation](https://nodejs.org/en/docs/) and the [npm Documentation](https://docs.npmjs.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/a5d6e27e-ff0b-4f9a-b2b8-d2db47dfb8d7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/557587fb-2426-48db-89c1-aee5d2e27681)**
>
> Practice lab
