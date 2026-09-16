# Anki Deck: Computer Science & Web Fundamentals

## Format 1: Q and A Blocks

Q: What is the main advantage of spaced repetition systems like Anki?
A: They schedule reviews at the optimal moment right before memory decay occurs, maximizing long-term retention with minimal study time.
Tags: learning memory anki

Q: What is the difference between synchronous and asynchronous execution in JavaScript?
A: Synchronous execution runs tasks sequentially, blocking further execution until the current task finishes. Asynchronous execution offloads long operations (like I/O or timers) and continues executing subsequent code via the event loop.
Tags: javascript async

Q: In relational databases, what does ACID stand for?
A: Atomicity (all or nothing), Consistency (preserves schema rules), Isolation (concurrent transactions do not interfere), and Durability (committed changes persist).
Tags: databases architecture

---

## Format 2: Heading Style Cards

### What is the purpose of the HTTP 429 status code?
Too Many Requests. It indicates that the client has sent too many requests in a given amount of time (rate limited).
Tags: http networking

### Explain the concept of idempotency in REST APIs.
An HTTP method is idempotent if executing it multiple times produces the same side effects on the server state as executing it once. Examples: GET, PUT, DELETE.
Tags: api rest

---

## Format 3: Cloze Deletion Cards

Q: In CSS flexbox, the property {{c1::justify-content}} aligns items along the main axis, while {{c2::align-items}} aligns items along the cross axis.
Tags: css flexbox web

Q: The time complexity to search an item in a balanced Binary Search Tree is {{c1::O(log n)}} on average.
Tags: algorithms data-structures
