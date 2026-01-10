# Scaffolding a New React APP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Frontend/Scaffolding-a-New-React-APP)

---

## Table of Contents

- Scaffolding a New React APP
  - Creating the React Application
  - Exploring the Project Structure
  - Watch Video

---

## Content

AI-Assisted Development

Development Phase Frontend

# Scaffolding a New React APP

In this lesson, we explore a modern approach to building applications. Previously, we utilized external tools such as ChatGPT's web interface, BlackboxAI's web interface, and various Visual Studio extensions, including GitHub Copilot, Tabnine, and BlackboxAI, all within Visual Studio Code. Now, we are transitioning to Cursor.

Cursor is a standalone IDE—a fork of Visual Studio Code—that offers a familiar environment with enhanced capabilities. It provides a self-contained, immersive coding experience that allows you to dive directly into development and experimentation.

We begin with the ImageOptimizer folder open, which houses our previously built Python application (ImageOptimizer.app). Although the Python app remains active in the background, our attention now shifts to creating a new React application.

To scaffold this new React app, Cursor leverages plain English commands. When you ask, "How do you create a new React app?", Cursor presents you with two options: the traditional Create React App method and the faster, modern method using Vite.

Below is a listing of our current directory contents for reference:

```
jeremy@Jerymys-Mac-Studio imageoptimizer % ls
LICENSE    README.md    imageoptimizer.app    imageoptimizer.web    samples
```

We will choose the NPX approach with Vite to create our new React application. This streamlined method will eventually interface with our Python API, and even beginners will find the process straightforward.

> [!important]
> **Note**
>
> Cursor recommends Vite due to its superior performance and modern features.

## Creating the React Application

Execute the following command to scaffold your React app:

```
npm create vite@latest imageoptimizer.web --template react
```

After the project has been created, change into the new directory and install the required dependencies:

```
cd imageoptimizer.web
npm install
```

If you encounter issues related to cache folders with root-owned files from previous npm versions, update npm accordingly before moving forward.

Once the installation completes, start the development server with:

```
npm run dev
```

Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/). You should see the Vite with React welcome page featuring a counter component, confirming that your application is running correctly.

## Exploring the Project Structure

The key files in the project include `app.css`, `app.jsx`, and `index.jsx`, among others. Below is an excerpt from the default `App.jsx` file to give you a glimpse of the setup:

```
function App() {
  return (
    <div className="App">
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR.
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  );
}
```

After starting the development server, your terminal should output something similar to this:

```
VITE v5.4.11  ready in 105 ms


Local:   http://localhost:5173/
Network: use --host to expose
press h to enter to show help
```

At this point, you have successfully scaffolded a complete React application with Vite, ready for further development. Up next, we will integrate this user interface with the backend Python application built earlier.

> [!important]
> **Next Steps**
>
> Stay tuned for the next lesson where we add UI components and connect our React front end with the backend Python API.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/3de5744a-0525-41be-b6cf-f2e4881e2790/lesson/bf8e96c3-15df-4b05-8e9e-a595c35b4389)**
>
> Watch video content
