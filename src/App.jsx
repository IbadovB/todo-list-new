import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState(""); 

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


  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; 
  });


  const clearAll = () => {
  setTasks([]); 
};

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header className="flex">
        <h1 className="head-text">Todo List</h1>

     
        <button className="mode-toggle bg-red" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </header>

      <div className="task-area">
        <div className="input-area">
          <div className="circle"></div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Create a new todo..."
          />
        </div>


        <ul>
          {filteredTasks.map((t, index) => (
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

          <div className="footer">
            <span>
              {itemsLeft} item{itemsLeft !== 1 ? "s" : ""} left
            </span>

            <div className="options">
              <button
                className={`all-btn ${
                  filter === "all" ? "active-filter" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>


              <button
                className={`active-btn ${
                  filter === "active" ? "active-filter" : ""
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>

              
              <button
                className={`completed-btn ${
                  filter === "completed" ? "active-filter" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>

            <button onClick={clearAll} className="clear-btn">
              Clear Completed
            </button>
          </div>
        </ul>

        <p>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

export default App;
