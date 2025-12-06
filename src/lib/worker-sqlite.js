import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs';
import { IDBBatchAtomicVFS as MyVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js';
import * as SQLite from 'wa-sqlite/src/sqlite-api.js';


Promise.resolve().then(async () => {
  let messagePort;
  try {
    // Set up communications with the main thread.
    messagePort = await new Promise(resolve => {
      addEventListener('message', function handler(event) {
        if (event.data === 'messagePort') {
          resolve(event.ports[0]);
          removeEventListener('message', handler);
        }
      });
    });

    // Initialize SQLite.
    console.log('Worker origin:', self.location.origin);
    const module = await SQLiteESMFactory({
      locateFile: (file) => {
        const url = new URL('/wa-sqlite-async.wasm', self.location.origin).href;
        console.log('WASM URL:', url);
        return url;
      }
    });
    const sqlite3 = SQLite.Factory(module);

    // Register a custom file system.
    const vfs = await new MyVFS('playground-db', module);
    // @ts-ignore
    sqlite3.vfs_register(vfs, true);

    // Open the database.
    const db = await sqlite3.open_v2('playground.db');

    // Handle SQL from the main thread.
    messagePort.addEventListener('message', async event => {
      const sql = event.data;
      console.log("Worker received query:", sql);
      try {
        // Query the database.
        const results = [];
        await sqlite3.exec(db, sql, (row, columns) => {
          const rowObj = {};
          columns.forEach((col, i) => {
            rowObj[col] = row[i];
          });
          results.push(rowObj);
        });

        // Return the results.
        console.log("Worker sending results");
        messagePort.postMessage(results);
      } catch (error) {
        console.error("Worker query error:", error);
        messagePort.postMessage({ error: error.message });
      }
    });
    messagePort.start();

    // Signal ready
    console.log("Worker sending ready signal");
    messagePort.postMessage({ status: 'ready' });

  } catch (error) {
    console.error("Worker initialization error:", error);
    if (messagePort) {
      messagePort.postMessage({ error: error.message });
    }
  }
});

// Promise.reject(new Error('Worker initialization failed'));

// Promise.resolve().then(async () => {
//   // Set up communications with the main thread.
//   const messagePort = await new Promise(resolve => {
//     addEventListener('message', function handler(event) {
//       if (event.data === 'messagePort') {
//         resolve(event.ports[0]);
//         removeEventListener('message', handler);
//       }
//     });
//   });

//   // Initialize SQLite.
//   const module = await SQLiteESMFactory();
//   const sqlite3 = SQLite.Factory(module);

//   // Register a custom file system.
//   const vfs = await new MyVFS('playground-db', module);
//   // @ts-ignore
//   sqlite3.vfs_register(vfs, true);

//   // Open the database.
//   const db = await sqlite3.open_v2('playground.db');

//   // Handle SQL from the main thread.
//   messagePort.addEventListener('message', async event => {
//     const sql = event.data;
//     try {
//       // Query the database.
//       const results = [];
//       await sqlite3.exec(db, sql, (row, columns) => {
//         if (columns != results.at(-1)?.columns) {
//           results.push({ columns, rows: [] });
//         }
//         results.at(-1).rows.push(row);
//       });

//       // Return the results.
//       messagePort.postMessage(results);
//     } catch (error) {
//       messagePort.postMessage({ error: error.message });
//     }
//   });
//   messagePort.start();
// });