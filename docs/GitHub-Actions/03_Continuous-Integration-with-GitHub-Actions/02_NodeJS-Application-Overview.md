# NodeJS Application Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/NodeJS-Application-Overview)

---

## Table of Contents

- NodeJS Application Overview
  - What Is Node.js?
  - Prerequisites
  - Sample Project Structure
  - Installing Dependencies
  - Running Your Tests
  - Starting the Application
  - GitHub Actions Workflow
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# NodeJS Application Overview

In this guide, you’ll learn what Node.js is and how to set up, test, and run a simple “Hello World” application. We’ll also show you how to integrate this Node.js project into a custom [GitHub Actions](https://docs.github.com/en/actions) workflow for continuous integration.

## What Is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime built on Chrome’s [V8 engine](https://v8.dev). It enables you to run JavaScript on the server side, unifying your front-end and back-end development in a single language. Installing Node.js also provides npm (Node Package Manager) for managing your dependencies.

> [!important]
> **Why Choose Node.js?**
>
> - High performance with non-blocking I/O
> - Vast ecosystem via `npm`
> - Single language for client and server

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine.

```
node -v    # e.g., v18.16.0
npm -v     # e.g., 9.8.1
```

> [!important]
> **Compatibility Warning**
>
> Always verify that your CI/CD environment (like GitHub Actions) uses the same Node.js version as your local setup to avoid inconsistencies.

## Sample Project Structure

Below is a minimal Node.js project that returns “Hello World” from a `/hello` endpoint.

| File         | Purpose                                                        |
| ------------ | -------------------------------------------------------------- |
| package.json | Metadata (name, version), dependencies, and script definitions |
| index.js     | Main application file (defines server and routes)              |
| test.js      | Simple test suite to verify the logic in `index.js`            |

## Installing Dependencies

Install all required packages listed in `package.json`:

```
npm install
```

On success, npm generates a `node_modules` directory containing your project’s dependencies.

## Running Your Tests

Run the test suite defined in `test.js`:

```
npm test
```

Expected output:

```
> my-app@1.0.0 test
> node test.js

Testing is successful
```

## Starting the Application

Launch the server:

```
npm start
```

You’ll see:

```
> my-app@1.0.0 start
> node index.js

App listening on port 3000
```

In another terminal or your browser, request the `/hello` endpoint:

```
curl http://localhost:3000/hello
# Hello World!
```

## GitHub Actions Workflow

Automate your CI/CD pipeline by adding a workflow file at `.github/workflows/ci.yml`:

```
name: Node.js CI

on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Start application
        run: npm start
```

## Links and References

- [Node.js Official Website](https://nodejs.org/)
- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [V8 JavaScript Engine](https://v8.dev/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/26afff18-d33c-4607-8e8e-130ceb4f4d1a)**
>
> Watch video content
