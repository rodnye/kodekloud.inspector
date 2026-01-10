# Using if expressions with Step contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Using-if-expressions-with-Step-contexts)

---

## Table of Contents

- Using if expressions with Step contexts
  - Initial Workflow
  - Simulating a Failing Test
  - Understanding Step Contexts
  - Assigning an ID to the Testing Step
  - Status Check Functions
  - Conditional Archive Step
  - Links and References
  - Watch Video
  - Practice Lab
    - 1. Archive Only on Failure
    - 2. Archive on Every Run

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Using if expressions with Step contexts

Learn how to control step execution based on the outcome of previous steps. In this guide, we’ll update a Unit Testing workflow so that the **Archive Test Result** step runs regardless of test success or failure.

## Initial Workflow

Our current Unit Testing job runs on Node.js v18 and v20 across Ubuntu and macOS. If any step fails, subsequent steps (like archiving test results) are skipped:

```
name: Unit Testing
strategy:
  matrix:
    nodejs_version: [18, 20]
    operating_system: [ubuntu-latest, macos-latest]
    exclude:
      - nodejs_version: 18
        operating_system: macos-latest
runs-on: ${{ matrix.operating_system }}
steps:
  - name: Checkout Repository
    uses: actions/checkout@v4


  - name: Setup Node.js ${{ matrix.nodejs_version }}
    uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.nodejs_version }}


  - name: Install Dependencies
    run: npm install


  - name: Unit Testing
    run: npm test


  - name: Archive Test Result
    uses: actions/upload-artifact@v3
    with:
      name: Mocha-Test-Result
      path: test-results.xml
```

## Simulating a Failing Test

Modify `app-test.js` to introduce an assertion error and force a failure:

```
// app-test.js
let mongoose = require("mongoose");
let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");


chai.should();
chai.use(chaiHttp);


describe("Planets API Suite", () => {
  describe("Fetching Planet Details", () => {
    it("it should fetch a planet named Mercury", (done) => {
      let payload = { id: 1 };
      chai.request(server)
        .post("/planet")
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          // Intentional error to force a failure:
          res.body.should.have.property("name").eql("Mercury_ERRORRRRRRRRRR");
          done();
        });
    });


    it("it should fetch a planet named Venus", (done) => {
      let payload = { id: 2 };
      chai.request(server)
        .post("/planet")
        .send(payload)
        .end((err, res) => {
          done();
        });
    });
  });
});
```

After pushing this change, the workflow fails at the Unit Testing step:

![The image shows a GitHub Actions workflow summary with a failed status, indicating that unit testing jobs did not pass.](https://kodekloud.com/kk-media/image/upload/v1752876522/notes-assets/images/GitHub-Actions-Using-if-expressions-with-Step-contexts/github-actions-workflow-failed-status.jpg)

```
$ npm test
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit


Server successfully running on port - 3000
Error: Process completed with exit code 1.
```

Because the test step failed, the **Archive Test Result** step never runs and no XML artifact is produced.

## Understanding Step Contexts

GitHub Actions exposes a `steps` context to examine the outcome of previous steps. Each step can have properties like `outcome`, `conclusion`, and custom `outputs` accessible by its `id`.

> [!important]
> **Note**
>
> You can learn more about contexts in the official docs:
> [Contexts documentation](https://docs.github.com/en/actions/learn-github-actions/contexts)

![The image shows a GitHub Docs page about "Contexts" in GitHub Actions, explaining how to access context information in workflows and actions. It includes a sidebar with navigation links and a warning about security considerations.](https://kodekloud.com/kk-media/image/upload/v1752876523/notes-assets/images/GitHub-Actions-Using-if-expressions-with-Step-contexts/github-actions-contexts-docs-page.jpg)

![The image shows a GitHub Docs page about the "steps context" in GitHub Actions, detailing properties like outputs and conclusions for job steps.](https://kodekloud.com/kk-media/image/upload/v1752876525/notes-assets/images/GitHub-Actions-Using-if-expressions-with-Step-contexts/github-actions-steps-context-docs.jpg)

Reference a step property like this:

```
${{ steps.<step-id>.<property> }}
```

## Assigning an ID to the Testing Step

Give your test step an `id` so other steps can refer to it:

```
- name: Unit Testing
  id: nodejs-unit-testing
  run: npm test
```

## Status Check Functions

Use built-in functions to control when steps run:

| Function    | Description                                             |
| ----------- | ------------------------------------------------------- |
| `success()` | Only if all previous steps and jobs succeeded (default) |
| `failure()` | Only if a previous step or job failed                   |
| `always()`  | Run regardless of the outcome of previous steps or jobs |

Learn more in the GitHub Actions expressions guide: [Evaluating expressions](https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions)

![The image shows a GitHub Docs page about evaluating expressions in workflows and actions, with navigation links on the left and a content section on the right.](https://kodekloud.com/kk-media/image/upload/v1752876526/notes-assets/images/GitHub-Actions-Using-if-expressions-with-Step-contexts/github-docs-evaluating-expressions-workflows.jpg)

## Conditional Archive Step

### 1\. Archive Only on Failure

To upload artifacts only when tests fail:

```
- name: Archive Test Result
  if: failure() && steps.nodejs-unit-testing.outcome == 'failure'
  uses: actions/upload-artifact@v3
  with:
    name: Mocha-Test-Result
    path: test-results.xml
```

This runs the archive step when the testing step fails:

![The image shows a GitHub Actions workflow in progress, with unit testing and code coverage jobs being executed. Some unit tests have failed, as indicated by red and yellow status icons.](https://kodekloud.com/kk-media/image/upload/v1752876527/notes-assets/images/GitHub-Actions-Using-if-expressions-with-Step-contexts/github-actions-workflow-unit-testing.jpg)

![The image shows a GitHub Actions interface with a failed unit testing job on Ubuntu, displaying error logs and details about artifact uploads.](https://kodekloud.com/kk-media/image/upload/v1752876528/notes-assets/images/GitHub-Actions-Using-if-expressions-with-Step-contexts/github-actions-failed-job-ubuntu.jpg)

### 2\. Archive on Every Run

If you want the test results available on both success and failure, use `always()`:

```
steps:
  - name: Checkout Repository
    uses: actions/checkout@v4


  - name: Setup Node.js ${{ matrix.nodejs_version }}
    uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.nodejs_version }}


  - name: Install Dependencies
    run: npm install


  - name: Unit Testing
    id: nodejs-unit-testing
    run: npm test


  - name: Archive Test Result
    if: always()
    uses: actions/upload-artifact@v3
    with:
      name: Mocha-Test-Result
      path: test-results.xml
```

On a successful run, archiving still occurs:

![The image shows a GitHub Actions workflow interface with a unit testing job for Ubuntu, displaying a list of completed steps in the job.](https://kodekloud.com/kk-media/image/upload/v1752876529/notes-assets/images/GitHub-Actions-Using-if-expressions-with-Step-contexts/github-actions-workflow-ubuntu-testing.jpg)

## Links and References

- [Contexts documentation](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [Evaluating expressions](https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/2b6e94bf-6b9d-4719-bc6e-bb68645767c2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/452a1eb5-85af-41a4-bd64-961db5f1674e)**
>
> Practice lab
