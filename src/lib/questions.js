export const QUESTIONS = [
    {
        id: 1,
        title: "Select All Users",
        difficulty: "Easy",
        markdown: `
\#  **Select All Users**

\#\# Write a SQL query to select all columns from the \`\`users\`\` table.

\n

### Table Schema
\`\`\`
| Column | Type    | Description |
|--------|---------|-------------|
| id     | INTEGER | Primary Key |
| name   | TEXT    | User Name   |
| age    | INTEGER | User Age    |
\`\`\`

\n


### Example 1
**Input:**
\`\`\`
+----+-------+-----+
| id | name  | age |
+----+-------+-----+
| 1  | Alice | 30  |
| 2  | Bob   | 20  |
+----+-------+-----+
\`\`\`

**Output:**
\`\`\`
+----+-------+-----+
| id | name  | age |
+----+-------+-----+
| 1  | Alice | 30  |
| 2  | Bob   | 20  |
+----+-------+-----+
\`\`\`
    `,
        testCases: [
            {
                input: "Standard dataset",
                setupSql: `
                    CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
                    INSERT INTO users (id, name, age) VALUES (1, 'Alice', 30);
                    INSERT INTO users (id, name, age) VALUES (2, 'Bob', 20);
                    INSERT INTO users (id, name, age) VALUES (3, 'Charlie', 35);
                    `,
                solutionSql: "SELECT * FROM users;"
            },
            {
                input: "Empty dataset",
                setupSql: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);`,
                solutionSql: "SELECT * FROM users;"
            },
            {
                input: "No dataset",
                setupSql: `
                    CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
                    INSERT INTO users (id, name, age) VALUES (1, 'Alice', 30);
                    INSERT INTO users (name, age) VALUES ('Bob', 20);
                    INSERT INTO users (id, name, age) VALUES (3, 'Charlie', 35);
                    `,
                solutionSql: "SELECT * FROM users;"
            }
        ]
    },
    {
        id: 2,
        title: "Filter by Age",
        difficulty: "Easy",
        markdown: `
# Filter by Age

Write a SQL query to select all columns from the \`users\` table where the \`age\` is greater than 25.

### Table Schema
| Column | Type    | Description |
|--------|---------|-------------|
| id     | INTEGER | Primary Key |
| name   | TEXT    | User Name   |
| age    | INTEGER | User Age    |

### Example
**Input:**
\`\`\`
+----+-------+-----+
| id | name  | age |
+----+-------+-----+
| 1  | Alice | 30  |
| 2  | Bob   | 20  |
| 3  | Charlie| 35 |
+----+-------+-----+
\`\`\`

**Output:**
\`\`\`
+----+-------+-----+
| id | name  | age |
+----+-------+-----+
| 1  | Alice | 30  |
| 3  | Charlie| 35 |
+----+-------+-----+
\`\`\`
    `,
        testCases: [
            {
                input: "Standard dataset",
                setupSql: `
          CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
          INSERT INTO users (id, name, age) VALUES (1, 'Alice', 30);
          INSERT INTO users (id, name, age) VALUES (2, 'Bob', 20);
          INSERT INTO users (id, name, age) VALUES (3, 'Charlie', 35);
        `,
                solutionSql: "SELECT * FROM users WHERE age > 25;"
            },
            {
                input: "All under 25",
                setupSql: `
          CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
          INSERT INTO users (id, name, age) VALUES (1, 'Dave', 10);
          INSERT INTO users (id, name, age) VALUES (2, 'Eve', 20);
        `,
                solutionSql: "SELECT * FROM users WHERE age > 25;"
            }
        ]
    },
    {
        id: 3,
        title: "Count Users by Age Group",
        difficulty: "Medium",
        markdown: `
# Count Users by Age Group

Write a SQL query to count the number of users for each \`age\`. Return the result ordered by \`age\` in ascending order.

### Table Schema
| Column | Type    | Description |
|--------|---------|-------------|
| id     | INTEGER | Primary Key |
| name   | TEXT    | User Name   |
| age    | INTEGER | User Age    |

### Example
**Input:**
\`\`\`
+----+-------+-----+
| id | name  | age |
+----+-------+-----+
| 1  | Alice | 30  |
| 2  | Bob   | 20  |
| 3  | Charlie| 30 |
+----+-------+-----+
\`\`\`

**Output:**
\`\`\`
+-----+-------+
| age | count |
+-----+-------+
| 20  | 1     |
| 30  | 2     |
+-----+-------+
\`\`\`
    `,
        testCases: [
            {
                input: "Standard dataset",
                setupSql: `
          CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
          INSERT INTO users (id, name, age) VALUES (1, 'Alice', 30);
          INSERT INTO users (id, name, age) VALUES (2, 'Bob', 20);
          INSERT INTO users (id, name, age) VALUES (3, 'Charlie', 30);
          INSERT INTO users (id, name, age) VALUES (4, 'Dave', 20);
        `,
                solutionSql: "SELECT age, COUNT(*) as count FROM users GROUP BY age ORDER BY age ASC;"
            }
        ]
    }
];
