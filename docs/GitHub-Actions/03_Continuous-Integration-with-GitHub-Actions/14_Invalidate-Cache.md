# Invalidate Cache - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Invalidate-Cache)

---

## Table of Contents

- Invalidate Cache
  - Background
  - Local Setup
  - Adding a New Dependency
  - Workflow Cache Configuration
  - Observing the Workflow
  - Summary
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Invalidate Cache

In this guide, we’ll explore how GitHub Actions invalidates and rebuilds the NPM cache when your project’s dependencies change. You’ll learn how cache keys work, how to trigger a cache rebuild, and how to verify the new cache in your repository.

## Background

GitHub Actions uses cache keys to store and restore dependencies. By hashing `package-lock.json`, we ensure that any update to dependencies generates a new cache key, invalidating the old cache automatically.

Key points:

- We cache `node_modules` using the hash of `package-lock.json`.
- Changing dependencies updates the lock file, resulting in a new cache key.
- A new cache is created when the key doesn’t match any existing cache.

## Local Setup

First, clone the repository and switch to the feature branch:

```
git clone <repo-url>
cd solar-system
git checkout feature/exploring-workflow
git pull
```

Open `package.json` to review current dependencies:

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
    "chai_http": "*",
    "mocha": "*"
  }
}
```

## Adding a New Dependency

Let’s simulate a dependency change by installing `nodemon`:

```
npm install nodemon --save
```

Your `package.json` will now include:

```
"dependencies": {
  "cors": "^2.8.5",
  "express": "^4.18.2",
  "mocha-junit-reporter": "2.2.1",
  "mongoose": "5.13.20",
  "nyc": "^15.1.0",
  "nodemon": "3.0.1"
}
```

Commit and push the changes:

```
git add package.json package-lock.json
git commit -m "Add nodemon dependency"
git push
```

## Workflow Cache Configuration

Our GitHub Actions workflow uses the official `actions/cache` action to save and restore `node_modules`:

```
- name: Cache NPM dependencies
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
```

| Field  | Description                                            |
| ------ | ------------------------------------------------------ |
| `path` | Directory to cache (`node_modules`)                    |
| `key`  | Cache key including OS and hash of `package-lock.json` |
| `uses` | Action version (`actions/cache@v3`)                    |

When you push a change to `package-lock.json`, the `hashFiles` function produces a new key, and the workflow cannot find an existing cache that matches it.

## Observing the Workflow

After pushing your commit, the workflow runs again. In the **Unit Testing** job, open the **Cache NPM dependencies** step:

![The image shows a GitHub Actions workflow page for a repository named "solar-system," displaying the progress of unit testing and code coverage jobs. The workflow is currently in progress with some jobs completed.](https://kodekloud.com/kk-media/image/upload/v1752876500/notes-assets/images/GitHub-Actions-Invalidate-Cache/github-actions-solar-system-workflow.jpg)

You’ll see:

> **No cache was found**

![The image shows a GitHub Actions workflow interface for a project named "solar-system," displaying the status of unit testing jobs on different environments, with a focus on caching NPM dependencies.](https://kodekloud.com/kk-media/image/upload/v1752876501/notes-assets/images/GitHub-Actions-Invalidate-Cache/github-actions-solar-system-workflow-2.jpg)

The runner installs dependencies afresh and then uploads the new cache. Since parallel jobs may try to save the same cache simultaneously:

> [!important]
> **Note**
>
> If multiple jobs use the same cache key, one job will succeed in saving while the others may report a save failure. This is expected behavior.

Finally, verify the new cache in your repository’s **Caches** section:

![The image shows a GitHub Actions interface displaying cache details for a project, including cache keys, sizes, and last used times.](https://kodekloud.com/kk-media/image/upload/v1752876502/notes-assets/images/GitHub-Actions-Invalidate-Cache/github-actions-cache-details-interface.jpg)

## Summary

- GitHub Actions invalidates caches when the cache key changes.
- Hashing `package-lock.json` ensures dependencies are up to date.
- You can confirm the cache status in the workflow logs and the **Caches** tab.

## Links and References

- [actions/cache – GitHub Docs](https://docs.github.com/actions/advanced-guides/caching-dependencies-to-speed-up-workflows)
- [npm cache documentation](https://docs.npmjs.com/cli/v9/commands/npm-cache)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/34916fb5-401b-4d7e-bd59-1519be1b6cba)**
>
> Watch video content
