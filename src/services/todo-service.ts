import { DUMMY_BASE_URL } from "../constants";
import type { TodoResponse } from "../types/todo";

export const gettodosApi = async ():Promise<TodoResponse> => {
    const response = await fetch(`${DUMMY_BASE_URL}/todos`)

    if (!response.ok){
        throw new Error('Getting todo faild :(')
    }

    const data = await response.json()
    return data
}