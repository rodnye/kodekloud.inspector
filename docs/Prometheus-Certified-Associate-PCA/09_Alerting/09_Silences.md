# Silences - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Alerting/Silences)

---

## Table of Contents

- Silences
  - Watch Video
  - Practice Lab

---

## Content

Prometheus Certified Associate (PCA)

Alerting

# Silences

Alerts can now be silenced, preventing notification generation during specific periods. This feature is particularly useful during maintenance windows when planned changes might trigger expected issues.

To silence alerts, navigate to the **New Silence** tab. In this area, you can configure a silence by setting the start time, duration, and a list of matchers. Matchers allow you to specify a set of labels—any alerts that align with these labels will be silenced.

![The image shows a form titled "New Silence" for configuring alert silencing, with fields for start time, duration, matchers, creator, and comments. It includes options to preview alerts, create, or reset the form.](https://kodekloud.com/kk-media/image/upload/v1752882959/notes-assets/images/Prometheus-Certified-Associate-PCA-Silences/new-silence-alert-config-form.jpg)

After setting the start time, duration, and matching labels, enter the creator's name alongside any necessary comments. Once your configuration is complete, click on **Create** to activate the silence. You can add additional labels by clicking on the blue plus sign.

> [!important]
> **Tip**
>
> Ensure that your matchers accurately reflect the alerts you intend to silence to avoid missing critical notifications.

Switch to the **Silences** tab to view all active, pending, and expired silences. This interface displays the expiration time and offers options to view, edit, or expire a silence.

![The image shows a user interface for managing silences, with options to filter and view active, pending, and expired entries. It includes a specific entry with details like an expiration date and options to view, edit, or expire it.](https://kodekloud.com/kk-media/image/upload/v1752882959/notes-assets/images/Prometheus-Certified-Associate-PCA-Silences/silence-management-user-interface.jpg)

> [!important]
> **Warning**
>
> Be cautious when silencing alerts during production hours. Accidental silencing may cause critical issues to go unnoticed.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/577628f7-1e2a-462f-a678-89b728467ba5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/e30d427c-502e-4f94-b85c-5a892632471e)**
>
> Practice lab
