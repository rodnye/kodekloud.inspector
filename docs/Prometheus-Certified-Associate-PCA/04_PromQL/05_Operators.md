# Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/Operators)

---

## Table of Contents

- Operators
  - Arithmetic Operators
  - Comparison Operators
  - The Bool Operator
  - Operator Precedence
  - Logical Operators
  - Additional Examples and Combining Operators
  - Conclusion
  - Watch Video
    - AND Operator
    - OR Operator
    - UNLESS Operator

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# Operators

This article provides an in-depth explanation of PromQL operators, including arithmetic, comparison, and logical operators. You will also learn about operator precedence and how to combine operators to construct powerful queries. The examples provided mirror behaviors in other programming languages, making them familiar and intuitive.

---

## Arithmetic Operators

Arithmetic operators in PromQL let you perform basic mathematical operations such as addition, subtraction, multiplication, division, modulo, and exponentiation. For clarity, see the table below, which is represented by the following image:

![The image is a table listing arithmetic operators and their descriptions, including addition, subtraction, multiplication, division, modulo, and power.](https://kodekloud.com/kk-media/image/upload/v1752883028/notes-assets/images/Prometheus-Certified-Associate-PCA-Operators/arithmetic-operators-table.jpg)

Consider this example. Suppose you run:

```
$ node_memory_Active_bytes{instance="node1"}
2204815360
```

Appending a plus operator with 10 produces:

```
$ node_memory_Active_bytes{instance="node1"} + 10
```

This query adds 10 to the returned value. A common use case is converting a memory metric from bytes to kilobytes. For instance, the metric `node_memory_Active_bytes` outputs the active memory in bytes:

```
$ node_memory_Active_bytes
node_memory_Active_bytes{instance="node1", job="node"} 2204844032
node_memory_Active_bytes{instance="node1", job="node"} 2204887040
```

Divide by 1024 to convert bytes to kilobytes:

```
$ node_memory_Active_bytes / 1024
{instance="node1", job="node"} 2153168
{instance="node1", job="node"} 2153210
```

> [!important]
> **Note**
>
> Once you perform a mathematical operation on a metric, the result no longer retains the original metric name. This is important when transforming metrics for further analysis.

---

## Comparison Operators

Comparison operators filter time series based on specified conditions. The following image summarizes the available comparison operators:

![The image is a table listing comparison operators and their descriptions, such as "==" for equal and "!=" for not equal.](https://kodekloud.com/kk-media/image/upload/v1752883029/notes-assets/images/Prometheus-Certified-Associate-PCA-Operators/comparison-operators-table.jpg)

For example, to filter time series values greater than 100, you might execute:

```
$ node_network_flags
node_network_flags{device="enp0s3", instance="node1", job="node"} 5000
node_network_flags{device="enp0s3", instance="node2", job="node"} 4800
node_network_flags{device="lo", instance="node1", job="node"}      77
node_network_flags{device="lo", instance="node2", job="node"}      84

$ node_network_flags > 100
node_network_flags{device="enp0s3", instance="node1", job="node"} 5000
node_network_flags{device="enp0s3", instance="node2", job="node"} 4800
```

---

## The Bool Operator

The bool modifier converts the outcome of comparisons into boolean values: returning 1 when the condition is true and 0 otherwise. This is especially useful for alerting scenarios.

Consider the metric `node_network_receive_packets_total`:

```
$ node_network_receive_packets_total
node_network_receive_packets_total{device="enp0s3", instance="node1", job="node"} 542
node_network_receive_packets_total{device="lo", instance="node1", job="node"} 220
node_network_receive_packets_total{device="enp0s3", instance="node2", job="node"}   8
node_network_receive_packets_total{device="lo", instance="node2", job="node"}   2

$ node_network_receive_packets_total >= 220
node_network_receive_packets_total{device="enp0s3", instance="node1", job="node"} 542
node_network_receive_packets_total{device="lo", instance="node1", job="node"} 220
```

Now, if you need to check file systems with less than 1,000 bytes available, start by viewing the metric output:

```
$ node_filesystem_avail_bytes
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"} 53371
node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"}       18771
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run"}          421
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/lock"}     80012
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/snapd/ns"}   872
```

Now, apply the bool modifier to filter file systems with less than 1,000 available bytes:

```
$ node_filesystem_avail_bytes < bool 1000
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"} 0
node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"}       0
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run"}          1
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/lock"}     0
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/snapd/ns"}   1
```

A return value of 1 signifies that the file system meets the condition of having less than 1,000 bytes available.

---

## Operator Precedence

Understanding the order of evaluation is critical when combining multiple operators in a query. PromQL evaluates operators in the following order (from highest to lowest):

1.  **Exponentiation** (power operator; note that it is right-associative)
2.  **Multiplication, Division, and Modulo** (left-associative)
3.  **Addition and Subtraction**
4.  **Comparison Operators**
5.  **Logical Operators**

For instance, consider the expression:

2 \* 3 % 2

Since multiplication and modulo are evaluated from left to right, first 2 \* 3 is computed, and then the modulo operation follows. Conversely, the exponentiation operator (^) evaluates the right-hand side first, given its right-associative nature.

The following diagram outlines the precedence of PromQL binary operators:

![The image explains the precedence of binary operators in PromQL, listing them from highest to lowest, and notes that operators on the same level are left-associative, except for the exponentiation operator (^), which is right-associative.](https://kodekloud.com/kk-media/image/upload/v1752883030/notes-assets/images/Prometheus-Certified-Associate-PCA-Operators/promql-binary-operators-precedence.jpg)

---

## Logical Operators

PromQL supports three key logical operators: OR, AND, and UNLESS. These operators help in refining your queries by combining multiple conditions.

![The image lists three logical operators in PromQL: OR, AND, and UNLESS, each with a checkmark.](https://kodekloud.com/kk-media/image/upload/v1752883030/notes-assets/images/Prometheus-Certified-Associate-PCA-Operators/promql-logical-operators-checkmarks.jpg)

### AND Operator

The AND operator returns only the time series that satisfy both specified conditions. For example, to list file systems with available bytes greater than 1,000 and less than 3,000, you can run:

```
$ node_filesystem_avail_bytes
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"} 53371
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/var"}   1771
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/etc"}    421
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"} 80012
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"}  2872

$ node_filesystem_avail_bytes > 1000 and node_filesystem_avail_bytes < 3000
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/var"} 1771
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"} 2872
```

### OR Operator

The OR operator fetches time series that satisfy at least one of the conditions. For instance, to select file systems with available bytes either less than 500 or greater than 70,000:

```
$ node_filesystem_avail_bytes
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"} 53371
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/var"}   18771
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/etc"}     421
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/opt"}   80012

$ node_filesystem_avail_bytes < 500 or node_filesystem_avail_bytes > 70000
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/etc"}  421
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/opt"} 80012
```

### UNLESS Operator

The UNLESS operator works by returning time series elements from the left-hand side that do not have a corresponding match on the right-hand side. For example, to display file systems with available bytes greater than 1,000 unless they are also greater than 30,000:

```
$ node_filesystem_avail_bytes
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"} 53371
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/var"}   1771
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/etc"}    421
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"} 80012
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"}  2872

$ node_filesystem_avail_bytes > 1000 unless node_filesystem_avail_bytes > 30000
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/var"} 1771
node_filesystem_avail_bytes{instance="node1", job="node", mountpoint="/home"}  2872
```

---

## Additional Examples and Combining Operators

Let's consider another metric, `node_arp_entries`, which might yield a value of 2:

```
$ node_arp_entries
node_arp_entries{device="enp0s3", instance="192.168.1.168:9100", job="node"} 2
```

To adjust this value by adding 50, simply perform:

```
$ node_arp_entries + 50
node_arp_entries{device="enp0s3", instance="192.168.1.168:9100", job="node"} 52
```

Another common scenario involves filtering file systems based on available bytes. For example, to display only those file systems with available bytes greater than 6 million, or to refine the filter by combining multiple conditions (such as selecting file systems below one billion bytes), you can leverage the AND and OR operators accordingly. Here’s an demonstration:

```
$ node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="192.168.1.168:9100", job="node", mountpoint="/boot/efi"}
531341312

$ node_filesystem_avail_bytes{device="/tmpfs", fstype="tmpfs", instance="192.168.1.168:9100", job="node", mountpoint="/run"}
726482944

$ node_filesystem_avail_bytes{device="/tmpfs", fstype="tmpfs", instance="192.168.1.168:9100", job="node", mountpoint="/run/snapd/ns"}
726482944

$ node_filesystem_avail_bytes{device="/tmpfs", fstype="tmpfs", instance="192.168.1.168:9100", job="node", mountpoint="/run/user/127"}
727838720
```

Using the OR operator, you could select time series that either fall below the lower threshold of 6 million or exceed the upper threshold of one billion, providing flexible query options for your monitoring needs.

---

## Conclusion

This article provided an overview of arithmetic, comparison, and logical operators in PromQL, along with detailed examples illustrating how to combine them efficiently. By understanding operator precedence and the impact of mathematical operations on your metrics, you can craft accurate and robust queries for your monitoring environment.

For more information, check out the [Prometheus Documentation](https://prometheus.io/docs/) and other related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/d8a05d2c-75ff-489e-b5c8-5b9de1d1156a)**
>
> Watch video content
