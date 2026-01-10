# Sql Joins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Sql-Joins)

---

## Table of Contents

- Sql Joins
  - Joining the Posts and Users Tables
  - Understanding Join Directions
  - Counting Posts per User
  - Joining Posts and Votes
  - Counting Votes per Post
  - Final Thoughts
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Sql Joins

In previous sections, our queries have been fairly simple, dealing with data from a single table. For example:

```
SELECT * FROM votes;
```

However, real-world applications typically involve multiple tables with defined relationships. In such cases, you need to combine data from related tables. This is where SQL joins come into play—they allow you to merge data from multiple tables into a single query result.

Imagine you want to retrieve all posts stored in a "posts" table. A straightforward query might be:

```
SELECT * FROM posts;
```

This query returns all posts, but often these posts include an owner ID (e.g., 23) that isn’t very informative on its own. For a more user-friendly display, such as showing the username or email, you would need additional details from the "users" table. Without a join, you might execute separate queries for each post, which is inefficient and complex.

> [!important]
> **Tip**
>
> For more comprehensive examples and theoretical details, consider visiting the [PostgreSQL Tutorial website](https://www.postgresqltutorial.com/postgresql-joins/) which covers various join types like LEFT JOIN, INNER JOIN, RIGHT JOIN, and OUTER JOIN with clear examples.

Below is a simplified demonstration using two fictitious tables—basket_a and basket_b:

```
SELECT
    a.fruit_a,
    b.fruit_b
FROM
    basket_a a
INNER JOIN
    basket_b b
ON
    a.fruit_a = b.fruit_b;
```

## Joining the Posts and Users Tables

To retrieve user information (such as email) along with post details, you need to join the "posts" and "users" tables. A basic LEFT JOIN query looks like this:

```
SELECT * FROM posts LEFT JOIN users;
```

To correctly join the tables, specify the columns to match. Here, we link the post owner (posts.owner_id) with the unique user identifier (users.id):

```
SELECT * FROM posts LEFT JOIN users ON posts.owner_id = users.id;
```

This query returns every column from both tables. However, you might only need a subset of columns. For example, to get the post title, content, and the user’s email, use:

```
SELECT title, content, email
FROM posts
LEFT JOIN users ON posts.owner_id = users.id;
```

If the selected columns exist in both tables (such as a common "id" column), SQL may report an ambiguity error. To avoid this, qualify the column with the table name:

```
SELECT posts.id, email
FROM posts
LEFT JOIN users ON posts.owner_id = users.id;
```

When you want to select all columns from the posts table, use the table’s wildcard:

```
SELECT posts.*, email
FROM posts
LEFT JOIN users ON posts.owner_id = users.id;
```

You can also include additional fields, for example, users.id:

```
SELECT posts.*, email, users.id
FROM posts
LEFT JOIN users ON posts.owner_id = users.id;
```

It’s a good practice to fully qualify every column when ambiguity is possible, even though it isn’t required when a column name is unique across the tables.

## Understanding Join Directions

The table listed first in the FROM clause is referred to as the "left" table, while the table specified in the JOIN clause is the "right" table. Consider the following differences:

- A LEFT JOIN returns all rows from the left table and the matching rows (or nulls if there are no matches) from the right table.
- A RIGHT JOIN, conversely, returns all rows from the right table and the matched rows from the left table.

For example, using a RIGHT JOIN on the "posts" and "users" tables:

```
SELECT * FROM posts RIGHT JOIN users ON posts.owner_id = users.id;
```

This query might return a user (e.g., user 24) who hasn’t created any posts, with post-related fields appearing as null. On the other hand, a LEFT JOIN would ensure every post is included even if there’s no corresponding user record.

## Counting Posts per User

To determine the number of posts created by each user, group your joined results by the user’s ID. Consider the following query:

```
SELECT users.id, COUNT(*) AS post_count
FROM posts
LEFT JOIN users ON posts.owner_id = users.id
GROUP BY users.id;
```

If you want to list every user, even those who haven’t created any posts, use a RIGHT JOIN:

```
SELECT users.id, COUNT(posts.id) AS user_post_count
FROM posts
RIGHT JOIN users ON posts.owner_id = users.id
GROUP BY users.id;
```

Notice that using COUNT(posts.id) prevents null values from being counted erroneously. You can extend this to include more user details:

```
SELECT users.id, users.email, COUNT(posts.id) AS user_post_count
FROM posts
RIGHT JOIN users ON posts.owner_id = users.id
GROUP BY users.id, users.email;
```

## Joining Posts and Votes

Next, let’s join the posts and votes tables. In the votes table, the key columns are post_id and user_id. By joining these tables on post_id, you can determine which posts have received votes.

Begin by selecting all posts:

```
SELECT * FROM posts;
```

Then, perform a LEFT JOIN with the votes table by matching posts.id to votes.post_id:

```
SELECT *
FROM posts
LEFT JOIN votes ON posts.id = votes.post_id;
```

A post with multiple votes (for instance, a post with an ID of 10 that has two votes) will appear twice in the result set, reflecting each vote separately. This does not imply duplicate posts in the original table.

For the reverse scenario—returning all votes and their associated posts—you can use a RIGHT JOIN:

```
SELECT *
FROM posts
RIGHT JOIN votes ON posts.id = votes.post_id;
```

## Counting Votes per Post

To count the total number of votes for each post, use an aggregate function and group by the post’s id while ensuring null values are not counted:

```
SELECT posts.id, COUNT(votes.post_id) AS votes
FROM posts
LEFT JOIN votes ON posts.id = votes.post_id
GROUP BY posts.id;
```

For a detailed report that includes all post details alongside the vote count, modify the query as follows:

```
SELECT posts.*, COUNT(votes.post_id) AS votes
FROM posts
LEFT JOIN votes ON posts.id = votes.post_id
GROUP BY posts.id;
```

To focus on a particular post (for example, the post with an ID of 10), include a WHERE clause:

```
SELECT posts.*, COUNT(votes.post_id) AS votes
FROM posts
LEFT JOIN votes ON posts.id = votes.post_id
WHERE posts.id = 10
GROUP BY posts.id;
```

> [!important]
> **Remember**
>
> SQL joins are powerful tools that enable efficient data retrieval across multiple related tables. Experimenting with different join types in your queries can help build a solid foundation and understanding for more advanced SQL scenarios.

## Final Thoughts

SQL joins are a fundamental element in relational database queries. As you practice with different join types and scenarios, you will gain a deeper understanding of how to structure efficient and effective queries. Save these examples as a reference while exploring more complex SQL concepts.

Happy querying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/6136ef89-6dc4-4563-9168-fca799da9de4)**
>
> Watch video content
