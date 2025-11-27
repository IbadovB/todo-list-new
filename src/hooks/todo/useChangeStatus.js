import { changeStatus } from "../../api/todo";

export const useChangeStatus = async (task) => {
  const newStatus = task.status === "active" ? "completed" : "active";

  try {
    const { data } = await changeStatus(task.id, { status: newStatus });
    return data;
  } catch (err) {
    console.error("Error changing status:", err);
    return task;
  }
};






/* ƏVVƏLKİ KODLAŞDIRMA:

import { changeStatus } from "../../api/todo";

export const useChangeStatus = (task) => {
    task.status = task.status === "active" ? "completed" : "active";
    const updateStatus = async () => {
        try {
            await changeStatus(task.id, task);
        } catch (err) {
            console.error("Error changing status:", err);
        }
    };

    
    return [task, updateStatus()];
}*/








