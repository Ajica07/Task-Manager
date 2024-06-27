document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
  
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/api/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Due Date: ${task.dueDate}</p>
          <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
      });
    };
  
    const addTask = async () => {
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const dueDate = document.getElementById('due-date').value;
  
      await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, dueDate }),
      });
  
      fetchTasks();
    };
  
    addTaskButton.addEventListener('click', () => {
      addTask();
    });
  
    window.deleteTask = async (id) => {
      await fetch('http://localhost:3000/api/tasks/${id}', {
        method: 'DELETE',
      });
  
      fetchTasks();
    };
  
    fetchTasks();
  });