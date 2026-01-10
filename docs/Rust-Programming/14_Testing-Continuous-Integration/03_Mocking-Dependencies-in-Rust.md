# Mocking Dependencies in Rust - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Testing-Continuous-Integration/Mocking-Dependencies-in-Rust)

---

## Table of Contents

- Mocking Dependencies in Rust
  - When to Use Mocks
  - Why Use mockall?
  - Setting Up the Project
  - Enhancing Mocks with mockall
  - Best Practices for Mocking
  - Watch Video
    - Basic Function Example
    - Defining the Trait and Real Implementation
    - Creating a Service that Uses the Trait
    - Adding a Basic Mock Implementation
    - Using mockall in Tests

---

## Content

Rust Programming

Testing Continuous Integration

# Mocking Dependencies in Rust

In this article, we explore the concept of mocking in Rust and demonstrate its importance for creating isolated, predictable, and repeatable tests. Using the [mockall crate](https://crates.io/crates/mockall), you'll learn how to simulate dependencies and verify interactions between components.

Mocking is the practice of creating simulated objects that mimic the behavior of real objects. Its main objectives include:

- Isolating the unit under test by replacing its dependencies with mocks.
- Controlling the test environment to ensure repeatability.
- Verifying interactions between components to confirm expected behaviors.

![The image is an introduction to mocking, highlighting three concepts: isolating the unit by replacing dependencies with mocks, controlling the environment for predictable tests, and verifying interactions.](https://kodekloud.com/kk-media/image/upload/v1752884008/notes-assets/images/Rust-Programming-Mocking-Dependencies-in-Rust/introduction-to-mocking-concepts.jpg)

## When to Use Mocks

Mocks are ideal in scenarios where:

- The real object is unavailable or slow (e.g., a database or an external API).
- Unpredictable behavior of the real object could lead to flaky tests.
- You need to simulate error conditions that are difficult to reproduce with the actual dependency.

![The image is a diagram titled "When to Use Mocks," listing three scenarios: "Unavailable or slow object," "Unpredictable behavior," and "Simulating hard-to-reproduce errors."](https://kodekloud.com/kk-media/image/upload/v1752884009/notes-assets/images/Rust-Programming-Mocking-Dependencies-in-Rust/when-to-use-mocks-diagram.jpg)

## Why Use mockall?

The `mockall` crate offers a simple yet powerful API for creating mocks, setting expectations, and verifying method calls. Its advantages include:

- A straightforward API that simplifies mock creation.
- Support for returning specific values and simulating errors.
- Robust interaction verification to ensure your components communicate as expected.

![The image highlights the advantages of using "mockall," emphasizing ease of use with a simple API for creating mocks and powerful features for setting expectations and verifying interactions.](https://kodekloud.com/kk-media/image/upload/v1752884010/notes-assets/images/Rust-Programming-Mocking-Dependencies-in-Rust/mockall-advantages-simple-api.jpg)

## Setting Up the Project

Begin by creating a library crate named `rust-mock` and opening it in VS Code. Suppose you are building a service that interacts with an external API, but during unit testing you want to avoid actual API calls. Instead, you'll implement a mock.

### Basic Function Example

Consider a simple function along with its test:

```
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}


#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn it_works() {
        let result: u64 = add(2, 2);
        assert_eq!(result, 4);
    }
}
```

### Defining the Trait and Real Implementation

Below is an example of the `ApiClient` trait. We provide both a real implementation and later a mock for testing:

```
trait ApiClient {
    fn fetch_data(&self) -> String;
}


// Real Implementation
struct RealApiClient;


impl ApiClient for RealApiClient {
    fn fetch_data(&self) -> String {
        // Simulate an API call
        "Real data from API".to_string()
    }
}
```

### Creating a Service that Uses the Trait

Next, define a generic `DataService` that depends on any type implementing the `ApiClient` trait. This service processes the data regardless of whether it comes from the real client or a mock instance:

```
struct DataService<T: ApiClient> {
    api_client: T,
}


impl<T: ApiClient> DataService<T> {
    fn new(api_client: T) -> Self {
        Self { api_client }
    }


    fn get_processed_data(&self) -> String {
        let data: String = self.api_client.fetch_data();
        format!("Processed: {}", data)
    }
}
```

### Adding a Basic Mock Implementation

For unit testing, create a simple mock implementation without external libraries:

```
// Mock Implementation
struct MockApiClient;


impl ApiClient for MockApiClient {
    fn fetch_data(&self) -> String {
        "Mock data for testing".to_string()
    }
}


#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn test_data_service_with_mock() {
        let mock_client = MockApiClient;
        let service: DataService<MockApiClient> = DataService::new(mock_client);
        let result: String = service.get_processed_data();
        assert_eq!(result, "Processed: Mock data for testing");
    }
}
```

## Enhancing Mocks with mockall

For more advanced mocking capabilities, incorporate the `mockall` crate. Begin by adding it to your Cargo.toml:

```
cargo add mockall
```

Then, import the crate and utilize its macros to generate mocks for the `ApiClient` trait:

```
use mockall::{mock, predicate::*};


// Define the ApiClient trait
trait ApiClient {
    fn fetch_data(&self) -> String;
}


mock! {
    // The mockall library automatically creates a mock type called MockApiClient.
    pub ApiClient {}


    impl ApiClient for ApiClient {
        fn fetch_data(&self) -> String;
    }
}


// Real implementation of the ApiClient
struct RealApiClient;


impl ApiClient for RealApiClient {
    fn fetch_data(&self) -> String {
        // Simulate an API call
        "Real data from API".to_string()
    }
}


// Code that uses the ApiClient trait
struct DataService<T: ApiClient> {
    api_client: T,
}


impl<T: ApiClient> DataService<T> {
    fn new(api_client: T) -> Self {
        Self { api_client }
    }


    fn get_processed_data(&self) -> String {
        let data: String = self.api_client.fetch_data();
        format!("Processed: {}", data)
    }
}
```

### Using mockall in Tests

The following test demonstrates how to use the generated `MockApiClient` to simulate the behavior of the `ApiClient` trait. The expectation here is that calling `fetch_data` on the mock will return "Mocked data":

```
#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn test_data_service_with_mockall() {
        // Create a new mock client
        let mut mock_client: MockApiClient = MockApiClient::new();


        // Set up the expectation: when fetch_data is called, return "Mocked data"
        mock_client
            .expect_fetch_data()
            .return_const("Mocked data".to_string());


        // Use the mock client in DataService
        let service: DataService<MockApiClient> = DataService::new(mock_client);


        // Call the method and verify the result
        let result: String = service.get_processed_data();
        assert_eq!(result, "Processed: Mocked data");
    }
}
```

## Best Practices for Mocking

Mocking is a powerful tool for isolating units under test. Here are some best practices:

- > [!important]
  > **Note**
  >
  > Use mocks judiciously to avoid creating tests that depend too heavily on implementation details.
- Simulate realistic scenarios to maintain meaningful tests.
- Utilize mocks to verify that your code interacts correctly with its dependencies, especially in complex interaction scenarios.

![The image is a summary slide outlining three points about mocks: understanding mocks, using the mockall crate, and isolating tests. It features a gradient background with numbered sections.](https://kodekloud.com/kk-media/image/upload/v1752884011/notes-assets/images/Rust-Programming-Mocking-Dependencies-in-Rust/mocks-summary-understanding-using-isolating.jpg)

![The image presents three best practices for using mocks in testing: "Use Mocks Sparingly," "Test Realistic Scenarios," and "Verify Interactions," each with a brief explanation.](https://kodekloud.com/kk-media/image/upload/v1752884013/notes-assets/images/Rust-Programming-Mocking-Dependencies-in-Rust/best-practices-mocks-testing.jpg)

By understanding and applying these mocking techniques, you can write robust tests that ensure each component of your Rust application functions correctly. This approach not only improves code quality but also enhances test reliability, making your development process smoother and more efficient.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/e9736aa9-07fd-49d2-b348-ab9c4534b367/lesson/c853c57d-8704-4864-84f4-1cc4cee75c0c)**
>
> Watch video content
