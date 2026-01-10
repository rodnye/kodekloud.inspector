# Adding PostgreSQL Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/CICD/Adding-PostgreSQL-Database)

---

## Table of Contents

- Adding PostgreSQL Database
  - Example 1: Basic PostgreSQL Service Configuration
  - Example 2: Using a Different Container Image and Health Command
  - Example 3: Running PostgreSQL Directly as the Container
  - Passing Environment Variables and Custom Database Names
  - Running Tests and Verifying the Setup
  - Watch Video

---

## Content

Python API Development with FastAPI

CICD

# Adding PostgreSQL Database

In this article, you'll learn how to set up a PostgreSQL database on a GitHub Actions runner by leveraging a service container. Using Docker containers for PostgreSQL is a straightforward approach that avoids the complexities of installing the database directly on the runner.

Below are several examples detailing how to configure your GitHub Actions workflow to spin up a PostgreSQL container as part of your continuous integration (CI) process.

---

## Example 1: Basic PostgreSQL Service Configuration

This example demonstrates defining a job that runs on an Ubuntu runner with a Node.js container. Under the job’s services, a PostgreSQL container is specified with the required environment variables and health checks. GitHub Actions automatically starts this service container before executing the job steps.

```
name: PostgreSQL service example


on: push


jobs:
  container-job:
    # A container job running on an Ubuntu runner with a Node.js container
    runs-on: ubuntu-latest
    container: node:10.18-jessie


    services:
      postgres:
        # The label used to access the service container
        image: postgres
        # Specify the PostgreSQL password
        env:
          POSTGRES_PASSWORD: postgres
        options: |
          --health-checks
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5


    steps:
      # Download a copy of the repository before running CI tests
      - name: Check out repository code
        uses: actions/checkout@v2


      # Install dependencies from package.json
      - name: Install dependencies
        run: npm install


      # Run a script that creates a PostgreSQL table, populates it with data, and retrieves the data
      - name: Connect to PostgreSQL
        run: node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: ${{ 5432 }}
```

---

## Example 2: Using a Different Container Image and Health Command

In this configuration, a more recent Node.js container image is used alongside an explicit health command (`--health-cmd pg_isready`) to check if PostgreSQL is ready. This setup ensures that your tests run only after PostgreSQL has fully started.

```
name: PostgreSQL service example


on: push


jobs:
  container-job:
    # Container jobs must run on Linux-based systems
    runs-on: ubuntu-latest
    container:
      image: node:18-jetson

    services:
      postgres:
        # Label used to access the service container
        image: postgres
        # Specify the PostgreSQL password
        env:
          POSTGRES_PASSWORD: postgres
        # Wait until PostgreSQL is ready using health checks
        options: >
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5


    steps:
      # Download a copy of the repository before running tests
      - name: Check out repository code
        uses: actions/checkout@v2

      # Install dependencies as defined in package.json
      - name: Install dependencies
        run: npm install


      # Connect to PostgreSQL by executing the client script
      - name: Connect to PostgreSQL
        run: |
          # Run a script that creates a PostgreSQL table, inserts data, and retrieves the data.
          node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: ${{ 5432 }}
```

---

## Example 3: Running PostgreSQL Directly as the Container

Sometimes, you may run the PostgreSQL image directly as your container. In this case, environment variables and health checks are specified at the container level, and dependencies are installed using a clean installation with `npm ci`.

```
name: PostgreSQL service example


on: push


jobs:
  container-job:
    # Running on Linux with PostgreSQL as the primary container image
    runs-on: ubuntu-latest
    container:
      image: postgres
      # Include cleanup flag and health check options
      options: |
        --rm
        --health-cmd pg_isready
        --health-interval 10s
        --health-timeout 5s
        --health-retries 5
    env:
      POSTGRES_PASSWORD: postgres


    steps:
      - name: Checkout code
        uses: actions/checkout@v2


      - name: Install dependencies
        run: npm ci


      - name: Connect to PostgreSQL
        run: |
          # Execute a script that creates a PostgreSQL table, populates it, and retrieves data.
          node client.js
        env:
          POSTGRES_HOST: localhost
          POSTGRES_PORT: 5432
```

---

## Passing Environment Variables and Custom Database Names

You can pass environment variables into the Docker container to configure settings such as the PostgreSQL password or database name. In the following example, a custom database (e.g., FastAPI_test) is automatically created to match the settings expected by your code.

```
name: testing


env:
  DATABASE_HOSTNAME: ${{ secrets.DATABASE_HOSTNAME }}
  DATABASE_PORT: ${{ secrets.DATABASE_PORT }}
  DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
  DATABASE_NAME: ${{ secrets.DATABASE_NAME }}
  DATABASE_USERNAME: ${{ secrets.DATABASE_USERNAME }}
  SECRET_KEY: ${{ secrets.SECRET_KEY }}
  ALGORITHM: ${{ secrets.ALGORITHM }}
  ACCESS_TOKEN_EXPIRE_MINUTES: ${{ secrets.ACCESS_TOKEN_EXPIRE_MINUTES }}


services:
  postgres:
    image: postgres
    env:
      POSTGRES_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
      POSTGRES_DB: ${{ secrets.DATABASE_NAME }}_test
    ports:
      - 5432:5432
    options:
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5


runs-on: ubuntu-latest


steps:
  - name: Pull repository code
    uses: actions/checkout@v2
  - name: Install Python 3.9
    uses: actions/setup-python@v2
```

> [!important]
> **Note**
>
> In this YAML configuration, the port mapping for PostgreSQL is hardcoded as `5432:5432`. Although you might consider using variables for flexibility, GitHub Actions requires these values to be specified explicitly.

If you need to explicitly specify the health check options elsewhere, refer to the following snippet:

```
options:
  --health-cmd "pg_isready"
  --health-interval 10s
  --health-timeout 5s
  --health-retries 5
```

Ensure that the spacing and indentation in your YAML file are correct. Using an auto-formatter or a VS Code extension for YAML can help maintain proper syntax.

---

## Running Tests and Verifying the Setup

After setting up your PostgreSQL service, your CI pipeline will automatically pull your code, install dependencies, and run tests using frameworks like pytest. Below is an example of console output indicating successful test execution:

```
Collecting pytest
  Downloading pytest-6.2.5-py3-none-any.whl (280 kB)
Collecting pluggy<1.0,>=0.12
  Downloading pluggy-0.13.1-py2.py3-none-any.whl (18 kB)
Collecting iniconfig<2.0.0,>=1.0.0
  Downloading iniconfig-1.1.1-py2.py3-none-any.whl (5.8 kB)
Collecting attrs>=19.2.0
  Downloading attrs-21.2.0-py2.py3-none-any.whl (59 kB)
Collecting packaging>=20.0
  Downloading packaging-21.0-py3-none-any.whl (38 kB)
Collecting pyparsing>=2.0.3
  Downloading pyparsing-2.4.7-py2.py3-none-any.whl (67 kB)
Installing collected packages: pyparsing, pluggy, iniconfig, attrs, pytest
Successfully installed attrs-21.2.0 iniconfig-1.1.1 packaging-21.0 pluggy-0.13.1 pytest-6.2.5
platform linux -- Python 3.9.7, pytest-6.2.5, py-1.10.0, pluggy-1.0.0
collected 46 items
tests/test_calculations.py ............ [ 32%]
tests/test_posts.py ............... [ 70%]
tests/test_users.py ......... [ 78%]
tests/test_votes.py ....... [ 100%]


============ warnings summary ============
../../../../opt/hostedtoolcache/Python/3.9.7/x64/lib/python3.9/site-packages/py/pa.BaseCode/__pycache__/os.py:10
  DeprecationWarning: `getrun` decorator is deprecated since Python 3.8, use `async def` instead
Docs: https://docs.pytest.org/en/stable/warnings.html
```

The logs above show that all 46 tests passed successfully and that PostgreSQL was ready for connection before the tests ran. A more detailed pytest run might include warnings similar to the snippet below:

```
job1
succeeded now in 9s
  * update pip
  * install all dependencies
  * test with pytest
...
===================================================== test session starts ===================================================
platform linux -- Python 3.9.7, pytest-6.2.5, pluggy-1.0.0
rootdir: /home/runner/work/your-repo
collected 46 items


tests/test_calculations.py ..                                               [  4%]
tests/test_posts.py ....                                                  [ 15%]
tests/test_users.py ....                                                  [ 26%]
tests/test_votes.py ...                                                   [ 30%]
====================================================== warnings summary =====================================================
tests/test_calculations.py:10
  DeprecationWarning: `asyncio` decorator is deprecated since Python 3.8, use `async def` instead
```

This automated CI pipeline pulls your code, installs dependencies, and runs your tests, ensuring that the PostgreSQL service is fully operational before any database interactions occur.

---

With these configurations, you've successfully integrated PostgreSQL into your CI pipeline and verified connectivity through your tests. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/4979410a-af57-460b-8f71-5a177fa10d2d/lesson/a2d250f7-bbaf-4308-ac79-2613b69a1de0)**
>
> Watch video content
