import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { todoApi } from './services/todoApi';


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

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <div className="App">
      <TodoForm
        onTodoCreated={refreshTodos}
      />
      <TodoList
        todos={todos}
        loading={loading}
        onTodoDeleted={refreshTodos}
      />
    </div>
  );
}

export default App;