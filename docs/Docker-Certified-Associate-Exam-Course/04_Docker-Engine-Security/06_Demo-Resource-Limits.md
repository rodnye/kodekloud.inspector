# Demo Resource Limits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Security/Demo-Resource-Limits)

---

## Table of Contents

- Demo Resource Limits
  - Table of Contents
  - Memory Limits
  - CPU Limits
  - Links and References
  - Watch Video
    - Default Behavior
    - Hard Memory Limit
    - Unlimited Swap
    - Soft Memory Reservation
    - Memory Flags Summary
    - Limiting CPU Count
    - Pinning to Specific Cores
    - CPU Flags Summary

---

## Content

Docker Certified Associate Exam Course

Docker Engine Security

# Demo Resource Limits

In this lesson, you’ll learn how to manage memory and CPU usage in Docker containers. Proper resource constraints help ensure predictable performance and protect the host from runaway containers.

## Table of Contents

- [Memory Limits](#memory-limits)
  - [Default Behavior](#default-behavior)
  - [Hard Memory Limit](#hard-memory-limit)
  - [Unlimited Swap](#unlimited-swap)
  - [Soft Memory Reservation](#soft-memory-reservation)
  - [Memory Flags Summary](#memory-flags-summary)
- [CPU Limits](#cpu-limits)
  - [Limiting CPU Count](#limiting-cpu-count)
  - [Pinning to Specific Cores](#pinning-to-specific-cores)
  - [CPU Flags Summary](#cpu-flags-summary)

---

## Memory Limits

Docker containers run without memory constraints by default. You can view and modify these settings using `docker run` flags.

### Default Behavior

Run a container named **testone** without any memory restrictions:

```
docker container run -itd --name=testone ubuntu
```

Inspect its memory settings:

```
docker container inspect testone | grep -i mem
```

Output:

```
"Memory": 0,
"KernelMemory": 0,
"KernelMemoryTCP": 0,
"MemoryReservation": 0,
"MemorySwap": 0,
"MemorySwappiness": null
```

A value of `0` indicates “no limit.”

### Hard Memory Limit

Set a hard cap on RAM usage with `--memory`. The following command limits the container to **200 MiB**:

```
docker container run -itd --name=testtwo --memory=200m ubuntu
```

Verify:

```
docker container inspect testtwo | grep -i mem
```

Expected:

```
"Memory": 209715200,
"KernelMemory": 0,
"KernelMemoryTCP": 0,
"MemoryReservation": 0,
"MemorySwap": 0,
"MemorySwappiness": null
```

### Unlimited Swap

By default, swap is limited to the same size as `--memory`. To allow unlimited swap, use `--memory-swap=-1`:

```
docker container run -itd \
  --name=testthree \
  --memory=200m \
  --memory-swap=-1 \
  ubuntu
```

Inspect:

```
docker container inspect testthree | grep -i mem
```

Result:

```
"Memory": 209715200,
"KernelMemory": 0,
"KernelMemoryTCP": 0,
"MemoryReservation": 0,
"MemorySwap": -1,
"MemorySwappiness": null
```

> [!important]
> **Warning**
>
> Unlimited swap (`MemorySwap: -1`) can lead to performance degradation if the host starts swapping heavily. Monitor your containers closely when using this option.

### Soft Memory Reservation

With `--memory-reservation`, you set a **soft limit** that Docker tries to enforce under memory contention:

```
docker container run -itd \
  --name=testfour \
  --memory=200m \
  --memory-reservation=100m \
  --memory-swap=-1 \
  ubuntu
```

Inspect:

```
docker container inspect testfour | grep -i mem
```

Output:

```
"Memory": 209715200,
"KernelMemory": 0,
"KernelMemoryTCP": 0,
"MemoryReservation": 104857600,
"MemorySwap": -1,
"MemorySwappiness": null
```

This configuration guarantees between **100 MiB** and **200 MiB** of RAM, with unlimited swap.

### Memory Flags Summary

| Flag                   | Description                                  | Example                     |
| ---------------------- | -------------------------------------------- | --------------------------- |
| \\--memory             | Hard limit for container memory              | `--memory=200m`             |
| \\--memory-reservation | Soft (guaranteed) memory reservation         | `--memory-reservation=100m` |
| \\--memory-swap        | Total memory + swap limit (`-1` = unlimited) | `--memory-swap=-1`          |
| \\--memory-swappiness  | Tendency to swap (0–100)                     | `--memory-swappiness=10`    |

---

## CPU Limits

Docker lets you restrict CPU usage by setting the number of CPUs or pinning containers to specific cores.

### Limiting CPU Count

First, check your host’s CPU count:

```
nproc
```

Assuming **2** cores, limit the container to **1** CPU:

```
docker container run -itd --name=testcpu --cpus=1 ubuntu
```

Inspect:

```
docker container inspect testcpu | grep -i nano
```

You’ll see:

```
"NanoCpus": 1000000000,
```

`NanoCpus: 1000000000` represents 1 full CPU core.

### Pinning to Specific Cores

Use `--cpuset-cpus` to bind a container to specific cores. For example, pin to core **1**:

```
docker container run -itd --name=testcpus --cpuset-cpus="1" ubuntu
```

Inspect:

```
docker container inspect testcpus | grep -i cpuset
```

Output:

```
"CpusetCpus": "1",
```

This container will only run on CPU core 1.

### CPU Flags Summary

| Flag            | Description                         | Example               |
| --------------- | ----------------------------------- | --------------------- |
| \\--cpus        | Number of CPU cores (fractional OK) | `--cpus=1.5`          |
| \\--cpuset-cpus | Bind container to specific cores    | `--cpuset-cpus="0,1"` |

---

## Links and References

- [Docker Run Reference](https://docs.docker.com/engine/reference/run/)
- [Docker Resource Management](https://docs.docker.com/config/containers/resource_constraints/)
- [Kubernetes Limits and Requests](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/59a97752-06d2-4cac-a4d0-ad4240730912/lesson/13e009e3-ac09-4612-a587-354a454fe127)**
>
> Watch video content
