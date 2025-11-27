function TodoFooter({ itemsLeft, filter, setFilter, clearCompleted, tasks }) {

  return (
    <>
      <div className="footer">
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

  <button
          className={`clear-btn ${tasks.some((t) => t.status === "completed") ? "active-delete" : ""}`}
          onClick={clearCompleted}
        >
          Clear Completed
        </button>


      </div>

      <div className="new-options">
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
    </>
  )
}

export default TodoFooter;


