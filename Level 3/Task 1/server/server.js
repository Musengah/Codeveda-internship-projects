import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


const app = express();
app.use(cors());
app.use(express.json());


// DB connection
const dbPromise = open({ filename: './db.sqlite', driver: sqlite3.Database });
(async () => {
const db = await dbPromise;
await db.exec('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)');
})();


// CRUD routes
app.get('/tasks', async (req, res) => {
const db = await dbPromise;
const tasks = await db.all('SELECT * FROM tasks');
res.json(tasks);
});


app.post('/tasks', async (req, res) => {
const { title, description } = req.body;
const db = await dbPromise;
const result = await db.run('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
res.json({ id: result.lastID, title, description });
});


app.put('/tasks/:id', async (req, res) => {
const { id } = req.params;
const { title, description } = req.body;
const db = await dbPromise;
await db.run('UPDATE tasks SET title=?, description=? WHERE id=?', [title, description, id]);
res.json({ id, title, description });
});


app.delete('/tasks/:id', async (req, res) => {
const { id } = req.params;
const db = await dbPromise;
await db.run('DELETE FROM tasks WHERE id=?', id);
res.json({ success: true });
});


app.listen(4000, () => console.log('API running on http://localhost:4000'));