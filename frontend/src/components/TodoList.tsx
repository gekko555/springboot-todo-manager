import { useState, useEffect } from 'react';
import { todoApi, type TodoDisplayDto } from '../services/todoApi';

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoDisplayDto[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async(id: number) => {
        try{
            await todoApi.deleteTodo(id);
            window.location.reload();
        } catch(error) {
            console.error('削除失敗:', error);
        }
    };

    useEffect(() => {
        todoApi.getAllTodos()
        .then(data => {
            setTodos(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    },[]);

    if(loading) return<div>Loading...</div>;

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