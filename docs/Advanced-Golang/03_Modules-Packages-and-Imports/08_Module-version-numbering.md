# Module version numbering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Modules-Packages-and-Imports/Module-version-numbering)

---

## Table of Contents

- Module version numbering
  - Watch Video

---

## Content

Advanced Golang

Modules Packages and Imports

# Module version numbering

In this lesson, we explore module version numbering—a system that signals the stability and backward compatibility of a module. Understanding these conventions is crucial for both module developers and users, as they help manage expectations during upgrades and ensure smooth integration.

Each segment of a module's version number communicates a different level of change:

1.  **Major Version**  
    A change in the major version indicates backward-incompatible public API changes. When upgrading to a new major release, be aware that previous code implementations might break.  
    ![The image explains module version numbering, highlighting the major version "1" in version "V 1.4.0 – beta.2".](https://kodekloud.com/kk-media/image/upload/v1752868737/notes-assets/images/Advanced-Golang-Module-version-numbering/module-version-numbering-v1-4-0.jpg)
2.  **Minor Version**  
    The minor version reflects the introduction of new features that are backward-compatible. Updating to a new minor version should not disrupt existing integrations.  
    ![The image explains module version numbering, highlighting the minor version "1.4.0-beta.2" with emphasis on the number "4" as the minor version.](https://kodekloud.com/kk-media/image/upload/v1752868738/notes-assets/images/Advanced-Golang-Module-version-numbering/module-version-numbering-1-4-0-beta.jpg)
3.  **Patch Version**  
    Patch versions are reserved for backward-compatible bug fixes and minor improvements that do not affect the public API. These updates enhance stability without influencing dependencies.  
    ![The image shows a module version numbering format "V 1.4.0 - beta.2" with the patch version "0" highlighted.](https://kodekloud.com/kk-media/image/upload/v1752868739/notes-assets/images/Advanced-Golang-Module-version-numbering/module-version-numbering-v1-4-0-beta-2.jpg)
4.  **Pre-release Identifier**  
    The pre-release tag (such as "alpha" or "beta") indicates that the version is not yet stable and is intended for testing purposes. These versions do not guarantee full backward compatibility or complete feature stability.  
    ![The image shows a module version numbering format, "V 1.4.0 – beta.2," with a pre-release identifier.](https://kodekloud.com/kk-media/image/upload/v1752868740/notes-assets/images/Advanced-Golang-Module-version-numbering/module-version-numbering-v1-4-0-beta-2-2.jpg)

> [!important]
> **Key Takeaway**
>
> Understanding these versioning conventions allows developers to confidently upgrade external modules and effectively communicate changes within their own projects.

That concludes this lesson. We look forward to guiding you through more advanced topics in our upcoming articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/6ce7d245-515e-428d-9672-915e49a8ebd6/lesson/711cc7ac-1e91-495d-86af-03459d9026a2)**
>
> Watch video content
