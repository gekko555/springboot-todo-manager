import { useState, useEffect } from 'react';
import { todoApi, type TodoDisplayDto } from '../services/todoApi';

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoDisplayDto[]>([]);
    const [loading, setLoading] = useState(true);

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
        </tr>
    ))}
</tbody>
        </table>
    </div>
); 
}