# Java Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Applications-Basics/Java-Introduction)

---

## Table of Contents

- Java Introduction
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Applications Basics

# Java Introduction

In this lesson, we explore the fundamentals of Java—a popular programming language used for developing desktop, mobile, and web applications. Java is free, open source, and benefits from support by a vast community. As of this recording, the latest version is 13. The image below highlights Java’s open-source nature, its vibrant community, and includes a table with Java versions and their release years from 2004 to 2019.

![The image is about Java, highlighting its free, open-source nature and large community, alongside a table of Java versions and their release years from 2004 to 2019.](https://kodekloud.com/kk-media/image/upload/v1752873411/notes-assets/images/DevOps-Pre-Requisite-Course-Java-Introduction/frame_20.jpg)

In many enterprise environments, you may come across applications that rely on different Java versions. For example, a large number of organizations continue to use Java version eight. This is largely due to compatibility issues introduced in version nine, which affected several popular tools and libraries. Additionally, changes in licensing terms encouraged numerous companies to remain on version eight.

Java can be installed on various platforms. In our lab, we use Linux distributions such as CentOS. On these systems, you can download a Java build from the Oracle website using utility tools like wget. Once downloaded, extract the package and use the binaries located in the "bin" directory. To verify a successful installation or to check the Java version, run the following commands:

```
wget https://download.java.net.../openjdk-13.0.2_linux-x64_bin.tar.gz
tar -xvf openjdk-13.0.2_linux-x64_bin.tar.gz
/opt/jdk-13/bin/java -version
```

As seen from the output, the current version is 13.0.2. Note that older Java versions (prior to version eight) were numbered as 1.5, 1.6, 1.7, and 1.8. Starting with version nine, the naming scheme was simplified to 9, 10, 11, 12, 13, and so on.

At this point, you might have noticed references to the JDK. The release page and downloaded filenames (e.g., OpenJDK) indicate the availability of the Java Development Kit (JDK). So what exactly is the JDK?

The Java Development Kit (JDK) is a comprehensive collection of tools that facilitate the development, building, and running of Java applications. While you can write Java code using any text editor, the JDK offers several utilities that streamline the development process:

- The Java Compiler (javac) for compiling source code.
- The Java Debugger for diagnosing and debugging issues.
- The JavaDoc tool for generating documentation from source code.
- The jar tool for packaging compiled code and libraries into a single JAR file.

> [!important]
> **Tip**
>
> When your Java application is built, it needs the Java Runtime Environment (JRE) to run. The JRE includes the necessary runtime components along with the Java command-line utility that serves as the application loader.

When you install Java, all these tools are available in the "bin" directory. For example, on JDK 13, you can view the available tools using the following command:

```
ls jdk-13.0.2/bin
```

Output:

```
jaotc         javac       jdeps       jinfo       jps         jstatd
jar           javadoc     jfr         jjs         jshell      jstat
java          jconsole    jhsdb       jmap        jstack      serialver
jlink         runscript   keytool     pack200     rmic        rmid
unpack200
```

Historically, prior to Java version nine, the JDK and JRE were distributed as separate components. The image below illustrates the components of the Java Development Kit before version nine, including distinct tools for development, building, and running Java applications alongside the separately installed JRE.

![The image explains the components of the Java Development Kit (JDK) before version 9, including tools for development, building, and running Java applications, alongside the Java Runtime Environment (JRE).](https://kodekloud.com/kk-media/image/upload/v1752873413/notes-assets/images/DevOps-Pre-Requisite-Course-Java-Introduction/frame_250.jpg)

Back then, if your goal was only to run an existing Java application, installing just the Java Runtime Environment was sufficient, resulting in separate directories for each component. Starting with version nine, however, the JDK and JRE have been merged into a single package, ensuring that installing the JDK provides both the necessary tools for development and the runtime environment.

![The image outlines the Java Development Kit (JDK) components after version 9, including tools for development, building, and running Java applications.](https://kodekloud.com/kk-media/image/upload/v1752873413/notes-assets/images/DevOps-Pre-Requisite-Course-Java-Introduction/frame_290.jpg)

In the upcoming lab sessions, we will work with multiple systems, install various Java versions, and run simple Java programs. In the next lecture, we will continue our deep dive into the build process in Java.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/51d2b278-97e7-433b-b3fc-79d328131c20)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/e1152fba-5444-4270-94f7-d835871c37cc)**
>
> Practice lab
