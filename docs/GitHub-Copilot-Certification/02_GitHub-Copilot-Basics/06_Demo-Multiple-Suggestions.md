# Demo Multiple Suggestions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/GitHub-Copilot-Basics/Demo-Multiple-Suggestions)

---

## Table of Contents

- Demo Multiple Suggestions
  - Overview
  - Accessing Multiple Suggestions
  - Base Code: Traffic Light Functions
  - Example 1: Adding calculate_area
  - Example 2: Simulating an API Request
  - Example 3: Implementing QuickSort
  - Tips for Choosing Suggestions
  - Links and References
  - Watch Video

---

## Content

GitHub Copilot Certification

GitHub Copilot Basics

# Demo Multiple Suggestions

## Overview

Unlock GitHub Copilot’s power to explore and choose from multiple AI-generated code completions. This feature enhances productivity by letting you compare different implementations and pick the one that best fits your style and requirements.

## Accessing Multiple Suggestions

Use the following shortcut to open the suggestions panel:

| Platform        | Shortcut     |
| --------------- | ------------ |
| Windows / Linux | `Alt + ]`    |
| macOS           | `Option + ]` |

Once the panel appears, browse suggestions with the same shortcut and press `Tab` to insert your chosen snippet.

> [!important]
> **Tip**
>
> Use `Alt + [` (or `Option + [`) to navigate back to the previous suggestion.

## Base Code: Traffic Light Functions

Start with these core functions in your file:

```
def get_light_state(direction, cycle_timer):
    if direction == 'north':
        if cycle_timer < NS_GREEN_DURATION + NS_YELLOW_DURATION:
            return 'red'
        elif cycle_timer < NS_GREEN_DURATION + NS_YELLOW_DURATION + EW_GREEN_DURATION:
            return 'green'
        else:
            return 'yellow'


def draw_traffic_light(surface, direction, state):
    """
    Draws a circular traffic light for a given direction at a fixed offset from the intersection.
    """
    if direction == 'north':
        pos = (CENTER_X, STOP_LINE['north'] - LIGHT_OFFSET)
    elif direction == 'south':
        pos = (CENTER_X, STOP_LINE['south'] + LIGHT_OFFSET)
    elif direction == 'east':
        pos = (STOP_LINE['east'] - LIGHT_OFFSET, CENTER_Y)
    elif direction == 'west':
        pos = (STOP_LINE['west'] + LIGHT_OFFSET, CENTER_Y)
    # Drawing logic goes here...
```

With these helpers, you’re ready to add new features using Copilot’s multiple suggestions.

## Example 1: Adding `calculate_area`

Type this stub and invoke the suggestions panel:

```
def calculate_area(shape):
    """Calculate the area of a rectangle or circle."""
```

A sample completion might be:

```
def calculate_area(shape):
    """Calculate the area of a rectangle or circle."""
    if shape == 'rectangle':
        return CAR_SIZE['vertical'][0] * CAR_SIZE['vertical'][1]
    elif shape == 'circle':
        return 3.14 * (LIGHT_RADIUS ** 2)
    else:
        raise ValueError("Invalid shape type. Use 'rectangle' or 'circle'.")
```

Press `Tab` to insert the version you like.

## Example 2: Simulating an API Request

Ask Copilot for a basic API stub:

```
import random


def api_request():
    """
    Simulate a simple API request.
    Replace this with real network logic as needed.
    """
    return random.choice(['north', 'south', 'east', 'west'])
```

Explore suggestions that include error handling, retries, or logging.

## Example 3: Implementing QuickSort

Comment your goal and trigger multiple completions:

```
# implement quicksort algorithm
```

An efficient suggestion could be:

```
def quicksort(arr):
    """Sort an array using the QuickSort algorithm."""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
```

Insert your preferred snippet with `Tab`.

> [!important]
> **Warning**
>
> Review all AI-generated code carefully. Ensure it meets your performance, security, and style guidelines before merging.

## Tips for Choosing Suggestions

- Review each completion for correctness and readability.
- Browse beyond the first suggestion to discover alternative approaches.
- Compare implementations side by side to select the best fit.
- Adapt accepted code to align with your project’s conventions and standards.

## Links and References

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [GitHub Copilot Labs](https://github.com/github/feedback/discussions/categories/copilot-labs)
- [Python Official Website](https://www.python.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/3d32a217-aca3-450a-882e-c9304c497387/lesson/13de1854-6822-41d6-be64-633095357250)**
>
> Watch video content
