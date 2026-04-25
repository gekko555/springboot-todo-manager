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

    updateTodo: async (id: number, todo: Omit<TodoDisplayDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<TodoDisplayDto> => {
        const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
 
        if(!response.ok) throw new Error('Failed to update todo');
        return response.json();
    },
 
    deleteTodo: async(id: number): Promise<void> => {
        const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'DELETE'
        });
        if(!response.ok) throw new Error('Failed to delete todo');
    },

    searchTodos: async(params: {
        keyword?: string;
        status?: string;
        priority?: string;
        dueDateFrom?: string;
        dueDateTo?: string;
    }): Promise<TodoDisplayDto[]> => {
        const queryParams = new URLSearchParams();

        if(params.keyword) queryParams.append('keyword', params.keyword);
        if(params.status) queryParams.append('status', params.status);
        if(params.priority) queryParams.append('priority', params.priority);
        if(params.dueDateFrom) queryParams.append('dueDateFrom', params.dueDateFrom);
        if(params.dueDateTo) queryParams.append('dueDateTo', params.dueDateTo);

        const queryString = queryParams.toString();
        const url = queryString ? `http://localhost:8080/api/todos/search?${queryString}` : 'http://localhost:8080/api/todos/search';
        
        const response = await fetch(url);
        if(!response.ok) throw new Error('Failed to search todos');
        return response.json();
    }
};

export type { TodoDisplayDto };