# Processes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Processes)

---

## Table of Contents

- Processes
  - Watch Video

---

## Content

12 Factor App

Twelve Factor App methodology

# Processes

In this article, we explore the design of stateless processes as defined in the [12 Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) methodology. A stateless process shares nothing, a principle that is critical for scaling applications and maintaining consistency when multiple processes are running concurrently.

Suppose we want to implement a new feature that displays the visitor count on our website. Each time a visitor accesses the page, the application should update and display the total visit count. Initially, we modify our code to include a global variable that tracks the number of visits, incrementing it with every incoming request:

```
from flask import Flask
app = Flask(__name__)
visitCount = 0


@app.route('/')
def welcomeToKodeKloud():
    global visitCount
    visitCount += 1
    return "Welcome to KODEKLOUD! Visitor Count: " + str(visitCount)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

This solution works perfectly when running a single process because the visit count is stored within that process's memory. However, when multiple instances are deployed, each process maintains its own independent version of the variable. Consequently, visitors might see different counts depending on which process handles their request.

A similar challenge arises with session-specific data. For instance, when a user logs in, session details (like user location and session expiration) are stored in the server's memory. If subsequent requests are routed to a different process, the session information may be missing and the user might be inadvertently logged out.

> [!important]
> **Sticky Sessions Limitation**
>
> Even though load balancers can use session-aware mechanisms (sticky sessions) to direct a user to the same process, this approach is unreliable. In case of a process failure, any locally stored data is lost.

![The image illustrates a sticky session concept with three containers showing different visit counts, indicating session persistence for a user across server instances.](https://kodekloud.com/kk-media/image/upload/v1752856840/notes-assets/images/12-Factor-App-Processes/frame_90.jpg)

This scenario emphasizes a core principle of the 12-Factor methodology: processes must be stateless and share nothing. Relying on sticky sessions contradicts this principle. Instead, all state information should be stored in external backing services, allowing all processes to access uniform data regardless of which instance handles a given request.

![The image discusses the twelve-factor app methodology, emphasizing stateless, share-nothing processes and advising against using sticky sessions.](https://kodekloud.com/kk-media/image/upload/v1752856841/notes-assets/images/12-Factor-App-Processes/frame_110.jpg)

A typical solution is to use an external service, such as a database or caching system like [Redis](https://redis.io), for persistent state or session data. To implement this approach, we modify our application so that the visit count is maintained in a Redis database rather than in the process's memory:

```
from flask import Flask
from redis import Redis


app = Flask(__name__)
redisDb = Redis(host='redis-db', port=6380)


@app.route('/')
def welcomeToKodeKloud():
    redisDb.incr('visitorCount')
    visitCount = str(redisDb.get('visitorCount'), 'utf-8')
    return "Welcome to KODEKLOUD! Visitor Count: " + visitCount


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

With this updated implementation, the application scales seamlessly. Multiple instances can operate concurrently, all accessing the same consistent state through the centralized Redis database. This design adheres to the 12-Factor principle of statelessness and ensures your application remains robust and scalable in dynamic environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/9cc068ad-ee1c-4577-879d-d32f93b73885)**
>
> Watch video content
