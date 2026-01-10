# Kubernetes Enhancement Proposals strongKEPsstrong - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Architecture/Kubernetes-Enhancement-Proposals-strongKEPsstrong)

---

## Table of Contents

- Kubernetes Enhancement Proposals strongKEPsstrong
  - Why Use KEPs Instead of GitHub Issues?
  - KEP Structure and Content
  - KEP Lifecycle
  - Additional Resources
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Architecture

# Kubernetes Enhancement Proposals strongKEPsstrong

Kubernetes continually evolves with innovative ideas for improvements. To manage these ideas effectively, Kubernetes employs a standardized process known as Kubernetes Enhancement Proposals (KEPs). KEPs offer a structured approach for proposing, discussing, and implementing significant changes through various release stages—alpha, beta, and ultimately GA.

For instance, if you want to understand the reasoning behind a major change—such as the recent update where service tokens are no longer automatically created—reviewing the corresponding KEP will provide the detailed motivation and discussions behind the decision.

If you have a proposal for a new Kubernetes feature, like enhancing usability or bolstering security, you would write a KEP outlining your idea. This process invites feedback and suggestions from the community, ensuring continuous improvement and alignment with industry trends.

![The image shows a GitHub repository page for Kubernetes enhancements, with a person in a video overlay explaining the content.](https://kodekloud.com/kk-media/image/upload/v1752880473/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Kubernetes-Enhancement-Proposals-strongKEPsstrong/frame_70.jpg)

The KEP process not only simplifies tracking ongoing development and improvement initiatives but also helps Kubernetes stay abreast of evolving industry standards.

## Why Use KEPs Instead of GitHub Issues?

While GitHub issues are excellent for reporting bugs and suggesting features, they lack the structured framework necessary for major changes. KEPs serve several critical roles:

1.  They standardize the method for community members to propose and discuss ideas.
2.  They facilitate detailed and structured discussions for a thorough evaluation of proposed changes.
3.  They provide a formal process for SIGs (Special Interest Groups) to review and either approve or reject proposals, ensuring well-managed enhancements across multiple releases.

SIGs organize KEPs by areas such as applications, cluster lifecycle, data management, networking, storage, and security. Each SIG votes on proposals, and approved changes are scheduled for implementation in upcoming Kubernetes releases.

## KEP Structure and Content

Every KEP adheres to a standard naming convention with a four-digit number and a descriptive title. Each proposal must include the following elements:

- Summary of the proposal
- Clearly defined goals and non-goals
- The motivation behind the proposal
- A detailed user story
- Risks and mitigation strategies
- Test plans and graduation criteria

![The image shows a video call with a person on the left and a document discussing Kubernetes certificate signing requests on the right.](https://kodekloud.com/kk-media/image/upload/v1752880474/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Kubernetes-Enhancement-Proposals-strongKEPsstrong/frame_180.jpg)

For example, the KEP for the Kubernetes dry run feature—introduced over two years ago—details its benefits. Dry run mode allows you to send requests to endpoints to simulate actions without initiating changes. This proposal includes a test plan, graduation criteria, and usage examples that demonstrate how to invoke it with the kubectl command. Below is a sample implementation for parsing a dry run flag in Go:

```
func ParseDryRun(dryRunFlag string) (DryRunEnum, error) {
    if dryRunFlag == "" {
        klog.Warningf("The unset value for --dry-run is deprecated and a value will be required in a future version. Must be 'none'")
        // This warning will eventually become a fatal error.
    }
    b, err := strconv.ParseBool(dryRunFlag)
    if err != nil { // The flag is not a boolean.
        switch dryRunFlag {
        case "client":
            return DryRunClient, nil
        case "server":
            return DryRunServer, nil
        case "none":
            return DryRunNone, nil
        default:
            return DryRunNone, fmt.Errorf("Invalid dry-run value (%v). Must be 'none', 'server', or 'client'.", dryRunFlag)
        }
    }
    if b { // Flag was a boolean and indicates true, run client-side.
        return DryRunClient, nil
    }
    return DryRunNone, nil
}
```

Another recent KEP titled "1205 Bound Service Account Tokens" tackles security concerns related to token provisioning. Traditionally, Kubernetes used JSON Web Tokens (JWTs) that were not audience-specific, potentially leading to security risks if a token was compromised. In such cases, unauthorized access may occur until keys are manually rotated—a process that is often overlooked.

This KEP introduces a token request API that generates tokens on demand, binding them to a specific audience while including an expiry date. The proposal details the implementation strategy, offers example code, and outlines test plans to validate its functionality.

![The image shows a person speaking in a video call and a screen displaying technical documentation about token requests and attenuations in an API.](https://kodekloud.com/kk-media/image/upload/v1752880476/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Kubernetes-Enhancement-Proposals-strongKEPsstrong/frame_340.jpg)

Below is an excerpt of the Go code defining the related structures:

```
type ProjectedVolumeSource struct {
    Sources     []VolumeProjection
    DefaultMode *int32
}


type VolumeProjection struct {
    Secret                      *SecretProjection              `json:"secret,omitempty"`
    DownwardAPI                 *DownwardAPIProjection         `json:"downwardAPI,omitempty"`
    ConfigMap                   *ConfigMapProjection           `json:"configMap,omitempty"`
    ServiceAccountToken         *ServiceAccountTokenProjection `json:"serviceAccountToken,omitempty"`
}


// ServiceAccountTokenProjection represents a projected service account token volume.
// This projection can be used to insert a service account token into the pod's runtime
// filesystem for use against APIs (Kubernetes API Server or otherwise).
type ServiceAccountTokenProjection struct {
    // Audience is the intended recipient identifier of the token.
    Audience string
    // ExpirationSeconds defines the desired token validity duration.
    // As the token nears expiration, the kubelet volume plugin will rotate it proactively.
    ExpirationSeconds int64
    // Path specifies the relative file path where the token will be projected.
    Path string
}
```

> [!important]
> **Note**
>
> The graduation criteria for each feature are clearly defined in the KEP. For example, the token request API started as an alpha feature in version 1.10, moved to beta in version 1.12, and is planned for GA in version 1.20.

## KEP Lifecycle

Each KEP undergoes a precise lifecycle that ensures proposals are thoroughly evaluated and tracked:

- **Provisional:** The proposal is defined and accepted by the SIG.
- **Implementable:** After validation by approvers, the KEP becomes ready for implementation.
- **Implemented:** The changes are fully integrated following successful implementation.
- **Deferred:** The KEP is deferred if no work is actively undertaken.
- **Rejected:** The proposal is rejected if it fails to meet necessary criteria.
- **Withdrawn:** The author withdraws the KEP.
- **Replaced:** The proposal is superseded by a new, updated KEP.

![The image shows a flowchart of different states: Provisional, Deferred, Implementable, Implemented, Withdrawn, and Rejected, with a person speaking in a video inset.](https://kodekloud.com/kk-media/image/upload/v1752880477/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Kubernetes-Enhancement-Proposals-strongKEPsstrong/frame_400.jpg)

This disciplined lifecycle process ensures every proposal is meticulously considered, implemented, and communicated to the Kubernetes community, contributing significantly to its robustness and continued evolution.

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/c5b96591-7106-4a51-abe1-d77b53e1a92c/lesson/3204c4b5-5a2d-4b8c-8ce8-784e46dd8722)**
>
> Watch video content
