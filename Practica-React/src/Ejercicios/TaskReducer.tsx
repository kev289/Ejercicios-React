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
    <div className="exercise-container">
      <h2>10. Gestión de Tareas (useReducer)</h2>

      <form onSubmit={handleAddTask} className="form-group" style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nueva tarea con reducer..."
        />
        <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
          +
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px', 
            background: 'rgba(255,255,255,0.05)', 
            marginBottom: '5px',
            borderRadius: '8px'
          }}>
            <span 
              onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
              style={{ 
                cursor: 'pointer', 
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.5 : 1,
                flex: 1
              }}
            >
              {task.title}
            </span>
            <button 
              onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
              style={{ background: 'transparent', border: 'none', color: '#ff4646', cursor: 'pointer' }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {tasks.some(t => t.completed) && (
        <button 
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
          className="btn btn-secondary"
          style={{ marginTop: '10px', fontSize: '0.8rem' }}
        >
          Limpiar completadas
        </button>
      )}
    </div>
  );
};

export default TaskReducer;
