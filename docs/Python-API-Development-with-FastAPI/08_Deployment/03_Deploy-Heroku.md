# Deploy Heroku - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Deployment/Deploy-Heroku)

---

## Table of Contents

- Deploy Heroku
  - Setting Up the Heroku CLI
  - Creating Your Heroku App
  - Pushing Code and Viewing Logs
  - Configuring the Procfile
  - Testing and Troubleshooting Your Deployment
  - Setting Up a PostgreSQL Database
  - Updating the Database Schema with Alembic
  - Pushing Updates to Production
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Deployment

# Deploy Heroku

In this lesson, we guide you through one of the primary methods for deploying your FastAPI application—using Heroku. With Heroku's simplicity and efficiency, you can launch your application and push updates quickly. We will cover installing the Heroku CLI, creating your Heroku app, configuring a Procfile, deploying your code, troubleshooting common issues, and managing your production PostgreSQL database using Alembic.

---

## Setting Up the Heroku CLI

Before you start the deployment, ensure you have the following prerequisites:

- A [Heroku account](https://www.heroku.com/).
- Git installed on your machine.
- The Heroku CLI installed.

Download the [Heroku CLI installer](https://devcenter.heroku.com/articles/heroku-cli) for your operating system. After installation, restart your terminal (or VS Code) for the changes to take effect. Verify the installation by running the following command:

```
sudo snap install heroku --classic
```

Next, log in to Heroku:

```
heroku login
```

Upon logging in (a web browser will open for authentication), confirm the installation with:

```
heroku --version
```

The output should resemble:

```
> Warning: heroku update available from 7.38.1 to 7.59.0.
heroku/7.38.1 win32-x64 node-v12.13.0
```

---

## Creating Your Heroku App

Heroku provides comprehensive tutorials (search for "Heroku Python" online) but here are the essential steps to create your app:

1.  If you're using your own application instead of the demo from the Heroku tutorial, skip the repository cloning.
2.  Create your app with the following command:

    ```
    heroku create
    ```

    This generates a globally unique random name and sets up a Git remote pointing to your Heroku app. Verify your Git remotes using:

    ```
    git remote -v
    ```

    You should see both your GitHub origin and a new Heroku remote. To deploy your code, simply push to Heroku:

    ```
    git push heroku main
    ```

For custom app names, execute:

```
heroku create fastapi-sanjeev
```

> [!important]
> **Note**
>
> App names must be globally unique. If the name is already in use, try a different name (e.g., append numbers).

After creating your app, visit your Heroku dashboard to see your newly created app, even if no resources are configured yet.

Below is an example image of a Heroku dashboard:

![The image shows a Heroku dashboard for an app named "fastapi-sanjeev," displaying sections for resources, deployment, metrics, and activity, with no add-ons or recent activity.](https://kodekloud.com/kk-media/image/upload/v1752883396/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Heroku/heroku-dashboard-fastapi-sanjeev.jpg)

---

## Pushing Code and Viewing Logs

To deploy your code to Heroku, push your application to the Heroku remote with:

```
git push heroku main
```

During deployment, Heroku installs dependencies, sets up the Python runtime (defaulting to python-3.9.7 unless specified otherwise), and builds your application. A successful build might output messages similar to:

```
remote: -----> Python app detected
remote: -----> Installing dependencies with pip
remote: -----> Launching...
remote: Released v3
remote: https://fastapi-sanjeev.herokuapp.com/ deployed to Heroku
```

If your browser opens the app URL and you encounter an error, it may indicate FastAPI has not been correctly set up for Heroku. To monitor the deployment process in real time, use the logs command:

```
heroku logs --tail
```

> [!important]
> **Warning**
>
> A "Boot timeout" error may mean that Heroku is unsure how to start your FastAPI application. Ensure your configuration is correct.

---

## Configuring the Procfile

Heroku requires a Procfile in your project's root directory to define how to run your application. Create a file named `Procfile` (with a capital P) and add the following line:

```
web: uvicorn app.main:app --host=0.0.0.0 --port=${PORT:-5000}
```

This command launches Uvicorn without the `--reload` flag (which is intended for development only) and instructs it to use the port provided by Heroku via the `PORT` variable (defaulting to 5000 if unspecified).

After updating your Procfile, add, commit, and push the changes to both GitHub and Heroku:

```
git add --all
git commit -m "Added Procfile for Heroku"
git push origin main
git push heroku main
```

Finally, restart your Heroku dynos to load the new configuration:

```
heroku ps:scale web=1
```

---

## Testing and Troubleshooting Your Deployment

After deploying the code, visit your app URL (e.g., https://fastapi-sanjeev.herokuapp.com/) to verify the application is running. If the app hangs or displays an error, check the logs using:

```
heroku logs --tail
```

Common issues include missing environment variables that were available in a local `.env` file. For example, your application may require variables such as:

```
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_PASSWORD=password123
DATABASE_NAME=fastapi
DATABASE_USERNAME=postgres
SECRET_KEY=9d25e094faa6ca255c818166b7a956b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Heroku does not automatically read a local `.env` file. You must manually set these Config Vars via the Heroku dashboard or CLI.

---

## Setting Up a PostgreSQL Database

If your application uses PostgreSQL, set up the database as follows:

1.  Create a free PostgreSQL instance (hobby-dev plan) using this command:

    ```
    heroku addons:create heroku-postgresql:hobby-dev
    ```

    Example output:

    ```
    Creating heroku-postgresql:hobby-dev on ⬢ fastapi-sanjeev... free
    Database has been created and is available
    Created postgresql-globular-04015 as DATABASE_URL
    Use heroku addons:docs heroku-postgresql to view documentation
    ```

2.  Navigate to your app’s **Settings > Config Vars** on the Heroku Dashboard. Notice that Heroku has automatically created a `DATABASE_URL` variable containing your PostgreSQL connection string.
3.  To work with individual environment variables (hostname, port, etc.), visit the Heroku PostgreSQL dashboard to retrieve the details, then add them as separate Config Vars:
    - `DATABASE_HOSTNAME`
    - `DATABASE_PORT` (default is 5432)
    - `DATABASE_USERNAME`
    - `DATABASE_PASSWORD`
    - `DATABASE_NAME`
    - Plus other variables such as `SECRET_KEY`, `ALGORITHM`, and `ACCESS_TOKEN_EXPIRE_MINUTES`.

Below is an example snippet using Pydantic for your settings:

```
from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: int
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int


    class Config:
        env_file = ".env"


settings = Settings()
```

After updating your Config Vars, restart your dyno:

```
heroku ps:restart
```

You can view your app's information by running:

```
heroku apps:info fastapi-sanjeev
```

The output will include details such as your app URL (Web URL), for example:

```
Web URL: https://fastapi-sanjeev.herokuapp.com/
```

---

## Updating the Database Schema with Alembic

Suppose your application uses Alembic for database migrations. In that case, your production PostgreSQL instance might start without tables. When you attempt to create a user or perform a database operation, you may encounter errors like:

```
sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "users" does not exist
```

To update your production database schema, run the Alembic migrations using:

```
heroku run "alembic upgrade head"
```

Monitor the output to ensure each migration—such as creating tables or adding columns—is applied successfully. You can verify the database schema with tools like pgAdmin afterward.

Below is an image showcasing the pgAdmin interface:

![The image shows a pgAdmin interface displaying database statistics, including server sessions, transactions per second, and tuples in/out, with a list of databases on the left.](https://kodekloud.com/kk-media/image/upload/v1752883398/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Heroku/pgadmin-database-statistics-interface.jpg)

After completing the migrations, restart the dynos:

```
heroku ps:restart
```

Now, your application should function correctly when accessing database tables. Test your app by navigating to its URL, or use tools like Postman. For instance, to create a new user, send a POST request with a JSON payload:

```
{
  "email": "user@example.com",
  "password": "string"
}
```

A successful creation (HTTP 201) might return:

```
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2021-09-03T02:32:11.802206+00:00"
}
```

Verify the new record in your database via your preferred PostgreSQL management tool.

Below is an updated Heroku dashboard image showing the app details and configuration variables:

![The image shows a Heroku dashboard for an app named "fastapi-sanjeev," displaying app information and configuration variables such as database URL, hostname, and secret key.](https://kodekloud.com/kk-media/image/upload/v1752883399/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Heroku/heroku-dashboard-fastapi-sanjeev-2.jpg)

Additionally, your Swagger UI (accessible at `/docs`) should list all your API endpoints:

![The image shows a Swagger UI interface displaying API endpoints for managing posts and users, including actions like GET, POST, PUT, and DELETE. It also includes an authentication section with a login endpoint.](https://kodekloud.com/kk-media/image/upload/v1752883400/notes-assets/images/Python-API-Development-with-FastAPI-Deploy-Heroku/swagger-ui-api-endpoints-posts-users.jpg)

---

## Pushing Updates to Production

When you update your application code or introduce new Alembic revisions, follow these steps:

1.  Commit and push your changes to GitHub:

    ```
    git add --all
    git commit -m "Describe your changes"
    git push origin main
    ```

2.  Deploy the changes to Heroku:

    ```
    git push heroku main
    ```

3.  If new migrations are included, apply them:

    ```
    heroku run "alembic upgrade head"
    ```

4.  Restart your dynos if necessary:

    ```
    heroku ps:restart
    ```

Your app should now reflect the latest updates.

---

## Conclusion

Congratulations! You have successfully deployed your FastAPI application to Heroku. You configured essential environment variables, set up a PostgreSQL database, applied Alembic migrations to update your schema, and learned how to deploy subsequent updates. Use these procedures as a foundation to further expand and enhance your application's functionality.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1af49f64-16e1-4559-841f-4b684c6a8f15/lesson/b1c24bfe-aabd-4cef-a766-493c618aa22b)**
>
> Watch video content
