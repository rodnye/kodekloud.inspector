# Building a Real time Flight Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Building-Agents/Building-a-Real-time-Flight-Agent)

---

## Table of Contents

- Building a Real time Flight Agent
  - 1. Obtain Your FlightAware API Key
  - 2. Install Dependencies
  - 3. Create the get_flight_status Tool
  - 4. Build the LangChain Agent
  - 5. Calculate Post-Arrival Times
  - Conclusion
  - Links and References
  - Watch Video
    - 3.1 Test the Tool
    - 4.1 Query Flight Status

---

## Content

LangChain

Building Agents

# Building a Real time Flight Agent

In this tutorial, you’ll create an AI agent that delivers real-time flight updates by integrating with [FlightAware’s AeroAPI](https://flightaware.com/commercial/aeroapi/). You’ll walk through:

- Registering and securing your AeroAPI key
- Building a custom LangChain tool for live flight status
- Assembling a React-style agent that uses both your tool and a Python REPL

## 1\. Obtain Your FlightAware API Key

Sign up for a free account at [FlightAware](https://flightaware.com) to access global flight data:

![FlightAware website interface showing flight search options.](https://kodekloud.com/kk-media/image/upload/v1752880939/notes-assets/images/LangChain-Building-a-Real-time-Flight-Agent/flightaware-webpage-flight-tracking-options.jpg)

Track flights on an interactive map:

![Interactive worldwide flight traffic map with aircraft icons over North America.](https://kodekloud.com/kk-media/image/upload/v1752880940/notes-assets/images/LangChain-Building-a-Real-time-Flight-Agent/worldwide-flight-traffic-map-north-america.jpg)

Once registered, visit your [AeroAPI dashboard](https://flightaware.com/aeroapi/dashboard), generate a new key, and copy it:

![AeroAPI dashboard showing API usage graph and function call summary.](https://kodekloud.com/kk-media/image/upload/v1752880941/notes-assets/images/LangChain-Building-a-Real-time-Flight-Agent/flightaware-aeroapi-dashboard-usage-graph.jpg)

> [!important]
> **Warning**
>
> Keep your `AEROAPI_KEY` private. Never commit it to version control.

Export the key in your shell:

```
export AEROAPI_KEY="Your_AeroAPI_Key"
```

## 2\. Install Dependencies

Use `pip` to install required packages:

| Package   | Purpose                   |
| --------- | ------------------------- |
| requests  | HTTP client for API calls |
| pytz      | Timezone conversions      |
| langchain | Agent framework           |
| openai    | Chat model integration    |

```
pip install requests pytz langchain openai
```

## 3\. Create the `get_flight_status` Tool

Import modules and configure the base URL and API key:

```
from datetime import datetime, timedelta
import os
import requests
import pytz


from langchain.tools import tool
from langchain.experimental.tools import PythonREPLTool


AEROAPI_BASE_URL = "https://aeroapi.flightaware.com/aeroapi"
AEROAPI_KEY = os.getenv("AEROAPI_KEY")
```

Define the custom tool to fetch and format flight details:

```
@tool
def get_flight_status(flight_id: str) -> str:
    """Fetches real-time flight status from AeroAPI."""
    def get_api_session():
        session = requests.Session()
        session.headers.update({"x-apikey": AEROAPI_KEY})
        return session


    def fetch_flight_data(fid, session):
        if "flight_id=" in fid:
            fid = fid.split("flight_id=")[1]
        today = datetime.now().strftime("%Y-%m-%d")
        tomorrow = (datetime.now().date() + timedelta(days=1)).strftime("%Y-%m-%d")
        url = f"{AEROAPI_BASE_URL}/flights/{fid}?start={today}&end={tomorrow}"
        response = session.get(url)
        response.raise_for_status()
        return response.json()["flights"][0]


    def utc_to_local(utc_str, tz_str):
        utc_dt = datetime.strptime(utc_str, "%Y-%m-%dT%H:%M:%S").replace(tzinfo=pytz.utc)
        local_dt = utc_dt.astimezone(pytz.timezone(tz_str))
        return local_dt.strftime("%Y-%m-%d %H:%M:%S")


    session = get_api_session()
    data = fetch_flight_data(flight_id, session)


    dep_key = next(k for k in ["estimated_out", "actual_out", "scheduled_out"] if data.get(k))
    arr_key = next(k for k in ["estimated_in", "actual_in", "scheduled_in"] if data.get(k))


    details = {
        "source": data["origin"]["city"],
        "destination": data["destination"]["city"],
        "depart_time": utc_to_local(data[dep_key], data["origin"]["timezone"]),
        "arrival_time": utc_to_local(data[arr_key], data["destination"]["timezone"]),
        "status": data["status"],
    }


    return (
        f"Flight {flight_id} from {details['source']} to {details['destination']} is "
        f"{details['status']} – departed at {details['depart_time']} and arrives at {details['arrival_time']}."
    )
```

### 3.1 Test the Tool

```
print(get_flight_status("EK226"))
print(get_flight_status("EK524"))
# Flight EK524 from Dubai to Hyderabad is Scheduled – departed at 2024-04-30 22:00:00 and arrives at 2024-05-01 03:05:00.
```

## 4\. Build the LangChain Agent

Import agent utilities, register your tools, and define a React-style prompt:

```
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_react_agent
from langchain.experimental.tools import PythonREPLTool


tools = [get_flight_status, PythonREPLTool()]


template = """
Answer the following questions:
You have access to tools: {tools}
Format:
Question: ...
Thought: ...
Action: choose from [{tool_names}]
Action Input: ...
Observation: ...
... (repeat Thought/Action as needed)
Final Answer: ...
Begin!
Question: {input}
Thought: {agent_scratchpad}
"""


prompt = PromptTemplate(
    template=template,
    input_variables=["agent_scratchpad", "input", "tool_names", "tools"],
)


llm = ChatOpenAI()
agent = create_react_agent(llm=llm, tools=tools, prompt=prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
```

> [!important]
> **Note**
>
> The `PythonREPLTool` lets your agent execute inline Python code for calculations.

| Component               | Role                                    |
| ----------------------- | --------------------------------------- |
| get\\\_flight\\\_status | Custom tool for real-time flight data   |
| PythonREPLTool          | Executes on-the-fly Python computations |

### 4.1 Query Flight Status

```
response = agent_executor.invoke({
    "input": "What is the status of EK524? Always include the source and destination."
})
print(response["output"])
# The status of flight EK524 from Dubai to Hyderabad is Scheduled – departed at 2024-04-30 22:00:00 and arrives at 2024-05-01 03:05:00.
```

## 5\. Calculate Post-Arrival Times

Leverage the Python REPL for follow-up arithmetic, such as booking a cab:

```
response = agent_executor.invoke({
    "input": "If it takes 3 hours in the airport after the arrival of EK524, what time should I book a cab?"
})
print(response["output"])
# You should book a cab at 06:05 AM on May 1st, 2024 after the arrival of EK524.
```

Under the hood:

```
from datetime import datetime, timedelta


arrival_time = datetime.strptime("2024-05-01 03:05:00", "%Y-%m-%d %H:%M:%S")
cab_time = arrival_time + timedelta(hours=3)
```

For 4.5 hours:

```
response = agent_executor.invoke({
    "input": "If it takes 4.5 hours in the airport after the arrival of EK524, what time should I book a cab?"
})
print(response["output"])
# You should book a cab at 07:35 AM on May 1st, 2024 after the arrival of EK524.
```

## Conclusion

You’ve now integrated FlightAware’s AeroAPI with LangChain to build an interactive, real-time flight agent. This pattern—combining a custom tool (`get_flight_status`) with a Python REPL—enables both external API queries and dynamic calculations. Extend this framework to other APIs for even richer, tool-enabled AI agents!

---

## Links and References

- [FlightAware](https://flightaware.com)
- [AeroAPI](https://flightaware.com/commercial/aeroapi/)
- [AeroAPI Dashboard](https://flightaware.com/aeroapi/dashboard)
- [LangChain Documentation](https://langchain.com/docs/)
- [OpenAI Python SDK](https://github.com/openai/openai-python)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/530ad7de-8948-4806-8824-19eb10923d1d/lesson/3835c8f5-0c1a-4581-8e62-8b1111b2b42c)**
>
> Watch video content
