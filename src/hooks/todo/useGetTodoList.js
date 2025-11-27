import { useState, useEffect } from "react";
import { getTodoList } from "../../api/todo";

export const useGetTodoList = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        let mounted = true;
        const fetchTodos = async () => {
            try {
                const { data } = await getTodoList();
                if (!mounted) { return; }
                if (Array.isArray(data)) {
                    setTasks(data);
                }
                else {
                    console.warn("Unexpected getTodoList response:", data);
                    setTasks([]);
                }
            } catch (err) {
                console.error("Error loading todos:", err);
            }
        };
       fetchTodos();
        return () => {
            mounted = false;
        };
    }, []);
    return [tasks, setTasks];
}