import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

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
    if (e.key === "Enter") addTask();
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };


  const itemsLeft = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1 className="head-text">T O D O</h1>
        <button
          className="mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <img src="/images/moon-solid-full.svg" className="moon" alt="moon"/>
          ) : (
            <img src="/images/sunny-day.png" className="sun" alt="sun" />
          )}
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
                {t.completed ? (<img src="/images/check-solid-full.svg" className="check" alt="moon"/>) : ""}
              </span>
              <span
                className={`task-text ${t.completed ? "completed" : ""}`}
                onClick={() => toggleTask(index)}
              >
                {t.text}
              </span>
              {/* <button><img src="/images/delete.png" className="delete-btn" alt="delete-btn"*/}
               <button className="delete-btn"
                onClick={() => deleteTask(index)}> x
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

            <button onClick={clearCompleted} className="clear-btn">
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
