import { useState, useEffect } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

type Filter = "Todas" | "Pendientes" | "Completadas";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("my_todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<Filter>("Todas");

  useEffect(() => {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: crypto.randomUUID(), 
      title: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "Pendientes") return !todo.completed;
    if (filter === "Completadas") return todo.completed;
    return true;
  });

  return (
    <div>
      <h2>Lista de Tareas</h2>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="¿Qué hay que hacer?"
        />
        <button type="submit">Añadir</button>
      </form>

      <div>
        {(["Todas", "Pendientes", "Completadas"] as Filter[]).map(f => (
          <button 
            key={f} 
            
           
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.title}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
             
            >
              X
            </button>
          </li>
        ))}
      </ul>
      
      {filteredTodos.length === 0 && (
        <p>No hay tareas en esta categoría.</p>
      )}
    </div>
  );
};

export default TodoApp;
