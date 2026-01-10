# Demo Scaling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Networks-Services-Routes-and-Scaling/Demo-Scaling)

---

## Table of Contents

- Demo Scaling
  - Overview
  - Deploying the Application on OpenShift
  - Scaling the Application
  - Changing the Load Balancing Strategy
  - Conclusion
  - Watch Video

---

## Content

OpenShift 4

Networks Services Routes and Scaling

# Demo Scaling

Hello and welcome to this comprehensive lesson on scaling applications in OpenShift. In this guide, we will demonstrate how to deploy a simple web application, scale it up or down, and observe the impact on routes. This hands-on tutorial is ideal for beginners who want to understand OpenShift scaling concepts.

## Overview

We are using a colorful application named "simple-webapp-color." This application, hosted in a Git repository, displays a web page with a randomly selected background color upon its first startup.

![The image shows a GitLab project page for "simple-webapp-color," displaying options for repository management, CI/CD setup, and project details. An alert at the top indicates the need to add an SSH key for code operations.](https://kodekloud.com/kk-media/image/upload/v1752882673/notes-assets/images/OpenShift-4-Demo-Scaling/gitlab-simple-webapp-color-project.jpg)

The following Python code snippet outlines the application's implementation using Flask:

```
import os
from flask import Flask, render_template
import socket
import random

app = Flask(__name__)

color_codes = {
    "red": "#e74c3c",
    "green": "#16a085",
    "blue": "#2980b9",
    "pink": "#e91e63",
    "darkblue": "#1f3f40",
    "blue2": "#3498db"  # Added a definition for 'blue2' to ensure technical accuracy
}

color = os.environ.get('APP_COLOR') or random.choice(list(color_codes.keys()))

@app.route("/")
def main():
    print(color)
    return render_template('hello.html', name=socket.gethostname(), color=color_codes[color])

@app.route('/color/<new_color>')
def new_color(new_color):
    if new_color in color_codes:
        return render_template('hello.html', name=socket.gethostname(), color=color_codes[new_color])
    return "Color not defined", 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

> [!important]
> **Note**
>
> Deploying multiple instances of this application means that each instance may display a different background color.

## Deploying the Application on OpenShift

Next, navigate to your OpenShift cluster and create a new project to host the application. Add a new Python app to the project, assign a unique name, and link the Git repository containing your code. Once you click "Create," the application deployment begins.

![The image shows an OpenShift Origin web console where a Python application named "webapp-color" is being created in "Web Application 2." The interface displays a progress bar with steps labeled Information, Configuration, and Results.](https://kodekloud.com/kk-media/image/upload/v1752882674/notes-assets/images/OpenShift-4-Demo-Scaling/openshift-web-console-python-app-creation.jpg)

After deployment completes, the application becomes accessible through a provided route in your browser. Initially, you should see a red background along with the name of the host running the application.

![The image shows a web browser displaying a red background with the text "Hello from webapp-color-1-pl829!" in white. The browser tab is labeled "Hello from Flask."](https://kodekloud.com/kk-media/image/upload/v1752882674/notes-assets/images/OpenShift-4-Demo-Scaling/webapp-color-1-hello-flask.jpg)

## Scaling the Application

To scale the application, click the up arrow in the OpenShift web console to increase the number of replicas. This action adds a new replica that automatically joins the service based on the deployment configuration’s selector. Consequently, the incoming load is distributed among all available pods.

![The image shows the OpenShift Origin web console displaying details of a project named "webapp-color," including deployment configurations, container information, and networking details. It indicates that there are 2 pods running for this application.](https://kodekloud.com/kk-media/image/upload/v1752882676/notes-assets/images/OpenShift-4-Demo-Scaling/openshift-origin-web-console-webapp-color.jpg)

When you access the application using an incognito browser window, you’ll see that the page served originates from the new replica—now displaying a dark blue background—while the original window continues to show the initial replica. This behavior confirms that requests are being directed to specific instances based on session persistence.

> [!important]
> **Sticky Sessions Explained**
>
> This behavior is a result of sticky sessions, which by default are implemented using the source load balancing strategy on the route. The user’s IP address is recorded, ensuring subsequent requests are sent to the same application instance.

## Changing the Load Balancing Strategy

To distribute traffic more evenly across your application instances, you need to update the load balancing strategy and disable session cookies. This configuration change ensures that incoming requests are distributed via a round-robin mechanism rather than being sticky to one instance.

In the OpenShift web console, select your application route and choose "Edit YAML." Under the Annotations section, add the following properties:

```
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  annotations:
    haproxy.router.openshift.io/balance: roundrobin
    haproxy.router.openshift.io/disable_cookies: ""
    openshift.io/generated-by: OpenShiftWebConsole
    openshift.io/host: generated: 'true'
  labels:
    app: webapp-color
    name: webapp-color
    namespace: web-application-2
    resourceVersion: '104797'
    selfLink: /apis/route.openshift.io/v1/namespaces/web-application-2/routes/webapp-color
    uid: d62472aa-4d5f-11e8-aaf2-e8e9da82d1a9
spec:
  host: webapp-color-web-application-2.192.168.99.100.nip.io
  targetPort: 8080-tcp
  kind: Service
  name: webapp-color
  weight: 100
  wildcardPolicy: None
status:
  ingress:
```

After saving the configuration, refresh your browser. You will now observe a round-robin distribution, with each request being directed to a different application instance. Adjusting the number of replicas will scale your application up or down as needed.

![The image shows a webpage from the OpenShift documentation, specifically detailing route-specific annotations with a table listing variables, descriptions, and default environment variables.](https://kodekloud.com/kk-media/image/upload/v1752882677/notes-assets/images/OpenShift-4-Demo-Scaling/openshift-route-annotations-table.jpg)

## Conclusion

In this lesson, you learned how to deploy and scale a web application in OpenShift, manage sessions with different load balancing strategies, and modify route configurations to improve traffic distribution. Scalable application deployment is fundamental in managing execution loads and ensuring balanced resource usage.

We hope you found this tutorial helpful. Continue exploring OpenShift for more advanced scaling and deployment techniques!

Happy scaling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/ec611802-285c-4fb9-b13e-26eb84f4ec7d/lesson/b3d4170a-4ff7-4a1d-af42-60ec5e991754)**
>
> Watch video content
