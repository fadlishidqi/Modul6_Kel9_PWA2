import { openDB } from 'idb';

const dbPromise = openDB('api-data-store', 1, {
  upgrade(db) {
    db.createObjectStore('data');
  },
});

export async function saveData(key, data) {
  const db = await dbPromise;
  await db.put('data', data, key);
}

export async function getData(key) {
  const db = await dbPromise;
  return await db.get('data', key);
}
