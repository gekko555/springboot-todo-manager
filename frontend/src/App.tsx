import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { todoApi, type TodoDisplayDto } from './services/todoApi';  // ← 追加

function App() {
  const [todos, setTodos] = useState<TodoDisplayDto[]>([]);
  const [loading, setLoading] = useState(true);
 const [searchKeyword, setSearchKeyword] = useState('');
const [searchStatus, setSearchStatus] = useState('');
const [searchPriority, setSearchPriority] = useState('');
const [searchDueDateFrom, setSearchDueDateFrom] = useState('');
const [searchDueDateTo, setSearchDueDateTo] = useState('');

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

  const handleSearch = async () => {
  try {
    const params: any = {};
    if (searchKeyword) params.keyword = searchKeyword;
    if (searchStatus) params.status = searchStatus;
    if (searchPriority) params.priority = searchPriority;
    if (searchDueDateFrom) params.dueDateFrom = searchDueDateFrom;
    if (searchDueDateTo) params.dueDateTo = searchDueDateTo;
    
    const data = await todoApi.searchTodos(params);
    setTodos(data);
  } catch (error) {
    console.error('Error searching todos:', error);
  }
};

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
  <div>
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc'}}>
      <h3>検索</h3>
      <input
        type="text"
        placeholder="キーワード"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <select
        value={searchStatus}
        onChange={(e) => setSearchStatus(e.target.value)}
      >
        <option value="">ステータス</option>
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="ON_HOLD">ON_HOLD</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
      <select
        value={searchPriority}
        onChange={(e) => setSearchPriority(e.target.value)}
      >
        <option value="">優先度</option>
        <option value="HIGH">HIGH</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LOW">LOW</option>
      </select>
      <input
        type="date"
        value={searchDueDateFrom}
        onChange={(e) => setSearchDueDateFrom(e.target.value)}
      />
      <input
        type="date"
        value={searchDueDateTo}
        onChange={(e) => setSearchDueDateTo(e.target.value)}
      />
      <button onClick={handleSearch}>検索</button>
      <button onClick={() => {
        setSearchKeyword('');
        setSearchStatus('');
        setSearchPriority('');
        setSearchDueDateFrom('');
        setSearchDueDateTo('');
        refreshTodos();
      }}>クリア</button>
    </div>
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