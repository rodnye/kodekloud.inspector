# Using if expressions with Step contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Using-if-expressions-with-Step-contexts)

---

## Table of Contents

- Using if expressions with Step contexts
  - 1. Initial Workflow Configuration
  - 2. Simulating a Test Failure
  - 3. Guarding with steps.<id>.outcome
  - 4. Simplifying with always()
  - 5. Quick Reference: Status Functions
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Using if expressions with Step contexts

In this guide, you’ll learn how to use **if-expressions** together with the **steps context** to ensure your test artifacts are always archived—even when a job fails. By assigning IDs to steps and leveraging status functions, you can control exactly when uploads occur, making debugging and reporting much easier.

## 1\. Initial Workflow Configuration

Here’s our starting **Unit Testing** job. It runs tests via `npm test` and then uploads the results:

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


  - name: Archive Test Results
    uses: actions/upload-artifact@v3
    with:
      name: Mocha-Test-Result
      path: test-results.xml
```

> [!important]
> **Note**
>
> By default, when a step fails, all later steps (including uploads) are skipped.

## 2\. Simulating a Test Failure

To demonstrate, we’ll break one of our tests in `app-test.js` so that it fails:

```
// app-test.js
const mongoose = require("mongoose");
const server   = require("../app");
const chai     = require("chai");
const chaiHttp = require("chai-http");


chai.should();
chai.use(chaiHttp);


describe("Planets API Suite", () => {
  describe("Fetching Planet Details", () => {
    it("should fetch a planet named Mercury", (done) => {
      const payload = { id: 1 };
      chai.request(server)
        .post("/planet")
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          // Intentionally wrong expected value
          res.body.should.have.property("name").eql("Mercury_ERROR");
          done();
        });
    });
    // ... other tests ...
  });
});
```

After committing, the **Unit Testing** job fails and the upload step is skipped:

![The image shows a GitHub Actions page displaying a list of workflow runs for a project named "solar-system," with various statuses and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752875981/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-solar-system-workflows.jpg)

![The image shows a GitHub Actions workflow summary with a failed status for a project named "solar-system." It includes details of unit testing jobs and code coverage, indicating three jobs completed with failures.](https://kodekloud.com/kk-media/image/upload/v1752875982/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-solar-system-failed-workflow.jpg)

## 3\. Guarding with `steps.<id>.outcome`

Give your test step an `id`, then use `if` to check its `outcome`:

```
  - name: Unit Testing
    id: nodejs-unit-testing
    run: npm test


  - name: Archive Test Results
    if: steps.nodejs-unit-testing.outcome == 'failure' || steps.nodejs-unit-testing.outcome == 'success'
    uses: actions/upload-artifact@v3
    with:
      name: Mocha-Test-Result
      path: test-results.xml
```

The [`steps` context](https://docs.github.com/actions/learn-github-actions/contexts#steps-context) provides each step’s `outcome` property:

![The image shows a GitHub Docs page about "Contexts" in GitHub Actions, explaining how to access context information in workflows and actions. The page includes a sidebar menu and a warning about security considerations when using contexts.](https://kodekloud.com/kk-media/image/upload/v1752875984/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-contexts-docs-page.jpg)

![The image shows a GitHub Docs page about the "steps context" in GitHub Actions, detailing properties like outputs and outcomes for job steps.](https://kodekloud.com/kk-media/image/upload/v1752875985/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-steps-context-docs.jpg)

> [!important]
> **Expressions 101**
>
> You can use comparison operators (`==`, `!=`, `>`, `<`) and functions in [expressions](https://docs.github.com/actions/learn-github-actions/expressions) to control step execution.

Here’s the official expressions reference:

![The image shows a GitHub Docs page about "Expressions" in GitHub Actions, detailing how to evaluate expressions in workflows and actions. It includes navigation links and sections on expressions, literals, operators, and functions.](https://kodekloud.com/kk-media/image/upload/v1752875987/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-expressions-docs-page.jpg)

Rerun the workflow, and you’ll see the Archive step execute in all scenarios:

![The image shows a GitHub Actions workflow interface with a "Solar System Workflow" in progress. It includes unit testing and code coverage jobs, with some tests marked as failed or in progress.](https://kodekloud.com/kk-media/image/upload/v1752875987/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-solar-system-workflow.jpg)

Inspecting the logs confirms the upload ran:

```
> Solar System@6.7.6 test
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit


Server successfully running on port - 3000
Error: Process completed with exit code 1.
```

![The image shows a GitHub Actions interface with a failed unit testing job on Ubuntu, displaying error logs and test result details.](https://kodekloud.com/kk-media/image/upload/v1752875989/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-failed-unit-test-logs.jpg)

The workflow summary now lists the test-result artifact:

![The image shows a GitHub Actions workflow summary with several unit testing jobs that have failed or been canceled, and artifacts for code coverage and test results.](https://kodekloud.com/kk-media/image/upload/v1752875990/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-workflow-summary-failed-jobs.jpg)

## 4\. Simplifying with `always()`

Testing both `failure` and `success` is redundant. Use `always()` to run the step unconditionally:

```
  - name: Archive Test Results
    if: always()
    uses: actions/upload-artifact@v3
    with:
      name: Mocha-Test-Result
      path: test-results.xml
```

With `always()`, the upload executes on success, failure, or cancelation:

![The image shows a GitHub Actions workflow interface with a list of jobs, including "Unit Testing" on Ubuntu and macOS, and details of a completed job.](https://kodekloud.com/kk-media/image/upload/v1752875991/notes-assets/images/GitHub-Actions-Certification-Using-if-expressions-with-Step-contexts/github-actions-workflow-jobs-interface.jpg)

## 5\. Quick Reference: Status Functions

| Function    | Description                                 | Syntax            |
| ----------- | ------------------------------------------- | ----------------- |
| always()    | Runs step regardless of outcome             | `if: always()`    |
| success()   | Runs step only when all prior steps succeed | `if: success()`   |
| failure()   | Runs step only when a prior step fails      | `if: failure()`   |
| cancelled() | Runs step when the job is canceled          | `if: cancelled()` |

## Links and References

- [GitHub Actions Contexts](https://docs.github.com/actions/learn-github-actions/contexts)
- [GitHub Actions Expressions](https://docs.github.com/actions/learn-github-actions/expressions)
- [actions/upload-artifact](https://github.com/actions/upload-artifact)
- [Mocha JUnit Reporter](https://github.com/michaelleeallen/mocha-junit-reporter)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/bd96ef78-887b-4e8f-aafa-a9a3b2c85832)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/aa5f1767-83ca-4516-ad3c-53166178232a)**
>
> Practice lab
