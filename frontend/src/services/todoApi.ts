import type { TodoDisplayDto } from "../types/todoDisplayDto";

export const todoApi = {
    getAllTodos: async (): Promise<TodoDisplayDto[]> => {
        const response = await fetch('http://localhost:8080/api/todos');
        if(!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return response.json();
    },

    getTodoById: async (id: number): Promise<TodoDisplayDto> => {
        const response = await fetch(`http://localhost:8080/api/todos/${id}`);
        if(!response.ok) throw new Error('Failed to fetch todo');
        return response.json();
    },

    createTodo: async (todo: Omit<TodoDisplayDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<TodoDisplayDto> => {
        const response = await fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });

        if(!response.ok) throw new Error('Failed to create todo');
        return response.json();
    },

    deleteTodo: async(id: number): Promise<void> => {
        const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'DELETE'
        });
        if(!response.ok) throw new Error('Failed to delete todo');
    }

};

export type { TodoDisplayDto };