# Cache Node Dependencies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Cache-Node-Dependencies)

---

## Table of Contents

- Cache Node Dependencies
  - Workflow Performance without Caching
  - Caching Dependencies with actions/cache
  - Implementing Caching in Our Workflow
  - First Workflow Run: Cache Creation
  - Subsequent Run: Cache Restoration
  - Conclusion
  - Links and References
  - Watch Video
    - Unit Testing Job
    - Code Coverage Job

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Cache Node Dependencies

In this guide, we’ll show you how to speed up your GitHub Actions workflows by caching Node.js dependencies. By storing `node_modules` between runs, you can dramatically reduce install times and lower CI costs.

## Workflow Performance without Caching

Our initial CI run for the **solar-system** project completed in **59 seconds**:

![The image shows a GitHub Actions workflow summary for a project named "solar-system," indicating a successful run with unit testing and code coverage jobs completed. The workflow was triggered by a push and took 59 seconds to complete.](https://kodekloud.com/kk-media/image/upload/v1752876484/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-solar-system-workflow-summary.jpg)

Here’s the breakdown of job durations:

| Job                    | Duration |
| ---------------------- | -------- |
| Code Coverage          | 21s      |
| Unit Testing (Ubuntu)  | 19s      |
| Unit Testing (macOS)   | 45s      |
| Unit Testing (Windows) | 18s      |

On macOS, the **Setup Node.js** and **Install Dependencies** steps took about 20s and 15s respectively:

![The image shows a GitHub Actions workflow interface with unit testing details for different environments, including Ubuntu and macOS. It displays logs for setting up a job, checking out a repository, setting up NodeJS, and installing dependencies.](https://kodekloud.com/kk-media/image/upload/v1752876486/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-workflow-unit-testing-logs.jpg)

By default each job runs:

```
Run npm install
added 364 packages, and audited 365 packages in 5s


44 packages are looking for funding
run `npm fund` for details
…
```

As your `package.json` grows, so do install times. Let’s fix that with caching.

## Caching Dependencies with [actions/cache](https://github.com/actions/cache)

GitHub’s **actions/cache** action lets you save and restore directories or files across jobs and workflow runs. Unlike artifacts (which are job outputs), caches retain dependencies that rarely change—like `node_modules`.

![The image shows a GitHub Docs page about caching dependencies to speed up workflows, with sections on using caches for dependencies and related topics. The left sidebar lists various GitHub Actions topics, and the main content explains caching workflow dependencies.](https://kodekloud.com/kk-media/image/upload/v1752876487/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-docs-caching-dependencies-workflows.jpg)

You need to specify two inputs:

- **path**: The directory or file to cache (e.g., `node_modules`).
- **key**: A unique identifier for the cache, typically including OS and a hash of lockfiles.

![The image shows a GitHub documentation page about caching dependencies to speed up workflows, detailing prerequisites, inputs, and environment variables.](https://kodekloud.com/kk-media/image/upload/v1752876488/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-caching-dependencies-workflows-docs.jpg)

Example from the docs:

```
- name: Save Primes
  id: cache-primes-save
  uses: actions/cache@v3
  with:
    path: |
      path/to/dependencies
      some/other/dependencies
    key: ${{ steps.cache-primes-restore.outputs.cache-primary-key }}
```

> [!important]
> **Note**
>
> Including `hashFiles('package-lock.json')` in your key invalidates the cache whenever dependencies change.

## Implementing Caching in Our Workflow

We’ll integrate cache steps into both **unit-testing** and **code-coverage** jobs.

### Unit Testing Job

```
jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ${{ matrix.operating_system }}
    strategy:
      matrix:
        nodejs_version: [18, 20]
        operating_system: [ubuntu-latest, macos-latest]
        exclude:
          - nodejs_version: 18
            operating_system: macos-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Setup Node.js ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Cache NPM dependencies
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


      - name: Install Dependencies
        run: npm install


      - name: Run Unit Tests
        run: npm test


      - name: Archive Test Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: mocha-test-results
          path: test-results.xml
```

Key configuration:

- `path: node_modules` caches installed packages.
- `key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}`
  - `${{ runner.os }}` separates caches per OS.
  - `hashFiles('package-lock.json')` busts the cache when lockfile updates.

### Code Coverage Job

```
code-coverage:
  name: Code Coverage
  runs-on: ubuntu-latest
  steps:
    - name: Checkout Repository
      uses: actions/checkout@v4


    - name: Setup Node.js 18
      uses: actions/setup-node@v3
      with:
        node-version: 18


    - name: Cache NPM dependencies
      uses: actions/cache@v3
      with:
        path: node_modules
        key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


    - name: Install Dependencies
      run: npm install


    - name: Run Coverage
      continue-on-error: true
      run: npm run coverage


    - name: Archive Coverage Report
      uses: actions/upload-artifact@v3
      with:
        name: coverage-report
        path: coverage
```

## First Workflow Run: Cache Creation

After pushing these changes, visit **Settings → Caches** in your repo to see cache entries:

![The image shows a GitHub Actions page displaying a list of workflow runs for a repository named "solar-system." It includes details like commit messages, status, and branch information.](https://kodekloud.com/kk-media/image/upload/v1752876489/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-solar-system-workflows.jpg)

On the first run, the **Cache NPM dependencies** step reports “Cache not found” and installs packages as usual:

![The image shows a GitHub Actions workflow in progress, with details about unit testing and code coverage jobs. The interface displays job statuses and a summary of the workflow file.](https://kodekloud.com/kk-media/image/upload/v1752876490/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-workflow-unit-testing.jpg)

![The image shows a GitHub Actions workflow interface with a list of jobs and steps for unit testing on different environments, highlighting the "Install Dependencies" step.](https://kodekloud.com/kk-media/image/upload/v1752876491/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-workflow-unit-testing-2.jpg)

Once installation completes, the cache is saved:

![The image shows a GitHub Actions workflow interface, displaying the results of a unit testing job on Ubuntu, including steps like setting up a job, checking out a repository, and installing dependencies.](https://kodekloud.com/kk-media/image/upload/v1752876492/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-workflow-unit-testing-ubuntu.jpg)

```
/usr/bin/tar --posix -cf cache.tzst ...
Cache Size: ~7 MB (7025093 B)
Cache saved successfully
Cache saved with key: Linux-node-modules-6224ef692577e18835ac17794c9dc34656c2d8679585a7255cee00452bc1ef7
```

You’ll now see separate cache entries for macOS and Linux:

![The image shows a GitHub Actions interface displaying cache details for macOS and Linux node modules, including cache sizes and usage times.](https://kodekloud.com/kk-media/image/upload/v1752876493/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-cache-details-macos-linux.jpg)

## Subsequent Run: Cache Restoration

On the next push, the workflow pulls down the saved cache in under a second:

```
# Run actions/cache@v3
Cache Size: ~7 MB (702593 B)
/usr/bin/tar -xf .../cache.tzst ...
Cache restored successfully
Cache restored from key: Linux-node-modules-6224ef692577e18835ac17794c9dc34656c2d8679585a7255cee00452bc1ef7


# Run npm install
up to date, audited 365 packages in 965ms
...
```

Install times drop from 10–20s to ~1s.

![The image shows a GitHub Actions workflow interface, displaying the details of a unit testing job for a project named "solar-system," including steps like caching NPM dependencies and installing dependencies.](https://kodekloud.com/kk-media/image/upload/v1752876494/notes-assets/images/GitHub-Actions-Cache-Node-Dependencies/github-actions-solar-system-testing-workflow.jpg)

## Conclusion

By caching `node_modules` with [actions/cache](https://github.com/actions/cache), you’ll see faster CI runs and reduced compute costs. In our next article, we’ll cover advanced cache invalidation strategies when dependencies change.

## Links and References

- [actions/cache on GitHub](https://github.com/actions/cache)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Setup Node.js Action](https://github.com/actions/setup-node)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/cd45c292-41c6-49af-90e3-8b714e17235c)**
>
> Watch video content
