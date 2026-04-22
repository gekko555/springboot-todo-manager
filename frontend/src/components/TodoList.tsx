import { useState } from 'react';
import { todoApi, type TodoDisplayDto } from '../services/todoApi';
 
interface TodoListProps {
    todos: TodoDisplayDto[];
    loading: boolean;
    onTodoDeleted?: () => void;
    onTodoUpdated?: (updatedTodo: TodoDisplayDto) => void;
}
 
export const TodoList: React.FC<TodoListProps> = ({ 
    todos, 
    loading, 
    onTodoDeleted,
    onTodoUpdated
}) => {
    const [editingTodo, setEditingTodo] = useState<TodoDisplayDto | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'PENDING',
        priority: 'MEDIUM',
        dueDate: ''
    });
 
    const handleDelete = async(id: number) => {
        try{
            await todoApi.deleteTodo(id);
            onTodoDeleted?.();
        } catch(error) {
            console.error('削除失敗:', error);
        }
    };
 
    const handleEdit = (todo: TodoDisplayDto) => {
        setEditingTodo(todo);
        setFormData({
            title: todo.title,
            description: todo.description,
            status: todo.status,
            priority: todo.priority,
            dueDate: todo.dueDate
        });
    };
 
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editingTodo) return;
 
        try{
            const updatedTodo = await todoApi.updateTodo(editingTodo.id, formData);
            onTodoUpdated?.(updatedTodo);
            setEditingTodo(null);
            setFormData({
                title: '',
                description: '',
                status: 'PENDING',
                priority: 'MEDIUM',
                dueDate: ''
            });
        } catch(error) {
            console.error('更新失敗:', error);
        }
    };
 
    const handleCancel = () => {
        setEditingTodo(null);
        setFormData({
            title: '',
            description: '',
            status: 'PENDING',
            priority: 'MEDIUM',
            dueDate: ''
        });
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
                        <th>説明</th>
                        <th>ステータス</th>
                        <th>優先度</th>
                        <th>期限</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            {editingTodo?.id === todo.id ? (
                                <>
                                    <td>{todo.id}</td>
                                    <td colSpan={5}>
                                        <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                placeholder="タスク名"
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                placeholder="説明"
                                            />
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                <option value="COMPLETED">COMPLETED</option>
                                            </select>
                                            <select
                                                value={formData.priority}
                                                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                            >
                                                <option value="LOW">LOW</option>
                                                <option value="MEDIUM">MEDIUM</option>
                                                <option value="HIGH">HIGH</option>
                                            </select>
                                            <input
                                                type="date"
                                                value={formData.dueDate}
                                                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                                            />
                                            <button type="submit">保存</button>
                                            <button type="button" onClick={handleCancel}>キャンセル</button>
                                        </form>
                                    </td>
                                    <td></td>
                                </>
                            ) : (
                                <>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.status}</td>
                                    <td>{todo.priority}</td>
                                    <td>{todo.dueDate}</td>
                                    <td>
                                        <button onClick={() => handleEdit(todo)}>
                                            編集
                                        </button>
                                        <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '8px' }}>
                                            削除
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
