# Ranges - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Ranges)

---

## Table of Contents

- Ranges
  - ConfigMap Template Example
  - Using the Range Operator
  - Quoting Each Region Name
  - Watch Video
  - Practice Lab

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Ranges

In this article, we explore how to use loops and ranges to dynamically generate configuration files using templating. Loops, such as the "for" loop in many programming languages, execute a block of code repetitively by iterating over a collection of data. For example, consider the following simple loop which prints numbers from 1 to 10:

```
for i in 1 to 10:
    print i
end
```

Each iteration updates the value of i sequentially, and the print statement is executed 10 times to display numbers 1 through 10.

## ConfigMap Template Example

Assume you have a list of regions defined in a YAML values file as follows:

```
regions:
  - ohio
  - newyork
  - ontario
  - london
  - singapore
  - mumbai
```

The objective is to create a ConfigMap template that automatically populates the regions section with these values. A basic ConfigMap template might initially look like this:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: RELEASE-NAME-regioninfo
data:
  regions:
    - "ohio"
    - "newyork"
    - "ontario"
    - "london"
    - "singapore"
    - "mumbai"
```

To generalize this template, start with a structure where the regions list is left empty. Notice the metadata includes a dynamic release name using templating syntax:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-regioninfo
data:
  regions:
```

## Using the Range Operator

Next, iterate over the list of regions from the values file by employing the `range` operator. The process involves looping through each region, where the current scope (represented by a dot) contains the region value. Initially, you might set up the loop as follows, which inserts a dash for each item:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-regioninfo
data:
  regions:
    {{- range .Values.regions }}
    -
    {{- end }}
```

> [!important]
> **Note**
>
> At this stage, the actual region values are not included yet. The loop only creates a list item placeholder.

To include the actual region value, simply refer to the current value within the loop:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-regioninfo
data:
  regions:
    {{- range .Values.regions }}
    - {{ . }}
    {{- end }}
```

When rendered with the sample values, the output will be:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: RELEASE-NAME-regioninfo
data:
  regions:
    - ohio
    - newyork
    - ontario
    - london
    - singapore
    - mumbai
```

## Quoting Each Region Name

If your requirement specifies that each region name must be enclosed in quotes, you can pipe the value through a quoting function. The updated loop looks like this:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-regioninfo
data:
  regions:
    {{- range .Values.regions }}
    - {{ . | quote }}
    {{- end }}
```

This final version ensures that every region is encapsulated in quotes.

> [!important]
> **Final Thoughts**
>
> By mastering loops and ranges in templating, you can dynamically and efficiently generate Kubernetes ConfigMaps and other configuration files. Advanced templating techniques build on these basics to provide more flexible and powerful configuration options.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/b443e8eb-2b6e-4c80-9b0f-44a97478bb81)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/dacf089e-a7a6-46aa-88a4-0f73d2f0c4de)**
>
> Practice lab
