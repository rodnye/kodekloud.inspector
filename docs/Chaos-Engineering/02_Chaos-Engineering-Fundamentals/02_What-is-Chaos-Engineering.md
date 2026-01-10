# What is Chaos Engineering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-Fundamentals/What-is-Chaos-Engineering)

---

## Table of Contents

- What is Chaos Engineering
  - The Five Key Steps
  - Analogy: States of Water
  - Technical Example: Auto Scaling Group
  - Next Steps
  - References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering Fundamentals

# What is Chaos Engineering

Chaos engineering is the discipline of running controlled experiments to understand how systems behave under failure conditions. By intentionally injecting faults, teams can uncover hidden weaknesses and improve resilience. This lesson walks through the five fundamental steps of chaos engineering, illustrated with diagrams and real-world examples.

## The Five Key Steps

1.  **Collect Metrics**  
    Establish baseline measurements that represent your system’s normal (steady state) behavior.  
    ![The image features a presentation slide titled "Chaos Engineering Experiments" with a focus on "Collect Metrics" and a person speaking on the right side.](https://kodekloud.com/kk-media/image/upload/v1752871800/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/chaos-engineering-experiments-collect-metrics.jpg)
2.  **Form a Hypothesis**  
    Predict how the system will react when a specific fault is introduced, based on your steady state.
3.  **Design the Experiment**  
    Define the smallest, most targeted test that can validate or refute your hypothesis.
4.  **Inject Failure**  
    Execute the experiment by introducing the planned disruption.

    > [!important]
    > **Warning**
    >
    > Always run chaos experiments in a safe, isolated environment and ensure you have monitoring and rollback plans in place.

5.  **Measure Impact**  
    Compare post-failure metrics against your baseline to determine whether the hypothesis holds. Use findings to enhance system robustness.

---

## Analogy: States of Water

To make these concepts concrete, consider how water changes state with temperature:

- **Given**: Water exists as vapor, liquid, or solid depending on temperature.
- **Hypothesis**: Placing liquid water in a freezer for 10 minutes will cause it to freeze.

![The image shows a presentation slide about a hypothesis/experiment on the states of water, with a diagram of a container and a glass, and a person speaking.](https://kodekloud.com/kk-media/image/upload/v1752871802/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/water-states-hypothesis-presentation-slide.jpg)

**Experiment**: We put a container of water in the freezer for 10 minutes.

![The image shows a hypothesis about water turning into ice if placed in a freezer for 10 minutes, alongside a person speaking.](https://kodekloud.com/kk-media/image/upload/v1752871803/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/water-ice-hypothesis-freezer-person.jpg)

**Result**: After 10 minutes, the water remains liquid because the freezer’s temperature was higher than expected.

![The image shows a slide about a hypothesis/experiment, noting that water didn't freeze in 10 minutes due to an unaccounted freezer temperature setting, alongside a person in a headscarf.](https://kodekloud.com/kk-media/image/upload/v1752871805/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/hypothesis-experiment-water-freezing-slide.jpg)

**Refinement**: We lower the freezer temperature and repeat the test. The water freezes within 10 minutes, validating our updated hypothesis.

![The image shows a woman in a headscarf next to a diagram of a freezer with a suggestion to change the freezer temperature setting as part of a hypothesis or experiment.](https://kodekloud.com/kk-media/image/upload/v1752871805/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/woman-headscarf-freezer-diagram-hypothesis.jpg)

> [!important]
> **Note**
>
> Refining your experiment parameters is key to isolating root causes and achieving reliable results.

---

## Technical Example: Auto Scaling Group

Next, let’s apply the five steps to a cloud infrastructure scenario:

- **Given**: An application runs on a single EC2 instance within an Auto Scaling group (ASG), which maintains a minimum of one instance.
- **Hypothesis**: Terminating the instance won’t affect availability because the ASG will launch a replacement immediately.

![The image shows a hypothesis about an application not being impacted due to an Auto Scaling Group ensuring instance availability, alongside a diagram illustrating the process. There is also a person speaking, possibly explaining the concept.](https://kodekloud.com/kk-media/image/upload/v1752871807/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/auto-scaling-group-hypothesis-diagram.jpg)

**Inject Failure**: We terminate the running instance.  
**Observation**: The ASG replaces the instance, but boot time takes 15 minutes—resulting in unexpected downtime.

![The image shows a presentation slide about a hypothesis/experiment related to server boot time, with a person speaking on the right.](https://kodekloud.com/kk-media/image/upload/v1752871808/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/server-boot-time-hypothesis-presentation.jpg)

**Refinement**: Increase the ASG’s desired capacity to two instances so one remains available during boot.

![The image shows a presentation slide about a hypothesis/experiment on improving auto-scaling groups by increasing instances to ensure availability. It includes a diagram of instances and a person speaking on the right.](https://kodekloud.com/kk-media/image/upload/v1752871809/notes-assets/images/Chaos-Engineering-What-is-Chaos-Engineering/auto-scaling-hypothesis-experiment-slide.jpg)

Rerunning the experiment confirms zero downtime, validating our updated hypothesis and architecture.

---

## Next Steps

You’ve now seen how chaos engineering uncovers hidden weaknesses and drives iterative improvements. In the upcoming sections, we will explore how to implement these experiments using [AWS Fault Injection Simulator (FIS)](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html) to automate fault injection and monitoring in your cloud environment.

---

## References

- [Chaos Engineering on AWS](https://aws.amazon.com/fis/)
- [AWS Fault Injection Simulator User Guide](https://docs.aws.amazon.com/fis/latest/userguide/)
- [Principles of Chaos Engineering](https://principlesofchaos.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/b45a00dd-3232-4d00-81b8-60e98b8e3f77/lesson/1d4b1676-75bf-4afb-a022-05f8f2d355ef)**
>
> Watch video content
