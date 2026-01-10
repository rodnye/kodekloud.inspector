# Transaction Intergrity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Transaction-Intergrity)

---

## Table of Contents

- Transaction Intergrity
  - Example: Transferring Funds Between Accounts
  - ACID Properties Explained
  - Transaction Management: Commit vs. Rollback
  - Links and References
  - Watch Video
    - Potential Issues Without ACID
    - Isolation Levels

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Transaction Intergrity

Maintaining transaction integrity is critical when multiple updates must be applied together in a relational database. In this guide, you’ll learn how to guarantee accurate, reliable, and consistent data using the four ACID properties: Atomicity, Consistency, Isolation, and Durability.

## Example: Transferring Funds Between Accounts

Consider two bank accounts represented by rows in a database table:

- **Savings:** $20
- **Checking:** $50

Together, these balances total $70—the amount the bank owes you.

![The image shows a step in a money-moving process with a total amount of $70, represented by two bars: one for $20 and another for $50.](https://kodekloud.com/kk-media/image/upload/v1752873104/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Transaction-Intergrity/money-moving-process-70-dollars-bars.jpg)

To move $10 from your **Savings** to **Checking**, you execute a transaction with two updates:

```
BEGIN TRANSACTION;


-- 1. Subtract $10 from Savings
UPDATE accounts
SET balance = balance - 10
WHERE account_type = 'Savings';


-- 2. Add $10 to Checking
UPDATE accounts
SET balance = balance + 10
WHERE account_type = 'Checking';


COMMIT;
```

> [!important]
> **Note**
>
> You can also use `ROLLBACK` to undo changes if any step fails:
>
> ```
> ROLLBACK;
> ```

### Potential Issues Without ACID

- **Incomplete transaction:** The first update succeeds, but the second one fails, leaving balances inconsistent.
- **Interim reads:** A third party queries balances after step 1 but before step 2, seeing $10 in savings and $50 in checking (total $60).

![The image discusses transaction integrity, highlighting potential issues like incomplete steps and data inconsistency, with a visual of a bank and account balance.](https://kodekloud.com/kk-media/image/upload/v1752873106/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Transaction-Intergrity/transaction-integrity-bank-visualization.jpg)

## ACID Properties Explained

The ACID acronym stands for the four rules that guarantee transaction integrity:

| Property    | Description                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------ |
| Atomicity   | Ensures all updates in a transaction succeed or none do (all-or-nothing).                        |
| Consistency | Guarantees the database moves from one valid state to another (e.g., total balance remains $70). |
| Isolation   | Prevents other operations from seeing intermediate states.                                       |
| Durability  | Commits survive system failures; changes persist even after a crash.                             |

![The image explains the ACID transaction criteria, detailing Atomic, Consistent, Isolated, and Durable properties with brief descriptions and examples for each.](https://kodekloud.com/kk-media/image/upload/v1752873107/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Transaction-Intergrity/acid-transaction-criteria-explained.jpg)

### Isolation Levels

Different databases support multiple isolation levels (e.g., Read Committed, Serializable). Choose the level that balances concurrency and consistency for your workload.

> [!important]
> **Warning**
>
> Long-running transactions can block other operations and degrade performance. Keep transactions short and predictable.

## Transaction Management: Commit vs. Rollback

At the end of your transaction:

- **COMMIT:** Applies all updates, resulting in $10 in savings and $60 in checking.
- **ROLLBACK:** Undoes every change, preserving the original $20 and $50 balances.

![The image illustrates the results of transaction management, showing account balances when all updates succeed versus when all updates fail. It includes a bar chart and text detailing the amounts in savings and checking accounts.](https://kodekloud.com/kk-media/image/upload/v1752873108/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Transaction-Intergrity/transaction-management-results-bar-chart.jpg)

## Links and References

- [ACID (database system)](https://en.wikipedia.org/wiki/ACID)
- [Transactions (Transact-SQL)](https://docs.microsoft.com/sql/t-sql/language-elements/transactions-transact-sql)
- [Microsoft Azure Data Fundamentals (DP-900)](https://learn.microsoft.com/certifications/exams/dp-900)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/5e88823d-ac4e-4664-b09a-45af7f13f183)**
>
> Watch video content
