import { TodoDisplayDto } from "../types/todoDisplayDto";

export const todoApi = {
    getAllTodos: async (): Promise<Todo[]> => {
        const response = await fetch('http://localhost:8080/todos');
        if(!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return response.json();
    },

    getTodoById: async (id: number): Promise<Todo> => {
        const response = await fetch(`http://localhost:8080/api/todos/${id}`);
        if(!response.ok) throw new Error('Failed to fetch todo');
        return response.json();
    }
};