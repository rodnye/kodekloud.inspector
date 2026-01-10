# Integration of automated tests into pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipeline-Automation/Integration-of-automated-tests-into-pipelines)

---

## Table of Contents

- Integration of automated tests into pipelines
  - Converter Class Library
  - Setting Up the Azure DevOps Pipeline
  - Adding MSTest Unit Tests
  - Demonstrating a Pipeline Failure
  - Avoiding Accidental Omissions
  - Conclusion
  - References
  - Watch Video
    - Conversion Methods at a Glance
    - Pipeline Task Overview

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipeline Automation

# Integration of automated tests into pipelines

In this guide, you’ll learn how to integrate MSTest-based automated tests into an Azure DevOps pipeline for a simple C# application. By enforcing tests in CI, every code change is verified and any failures block deployment before reaching production.

## Converter Class Library

We start with a basic C# class library containing conversion methods:

```
namespace ConverterLib
{
    public class Converter
    {
        public double CelsiusToFahrenheit(double celsius)
        {
            return (celsius * (9.0 / 5.0)) + 32;
        }


        public double MetersToFeet(double meters)
        {
            return meters * 3.28004;
        }


        public double KilogramsToPounds(double kilograms)
        {
            return kilograms * 2.20462;
        }
    }
}
```

You can verify outputs locally with a small console runner.

### Conversion Methods at a Glance

| Conversion           | Method Signature                     | Formula                |
| -------------------- | ------------------------------------ | ---------------------- |
| Celsius → Fahrenheit | `double CelsiusToFahrenheit(double)` | `(celsius * 9/5) + 32` |
| Meters → Feet        | `double MetersToFeet(double)`        | `meters * 3.28004`     |
| Kilograms → Pounds   | `double KilogramsToPounds(double)`   | `kilograms * 2.20462`  |

---

## Setting Up the Azure DevOps Pipeline

In Azure DevOps, select **Azure Repos Git** as the source and point to the `SimpleConverter` repository:

![The image shows a screenshot of an Azure DevOps repository interface, displaying a list of files and folders in the "SimpleConverter" project with details about recent commits.](https://kodekloud.com/kk-media/image/upload/v1752867756/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Integration-of-automated-tests-into-pipelines/azure-devops-simpleconverter-repo-screenshot.jpg)

Choose the **.NET Desktop** template to match our class library:

![The image shows an Azure DevOps interface for configuring a new pipeline, with options for different project types like ASP.NET, .NET Core, and Xamarin. The sidebar includes navigation links for various DevOps features such as Boards, Repos, and Pipelines.](https://kodekloud.com/kk-media/image/upload/v1752867757/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Integration-of-automated-tests-into-pipelines/azure-devops-pipeline-configuration-interface.jpg)

Here’s the initial `azure-pipelines.yml` for CI:

```
trigger:
- master


pool:
  vmImage: 'windows-latest'


variables:
  solution: '**/*.sln'
  buildPlatform: 'Any CPU'
  buildConfiguration: 'Release'


steps:
- task: NuGetToolInstaller@1


- task: NuGetCommand@2
  inputs:
    restoreSolution: '$(solution)'


- task: VSBuild@1
  inputs:
    solution: '$(solution)'
    platform: '$(buildPlatform)'
    configuration: '$(buildConfiguration)'


- task: VSTest@2
  inputs:
    platform: '$(buildPlatform)'
    configuration: '$(buildConfiguration)'
```

After committing, the pipeline runs successfully:

![The image shows an Azure DevOps pipeline interface with a list of jobs and their statuses on the left, and detailed logs of the "VSBuild" job on the right. The pipeline appears to be running successfully with green check marks indicating completed steps.](https://kodekloud.com/kk-media/image/upload/v1752867759/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Integration-of-automated-tests-into-pipelines/azure-devops-pipeline-jobs-logs.jpg)

### Pipeline Task Overview

| Task                 | Purpose                 | YAML Snippet                   |
| -------------------- | ----------------------- | ------------------------------ |
| NuGetToolInstaller@1 | Installs NuGet CLI      | `- task: NuGetToolInstaller@1` |
| NuGetCommand@2       | Restores NuGet packages | `- task: NuGetCommand@2`       |
| VSBuild@1            | Builds the solution     | `- task: VSBuild@1`            |
| VSTest@2             | Runs unit tests         | `- task: VSTest@2`             |

---

## Adding MSTest Unit Tests

Create a new MSTest project that references `ConverterLib`. Here’s a complete test class:

```
using ConverterLib;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace Converter.Tests
{
    [TestClass]
    public class ConverterTests
    {
        private Converter _converter;


        [TestInitialize]
        public void Setup()
        {
            _converter = new Converter();
        }


        [TestMethod]
        public void TestCelsiusToFahrenheit()
        {
            Assert.AreEqual(32, _converter.CelsiusToFahrenheit(0), 0.001, "0°C should be 32°F");
            Assert.AreEqual(212, _converter.CelsiusToFahrenheit(100), 0.001, "100°C should be 212°F");
        }


        [TestMethod]
        public void TestMetersToFeet()
        {
            Assert.AreEqual(3.28084, _converter.MetersToFeet(1), 0.00001, "1 meter ≈ 3.28084 feet");
        }


        [TestMethod]
        public void TestKilogramsToPounds()
        {
            Assert.AreEqual(22.0462, _converter.KilogramsToPounds(10), 0.001, "10 kg ≈ 22.0462 lb");
        }
    }
}
```

Run the tests locally to confirm they pass, then commit and push. The pipeline’s VSTest task will verify them in CI.

---

## Demonstrating a Pipeline Failure

Introduce a faulty implementation for demonstration:

```
public double CelsiusToFahrenheit(double celsius)
{
    // Faulty return for demonstration
    return 4;
    // return (celsius * (9.0 / 5.0)) + 32;
}
```

A local build succeeds, but the console runner shows incorrect output:

```
Hello, World!
The temperature is 30 degrees, or 4 degrees Fahrenheit
```

When pushed, the VSTest step fails in Azure DevOps:

![The image shows an Azure DevOps pipeline interface with a list of jobs on the left and detailed logs of a failed test on the right. The test failure is highlighted in red, indicating an error in the VS Test step.](https://kodekloud.com/kk-media/image/upload/v1752867760/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Integration-of-automated-tests-into-pipelines/azure-devops-pipeline-failed-test-logs.jpg)

This enforcement blocks deployment until the logic error is fixed.

> [!important]
> **Warning**
>
> Never omit the VSTest task in your pipeline. Without it, logic errors slip through and can reach production.

---

## Avoiding Accidental Omissions

A pipeline without tests might look like:

```
trigger:
- master


pool:
  vmImage: 'windows-latest'


variables:
  solution: '**/*.sln'
  buildPlatform: 'Any CPU'
  buildConfiguration: 'Release'


steps:
- task: NuGetToolInstaller@1
- task: NuGetCommand@2
  inputs:
    restoreSolution: '$(solution)'
- task: VSBuild@1
  inputs:
    solution: '$(solution)'
    platform: '$(buildPlatform)'
    configuration: '$(buildConfiguration)'


# VSTest task removed -> logic errors go unchecked
```

Always include the `VSTest@2` task to enforce your unit tests:

```
- task: VSTest@2
  inputs:
    platform: '$(buildPlatform)'
    configuration: '$(buildConfiguration)'
```

---

## Conclusion

By integrating MSTest unit tests into your Azure DevOps YAML pipeline, you establish a robust CI process that catches logic errors early. This simple setup increases confidence in code quality and ensures that only tested code is deployed.

---

## References

- [Azure DevOps Pipelines YAML schema](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)
- [MSTest Unit Testing Framework](https://docs.microsoft.com/visualstudio/test/mstest-unit-test-framework)
- [Azure Repos Git](https://docs.microsoft.com/azure/devops/repos/git)
- [Continuous Integration (CI) in Azure DevOps](https://docs.microsoft.com/azure/devops/learn/what-is-continuous-integration)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/f114915a-674b-4c1a-a7f2-7a5444db938b/lesson/313bfe6a-2472-46f0-bd89-44d07d6bc1f5)**
>
> Watch video content
