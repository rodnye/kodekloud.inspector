# Invalidate Cache - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Invalidate-Cache)

---

## Table of Contents

- Invalidate Cache
  - Initial Cache Setup
  - Adding a New Dependency
  - Workflow Configuration
  - Triggering the Workflow and Cache Invalidation
  - Inspecting Cache Behavior Across Jobs
  - Viewing Saved Caches
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Invalidate Cache

In this guide, you’ll learn how GitHub Actions uses a hash of `package-lock.json` to invalidate and refresh the NPM cache whenever dependencies change. By incorporating `hashFiles('package-lock.json')` into your cache key, you ensure that outdated artifacts aren’t reused and that a fresh cache is stored after updates.

## Initial Cache Setup

Assume your repository includes a workflow that caches `node_modules` based on the lockfile’s hash. Here’s the original `package.json`:

```
{
  "name": "Solar_System",
  "version": "6.6.7",
  "author": "Siddharth Barahalikar <barahalikar.siddharth@gmail.com>",
  "homepage": "https://www.linkedin.com/in/barahalikar-siddharth/",
  "license": "MIT",
  "scripts": {
    "start": "node app.js",
    "test": "mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit",
    "coverage": "nyc --reporter cobertura --reporter lcov --reporter text --reporter json-summary mocha app-test.js --timeout 10000"
  },
  "nyc": {
    "check-coverage": true,
    "lines": 90
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mocha-junit-reporter": "2.2.1",
    "mongoose": "5.13.20",
    "nyc": "^15.1.0"
  },
  "devDependencies": {
    "chai": "*",
    "chai-http": "*",
    "mocha": "*"
  }
}
```

These dependencies are restored from cache on each workflow run and only invalidated when `package-lock.json` changes.

## Adding a New Dependency

When you introduce a new package, the lockfile hash changes, triggering a cache miss:

```
# 1. Update your feature branch
git pull


# 2. Install nodemon and update lockfile
npm install nodemon --save


# 3. Review changes
git diff package.json package-lock.json


# 4. Commit and push
git add package.json package-lock.json
git commit -m "Add nodemon dependency"
git push
```

After this, your `package.json` dependencies look like:

```
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mocha-junit-reporter": "2.2.1",
    "mongoose": "5.13.20",
    "nodemon": "^3.0.1",
    "nyc": "^15.1.0"
  }
}
```

And `package-lock.json` is updated, producing a new hash.

> [!important]
> **Note**
>
> Using `npm install --save` updates both `package.json` and `package-lock.json`, ensuring the cache key changes automatically.

## Workflow Configuration

Include these steps in your `.github/workflows/ci.yml`:

| Step                   | Action                      | Description                                         |
| ---------------------- | --------------------------- | --------------------------------------------------- |
| Setup Node.js          | uses: actions/setup-node@v3 | Installs Node.js for the specified version.         |
| Cache NPM dependencies | uses: actions/cache@v3      | Caches `node_modules` keyed by the lockfile’s hash. |
| Install Dependencies   | run: npm install            | Restores or installs NPM packages.                  |

```
- name: Setup Node.js
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
```

Because the cache key is based on `hashFiles('package-lock.json')`, any modification to your lockfile results in a cache miss.

## Triggering the Workflow and Cache Invalidation

Once you push the updated lockfile:

1.  **Cache NPM dependencies**: No existing cache matches the new key, so the step falls back to installing from npm.
2.  **Install Dependencies**: `npm install` populates `node_modules`.
3.  **Upload Cache**: One job uploads the newly generated cache.
4.  **Parallel Jobs**: Other jobs may see “Failed to save cache” if they attempt an upload after the first; this is expected.

![The image shows a GitHub Actions workflow interface for a project named "solar-system," displaying the status of unit testing jobs on different environments, with a focus on caching NPM dependencies.](https://kodekloud.com/kk-media/image/upload/v1752875952/notes-assets/images/GitHub-Actions-Certification-Invalidate-Cache/github-actions-solar-system-workflow.jpg)

> [!important]
> **Warning**
>
> In parallel builds, only the first job to upload the cache succeeds. Subsequent jobs will skip uploading the same key.

## Inspecting Cache Behavior Across Jobs

During a run, you might see logs like:

```
Cache not found for input key, proceeding to npm install...
```

or

```
Uploading cache...
/usr/bin/tar --posix -cf cache.tzst --exclude cache.tzst -P -C /home/runner/work/solar-system/solar-system --files-from manifest.txt --use-compress-program=zstdmt
```

![The image shows a GitHub Actions workflow interface with a list of jobs, including unit testing and code coverage, indicating successful completion of tasks. The highlighted section is "Cache NPM dependencies" under a unit testing job.](https://kodekloud.com/kk-media/image/upload/v1752875953/notes-assets/images/GitHub-Actions-Certification-Invalidate-Cache/github-actions-workflow-unit-testing-cache.jpg)

This demonstrates how one job restores or saves the cache, while others detect it’s already stored and skip.

## Viewing Saved Caches

You can review cache details in the GitHub Actions UI under the workflow run or by examining the tar logs. Example:

![The image shows a GitHub Actions interface displaying cache details for a project, including cache names, sizes, and usage times.](https://kodekloud.com/kk-media/image/upload/v1752875954/notes-assets/images/GitHub-Actions-Certification-Invalidate-Cache/github-actions-cache-details-interface.jpg)

## Conclusion

By hashing `package-lock.json` in your cache key:

1.  Each dependency update generates a new hash.
2.  The cache restore step misses on outdated keys.
3.  Dependencies are installed from scratch.
4.  A fresh cache is uploaded for subsequent runs.

## Links and References

- [actions/cache@v3](https://github.com/actions/cache)
- [actions/setup-node@v3](https://github.com/actions/setup-node)
- [hashFiles function](https://docs.github.com/en/actions/learn-github-actions/expressions#hashfiles)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/1426e076-2d73-49e0-81a3-862d245b7840)**
>
> Watch video content
