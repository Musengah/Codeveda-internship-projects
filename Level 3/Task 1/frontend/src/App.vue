<template>
  <div class="container">
    <h1>Task Manager</h1>
    <form class="task-form" @submit.prevent="saveTask">
      <input v-model="form.title" placeholder="Title" required />
      <input v-model="form.description" placeholder="Description" />
      <button type="submit">{{ editingId ? 'Update' : 'Add' }}</button>
    </form>

    <ul class="task-list">
      <li v-for="t in tasks" :key="t.id" class="task-card">
        <div>
          <strong>{{ t.title }}</strong>
          <span class="desc">{{ t.description }}</span>
        </div>
        <div class="actions">
          <button class="edit" @click="editTask(t)">Edit</button>
          <button class="delete" @click="deleteTask(t.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from './api';

const tasks = ref([]);
const form = ref({ title: '', description: '' });
const editingId = ref(null);

async function loadTasks() {
  const { data } = await api.get('/tasks');
  tasks.value = data;
}

async function saveTask() {
  if (editingId.value) {
    await api.put(`/tasks/${editingId.value}`, form.value);
  } else {
    await api.post('/tasks', form.value);
  }
  form.value = { title: '', description: '' };
  editingId.value = null;
  loadTasks();
}

function editTask(t) {
  editingId.value = t.id;
  form.value = { title: t.title, description: t.description };
}

async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
  loadTasks();
}

onMounted(loadTasks);
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 2rem 1rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.task-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.task-form input {
  flex: 1 1 150px;
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 1rem;
}

.task-form button {
  padding: 0.5rem 1.2rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.task-form button:hover {
  background: #0056b3;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px #0001;
  transition: box-shadow 0.2s;
}

.task-card:hover {
  box-shadow: 0 4px 12px #0002;
}

.desc {
  display: block;
  color: #666;
  margin-left: 0.5rem;
  font-size: 0.95em;
}

.actions button {
  margin-left: 0.5rem;
  padding: 0.3rem 0.9rem;
  border: none;
  border-radius: 5px;
  font-size: 0.95em;
  cursor: pointer;
  transition: background 0.2s;
}

.actions .edit {
  background: #ffc107;
  color: #222;
}

.actions .edit:hover {
  background: #e0a800;
}

.actions .delete {
  background: #dc3545;
  color: #fff;
}

.actions .delete:hover {
  background: #c82333;
}
</style>