# Story of Artificial Intelligence - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Generative-AI-in-Practice-Advanced-Insights-and-Operations/Evolution-of-AI-Models/Story-of-Artificial-Intelligence)

---

## Table of Contents

- Story of Artificial Intelligence
  - The Evolution of Computing
  - AI Learning Paradigms
  - Watch Video
    - Supervised Learning
    - Unsupervised Learning
    - Reinforcement Learning
    - Self-Supervised Learning

---

## Content

Generative AI in Practice: Advanced Insights and Operations

Evolution of AI Models

# Story of Artificial Intelligence

Welcome to this lesson on artificial intelligence. In this session, we will explore large language models and generative AI. We will discuss their origins and the evolution from deterministic, rule-based systems to the sophisticated transformer architectures that underpin today's AI. We'll also touch upon multimodality and demonstrate that regardless of data type, these models are capable of handling a wide range of tasks.

![The image shows an agenda with four points related to AI: introduction to large language models, formation of LLMs and generative AI, transition from rule-based systems to transformers, and development of multimodal systems.](https://kodekloud.com/kk-media/image/upload/v1752875776/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/ai-agenda-llms-transformers-multimodal.jpg)

## The Evolution of Computing

The journey of artificial intelligence begins with the question: Why do we need AI? To answer this, let's review the evolution of computing. Initially, computers were programmed using imperative paradigms. With an imperative approach, you explicitly instruct the computer with a precise sequence of steps to achieve a desired outcome. This method relies on imperative knowledge—knowing exactly which ingredients or operations are needed to produce a specific result.

![The image describes the imperative programming paradigm, where you explicitly instruct the computer on the steps to achieve a desired outcome.](https://kodekloud.com/kk-media/image/upload/v1752875776/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/imperative-programming-paradigm-diagram.jpg)

Consider programming a robot to make a sandwich. In an imperative approach, you must detail every ingredient and process step by step.

![The image shows a person requesting a sandwich with add-ons, and a computer screen displaying options like bread, lettuce, tomato, and cheese, along with a sandwich illustration.](https://kodekloud.com/kk-media/image/upload/v1752875777/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/sandwich-order-options-illustration.jpg)

Seeking greater automation, we transitioned to the declarative programming paradigm, exemplified by SQL. In declarative programming, you simply state the desired outcome (for instance, requesting a sandwich), and the system determines the best method to achieve it.

![The image compares two programming paradigms: Imperative Programming Paradigm and Declarative Programming Paradigm, labeled as 01 and 02 respectively.](https://kodekloud.com/kk-media/image/upload/v1752875778/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/programming-paradigms-comparison-01-02.jpg)

While the declarative approach abstracts away implementation details, both paradigms struggled to create systems capable of autonomous learning and adaptation in complex environments. This challenge led to the emergence of artificial intelligence, where the focus shifted to developing systems that could learn and operate independently.

![The image illustrates three AI paradigms: supervised learning, unsupervised learning, and reinforcement learning, represented alongside a brain and AI icon.](https://kodekloud.com/kk-media/image/upload/v1752875779/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/ai-paradigms-supervised-unsupervised-reinforcement.jpg)

## AI Learning Paradigms

There are three main paradigms within artificial intelligence:

1.  Supervised Learning
2.  Unsupervised Learning
3.  Reinforcement Learning

Below, each is briefly explained before introducing a fourth paradigm—self-supervised learning—which represents the current frontier of AI development.

### Supervised Learning

Supervised learning involves training a model using labeled examples. Imagine teaching children by showing them many pictures of dogs and cats so they learn to identify new images based on common patterns. This method excels in classification tasks but requires vast amounts of labeled data. Its performance may decline when data points fall between established classes, making this approach inherently narrow in scope.

![The image depicts a classroom setting with a teacher figure pointing to a board showing simple line drawings of a cat and a dog. Below, there are several student figures sitting with books.](https://kodekloud.com/kk-media/image/upload/v1752875781/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/classroom-teacher-students-drawing.jpg)

![The image illustrates a supervised learning problem, showing labeled data for "Cat" and "Dog" being used by a "Narrow AI" system.](https://kodekloud.com/kk-media/image/upload/v1752875782/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/supervised-learning-cat-dog-ai.jpg)

### Unsupervised Learning

In unsupervised learning, models analyze data without any labeled examples. This approach is akin to setting a baby in an unfamiliar environment and allowing it to learn and identify patterns independently. Techniques such as K-means clustering and Principal Component Analysis (PCA) fall under this category. Unsupervised learning is particularly useful for tasks like anomaly detection, where the definition of “normal” is not predefined. However, it can struggle when dealing with complex, chaotic environments.

![The image shows a simple line drawing of a baby sitting alone in a dense forest surrounded by various animals and trees, with a question mark above the baby's head.](https://kodekloud.com/kk-media/image/upload/v1752875783/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/baby-forest-animals-question-mark.jpg)

![The image shows two puzzle pieces labeled "01 Supervised Learning" and "02 Unsupervised Learning," illustrating their relationship.](https://kodekloud.com/kk-media/image/upload/v1752875784/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/supervised-unsupervised-learning-puzzle.jpg)

### Reinforcement Learning

Reinforcement learning bridges the gap between supervised and unsupervised techniques. This paradigm operates much like training a pet: the model receives rewards for the correct actions and penalties for mistakes. Examples include Q-learning, deep Q-networks, policy gradient methods, and Proximal Policy Optimization (PPO). Reinforcement learning is particularly effective in controlled environments such as games or simulations, though its application to more complex, real-world scenarios remains challenging.

### Self-Supervised Learning

To overcome the limitations inherent in the previous paradigms, self-supervised learning was introduced. This method leverages the strengths of supervised, unsupervised, and reinforcement learning by setting its own tasks and learning by predicting missing pieces of information. For instance, models like GPT mask certain words in a text and then predict the missing words, rewarding themselves for correct predictions and penalizing errors. This approach is both powerful and scalable, forming the foundation for models as large and intricate as GPT-4.

![The image illustrates the concept of self-supervised learning, featuring a brain-like design with "AI" and puzzle pieces, symbolizing artificial intelligence and problem-solving.](https://kodekloud.com/kk-media/image/upload/v1752875784/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Story-of-Artificial-Intelligence/self-supervised-learning-ai-puzzle.jpg)

Self-supervised learning is not limited to text processing. It can be applied to images, puzzles, diffusions, and other domains where the system learns patterns, syntax, or grammar from raw data. For example, in natural language processing, a model exposed to a vast array of web content and literature can learn language structures, enhancing its ability to generate human-like text.

> [!important]
> **Next Steps**
>
> This lesson has traced the evolution of computational paradigms—from imperative and declarative programming through various AI learning methodologies—to the rise of self-supervised learning as a pathway to generalized intelligence. In the next section, we will delve into neural networks, the core components that make modern AI systems adaptive and powerful.

Stay tuned for the upcoming lesson, where we explore the intricacies of neural networks and their pivotal role in enabling AI systems to learn and adapt.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/generative-ai-in-practice-advanced-insights-and-operations/module/e250b780-055c-474c-8ff4-3070de67d39d/lesson/a0f4fe2c-8ab7-45f1-a63b-c462ab1fef21)**
>
> Watch video content
