import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  // Get all tasks from server
  useEffect(() => {
    axios.get(API).then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!newTitle.trim()) return;
    axios.post(API, { title: newTitle }).then(res => {
      setTasks([...tasks, res.data]);
      setNewTitle('');
    });
  };

  const completeTask = (id) => {
    axios.put(`${API}/${id}`).then(res => {
      setTasks(tasks.map(task => task.id === id ? res.data : task));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>📝 Task Manager</h1>

      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="Add a task..."
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={addTask} style={{ padding: '8px' }}>Add</button>

      <ul style={{ marginTop: '20px' }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <span style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              marginRight: '15px'
            }}>
              {task.title}
            </span>
            {!task.completed && <button onClick={() => completeTask(task.id)}>✅</button>}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
