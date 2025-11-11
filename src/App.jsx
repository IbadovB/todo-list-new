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
      <header className="flex align-center gap-120 pt-40 pb-5">
        <h1 className="head-text text-white text-[1.5em]">T O D O</h1>


        <button className="mode-toggle text-[1.5em] 
        border-none cursor-pointer bg-none  
        shadow-none  outline-none"
          onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </header>

      <div className="task-area flex flex-col gap-[3em] items-center 
      text-inherit border-none bg-none pb-[50px]">
        <div className="input-area w-150 flex flex-row  items-center 
        gap-[2em]  pb-3  pt-3 pl-9 rounded-[5px]">

          <div className="circle p-1.5 
          border-[2px] border-[#c8cbe7]  
          rounded-full flex justify-center 
          items-center cursor-pointer 
          transition-all duration-300 ease-in-out"></div>

          <input className="border-none 
          outline-none w-full text-black"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Create a new todo..."
          />
        </div>


        <ul className="list-none   flex flex-col justify-center items-center ">
          {filteredTasks.map((t, index) => (
            <li key={index} className="flex justify-center items-center gap-[10px] py-[5px] px-[25px] w-[595px]">
              <span
                className={`circle p-1.5  border-[2px] 
                border-[#c8cbe7] rounded-full flex justify-center 
                items-center cursor-pointer transition-all 
                duration-300 ease-in-out ${t.completed ? "checked" : ""}`}
                onClick={() => toggleTask(index)}
              >
                {t.completed ? "✔" : ""}
              </span>
              <span
                className={`task-text flex-grow text-left cursor-pointer transition-colors duration-300 text-[15px] ${t.completed ? "completed" : ""}`}
                onClick={() => toggleTask(index)}
              >
                {t.text}
              </span>
              <button className="delete-btn  border-none  
              text-[25px] cursor-pointer" onClick={() => deleteTask(index)}>
                x
              </button>
            </li>
          ))}

          <div className="footer flex items-center 
          justify-center gap-[5em] h-[50px] 
          rounded-b-[5px] shadow-[1px_1px_1px_1px_#efeded] w-[595px]">
            <span>
              {itemsLeft} item{itemsLeft !== 1 ? "s" : ""} left
            </span>

            <div className="options">
              <button
                className={`all-btn ${filter === "all" ? "active-filter" : ""
                  }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>


              <button
                className={`active-btn ${filter === "active" ? "active-filter" : ""
                  }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>


              <button
                className={`completed-btn ${filter === "completed" ? "active-filter" : ""
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
