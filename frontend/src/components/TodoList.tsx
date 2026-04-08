import React, { useState, useEffect } from 'react';
import { todoApi, TodoDisplayDto } from '../services/todoApi';

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
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
            <div key={TodoDisplayDto.id}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>ステータス: {todoApi.status}</p>
            </div>
            ))}
        </div>
    );
};
