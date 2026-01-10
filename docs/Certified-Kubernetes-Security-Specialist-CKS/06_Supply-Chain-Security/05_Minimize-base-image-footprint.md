# Minimize base image footprint - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Supply-Chain-Security/Minimize-base-image-footprint)

---

## Table of Contents

- Minimize base image footprint
  - Understanding Base Images
  - Best Practices for Building Images
  - Minimizing Vulnerabilities
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Supply Chain Security

# Minimize base image footprint

Welcome to this comprehensive lesson on minimizing the base image footprint in Docker images. In this guide, you will learn how to structure and optimize your Docker images for efficiency, security, and faster deployments.

## Understanding Base Images

Understanding how images are built is crucial for optimizing them. Consider the following Dockerfile used to build a custom web application image:

```
# Dockerfile – My Custom Webapp
FROM httpd
COPY index.html htdocs/index.html
```

The initial line of this Dockerfile specifies the parent image from which the custom image is constructed—in this example, the HTTPD image. But have you ever wondered how the HTTPD image itself is constructed? Let’s examine its Dockerfile:

```
# Dockerfile - httpd
FROM debian:buster-slim
ENV HTTPD_PREFIX /usr/local/apache2
ENV PATH $HTTPD_PREFIX/bin:$PATH
WORKDIR $HTTPD_PREFIX
# <content trimmed>
```

Here, the HTTPD image is built upon the Debian base image. The Debian image is defined as follows:

```
# Dockerfile - debian:buster-slim
FROM scratch
ADD rootfs.tar.xz /
CMD ["bash"]
```

When an image is constructed from scratch (i.e., without a parent image), it is referred to as a base image. Although terms like "parent image" and "base image" are sometimes used interchangeably, for the purpose of this lesson, any image that serves as the foundation for another image is considered a base image.

## Best Practices for Building Images

When creating Docker images, follow these best practices to ensure efficiency, security, and ease of management:

1.  **Separate Applications:**  
    Do not combine multiple applications (e.g., a web server, a database) within a single image. Instead, build separate, modular images for each component. This approach allows each component to manage its own libraries and dependencies and enables independent scaling.

    ![The image shows three icons: a blue globe, a green box, and a pink database, under the title "Modular."](https://kodekloud.com/kk-media/image/upload/v1752871697/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Minimize-base-image-footprint/frame_150.jpg)

    > [!important]
    > **Note**
    >
    > For modularity, ensure that each container performs a single task. This not only simplifies management but also enhances security through isolation.

2.  **Avoid Data Persistence Inside Containers:**  
    Containers are ephemeral by design. Avoid storing data or state within a container; always make use of external volumes or caching services (e.g., Redis) to persist data securely.
3.  **Select Base Images Wisely:**  
    Choose your base image based on your application's specific needs. If your web application requires an HTTPD server, opt for a trusted HTTPD image from Docker Hub. Look for images that come with authenticity markers, such as the official or verified publisher tags, and ensure they are regularly updated.

    Below is a sample snippet for selecting a base image:

    ```
    FROM <base-image>
    COPY index.html htdocs/index.html
    ```

4.  **Minimize Image Size:**  
    Smaller images download faster and launch more quickly. Use minimal versions of operating systems, install only the necessary libraries, and remove temporary files along with unnecessary tools like curl or wget that could be exploited by attackers. Additionally, if package managers (e.g., yum or apt) are not needed in production, consider removing them.
5.  **Differentiate Development and Production Images:**  
    Development images may include debugging tools and extra packages that should not be present in production. Maintain separate images for development and production to optimize performance and security.

## Minimizing Vulnerabilities

Reducing the number of packages and keeping your image footprint small can significantly decrease security vulnerabilities. For example, consider using Google's distroless images, which include only the application and runtime dependencies without additional software like package managers, shells, or network tools.

To illustrate the impact on security, compare the vulnerability scan results of a standard HTTP image with an HTTP Alpine image using the Trivy tool:

```
trivy image httpd
httpd (debian 10.8)
====================
Total: 124 (UNKNOWN: 0, LOW: 88, MEDIUM: 9, HIGH: 25, CRITICAL: 2)


trivy image httpd:alpine
httpd:alpine (alpine 3.12.4)
==============================
Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)
```

This comparison clearly demonstrates that smaller images with fewer packages have a reduced attack surface, leading to fewer vulnerabilities.

> [!important]
> **Warning**
>
> Always verify the security updates and patches of any base image you choose to prevent introducing vulnerabilities into your Docker images.

## Conclusion

By following these best practices—selecting suitable base images, reducing installed packages, and maintaining a modular approach—you can build Docker images that are both efficient and secure. Implement what you've learned in this lesson and experiment with hands-on exercises to refine these techniques.

For further reading, consider exploring [Docker’s Official Documentation](https://docs.docker.com/) and [Best Practices for Docker Images](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/5ef152ec-a459-4560-a6ff-20f56f4e9fc8)**
>
> Watch video content
