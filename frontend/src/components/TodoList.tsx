import { todoApi, type TodoDisplayDto } from '../services/todoApi';

interface TodoListProps {
    todos: TodoDisplayDto[];
    loading: boolean;
    onTodoDeleted?: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
    todos, 
    loading, 
    onTodoDeleted 
}) => {
  
    const handleDelete = async(id: number) => {
        try{
            await todoApi.deleteTodo(id);
            onTodoDeleted?.();
        } catch(error) {
            console.error('削除失敗:', error);
        }
    };

    if(loading) 
        return <div>Loading...</div>;

    return(
        <div>
            <h1>Todo一覧</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>タスク名</th>
                        <th>ステータス</th>
                        <th>優先度</th>
                        <th>期限</th>
                        <th>操作</th>
                     </tr>
            </thead>
            <tbody>
    {todos.map(todo => (
        <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.status}</td>
            <td>{todo.priority}</td>
            <td>{todo.dueDate}</td>
            <td>
                <button onClick={() => handleDelete(todo.id)}>
                    削除
                </button>
            </td>
        </tr>
    ))}
</tbody>
        </table>
    </div>
); 
};