# Deployment Strategy Blue Green - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Deployment-Strategy-Blue-Green)

---

## Table of Contents

- Deployment Strategy Blue Green
  - Blue-Green Deployment Strategy
  - Watch Video
    - How Blue-Green Deployment Works with Kubernetes
    - Blue Deployment Example

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Deployment Strategy Blue Green

In this article, we explore the Blue-Green deployment strategy—a method that complements the previously discussed Recreate and Rolling Update strategies.

Earlier, we reviewed two common deployment methods:

1.  **Recreate Strategy:**  
    The old version of the application is completely shut down before deploying the new version. This results in temporary unavailability for users during the transition.
2.  **Rolling Update Strategy:**  
    Instances of the old version are gradually replaced with newer ones one at a time. This approach minimizes downtime and facilitates a smoother upgrade process. Many systems default to this strategy.

Beyond these approaches, Kubernetes also allows you to implement deployment patterns using its native primitives, such as blue-green and canary deployments. In this guide, we focus on blue-green deployments.

## Blue-Green Deployment Strategy

Blue-green deployment leverages two production environments:

- **Blue Environment:** Runs the current or stable version of the application.
- **Green Environment:** Hosts the new version that is being prepared and tested.

Initially, 100% of user traffic is directed to the blue environment. The green environment is then set up with the new version, tested, and validated. Once testing confirms that the green version meets quality standards, traffic is switched over to it with a single update.

This strategy can be implemented using service meshes like [Istio Service Mesh](https://learn.kodekloud.com/user/courses/istio-service-mesh) for more granular traffic control. Alternatively, you can achieve blue-green deployment using native Kubernetes components such as Deployments and Services.

> [!important]
> **Key Insight**
>
> Blue-green deployment minimizes risk by allowing testing of a new release in a live but isolated environment before directing all user traffic to it.

### How Blue-Green Deployment Works with Kubernetes

1.  **Deploy the Blue Version (Current Production):**  
    Deploy the original application version as the blue deployment with a label (e.g., `version: v1`). A Kubernetes Service is created with a selector that matches this label, ensuring that all user traffic is routed to the blue Pods.
2.  **Deploy the Green Version (New Release):**  
    Deploy a separate green deployment that includes the new application version. Label these Pods with `version: v2`. Although both blue and green deployments run concurrently, the Service continues routing traffic based on the label selector, initially favoring the blue version.
3.  **Switch Traffic After Testing:**  
    After thorough testing confirms that the green version is stable, update the Service’s label selector to point from `version: v1` to `version: v2`. This update directs all incoming traffic to the green Pods, effectively switching the live environment.

### Blue Deployment Example

The following YAML file defines the Service that initially directs traffic to the blue version:

```
# service-definition.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    version: v1
```

Here is the deployment definition for the blue version:

```
# myapp-blue.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-blue
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 5
  selector:
    matchLabels:
      version: v1
  template:
    metadata:
      labels:
        version: v1
    spec:
      containers:
        - name: app-container
          image: myapp-image:1.0
```

After the blue version is deployed and receiving all user traffic, you can deploy the green version by creating a similar deployment with the updated image (for example, `myapp-image:2.0`) and labeling it as `version: v2`.

Once the green version has been rigorously tested, update the Service to switch traffic to it:

```
# Updated service-definition.yaml to route traffic to the green version
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    version: v2
```

This change ensures that all incoming traffic will now be routed to the green deployment, completing the blue-green transition.

![The image illustrates a Blue/Green deployment strategy with two versions, v1 (blue) and v2 (green), managed by a service.](https://kodekloud.com/kk-media/image/upload/v1752871250/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Deployment-Strategy-Blue-Green/frame_170.jpg)

![The image illustrates a blue/green deployment strategy, showing two versions (v1 and v2) with a service directing traffic to version v2.](https://kodekloud.com/kk-media/image/upload/v1752871251/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Deployment-Strategy-Blue-Green/frame_180.jpg)

> [!important]
> **Conclusion**
>
> By utilizing blue-green deployments, you can reduce downtime and mitigate risks during application updates by ensuring the new version is fully tested before it takes over production traffic.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/ace0df47-d390-4f27-8745-365de5febbc3)**
>
> Watch video content
