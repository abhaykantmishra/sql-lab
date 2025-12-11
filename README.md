# SQL Labs

SQL Labs is a browser-based SQL practice platform designed to help users master SQL through interactive problem-solving and a persistent playground environment. It leverages WebAssembly & Web workers to run SQLite directly in the browser, ensuring a fast, secure, and serverless experience.

## Features

### 1. Interactive Practice
Solve a curated collection of SQL problems ranging from easy to hard.
- **Real-time Execution**: Queries run instantly in the browser.
- **Test Cases**: Each problem includes multiple test cases (Standard, Empty, Edge Cases) to validate your solution.
- **Instant Feedback**: Get immediate results and error messages.
- **Categorized Questions**: Problems are tagged by topic (e.g., `JOIN`, `GROUP BY`, `WINDOW FUNCTION`) and difficulty.

### 2. SQL Playground
A persistent workspace for experimenting with SQL.
- **Persistence**: Your database state is saved automatically using IndexedDB, so your tables and data remain available across sessions.
- **CSV Upload**: Upload CSV files to automatically create tables and populate them with data with upto 50k-100k rows.
- **Full SQL Support**: Execute complex queries, create tables, and manage data.

### 3. Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Dark Mode**: Fully supported dark theme for comfortable coding at night.
- **Resizable Panels**: Customize your workspace layout.

## Architecture & Implementation

SQL Labs is built with **Next.js** and uses **wa-sqlite** (WebAssembly SQLite) for its core database engine. The application employs a dual-engine architecture to optimize for different use cases.

### Practice Engine (Synchronous)
For the Practice section, speed and isolation are paramount.
- **Engine**: Synchronous `wa-sqlite` instance.
- **Implementation**:
    - When you run a solution, the engine creates a fresh **in-memory database** for *each* test case.
    - It executes the `setupSql` (creating tables/data) and then runs both your query and the solution query.
    - Results are compared strictly to determine correctness.
    - This ensures that every run is isolated and side-effects from previous queries do not affect the current validation.

### Playground Engine (Asynchronous)
For the Playground, persistence and performance with large datasets are key.
- **Engine**: Asynchronous `wa-sqlite` instance with `IDBBatchAtomicVFS`.
- **Implementation**:
    - Runs in a **Web Worker** (`worker-sqlite.js`) to prevent blocking the main UI thread during heavy operations.
    - Uses **IndexedDB** as a virtual file system (VFS) to persist the `playground.db` file.
    - Supports CSV uploads by parsing files on the client and batch-inserting data into the persistent database.

## Local Setup

Follow these steps to run SQL Labs locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd sql_lab
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the application**
    Visit `http://localhost:3000` in your browser.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript / React
- **Styling**: Tailwind CSS
- **Database**: wa-sqlite (WASM)
- **Editor**: Monaco Editor (@monaco-editor/react)
- **Icons**: Lucide React
- **Utils**: clsx, tailwind-merge, papaparse
