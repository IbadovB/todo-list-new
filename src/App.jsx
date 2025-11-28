import { useState, useEffect } from "react";
import "./App.css";
import { useGetTodoList } from "./hooks/todo/useGetTodoList";
import TodoFooter from "./components/footer/footer";
import { useChangeStatus } from "./hooks/todo/useChangeStatus";
import { setTask, removeTask, clearCompletedRequest } from "./api/todo";

function App() {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

  const [loadedTasks] = useGetTodoList();

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored) setDarkMode(JSON.parse(stored));
  }, []);

  useEffect(() => {
    setTasks(loadedTasks);
  }, [loadedTasks]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && description.trim()) {
      try {
        const response = await setTask(description);
        setTasks(prev => [response.data, ...prev]);
        setDescription("");
      } catch (err) {
        console.error("Error adding task:", err);
      }
    }
  };

  const toggleTask = (task) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, status: t.status === "active" ? "completed" : "active" }
          : t
      )
    );
    useChangeStatus(task).catch(err => console.error(err));
  };

  const deleteTask = async (task) => {
    try {
      await removeTask(task.id);
      setTasks(prev => prev.filter(t => t.id !== task.id));
    } catch (err) {
      console.error(err);
    }
  };

  const clearCompleted = async () => {
    try {
      await clearCompletedRequest();
      setTasks(prev => prev.filter(t => t.status !== "completed"));
    } catch (err) {
      console.error(err);
    }
  };

  const itemsLeft = tasks.filter(t => t.status === "active").length;

  const filteredTasks = tasks.filter(t => {
    if (filter === "active") return t.status === "active";
    if (filter === "completed") return t.status === "completed";
    return true;
  });


  const changePageMode = (mode) => {
    setDarkMode(mode);
    if (mode) localStorage.setItem("darkMode", JSON.stringify(true));
    else localStorage.removeItem("darkMode");
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1 className="head-text">T O D O</h1>
        <button className="mode-toggle" onClick={() => changePageMode(!darkMode)}>
          {darkMode ? (
            <img src="/images/moon-solid-full.svg" className="moon" alt="moon" />
          ) : (
            <img src="/images/sunny-day.png" className="sun" alt="sun" />
          )}
        </button>
      </header>

      <div className="task-area">
        <div className="input-area">
          <div className="circle"></div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Create a new todo..."
          />
        </div>

        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className="flex items-center gap-4">
              <span
                className={`circle ${task.status === "completed" ? "completed" : ""}`}
                onClick={() => toggleTask(task)}
              >
                {task.status === "completed" && (
                  <img src="/images/check-solid-full.svg" className="check" alt="check" />
                )}
              </span>

              <span
                className={`task-text ${task.status === "completed" ? "completed" : ""}`}
                onClick={() => toggleTask(task)}
              >
                {task.description}
              </span>

              <button className="delete-btn" onClick={() => deleteTask(task)}>x</button>
            </li>
          ))}
        </ul>

        <TodoFooter itemsLeft={itemsLeft} filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} tasks={tasks} />
        <p>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

export default App;








{/* ƏVVƏLKİ KODLAŞDIRMA:
  import { useState, useEffect, use } from "react";
import "./App.css";
import { useGetTodoList } from "./hooks/todo/useGetTodoList";
import TodoFooter from "./components/footer/footer";
import { useChangeStatus } from "./hooks/todo/useChangeStatus";
import { setTask, removeTask } from "./api/todo";

function App() {
  const [debouncedValue, setDebouncedValue] = useState('');
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");


  const [loadedTasks,] = useGetTodoList();
  
  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    }
  })
  const changePageMode = (darkMode) => {
    if (darkMode) {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    } else {
      localStorage.removeItem("darkMode");
    }
    setDarkMode(darkMode)
  }

  useEffect(() => {
    setTasks(loadedTasks);
  }, [loadedTasks]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(description);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [description]);

  useEffect(() => {
    if (debouncedValue) {
      const task = setTask(debouncedValue)
        .then((response) => {
          setTasks([response.data, ...tasks]);
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });

    }
  }, [debouncedValue]);
  const toggleTask = (task) => {
    const updatedTask = useChangeStatus(task);
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedTasks);
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const deleteTask = async (task) => {
    const id = task.id;
    console.log(id);

    await removeTask(id).then(() => {
      console.log("Task deleted successfully");
      setTasks(tasks.filter((task) => task.id !== id));
    }).catch((error) => {
      console.error("Error deleting task:", error);
    });


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
    <>
      <div className={`App ${darkMode ? "dark" : "light"}`}>
        <header>
          <h1 className="head-text">T O D O</h1>
          <button
            className="mode-toggle"
            onClick={() => changePageMode(!darkMode)}
          >
            {darkMode ? (
              <img src="/images/moon-solid-full.svg" className="moon" alt="moon" />
            ) : (
              <img src="/images/sunny-day.png" className="sun" alt="sun" />
            )}
          </button>
        </header>

        <div className="task-area">
          <div className="input-area">
            <div className="circle"></div>
            <input
              value={description}
              type="text"
              onChange={handleChange}
              placeholder="Create a new todo..."
            />
          </div>

          <div>
            <ul>
              {filteredTasks.map((task, index) => (
                <li key={index}>
                  <span
                    className={`circle ${task.status === 'active' ? "active" : ""}`}
                    onClick={() => toggleTask(task)}
                  >
                    {task.status ? (<img src="/images/check-solid-full.svg" className="check" alt="moon" />) : ""}
                  </span>
                  <span
                    className={`task-text ${task.status === "completed" ? "completed" : ""}`}
                    onClick={() => toggleTask(index)}
                  >
                    {task.description}
                  </span>

                  <button className="delete-btn"
                    onClick={() => deleteTask(task)}> x
                  </button>

                </li>
              ))}

            </ul>
            <TodoFooter itemsLeft={itemsLeft} filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
          </div>
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    </>
  );
}

export default App;

  
  */}
