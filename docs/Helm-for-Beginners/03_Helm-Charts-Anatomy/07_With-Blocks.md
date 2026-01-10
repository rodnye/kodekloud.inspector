# With Blocks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/With-Blocks)

---

## Table of Contents

- With Blocks
  - Example Values
  - Basic ConfigMap Template Without "with" Blocks
  - Simplifying Templates with the "with" Block
  - Nesting "with" Blocks for Even Cleaner Templates
  - Conclusion
  - Watch Video

---

## Content

Helm for Beginners

Helm Charts Anatomy

# With Blocks

In this guide, we explore how to simplify and optimize your Helm chart templates using "with" blocks. Using a ConfigMap example, we demonstrate how setting the scope can reduce repetition when referencing values defined in your values.yaml file.

## Example Values

Consider the following configuration in your **values.yaml** file:

```
app:
  ui:
    bg: red
    fg: black
  db:
    name: "users"
    conn: "mongodb://localhost:27020/mydb"
```

These values configure your application settings, including UI background and foreground colors, as well as the database name and connection string.

## Basic ConfigMap Template Without "with" Blocks

A basic ConfigMap template (e.g., **configmap.yaml**) might look like this:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-appinfo
data:
  background: {{ .Values.app.ui.bg }}
  foreground: {{ .Values.app.ui.fg }}
  database: {{ .Values.app.db.name }}
  connection: {{ .Values.app.db.conn }}
```

In this version, each reference begins at the root (with `.`), and you must explicitly traverse the hierarchy, which can lead to repetitive expressions such as `.Values.app.ui.bg`.

> [!important]
> **Tip**
>
> By using "with" blocks, you can simplify your templates by setting a local scope. This reduces repetition and makes your templates cleaner and easier to maintain.

## Simplifying Templates with the "with" Block

You can set the scope to `.Values.app` to simplify your references. Here's how you can refactor the ConfigMap template:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-appinfo
data:
{{- with .Values.app }}
  background: {{ .ui.bg }}
  foreground: {{ .ui.fg }}
  database: {{ .db.name }}
  connection: {{ .db.conn }}
{{- end }}
```

Within the "with" block, the current scope becomes `.Values.app`, allowing access to nested properties directly (e.g., `.ui.bg` instead of `.Values.app.ui.bg`).

## Nesting "with" Blocks for Even Cleaner Templates

For better organization and readability, you can further nest "with" blocks to separate UI and database settings. For example:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-appinfo
data:
{{- with .Values.app }}
  {{- with .ui }}
  background: {{ .bg }}
  foreground: {{ .fg }}
  {{- end }}
  {{- with .db }}
  database: {{ .name }}
  connection: {{ .conn }}
  {{- end }}
  release: {{ $.Release.Name }}
{{- end }}
```

In this structure, the inner "with" blocks set the scope to `.Values.app.ui` and `.Values.app.db` respectively. Note that you can use `$.Release.Name` to access the release name from the root context, as the current scope has been altered.

> [!important]
> **Key Insight**
>
> Using nested "with" blocks not only cleans up your templates but also clarifies the relationship between different configuration sections.

## Conclusion

This guide demonstrated how "with" blocks in Helm charts can reduce repetition and improve template readability. By setting appropriate scopes, you can manage complex configurations more efficiently. We hope this example inspires you to explore further optimizations in your Helm charts.

For additional insights and documentation on Helm charts, consider visiting the [Helm Documentation](https://helm.sh/docs/) and [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/5bccd9b4-96a5-4b54-817a-3674ab747300)**
>
> Watch video content
