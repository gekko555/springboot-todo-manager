import { useState } from 'react';
import { todoApi } from '../services/todoApi';

//1.Propsの型定義を追加
interface TodoFormProps {
    onTodoCreated: () => void;
}

//2.Propsを受け取れるように変更
export const TodoForm: React.FC<TodoFormProps>  = ({ onTodoCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [priority, setPriority] = useState('MEDIUM');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTodo = {
            title,
            description,
            status,
            priority,
            dueDate
        };

        try{
            //3. 呼び出し後に親に通知
            await todoApi.createTodo(newTodo);
            onTodoCreated();

            //フォームリセット
            setTitle('');
            setDescription('');
            setStatus('PENDING');
            setPriority('MEDINUM');
            setDueDate('');
           
        }catch(error){
            console.error('作成失敗:', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>タイトル：</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>説明：</label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
            <label>ステータス：</label>
            <select value={status}
            onChange={(e) => setStatus(e.target.value)}
            >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>
            </div>
            <div>
                <label>優先度：</label>
                <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                </select>
                </div>
                <div>
                    <label>期日：</label>
                    <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    />
            </div>
            <button type="submit">作成</button>
        </form>
    );
};