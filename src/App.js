import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const itemsLeft = tasks.filter((t) => !t.completed).length;

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1 className="head-text">Todo List</h1>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </header>

      <div className="input-area">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Create a new todo..."
        />
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <span
              className={`circle ${t.completed ? "checked" : ""}`}
              onClick={() => toggleTask(index)}
            >
              {t.completed ? "✔" : ""}
            </span>
            <span
              className={`task-text ${t.completed ? "completed" : ""}`}
              onClick={() => toggleTask(index)}
            >
              {t.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              ✖
            </button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <span>{itemsLeft} item{itemsLeft !== 1 ? "s" : ""} left</span>
        
        <div className="options">

          <button className="all-btn">All</button>
          <button className="active-btn">Active</button>
          <button className="completed-btn">Completed</button>
        </div>
        <button onClick={clearCompleted} className="clear-btn">
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
