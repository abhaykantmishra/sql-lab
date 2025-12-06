import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs';
// import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs';
import * as SQLite from 'wa-sqlite';

import { IDBBatchAtomicVFS as MyVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js';

// Synchronous Engine State (for Lab/Tests)
let sqlite3Sync = null;

// Asynchronous Engine State (for Playground/Persistence)
let sqlite3Async = null;
let dbAsync = null;

/**
 * Initialize the Synchronous SQLite WASM engine (for Lab)
 */
export const initSqlEngine = async (options = {}) => {
  if (sqlite3Sync) return sqlite3Sync;

  const module = await SQLiteESMFactory({
    locateFile: (file) => options.wasmUrl || '/wa-sqlite.wasm'
  });
  sqlite3Sync = SQLite.Factory(module);

  return sqlite3Sync;
};

/**
 * Initialize the Asynchronous SQLite persistent WASM engine (for Playground)
 */
export const initPersistantSqlEngine = async (options = {}) => {
  if (sqlite3Async) return sqlite3Async;

  const module = await SQLiteAsyncESMFactory({
    locateFile: (file) => options.wasmUrl || '/wa-sqlite-async.wasm'
  });
  sqlite3Async = SQLite.Factory(module);

  // Register IDBBatchAtomicVFS
  // const vfs = new IDBBatchAtomicVFS('playground-db');
  // Wait for VFS to be ready if needed (IDBBatchAtomicVFS constructor is sync but setup might be async)
  // However, wa-sqlite examples usually just register it.

  // sqlite3Async.vfs_register(vfs, true); // Make it default

  // Open persistent DB
  dbAsync = await sqlite3Async.open_v2('playground.db');

  return sqlite3Async;
}

/**
 * Run SQL queries (Synchronous/Lab Mode)
 * @param {string} setupSql - initial setup SQL (tables, inserts, etc.)
 * @param {string} query - the SQL query to execute
 */
export const runQuery = async (setupSql = "", query = "") => {
  let db = null;
  try {
    if (!sqlite3Sync) await initSqlEngine();

    // Create a fresh in-memory database for this query run
    db = await sqlite3Sync.open_v2(':memory:');

    // Run setup SQL (optional)
    if (setupSql) {
      await sqlite3Sync.exec(db, setupSql);
    }

    // Run main query
    let results = [];
    if (query) {
      await sqlite3Sync.exec(db, query, (row, columns) => {
        const rowObj = {};
        columns.forEach((col, i) => {
          rowObj[col] = row[i];
        });
        results.push(rowObj);
      });
    }

    return { results, error: null };
  } catch (err) {
    return { results: null, error: err.message };
  } finally {
    if (db && sqlite3Sync) {
      await sqlite3Sync.close(db);
    }
  }
};

/**
 * Run SQL queries against the persistent database instance (Asynchronous/Playground Mode)
 * @param {string} query - the SQL query to execute
 */
// Singleton Worker State
let worker = null;
let workerPort = null;
let workerInitPromise = null;

/**
 * Initialize the Worker and MessageChannel (Singleton)
 */
const initWorker = () => {
  if (workerInitPromise) return workerInitPromise;

  workerInitPromise = new Promise((resolve, reject) => {
    try {
      console.log("Initializing SQL Worker...");
      worker = new Worker(new URL('./worker-sqlite.js', import.meta.url), { type: 'module' });
      const channel = new MessageChannel();
      workerPort = channel.port1;

      // Handle initial status message
      const handleInitMessage = (event) => {
        const data = event.data;
        if (data && data.status === 'ready') {
          console.log("SQL Worker ready.");
          workerPort.removeEventListener('message', handleInitMessage);
          resolve();
        } else if (data && data.error) {
          console.error("SQL Worker initialization failed:", data.error);
          workerPort.removeEventListener('message', handleInitMessage);
          reject(new Error(data.error));
        }
      };

      workerPort.addEventListener('message', handleInitMessage);
      workerPort.start();

      // Send port2 to the worker
      worker.postMessage('messagePort', [channel.port2]);

    } catch (err) {
      console.error("Failed to initialize SQL Worker:", err);
      reject(err);
    }
  });

  return workerInitPromise;
};

/**
 * Run SQL queries against the persistent database instance (Asynchronous/Playground Mode)
 * @param {string} query - the SQL query to execute
 */
export const runPersistentQuery = async (query = "") => {
  try {
    await initWorker();

    return new Promise((resolve, reject) => {
      const handleMessage = (event) => {
        workerPort.removeEventListener('message', handleMessage);

        const data = event.data;
        // console.log("Received result, the data is:", data);
        if (data && data.error) {
          resolve({ results: null, error: data.error });
        } else if (Array.isArray(data)) {
          resolve({ results: data, error: null });
        } else {
          // Unexpected format
          resolve({ results: null, error: "Unexpected response from worker" });
        }
      };

      workerPort.addEventListener('message', handleMessage);
      console.log("Sending query to worker:", query);
      workerPort.postMessage(query);
    });

  } catch (err) {
    console.error("runPersistentQuery error:", err);
    return { results: null, error: err.message };
  }
};

/**
 * Check Solution (Synchronous/Lab Mode)
 */
export const checkSolution = async (testCases, userQuery) => {
  try {
    // Ensure engine is initialized
    if (!sqlite3Sync) await initSqlEngine();

    const results = [];
    let allPassed = true;

    for (const testCase of testCases) {
      let userDb = null;
      let solutionDb = null;

      try {
        // Create fresh in-memory DBs for each test case
        userDb = await sqlite3Sync.open_v2(':memory:');
        solutionDb = await sqlite3Sync.open_v2(':memory:');

        // Setup
        if (testCase.setupSql) {
          await sqlite3Sync.exec(userDb, testCase.setupSql);
          await sqlite3Sync.exec(solutionDb, testCase.setupSql);
        }

        // Run User Query
        let userResult = [];
        let userError = null;
        try {
          await sqlite3Sync.exec(userDb, userQuery, (row, columns) => {
            const rowObj = {};
            columns.forEach((col, i) => {
              rowObj[col] = row[i];
            });
            userResult.push(rowObj);
          });
        } catch (e) {
          userError = e.message;
        }

        // Run Solution Query
        let solutionResult = [];
        try {
          await sqlite3Sync.exec(solutionDb, testCase.solutionSql, (row, columns) => {
            const rowObj = {};
            columns.forEach((col, i) => {
              rowObj[col] = row[i];
            });
            solutionResult.push(rowObj);
          });
        } catch (e) {
          // If solution query fails, it's a system error or bad test case
          throw new Error("Solution query failed: " + e.message);
        }

        // Compare
        const passed = !userError && JSON.stringify(userResult) === JSON.stringify(solutionResult);
        if (!passed) allPassed = false;

        results.push({
          passed,
          error: userError,
          userResult,
          expectedResult: solutionResult,
          input: testCase.input
        });

      } catch (err) {
        results.push({
          passed: false,
          error: "System Error: " + err.message,
          input: testCase.input
        });
        allPassed = false;
      } finally {
        if (userDb) await sqlite3Sync.close(userDb);
        if (solutionDb) await sqlite3Sync.close(solutionDb);
      }
    }

    return { passed: allPassed, results };
  } catch (err) {
    return { passed: false, error: err.message, results: [] };
  }
};
