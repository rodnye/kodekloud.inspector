# Demo Copilot Chat - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/GitHub-Copilot-Basics/Demo-Copilot-Chat)

---

## Table of Contents

- Demo Copilot Chat
  - Scaffolding a Node.js REST API
  - Using /new to Scaffold Files
  - Adding package.json and Splitting into app.js
  - Generating Tests
  - Installing and Running
  - Working Set & Context
  - Key Slash Commands
  - Generating Documentation
  - Switching AI Models
  - Links and References
  - Watch Video

---

## Content

GitHub Copilot Certification

GitHub Copilot Basics

# Demo Copilot Chat

Explore how [GitHub Copilot Chat](https://docs.github.com/en/code-security/copilot/copilot-chat) can scaffold, debug, and document a **Node.js** REST API using slash commands and contextual understanding.

---

## Scaffolding a Node.js REST API

Start by asking Copilot Chat to generate a minimal **Express** server with an in-memory users database (`id`, `firstName`, `lastName`, `email`). It instantly produces `server.js`:

```
// server.js
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;


app.use(bodyParser.json());


let database = [];
let idCounter = 1;


// Retrieve all users
app.get('/users', (req, res) => {
  res.json(database);
});


// Retrieve a user by ID
app.get('/users/:id', (req, res) => {
  const user = database.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});


// Create a new user
app.post('/users', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = { id: idCounter++, firstName, lastName, email };
  database.push(newUser);
  res.status(201).json(newUser);
});


// Update an existing user
app.put('/users/:id', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = database.find(u => u.id === parseInt(req.params.id));
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

---

## Using `/new` to Scaffold Files

Instead of manually writing the code, use the `/new` slash command to bootstrap an entire project:

```
/new create a Node application API
```

Copilot Chat generates an `index.js` with a standard **Express** setup:

```
// index.js
const express = require('express');


const app = express();
const port = 3000;


app.use(express.json());


let users = [];


// Create a new user
app.post('/users', (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  const newUser = { id, firstName, lastName, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});


// Get a single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

> [!important]
> **Note**
>
> You can tailor the `/new` command with additional options (e.g., include TypeScript or middleware) to fit your project needs.

---

## Adding package.json and Splitting into app.js

To turn this into a maintainable **Node.js** application, Copilot Chat introduces a `package.json` and refactors the server:

```
// package.json
{
  "name": "weatherdemo",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "supertest": "^6.1.3"
  }
}
```

Now `index.js` simply starts the server:

```
// index.js
const app = require('./app');
const port = 3000;


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

And `app.js` holds all request handlers:

```
// app.js
const express = require('express');
const app = express();


app.use(express.json());


let users = [];


// Create user
app.post('/users', (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  const newUser = { id, firstName, lastName, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


// List users
app.get('/users', (req, res) => {
  res.json(users);
});


// Get user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});


// Delete user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});


module.exports = app;
```

---

## Generating Tests

Copilot Chat can scaffold a comprehensive test suite with **Jest** and **Supertest**:

```
// __tests__/app.test.js
const request = require('supertest');
const app = require('../app');


describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id', 1);
  });


  it('should retrieve all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });


  it('should retrieve a user by ID', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });


  it('should delete a user and return 404 on next fetch', async () => {
    await request(app).delete('/users/1');
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(404);
  });
});
```

---

## Installing and Running

1.  Install dependencies:

    ```
    npm install
    ```

2.  Start the server:

    ```
    npm start
    ```

    You’ll see:

    ```
    > weatherdemo@1.0.0 start
    > node index.js


    Server is running on http://localhost:3000
    ```

3.  Test your API endpoints:
    - **GET** http://localhost:3000/users → `[]`
    - **POST** http://localhost:3000/users (JSON payload) → creates a user

---

## Working Set & Context

Copilot Chat leverages your **working set**—open files, recent edits, tests, and terminal output—to deliver contextual suggestions and reduce manual highlighting.

---

## Key Slash Commands

| Command                  | Description                                                         | Example                                     |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------- |
| `/new`                   | Scaffold new files or entire projects                               | `/new create a Node.js REST API`            |
| `/fix`                   | Apply fixes to selected code or entire file                         | Highlight code, run `/fix`                  |
| `/terminal last command` | Explain your last shell command and its output                      | `/terminal last command`                    |
| `/terminal selection`    | Analyze a selected block of terminal output                         | Highlight output, run `/terminal selection` |
| `#` (hashtag)            | Attach context tags like `#changes`, `#codebase`, `#file selection` | Use `#changes` in your prompt               |
| `/help`                  | Show usage tips based on the current editor file                    | `/help`                                     |
| `/clear`                 | Clear the current conversation                                      | `/clear`                                    |

---

## Generating Documentation

Easily ask Copilot Chat to generate API docs without manual comments:

```
/**
 * @api {get} /users Retrieve all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users List of user objects.
 * @apiSuccess {Number} id User’s unique ID.
 * @apiSuccess {String} firstName First name.
 * @apiSuccess {String} lastName Last name.
 * @apiSuccess {String} email Email address.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       { "id": 1, "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com" }
 *     ]
 */
app.get('/users', (req, res) => { … });
```

---

## Switching AI Models

You can toggle between backends (e.g., ChatGPT-4, Claude) via the model dropdown in Copilot Chat to find the best fit for your workflow.

---

## Links and References

- [GitHub Copilot Chat](https://docs.github.com/en/code-security/copilot/copilot-chat)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Official Site](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/3d32a217-aca3-450a-882e-c9304c497387/lesson/15bdb476-3632-42fb-abda-ac6b71fd12a8)**
>
> Watch video content
