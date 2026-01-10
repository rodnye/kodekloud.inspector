# Invalidate Cache - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Enhancement-and-Caching/Invalidate-Cache)

---

## Table of Contents

- Invalidate Cache
  - 1. Navigate to Your Repository
  - 2. Add a New Dependency
  - 3. Commit & Push
  - 4. Observe Cache Invalidation in Jenkins
  - 5. Cache Invalidation Logic
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Advanced Jenkins

Pipeline Enhancement and Caching

# Invalidate Cache

When you add or remove dependencies in your `package.json`, it’s crucial to invalidate the existing cache so Jenkins reinstalls packages based on the updated lock file. Below is a step-by-step guide to demonstrate how cache invalidation works in a Jenkins pipeline using the Job Cache plugin’s `cacheValidityDecidingFile` option.

## 1\. Navigate to Your Repository

Switch back to your Solar System project:

```
cd ~/solar-system
```

Verify you’re on the correct feature branch:

```
git status
# On branch feature/advanced-demo
```

## 2\. Add a New Dependency

Install a new package (e.g., `localtunnel`) to trigger a change in `package-lock.json`:

```
npm install localtunnel
```

This command updates both `package.json` and `package-lock.json`, altering the lock file’s hash.

## 3\. Commit & Push

Stage and commit the updated dependency files:

```
git add package.json package-lock.json
git commit -m "chore: install localtunnel to trigger cache invalidation"
git push
```

Pushing these changes starts a new Jenkins build. The install stage will reveal the cache behavior.

## 4\. Observe Cache Invalidation in Jenkins

In the pipeline’s console output, look for entries related to the cache plugin:

```
17:06:25  + node -v
17:06:25  v22.6.0
17:06:26  + npm install --no-audit
17:06:27  added 7 packages in 2s
17:06:27  45 packages are looking for funding
17:06:27  run `npm fund` for details
17:06:30  Stashed 5131 file(s)


17:06:25  {cache for node_modules (npm-dependency-cache) with id 3ec03583f8eace275cb2183db769ff47}
17:06:25  got hash 5a159d4c8ba0a6882fd4b8ef16c2 for cacheValidityDecidingFile(s): /var/lib/jenkins/workspace/lar-system_feature_advanced-demo/package-lock.json
17:06:25  cache outdated; skipping restore
17:06:30  creating cache...
17:06:32  cache created in 2179ms
```

Key observations:

1.  Jenkins computes a new hash for `package-lock.json`.
2.  Since the hash differs from the previous build, the old cache is skipped.
3.  A fresh cache is created based on the updated dependencies.

> [!important]
> **Note**
>
> On subsequent runs, if `package-lock.json` remains unchanged, Jenkins will restore the cache instead of reinstalling all packages.

## 5\. Cache Invalidation Logic

| Condition                        | Action                          |
| -------------------------------- | ------------------------------- |
| `package-lock.json` has changed  | Invalidate old cache & recreate |
| `package-lock.json` is unchanged | Restore existing cache          |

By specifying `cacheValidityDecidingFile: package-lock.json` in your Job Cache plugin configuration, you ensure your Node.js dependencies are always in sync with the lock file.

## Links and References

- [Jenkins Job Cache Plugin](https://plugins.jenkins.io/jobcacher/)
- [npm install documentation](https://docs.npmjs.com/cli/v9/commands/npm-install)
- [package-lock.json specification](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/5352396d-b54f-4910-a874-f2aa70e88823/lesson/76c00408-e665-402e-a09d-1715cee27864)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/5352396d-b54f-4910-a874-f2aa70e88823/lesson/495a7c20-3447-469a-aa67-d330dcb9c00d)**
>
> Practice lab
