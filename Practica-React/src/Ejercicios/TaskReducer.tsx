import { useReducer, useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "EDIT_TASK"; payload: { id: string; title: string } }
  | { type: "CLEAR_COMPLETED" };

const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        { id: crypto.randomUUID(), title: action.payload, completed: false },
      ];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task
      );
    case "CLEAR_COMPLETED":
      return state.filter((task) => !task.completed);
    default:
      return state;
  }
};

const TaskReducer = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TASK", payload: inputValue });
      setInputValue("");
    }
  };

  return (
    <div>
      <h2>Gestión de Tareas</h2>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nueva tarea con reducer..."
        />
        <button type="submit">
          +
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span 
              onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
             
            >
              {task.title}
            </span>
            <button 
              onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
             
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {tasks.some(t => t.completed) && (
        <button 
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
         
         
        >
          Limpiar completadas
        </button>
      )}
    </div>
  );
};

export default TaskReducer;
