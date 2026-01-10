# Using Yahoo Finance News Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Using-Tools/Using-Yahoo-Finance-News-Tool)

---

## Table of Contents

- Using Yahoo Finance News Tool
  - Overview
  - Initialization
  - Fetching News for a Symbol
  - How It Works
  - Use Cases
  - References
  - Watch Video
    - Example Output

---

## Content

LangChain

Using Tools

# Using Yahoo Finance News Tool

## Overview

The Yahoo Finance News Tool fetches the latest headlines and market data for any stock symbol directly from [Yahoo Finance](https://finance.yahoo.com/). It’s perfect for finance-related agents and applications that require real-time insights before making decisions.

![The image shows a Yahoo Finance webpage displaying stock information for NVIDIA Corporation (NVDA), including current and after-hours prices, market data, and a summary of financial metrics.](https://kodekloud.com/kk-media/image/upload/v1752881036/notes-assets/images/LangChain-Using-Yahoo-Finance-News-Tool/yahoo-finance-nvidia-stock-info.jpg)

## Initialization

First, import and instantiate the tool in your Python script:

```
from langchain_community.tools.yahoo_finance_news import YahooFinanceNewsTool

tool = YahooFinanceNewsTool()
```

## Fetching News for a Symbol

Call the `run` method with a stock ticker to retrieve the top news summary:

```
res = tool.run("NVDA")
print(res)
```

### Example Output

```
Nvidia (NVDA) Rises But Trails Market: What Investors Should Know
Nvidia (NVDA) closed at $877.57 in the latest trading session, marking a +0.03% move from the prior day.
```

## How It Works

Under the hood, the tool scrapes Yahoo Finance’s News page for your specified symbol (e.g., “NVDA”) and returns:

- Top headlines
- A brief summary of price movements and key financial metrics

> [!important]
> **Note**
>
> This tool makes live HTTP requests to Yahoo Finance. Excessive usage may trigger rate limiting or IP bans.

## Use Cases

| Use Case             | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| Agent Workflows      | Provide agents with up-to-date market news before trading.  |
| Financial Dashboards | Display real-time headlines and stock summaries in your UI. |
| Trading Signals      | Integrate news-driven signals into algorithmic strategies.  |

## References

- [Yahoo Finance](https://finance.yahoo.com/)
- [LangChain Community Tools](https://github.com/langchain-ai/langchain-community)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/06905b96-585d-4c9e-835a-d8fcaca76e2a/lesson/4bc275cc-00ed-474e-b48c-dc83b001b510)**
>
> Watch video content
