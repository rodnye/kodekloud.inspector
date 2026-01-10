# Using Widgets in Jupyter Notebook - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Building-an-Interactive-Chatbot/Using-Widgets-in-Jupyter-Notebook)

---

## Table of Contents

- Using Widgets in Jupyter Notebook
  - Table of Contents
  - Prerequisites
  - Step 1: Install and Enable Panel
  - Step 2: Import Panel and Define Widgets
  - Step 3: Create an Event Handler
  - Step 4: Display Widgets in a Layout
  - Widget Reference Table
  - Additional Resources
  - Watch Video

---

## Content

Mastering Generative AI with OpenAI

Building an Interactive Chatbot

# Using Widgets in Jupyter Notebook

Enhance your Jupyter Notebook with interactive widgets and layouts using [Panel](https://panel.holoviz.org/). Panel makes it easy to build dynamic interfaces directly in your notebook, turning static analyses into interactive explorations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1: Install and Enable Panel](#step-1-install-and-enable-panel)
- [Step 2: Import Panel and Define Widgets](#step-2-import-panel-and-define-widgets)
- [Step 3: Create an Event Handler](#step-3-create-an-event-handler)
- [Step 4: Display Widgets in a Layout](#step-4-display-widgets-in-a-layout)
- [Widget Reference Table](#widget-reference-table)
- [Additional Resources](#additional-resources)

## Prerequisites

- Jupyter Notebook (or [JupyterLab](https://jupyterlab.readthedocs.io/))
- Python 3.7+
- Panel library

> [!important]
> **Note**
>
> If you haven’t installed Panel yet, run:
>
> ```
> pip install panel
> ```

## Step 1: Install and Enable Panel

Start your notebook and enable Panel’s extension:

```
import panel as pn


# Activate Panel in this notebook
pn.extension()
```

## Step 2: Import Panel and Define Widgets

Create a text input and a button. The text input will display the click count.

```
# TextInput widget initialized with a default message
text_input = pn.widgets.TextInput(value='Ready')


# Button widget with a primary style
button = pn.widgets.Button(name='Click me', button_type='primary')
```

## Step 3: Create an Event Handler

Define a callback function to update the text input whenever the button is clicked:

```
def increment_clicks(event):
    """Update the text_input value based on button.clicks."""
    text_input.value = f'Clicked {button.clicks} times'


# Register the handler
button.on_click(increment_clicks)
```

## Step 4: Display Widgets in a Layout

Arrange the button and text input side by side using `pn.Row`:

```
# Render the widgets in a single row
pn.Row(button, text_input)
```

After running the cell above, you’ll see:

- A **Click me** button
- A text box initially showing **Ready**

Each click updates the text box to reflect the total number of clicks, demonstrating a simple interactive interface.

## Widget Reference Table

| Widget    | Purpose                            | Key Property            |
| --------- | ---------------------------------- | ----------------------- |
| TextInput | Display and update dynamic text    | `value='Ready'`         |
| Button    | Capture and respond to user clicks | `button_type='primary'` |

## Additional Resources

- Panel Documentation: https://panel.holoviz.org/
- JupyterLab: https://jupyterlab.readthedocs.io/

Build on this pattern to create dashboards, data explorers, and more within your Jupyter environment!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/36c56a19-11f6-4db1-8bd7-bd6a96c82268/lesson/e92757cb-5675-4502-a171-1319ab63937b)**
>
> Watch video content
