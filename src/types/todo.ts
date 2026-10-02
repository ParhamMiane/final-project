export interface TodoResponse{
    todos: Todo[]
    total: number,
    skip: number,
    limit: number,
}

interface Todo{
    id: number,
    title: string,
    body: string,
    tags: string[],
    reactions: Reactions,
    views: number,
    userId: number,
}

interface Reactions{
    likes: number,
    dislikes: number
}