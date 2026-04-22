import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { todoApi, type TodoDisplayDto } from './services/todoApi';  // ← 追加

function App() {
  const [todos, setTodos] = useState<TodoDisplayDto[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTodos = async () => {
    try {
      const data = await todoApi.getAllTodos();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const handleTodoUpdated = (updatedTodo: TodoDisplayDto) => {
    setTodos(prevTodos => prevTodos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <div>
      <TodoForm onTodoCreated={refreshTodos} />
      <TodoList 
        todos={todos}
        loading={loading}
        onTodoDeleted={refreshTodos}
        onTodoUpdated={handleTodoUpdated}
      />
    </div>
  );
}

export default App;