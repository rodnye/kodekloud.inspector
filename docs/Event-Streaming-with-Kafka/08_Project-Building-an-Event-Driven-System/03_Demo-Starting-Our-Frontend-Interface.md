# Demo Starting Our Frontend Interface - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Project-Building-an-Event-Driven-System/Demo-Starting-Our-Frontend-Interface)

---

## Table of Contents

- Demo Starting Our Frontend Interface
  - Prerequisites
  - 1. Open the Project
  - 2. Install Dependencies
  - 3. Inspect the Project Structure
  - 4. Configure the Flask App
  - 5. Define Routes and Logic
  - 6. Run the Frontend
  - 7. Verify Events in Kafka
  - Next Steps
  - References
  - Watch Video

---

## Content

Event Streaming with Kafka

Project Building an Event Driven System

# Demo Starting Our Frontend Interface

Welcome back! In this demo, we'll build a Flask-based frontend that publishes cart events to your Kafka cluster on AWS EC2. We'll walk through project setup, configuring the Kafka producer, defining routes, and verifying events in Kafka.

## Prerequisites

- Kafka cluster running with the [KRaft protocol](https://kafka.apache.org/documentation/).
- `cart_event` topic already created.
- EC2 instance with public IP.
- VS Code or another code editor.

---

## 1\. Open the Project

In your terminal:

```
cd final_project
ls
```

You’ll see:

| Directory    | Purpose                      |
| ------------ | ---------------------------- |
| toy-shop     | Frontend UI (Flask app)      |
| warehouse-ui | Backend dashboard (consumer) |

Move into the frontend folder:

```
cd toy-shop
```

---

## 2\. Install Dependencies

```
pip3 install -r requirements.txt
```

---

## 3\. Inspect the Project Structure

| File/Folder      | Description                  |
| ---------------- | ---------------------------- |
| static           | CSS and images               |
| templates        | HTML templates for each page |
| app.py           | Main Flask application       |
| requirements.txt | Python dependencies          |
| README.md        | Project overview             |

Open **app.py** to configure the Kafka producer.

---

## 4\. Configure the Flask App

```
from flask import Flask, render_template, request, redirect, url_for
from confluent_kafka import Producer
import json
import logging
import socket


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = Flask(__name__)


# Kafka producer configuration
conf = {
    'bootstrap.servers': '3.68.92.91:9092',  # Replace with your EC2 instance's public IP
    'client.id': socket.gethostname()
}


producer = Producer(conf)


def delivery_callback(err, msg):
    if err:
        logger.error(f"Message delivery failed: {err}")
    else:
        logger.info(f"Message delivered to {msg.topic()} [{msg.partition()}] at offset {msg.offset()}")
        logger.info(f"Message timestamp: {msg.timestamp()}")


# Sample product data
products = [
    {"id": "1", "name": "Toy 1", "price": 16.99, "image": "toy1.jpg"},
    {"id": "2", "name": "Toy 2", "price": 15.99, "image": "toy2.jpg"},
    {"id": "3", "name": "Toy 3", "price": 35.99, "image": "toy3.jpg"},
    {"id": "4", "name": "Toy 4", "price": 25.99, "image": "toy4.jpg"},
    {"id": "5", "name": "Toy 5", "price": 19.99, "image": "toy5.jpg"},
    {"id": "6", "name": "Toy 6", "price": 35.99, "image": "toy6.jpg"},
]


cart = []
```

> [!important]
> **Note**
>
> Update the `bootstrap.servers` value with your EC2 instance’s public IP so the producer connects to the correct Kafka endpoint.

![The image shows an AWS EC2 management console with details of a running instance named "kafka_demo." It displays instance information such as the instance ID, state, type, and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752874760/notes-assets/images/Event-Streaming-with-Kafka-Demo-Starting-Our-Frontend-Interface/aws-ec2-kafka-demo-instance-details.jpg)

---

## 5\. Define Routes and Logic

Below the setup, locate the route handlers:

```
@app.route('/')
def index():
    return render_template('index.html', products=products)


@app.route('/cart')
def view_cart():
    return render_template('cart.html', cart=cart)


@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    product_id = request.form['id']
    selected = next((p for p in products if p["id"] == product_id), None)
    if selected:
        cart.append(selected)
    return redirect(url_for('index'))


@app.route('/place_order', methods=['POST'])
def place_order():
    name = request.form['name']
    address = request.form['address']
    order_event = {
        "customer_name": name,
        "delivery_address": address,
        "products": cart,
        "total_amount": sum(item["price"] for item in cart)
    }
    event_string = json.dumps(order_event)
    logger.info(f"Sending order event to Kafka: {event_string}")


    producer.produce(
        topic="cart_event",
        value=event_string.encode("utf-8"),
        callback=delivery_callback
    )
    producer.flush()
    cart.clear()
    return render_template('order.html', name=name)
```

This code:

- Renders the product catalog.
- Manages cart additions.
- Sends a JSON order event to the `cart_event` topic.
- Clears the cart after publishing.

---

## 6\. Run the Frontend

```
python3 app.py
```

Open http://127.0.0.1:5000 in your browser:

![The image shows a webpage for "KodeKloud Toy Shop" displaying six toy products with images, names, prices, and "Add to Cart" options.](https://kodekloud.com/kk-media/image/upload/v1752874761/notes-assets/images/Event-Streaming-with-Kafka-Demo-Starting-Our-Frontend-Interface/kodekloud-toy-shop-products-page.jpg)

Add Toy 1 and Toy 2, click **View Cart**, fill in your details, and place the order:

![The image shows a webpage with two toy options, a teddy bear and a toy car, priced at $10.99 and $15.99 respectively, along with a form to place an order.](https://kodekloud.com/kk-media/image/upload/v1752874762/notes-assets/images/Event-Streaming-with-Kafka-Demo-Starting-Our-Frontend-Interface/toy-options-teddy-bear-car.jpg)

After submitting, you’ll see confirmation:

![The image shows a webpage with a confirmation message stating "Thank you, Raghu!" and "Your order has been placed," along with a link to return to the shop.](https://kodekloud.com/kk-media/image/upload/v1752874763/notes-assets/images/Event-Streaming-with-Kafka-Demo-Starting-Our-Frontend-Interface/thank-you-raghu-order-confirmation.jpg)

Your terminal will log delivery status:

```
INFO:__main__:Sending order event to Kafka: {"customer_name": "Raghu", ...}
INFO:__main__:Message delivered to cart_event [0] at offset 5
```

---

## 7\. Verify Events in Kafka

SSH into your EC2 instance and run:

```
cd kafka_2.13-3.0.0/


# Create topic if it doesn’t exist
bin/kafka-topics.sh \
  --create \
  --topic cart_event \
  --bootstrap-server YOUR_IP:9092 \
  --partitions 3 \
  --replication-factor 1


# Consume events
bin/kafka-console-consumer.sh \
  --bootstrap-server YOUR_IP:9092 \
  --topic cart_event \
  --from-beginning
```

You’ll see real-time JSON order events as the frontend publishes them.

---

## Next Steps

You now have a working frontend that publishes cart events. In the next guide, we’ll build the **Warehouse Dashboard** to consume and analyze these events.

---

## References

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Confluent Kafka Python Client](https://docs.confluent.io/platform/current/clients/confluent-kafka-python/index.html)
- [Kafka CLI Tools](https://kafka.apache.org/documentation/#basic_ops_cli)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/95f49caf-8e0b-4ed9-b7dd-9f43ff31ed9a/lesson/4eeb78bb-a67b-4178-8964-28da52079754)**
>
> Watch video content
