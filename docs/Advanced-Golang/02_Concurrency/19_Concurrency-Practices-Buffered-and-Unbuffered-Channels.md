# Concurrency Practices Buffered and Unbuffered Channels - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Concurrency-Practices-Buffered-and-Unbuffered-Channels)

---

## Table of Contents

- Concurrency Practices Buffered and Unbuffered Channels
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Concurrency Practices Buffered and Unbuffered Channels

Understanding the difference between buffered and unbuffered channels in Golang is a fundamental concurrency practice. By default, Golang channels are unbuffered, making them straightforward to manage. However, buffered channels provide additional flexibility by allowing you to specify a fixed size, which can be very useful in controlling resource consumption.

Buffered channels can allow a limited number of goroutines active simultaneously or control the amount of work that is queued. Despite their advantages, using buffered channels introduces the risk of blocking when the channel waits on a sender or receiver. Therefore, it’s important to carefully design your concurrency model when choosing between buffered and unbuffered channels.

![The image is a slide discussing when to use buffered channels, highlighting the importance of handling blocking and limiting go-routines.](https://kodekloud.com/kk-media/image/upload/v1752868704/notes-assets/images/Advanced-Golang-Concurrency-Practices-Buffered-and-Unbuffered-Channels/buffered-channels-go-routines-slide.jpg)

> [!important]
> **Note**
>
> When designing concurrent systems, always evaluate whether the control over goroutine execution provided by buffered channels justifies the added complexity.

In this article, we discussed the technical considerations around using buffered channels in Golang and how they can be strategically employed to manage concurrency. Thank you for reading, and stay tuned for more advanced concurrency practices in our upcoming articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/c92eea93-f440-4ae8-89e5-4cb99814f71b)**
>
> Watch video content
